// /api/summarize.js
import axios from 'axios';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { text } = req.body;

        if (!text) {
            return res.status(400).json({ error: "Input text is required." });
        }

        try {
            const response = await axios.post(
                'https://open-ai21.p.rapidapi.com/summary',
                { text },
                {
                    headers: {
                        'x-rapidapi-key': process.env.RAPID_API_KEY,
                        'x-rapidapi-host': 'open-ai21.p.rapidapi.com',
                        'Content-Type': 'application/json'
                    }
                }
            );

            res.status(200).json({ result: response.data.result, status: true });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Failed to fetch summary." });
        }
    } else {
        res.status(405).json({ error: "Method Not Allowed" });
    }
}
