const engagementModels = [
  {
    title: 'Fixed-Price Project',
    description: 'Best for clearly defined requirements. We provide a guaranteed budget and timeline, taking full accountability for the delivery within the agreed scope.',
    features: ['Fixed Budget', 'Defined Timeline', 'Managed Delivery']
  },
  {
    title: 'Time & Materials',
    description: 'Ideal for agile projects with evolving requirements. Pay for the hours logged by a dedicated team of experts moving at high velocity.',
    features: ['Flexible Scope', 'Full Transparency', 'Agile Velocity']
  }
];

export default function EngagementModels() {
  return (
    <section className="bg-surface-container py-10 sm:py-12 md:py-32 px-4 sm:px-5 md:px-8">
      <div className="max-w-screen-2xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-7 sm:mb-8 md:mb-20 gap-4 sm:gap-5 md:gap-8">
          <div className="max-w-xl">
            <h2 className="text-[1.9rem] leading-[0.95] sm:text-3xl md:text-4xl font-black uppercase tracking-tight mb-3 sm:mb-4 md:mb-6">
              Engagement Models
            </h2>
            <p className="text-[0.92rem] leading-6 sm:text-base md:text-lg text-zinc-600">
              Flexible partnership structures tailored to the scope and velocity of your vision.
            </p>
          </div>
          <div className="text-[0.6rem] sm:text-[0.6875rem] font-black uppercase tracking-[0.16em] sm:tracking-[0.2em] border-l-2 border-black pl-3 sm:pl-4">
            How we work
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-12">
          {engagementModels.map((model, index) => (
            <div
              key={index}
              className="bg-surface-container-lowest p-5 sm:p-6 md:p-12 rounded-[1rem] md:rounded-xl border border-outline/10 flex flex-col justify-between"
            >
              <div>
                <h4 className="text-[1rem] leading-[1.1] sm:text-[1.1rem] md:text-xl font-bold uppercase mb-2.5 sm:mb-3 md:mb-4 tracking-tight">
                  {model.title}
                </h4>
                <p className="text-[0.84rem] leading-5 sm:text-sm md:text-base text-zinc-500 mb-5 sm:mb-6 md:mb-10">
                  {model.description}
                </p>
              </div>
              <ul className="space-y-2.5 sm:space-y-3 md:space-y-4">
                {model.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2.5 sm:gap-3 md:gap-4 text-[0.72rem] leading-5 sm:text-[0.8rem] md:text-sm font-bold uppercase">
                    <span className="material-symbols-outlined text-[1rem] sm:text-[1.1rem] md:text-xl">check_circle</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
