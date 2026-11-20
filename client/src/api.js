const BASE = import.meta.env.VITE_API_URL || '';

async function request(path, options) {
  const res = await fetch(`${BASE}/api${path}`, options);
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || `Request failed (${res.status})`);
  return data;
}

export const fetchPortfolio = () => request('/portfolio');
export const sendMessage = body => request('/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body),
});
