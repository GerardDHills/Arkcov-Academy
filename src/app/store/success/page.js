import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { getPaidStoreSession, recordStoreOrder } from '@/lib/store';
import styles from '../store.module.css';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Thank you | Arkcov Academy Store' };

export default async function StoreSuccess({ searchParams }) {
  let paid = null;
  try {
    paid = await getPaidStoreSession(searchParams?.session_id);
    if (paid) await recordStoreOrder(paid.session.id);
  } catch (e) {
    console.error('Store success lookup failed:', e);
  }

  const email = paid?.session.customer_details?.email;

  return (
    <>
      <Navbar />
      <main id="main" className={styles.page}>
        <section className={styles.thanks}>
          {!paid ? (
            <>
              <h1>We could not find that order</h1>
              <p>If you were charged, your receipt from Stripe has the details. Reply to it and we will make it right.</p>
              <Link href="/store" className="btn btn-crimson btn-lg">Back to the store</Link>
            </>
          ) : paid.product.kind === 'digital' ? (
            <>
              <h1>Your journal is ready</h1>
              <p>Thank you for your order{email ? `, a receipt is on its way to ${email}` : ''}. Download your copy below. Keep this page&apos;s link to download it again.</p>
              <a href={`/api/store/download?session_id=${encodeURIComponent(paid.session.id)}`} className="btn btn-crimson btn-lg">
                Download the Medicine Bullet Journal
              </a>
              <p className={styles.small}>Large file. On a phone, it may be easier to download on Wi-Fi.</p>
            </>
          ) : (
            <>
              <h1>Order received</h1>
              <p>Thank you{email ? `. A receipt is on its way to ${email}` : ''}. Your {paid.product.name} is made to order and ships in about 5 to 10 business days.</p>
              <Link href="/store" className="btn btn-crimson btn-lg">Keep shopping</Link>
            </>
          )}
        </section>
      </main>
    </>
  );
}
