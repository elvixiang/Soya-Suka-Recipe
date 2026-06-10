// api/soyasuka-auth.js
// Vercel serverless proxy — handle CORS antara HTML dan Apps Script
// Taruh file ini di: /api/soyasuka-auth.js di repo Vercel kamu

const APPS_SCRIPT_URL = 'GANTI_DENGAN_URL_APPS_SCRIPT_KAMU';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const params = req.method === 'POST' ? req.body : req.query;
    const qs = new URLSearchParams(params).toString();
    const url = `${APPS_SCRIPT_URL}?${qs}`;

    const upstream = await fetch(url);
    const data = await upstream.json();
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ ok: false, error: 'Proxy error: ' + err.message });
  }
}
