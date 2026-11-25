import { getStripe } from '@/lib/stripe';
import { getProduct } from '@/lib/products';
import { sql } from '@/lib/db';

// Look up a Checkout session from Stripe and confirm it is a paid store order.
// Always ask Stripe directly; never trust ids or flags from the browser.
export async function getPaidStoreSession(sessionId) {
  if (!sessionId || typeof sessionId !== 'string' || !sessionId.startsWith('cs_')) return null;
  const session = await getStripe().checkout.sessions.retrieve(sessionId);
  if (session.metadata?.kind !== 'store' || session.payment_status !== 'paid') return null;
  const product = getProduct(session.metadata.slug);
  if (!product) return null;
  return { session, product };
}

export async function ensureOrdersTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS store_orders (
      id SERIAL PRIMARY KEY,
      stripe_session_id VARCHAR(255) UNIQUE NOT NULL,
      user_id INTEGER,
      email VARCHAR(255),
      product_slug VARCHAR(120) NOT NULL,
      variant_id VARCHAR(120),
      quantity INTEGER DEFAULT 1,
      amount_total INTEGER,
      kind VARCHAR(20),
      printful_order_id VARCHAR(60),
      fulfillment_status VARCHAR(40) DEFAULT 'paid',
      created_at TIMESTAMP DEFAULT NOW()
    )
  `;
}

// Send a paid physical order to Printful. Orders are created as drafts unless
// PRINTFUL_AUTO_CONFIRM=true, so they can be reviewed in Printful before printing.
export async function sendToPrintful(session, product) {
  const token = process.env.PRINTFUL_API_TOKEN;
  if (!token) return null;
  const variant = product.variants?.find((v) => v.id === session.metadata.variantId);
  if (!variant?.printfulSyncVariantId) return null;

  const ship = session.shipping_details || session.collected_information?.shipping_details;
  const addr = ship?.address || {};
  const body = {
    external_id: session.id.slice(-32),
    recipient: {
      name: ship?.name,
      address1: addr.line1,
      address2: addr.line2 || undefined,
      city: addr.city,
      state_code: addr.state,
      country_code: addr.country,
      zip: addr.postal_code,
      email: session.customer_details?.email,
      phone: session.customer_details?.phone || undefined,
    },
    items: [{ sync_variant_id: variant.printfulSyncVariantId, quantity: parseInt(session.metadata.quantity, 10) || 1 }],
  };

  const confirm = process.env.PRINTFUL_AUTO_CONFIRM === 'true' ? '?confirm=true' : '';
  const res = await fetch(`https://api.printful.com/orders${confirm}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...(process.env.PRINTFUL_STORE_ID ? { 'X-PF-Store-Id': process.env.PRINTFUL_STORE_ID } : {}),
    },
    body: JSON.stringify(body),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(`Printful: ${json?.error?.message || res.status}`);
  return json.result?.id ? String(json.result.id) : null;
}

export async function recordStoreOrder(sessionId) {
  const paid = await getPaidStoreSession(sessionId);
  if (!paid) return;
  const { session, product } = paid;
  await ensureOrdersTable();
  const inserted = await sql`
    INSERT INTO store_orders (stripe_session_id, user_id, email, product_slug, variant_id, quantity, amount_total, kind)
    VALUES (${session.id}, ${session.metadata.userId ? parseInt(session.metadata.userId, 10) : null},
            ${session.customer_details?.email || null}, ${product.slug}, ${session.metadata.variantId || null},
            ${parseInt(session.metadata.quantity, 10) || 1}, ${session.amount_total}, ${product.kind})
    ON CONFLICT (stripe_session_id) DO NOTHING
    RETURNING id
  `;
  if (!inserted.length || product.kind !== 'physical') return;
  try {
    const printfulId = await sendToPrintful(session, product);
    if (printfulId) {
      await sql`UPDATE store_orders SET printful_order_id = ${printfulId}, fulfillment_status = 'sent_to_printful' WHERE stripe_session_id = ${session.id}`;
    }
  } catch (err) {
    console.error('Printful order failed:', err.message);
    await sql`UPDATE store_orders SET fulfillment_status = 'printful_error' WHERE stripe_session_id = ${session.id}`;
  }
}
