import { useState } from 'react';

const faqs = [
  {
    question: 'How long does a typical project take?',
    answer:
      'Most focused launches take 6 to 12 weeks. Larger platforms usually start with a discovery sprint and then move into phased delivery so scope stays realistic.',
  },
  {
    question: 'Do you provide ongoing support?',
    answer:
      'Yes. We can stay on after launch for maintenance, product iteration, analytics review, and roadmap support depending on how hands-on you want the partnership to be.',
  },
  {
    question: 'Can we start with a discovery phase?',
    answer:
      'Absolutely. Discovery is often the best starting point when priorities are still forming or when you need help turning a rough idea into a practical execution plan.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="px-8 max-w-4xl mx-auto py-20 md:py-32 border-t border-outline/10">
      <h2 className="text-4xl font-black uppercase mb-10 md:mb-16 tracking-tighter">Frequently Asked</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <div key={faq.question} className="rounded-2xl border border-black/10 bg-white/70 backdrop-blur-sm">
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
                className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left"
                aria-expanded={isOpen}
              >
                <h4 className="text-xl font-bold uppercase tracking-tight">{faq.question}</h4>
                <span
                  className={`material-symbols-outlined transition-transform ${isOpen ? 'rotate-45' : ''}`}
                >
                  add
                </span>
              </button>
              {isOpen && (
                <div className="px-6 pb-6 text-zinc-600 leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
