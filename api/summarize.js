export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: 'Input text is required.' });
  }

  // ✅ Simulated / fake response
  return res.status(200).json({
    result: `📝 Mock summary: "${text.slice(0, 50)}..."`,
    status: true
  });
}
