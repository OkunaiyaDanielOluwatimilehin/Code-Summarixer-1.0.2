// If you are using ES Modules (which your import statement suggests):
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // It's best practice to use environment variables for your API key
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: 'Please provide text to summarize.' });
    }

    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo", // Or your preferred model
        messages: [
          { role: "user", content: `Summarize the following text: ${text}` },
        ],
      });

      const summary = completion.choices[0].message.content;
      res.status(200).json({ summary });
    } catch (error) {
      console.error("Error during summarization:", error);
      res.status(500).json({ error: 'Failed to generate summary.' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
