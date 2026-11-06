export interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

/** POSTs to the existing Express/Mailgun endpoint (backend/index.js → /api/contact). */
export async function sendContactMessage(payload: ContactPayload): Promise<void> {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.error ?? `Request failed (${res.status})`);
  }
}
