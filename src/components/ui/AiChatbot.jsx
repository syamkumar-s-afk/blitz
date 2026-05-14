import { useEffect, useRef, useState } from 'react';
import { Bot, Loader2, MessageCircle, Send, X } from 'lucide-react';

const starterMessages = [
  {
    role: 'assistant',
    content: 'Hi, I am Blitz Assistant. Tell me what you want to build, and I will help you choose the right next step.',
  },
];

const quickPrompts = [
  'I need a mobile app',
  'Build an e-commerce site',
  'Automate my business',
];

const servicePatterns = [
  ['Mobile App', /\b(app|android|ios|mobile)\b/i],
  ['E-Commerce', /\b(e-?commerce|online store|shopify|store|marketplace)\b/i],
  ['Custom Software', /\b(custom software|software|crm|erp|portal|system)\b/i],
  ['Dashboard', /\b(dashboard|analytics|admin panel|reporting)\b/i],
  ['AI Automation', /\b(ai|automation|chatbot|automate)\b/i],
  ['Business Website', /\b(website|site|web page)\b/i],
  ['Landing Page', /\b(landing page|landing)\b/i],
];

function getLeadSessionId() {
  const storageKey = 'blitz-chat-lead-session';
  const existingId = window.sessionStorage.getItem(storageKey);

  if (existingId) {
    return existingId;
  }

  const nextId = `lead-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
  window.sessionStorage.setItem(storageKey, nextId);
  return nextId;
}

function shouldSubmitLead(messages) {
  const conversationMessages = messages.filter((message, index) => index > 0 && message.content);
  const visitorMessages = conversationMessages
    .filter((message) => message.role === 'user')
    .map((message) => message.content.trim());
  const combinedVisitorText = visitorMessages.join(' ');
  const hasContactSignal = /(?:\+?\d[\d\s-]{7,}|@|whats?app|call|phone|mobile)/i.test(combinedVisitorText);
  const hasProjectSignal = /(app|website|e-?commerce|software|dashboard|automation|landing|business|project|build|need)/i.test(combinedVisitorText);

  return visitorMessages.length >= 2 || (visitorMessages.length >= 1 && hasContactSignal && hasProjectSignal);
}

function findFirstMatch(text, patterns) {
  const match = patterns.find(([, pattern]) => pattern.test(text));
  return match ? match[0] : '';
}

function extractLeadFields(visitorMessages) {
  const combinedText = visitorMessages.join(' ');
  const phoneMatch = combinedText.match(/(?:\+?91[\s-]?)?[6-9]\d(?:[\s-]?\d){8}/);
  const emailMatch = combinedText.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
  const budgetMatch = combinedText.match(/(?:budget|around|approx|approximately)?\s*(?:rs\.?|inr|₹)?\s*\d[\d,\s]*(?:k|lakh|lakhs|cr|crore)?/i);
  const timelineMatch = combinedText.match(/\b(?:urgent|asap|immediately|this week|next week|this month|next month|within \d+\s*(?:days|weeks|months)|\d+\s*(?:days|weeks|months))\b/i);
  const locationMatch = combinedText.match(/\b(?:from|in|at|near)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+){0,2})\b/);
  const nameMatch = combinedText.match(/\b(?:my name is|i am|i'm)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+){0,2})\b/);
  const businessMatch = combinedText.match(/\b(?:business name is|company name is|my business is|we are)\s+([^.,\n]{2,60})/i);

  return {
    visitorName: nameMatch?.[1] || '',
    businessName: businessMatch?.[1]?.trim() || '',
    phoneOrWhatsapp: phoneMatch?.[0]?.replace(/\s+/g, ' ').trim() || '',
    email: emailMatch?.[0] || '',
    serviceInterest: findFirstMatch(combinedText, servicePatterns),
    projectRequirement: visitorMessages[0] || '',
    timeline: timelineMatch?.[0] || '',
    budgetRange: budgetMatch?.[0]?.trim() || '',
    location: locationMatch?.[1] || '',
    preferredContactMethod: /whats?app/i.test(combinedText)
      ? 'WhatsApp'
      : /email/i.test(combinedText)
        ? 'Email'
        : /call|phone|mobile/i.test(combinedText)
          ? 'Phone'
          : '',
    lastVisitorMessage: visitorMessages[visitorMessages.length - 1] || '',
  };
}

function getLeadPriority(fields, visitorMessages) {
  const combinedText = visitorMessages.join(' ');

  if (fields.phoneOrWhatsapp && /(urgent|asap|immediately|this week|this month)/i.test(combinedText)) {
    return 'Hot';
  }

  if (fields.phoneOrWhatsapp || fields.email || fields.timeline || fields.budgetRange) {
    return 'Warm';
  }

  return 'New';
}

function buildLeadPayload(messages) {
  const conversationMessages = messages.filter((message, index) => index > 0 && message.content);
  const visitorMessages = conversationMessages
    .filter((message) => message.role === 'user')
    .map((message) => message.content.trim());

  const visitorBrief = visitorMessages.length > 0
    ? visitorMessages.map((content, index) => `${index + 1}. ${content}`).join('\n')
    : 'No project details shared yet.';

  const conversation = conversationMessages
    .map((message) => {
      const label = message.role === 'user' ? 'Visitor' : 'Blitz Assistant';
      return `${label}: ${message.content}`;
    })
    .join('\n\n');
  const extractedFields = extractLeadFields(visitorMessages);

  return {
    capturedAt: new Date().toISOString(),
    leadStatus: 'New',
    priority: getLeadPriority(extractedFields, visitorMessages),
    sessionId: getLeadSessionId(),
    source: 'website-chatbot',
    pageUrl: window.location.href,
    pageTitle: document.title,
    visitorName: extractedFields.visitorName,
    businessName: extractedFields.businessName,
    phoneOrWhatsapp: extractedFields.phoneOrWhatsapp,
    email: extractedFields.email,
    serviceInterest: extractedFields.serviceInterest,
    projectRequirement: extractedFields.projectRequirement,
    timeline: extractedFields.timeline,
    budgetRange: extractedFields.budgetRange,
    location: extractedFields.location,
    preferredContactMethod: extractedFields.preferredContactMethod,
    visitorBrief,
    transcript: conversation,
    lastVisitorMessage: extractedFields.lastVisitorMessage,
    followUpNotes: '',
    assignedTo: '',
    visitorMessages,
  };
}

export default function AiChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(starterMessages);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState('');
  const [lastLeadSnapshot, setLastLeadSnapshot] = useState('');
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      scrollRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, messages]);

  useEffect(() => {
    if (!shouldSubmitLead(messages)) {
      return undefined;
    }

    const payload = buildLeadPayload(messages);
    const snapshot = JSON.stringify(payload.visitorMessages);

    if (snapshot === lastLeadSnapshot) {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        keepalive: true,
      }).catch(() => {
        // Lead capture should never interrupt the chat experience.
      });
      setLastLeadSnapshot(snapshot);
    }, 1200);

    return () => {
      window.clearTimeout(timer);
    };
  }, [lastLeadSnapshot, messages]);

  const sendMessage = async (content) => {
    const trimmed = content.trim();

    if (!trimmed || isSending) {
      return;
    }

    const nextMessages = [...messages, { role: 'user', content: trimmed }];
    setMessages(nextMessages);
    setInput('');
    setError('');
    setIsSending(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: nextMessages }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || 'Chat request failed.');
      }

      setMessages((current) => [
        ...current,
        {
          role: 'assistant',
          content: data.reply || 'I could not generate a response right now. Please try again.',
        },
      ]);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Something went wrong.');
      setMessages((current) => [
        ...current,
        {
          role: 'assistant',
          content: 'I am having trouble connecting right now. Please try again in a moment.',
        },
      ]);
    } finally {
      setIsSending(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendMessage(input);
  };

  return (
    <div className="fixed bottom-4 right-4 z-[60] sm:bottom-6 sm:right-6">
      {isOpen && (
        <section
          aria-label="AI chatbot"
          className="mb-3 flex h-[min(680px,calc(100vh-7.5rem))] w-[calc(100vw-2rem)] max-w-[390px] flex-col overflow-hidden rounded-2xl border border-black/10 bg-white shadow-2xl shadow-black/20 sm:w-[390px]"
        >
          <header className="flex items-center justify-between gap-3 border-b border-black/10 bg-black px-4 py-3 text-white">
            <div className="flex items-center gap-3 min-w-0">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white text-black">
                <Bot size={19} aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <h2 className="truncate text-sm font-black uppercase tracking-tight">Blitz Assistant</h2>
                <p className="truncate text-xs font-medium text-white/70">Online now</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-white/80 transition hover:bg-white/10 hover:text-white"
              aria-label="Close chat"
            >
              <X size={18} aria-hidden="true" />
            </button>
          </header>

          <div className="flex-1 overflow-y-auto bg-surface-container-low px-4 py-4">
            <div className="space-y-3">
              {messages.map((message, index) => {
                const isUser = message.role === 'user';

                return (
                  <div key={`${message.role}-${index}`} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                    <div
                      className={`max-w-[82%] rounded-2xl px-4 py-3 text-sm leading-6 ${
                        isUser
                          ? 'rounded-br-md bg-black text-white'
                          : 'rounded-bl-md border border-black/10 bg-white text-black'
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                );
              })}

              {isSending && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-2 rounded-2xl rounded-bl-md border border-black/10 bg-white px-4 py-3 text-sm font-medium text-black/60">
                    <Loader2 className="animate-spin" size={16} aria-hidden="true" />
                    Thinking
                  </div>
                </div>
              )}
              <div ref={scrollRef} />
            </div>
          </div>

          <div className="border-t border-black/10 bg-white p-3">
            {messages.length === starterMessages.length && (
              <div className="mb-3 flex flex-wrap gap-2">
                {quickPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => sendMessage(prompt)}
                    className="rounded-full border border-black/10 px-3 py-1.5 text-xs font-bold text-black/70 transition hover:border-black/30 hover:text-black"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}

            {error && (
              <p className="mb-2 rounded-lg bg-red-50 px-3 py-2 text-xs font-semibold leading-5 text-red-700">
                {error}
              </p>
            )}

            <form onSubmit={handleSubmit} className="flex items-end gap-2">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' && !event.shiftKey) {
                    event.preventDefault();
                    handleSubmit(event);
                  }
                }}
                rows={1}
                placeholder="Ask about your project"
                className="max-h-28 min-h-[44px] flex-1 resize-none rounded-xl border border-black/10 bg-surface px-3 py-2.5 text-sm font-medium text-black placeholder:text-black/35 focus:border-black/30 focus:outline-none focus:ring-2 focus:ring-black/10"
              />
              <button
                type="submit"
                disabled={isSending || !input.trim()}
                className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-black text-white transition hover:bg-primary-fixed disabled:cursor-not-allowed disabled:opacity-45"
                aria-label="Send message"
              >
                {isSending ? <Loader2 className="animate-spin" size={18} aria-hidden="true" /> : <Send size={18} aria-hidden="true" />}
              </button>
            </form>
          </div>
        </section>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="ml-auto flex h-14 w-14 items-center justify-center rounded-full bg-black text-white shadow-xl shadow-black/25 transition hover:scale-105 hover:bg-primary-fixed focus:outline-none focus:ring-4 focus:ring-black/20 active:scale-95"
        aria-label={isOpen ? 'Close AI chat' : 'Open AI chat'}
      >
        {isOpen ? <X size={22} aria-hidden="true" /> : <MessageCircle size={23} aria-hidden="true" />}
      </button>
    </div>
  );
}
