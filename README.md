# BLITZ Web App (React + Vite)

## Prerequisites
- Node.js 20+
- npm 10+

## Install
```bash
npm install
```

If PowerShell blocks `npm` scripts, use:
```bash
npm.cmd install
```

## Run (Real-Time Updates / HMR)
```bash
npm run dev
```

PowerShell alternative:
```bash
npm.cmd run dev
```

The app runs on:
- `http://localhost:5173`

Vite HMR is enabled, so saving files in `src/` updates the app instantly in the browser.

## Gemini Chatbot
Create a local `.env` file and add your Gemini API key:
```bash
GEMINI_API_KEY=your_gemini_api_key_here
```

The chatbot API uses `gemini-2.5-flash` by default. To override it, add:
```bash
GEMINI_MODEL=gemini-2.5-flash
```

For deployment, add the same environment variables in Vercel project settings.

## Lead Capture
The chatbot can submit qualified lead snapshots in the background to a webhook. Use a
Google Apps Script web app to write the data to Google Sheets and send email alerts.

Add this variable locally and in Vercel:
```bash
LEAD_WEBHOOK_URL=https://script.google.com/macros/s/your_script_id/exec
```

The webhook receives:
- `capturedAt`
- `leadStatus`
- `priority`
- `sessionId`
- `source`
- `pageUrl`
- `pageTitle`
- `visitorName`
- `businessName`
- `phoneOrWhatsapp`
- `email`
- `serviceInterest`
- `projectRequirement`
- `timeline`
- `budgetRange`
- `location`
- `preferredContactMethod`
- `visitorBrief`
- `transcript`
- `lastVisitorMessage`
- `followUpNotes`
- `assignedTo`
- `visitorMessages`

If `LEAD_WEBHOOK_URL` is not set, chat still works and lead capture is skipped safely.

## Other Scripts
```bash
npm run build
npm run preview
npm run lint
```
