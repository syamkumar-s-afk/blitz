const faqs = [
  {
    question: 'How long does a typical project take?',
    answer: 'Project timelines vary based on complexity. A typical MVP ranges from 8 to 14 weeks. Enterprise solutions can span 6 to 12 months with phased releases.'
  },
  {
    question: 'Do you provide ongoing support?',
    answer: null
  },
  {
    question: 'Can we start with a discovery phase?',
    answer: null
  }
];

export default function FAQ() {
  return (
    <section className="px-8 max-w-4xl mx-auto py-32 border-t border-outline/10">
      <h2 className="text-4xl font-black uppercase mb-16 tracking-tighter">Frequently Asked</h2>
      <div className="space-y-8">
        {faqs.map((faq, index) => (
          <div key={index} className="group cursor-pointer">
            <div className="flex justify-between items-center py-4 border-b border-black/10 group-hover:border-black transition-colors">
              <h4 className="text-xl font-bold uppercase tracking-tight">{faq.question}</h4>
              <span className="material-symbols-outlined group-hover:rotate-45 transition-transform">add</span>
            </div>
            {faq.answer && (
              <div className="hidden pt-6 text-zinc-600 leading-relaxed">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
