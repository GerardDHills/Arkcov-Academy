const API = 'https://api.printful.com';

export function printfulHeaders() {
  const token = process.env.PRINTFUL_API_TOKEN;
  if (!token) throw new Error('PRINTFUL_API_TOKEN is not set in Vercel');
  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
    ...(process.env.PRINTFUL_STORE_ID ? { 'X-PF-Store-Id': process.env.PRINTFUL_STORE_ID } : {}),
  };
}

export async function pf(path, { method = 'GET', body, auth = true } = {}) {
  const res = await fetch(`${API}${path}`, {
    method,
    headers: auth ? printfulHeaders() : { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
    cache: 'no-store',
  });
  const json = await res.json().catch(() => ({}));
  return { ok: res.ok, status: res.status, json };
}

// Admin session or the one-time setup key (header x-setup-key)
export async function allowedAdmin(request, getCurrentUser) {
  const key = request.headers.get('x-setup-key');
  if (key && process.env.PRINTFUL_SETUP_KEY && key === process.env.PRINTFUL_SETUP_KEY) return true;
  const user = await getCurrentUser();
  return user?.role === 'admin';
}
