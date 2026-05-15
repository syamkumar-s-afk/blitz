const MAX_FIELD_LENGTH = 5000;

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

function sanitizeText(value) {
  if (typeof value !== 'string') {
    return '';
  }

  return value.trim().slice(0, MAX_FIELD_LENGTH);
}

function normalizeLead(body) {
  return {
    capturedAt: sanitizeText(body.capturedAt || new Date().toISOString()),
    leadStatus: sanitizeText(body.leadStatus || 'New'),
    priority: sanitizeText(body.priority || 'New'),
    sessionId: sanitizeText(body.sessionId),
    source: sanitizeText(body.source || 'website-chatbot'),
    pageUrl: sanitizeText(body.pageUrl),
    pageTitle: sanitizeText(body.pageTitle),
    visitorName: sanitizeText(body.visitorName),
    businessName: sanitizeText(body.businessName),
    phoneOrWhatsapp: sanitizeText(body.phoneOrWhatsapp),
    email: sanitizeText(body.email),
    serviceInterest: sanitizeText(body.serviceInterest),
    projectRequirement: sanitizeText(body.projectRequirement),
    timeline: sanitizeText(body.timeline),
    budgetRange: sanitizeText(body.budgetRange),
    location: sanitizeText(body.location),
    preferredContactMethod: sanitizeText(body.preferredContactMethod),
    visitorBrief: sanitizeText(body.visitorBrief),
    transcript: sanitizeText(body.transcript),
    lastVisitorMessage: sanitizeText(body.lastVisitorMessage),
    followUpNotes: sanitizeText(body.followUpNotes),
    assignedTo: sanitizeText(body.assignedTo),
    visitorMessages: Array.isArray(body.visitorMessages)
      ? body.visitorMessages.map(sanitizeText).filter(Boolean).slice(-12)
      : [],
  };
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    sendJson(res, 405, { error: 'Method not allowed' });
    return;
  }

  try {
    const body = await readJsonBody(req);
    const lead = normalizeLead(body);

    if (!lead.sessionId || lead.visitorMessages.length === 0) {
      sendJson(res, 400, { error: 'Lead details are incomplete.' });
      return;
    }

    const webhookUrl = process.env.LEAD_WEBHOOK_URL;

    if (!webhookUrl) {
      sendJson(res, 202, { saved: false, reason: 'Lead webhook is not configured.' });
      return;
    }

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(lead),
    });

    if (!response.ok) {
      sendJson(res, 502, { error: 'Lead webhook failed.' });
      return;
    }

    sendJson(res, 200, { saved: true });
  } catch (error) {
    sendJson(res, 500, {
      error: error instanceof Error ? error.message : 'Unexpected lead capture error.',
    });
  }
}
