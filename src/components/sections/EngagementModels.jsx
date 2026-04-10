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
    <section className="bg-surface-container py-32 px-8">
      <div className="max-w-screen-2xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-xl">
            <h2 className="text-4xl font-black uppercase tracking-tight mb-6">Engagement Models</h2>
            <p className="text-lg text-zinc-600">Flexible partnership structures tailored to the scope and velocity of your vision.</p>
          </div>
          <div className="text-[0.6875rem] font-black uppercase tracking-[0.2em] border-l-2 border-black pl-4">How we work</div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {engagementModels.map((model, index) => (
            <div key={index} className="bg-surface-container-lowest p-12 rounded-xl border border-outline/10 flex flex-col justify-between">
              <div>
                <h4 className="text-xl font-bold uppercase mb-4 tracking-tight">{model.title}</h4>
                <p className="text-zinc-500 mb-10 leading-relaxed">{model.description}</p>
              </div>
              <ul className="space-y-4">
                {model.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-4 text-sm font-bold uppercase">
                    <span className="material-symbols-outlined text-xl">check_circle</span> {feature}
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
