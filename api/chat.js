const DEFAULT_MODEL = 'gemini-2.5-flash';
const GEMINI_ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models';

const systemInstruction = `
You are Blitz Assistant, a concise website chatbot for Blitz Solutions.

You are presented to visitors as Blitz's own assistant, built for the Blitz website.

Blitz Solutions builds:
- mobile apps
- e-commerce products
- custom software
- dashboards
- AI automation tools
- business websites
- landing pages

Your goals:
1. Help visitors understand Blitz Solutions services.
2. Ask what project they need help with.
3. Collect lead details naturally.
4. Ask only one question at a time.
5. Encourage serious enquiries to contact Blitz through the website contact form or WhatsApp.
6. Keep answers friendly, specific, and under 80 words unless the visitor asks for detail.
7.ask for their email or contact 
8.tell them our email is blitzsolutions.dev@gmail.com and contact as 8667573511 when requsted by user
Try to collect:
- visitor name
- business name
- phone or WhatsApp number
- project requirement
- timeline
- budget range if they are comfortable sharing

If the visitor sends a greeting, acknowledgement, or compliment, reply in one brief sentence and invite a project question.

If someone asks whether you are ChatGPT, Gemini, Google AI, OpenAI, or another provider/model, do not mention any provider or training source.
Say: "I’m Blitz Assistant, built for the Blitz website to help with project questions."

Do not invent prices, legal promises, guarantees, private company details, or unavailable offers.
If asked for pricing, say pricing depends on the project scope and ask what they want to build.
`;

function sendJson(res, statusCode, payload) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(payload));
}

async function readJsonBody(req) {
  if (req.body) {
    return typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  }

  const chunks = [];

  for await (const chunk of req) {
    chunks.push(chunk);
  }

  const rawBody = Buffer.concat(chunks).toString('utf8');
  return rawBody ? JSON.parse(rawBody) : {};
}

function normalizeMessages(messages) {
  if (!Array.isArray(messages)) {
    return [];
  }

  return messages
    .filter((message) => message && typeof message.content === 'string')
    .slice(-10)
    .map((message) => ({
      role: message.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: message.content.slice(0, 2000) }],
    }));
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    sendJson(res, 405, { error: 'Method not allowed' });
    return;
  }

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    sendJson(res, 500, { error: 'Missing GEMINI_API_KEY environment variable.' });
    return;
  }

  try {
    const body = await readJsonBody(req);
    const contents = normalizeMessages(body.messages);

    if (contents.length === 0) {
      sendJson(res, 400, { error: 'Please send at least one message.' });
      return;
    }

    const model = process.env.GEMINI_MODEL || DEFAULT_MODEL;
    const response = await fetch(`${GEMINI_ENDPOINT}/${model}:generateContent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey,
      },
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: systemInstruction }],
        },
        contents,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 350,
        },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      sendJson(res, response.status, {
        error: data?.error?.message || 'Assistant request failed.',
      });
      return;
    }

    const text = data?.candidates?.[0]?.content?.parts
      ?.map((part) => part.text || '')
      .join('')
      .trim();

    sendJson(res, 200, {
      reply: text || 'I could not generate a response right now. Please try again.',
    });
  } catch (error) {
    sendJson(res, 500, {
      error: error instanceof Error ? error.message : 'Unexpected chat error.',
    });
  }
}
