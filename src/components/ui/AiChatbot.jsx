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

export default function AiChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(starterMessages);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState('');
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      scrollRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, messages]);

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
