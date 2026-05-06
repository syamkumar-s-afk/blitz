const principles = [
  {
    icon: 'precision_manufacturing',
    title: 'Clear thinking',
    description: 'We narrow scope early so the product has a stronger chance of shipping well.',
  },
  {
    icon: 'speed',
    title: 'Useful speed',
    description: 'Fast work matters only when the decisions underneath it are solid and reversible.',
  },
  {
    icon: 'palette',
    title: 'Design with purpose',
    description: 'We care about aesthetics, but only when they improve comprehension, trust, and use.',
  },
  {
    icon: 'all_inclusive',
    title: 'Long-term maintainability',
    description: 'We aim for systems teams can operate, extend, and hand over without drama.',
  },
];

const processSteps = [
  {
    number: '01',
    title: 'Discovery and alignment',
    description: 'We clarify goals, constraints, audience, and priorities before committing to a build plan.',
  },
  {
    number: '02',
    title: 'System and interface design',
    description: 'We map the product structure, the key user flows, and the technical shape of the build.',
  },
  {
    number: '03',
    title: 'Build and review',
    description: 'We implement in small, visible steps so quality issues and scope drift are caught early.',
  },
  {
    number: '04',
    title: 'Launch and iterate',
    description: 'After release, we refine based on usage, feedback, and the next business priority.',
  },
];

const workingStyle = [
  'Lean team, direct communication, fewer layers',
  'Product, design, and engineering decisions made together',
  'Best fit for founders and teams that value speed with discipline',
];

export default function About() {
  return (
    <div id="about" className="scroll-mt-24">
      <section className="px-8 max-w-screen-2xl mx-auto mb-20 md:mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-8">
            <span className="text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-outline mb-6 block">
              About Blitz
            </span>
            <h1 className="text-[3.5rem] font-extrabold tracking-[-0.04em] leading-[1] mb-8 lg:mb-0">
              Product work with
              <br />
              <span className="text-secondary">less noise, more clarity.</span>
            </h1>
          </div>
          <div className="lg:col-span-4">
            <p className="text-lg leading-relaxed text-on-surface-variant mb-4">
              Blitz is a small product-focused studio for teams that want direct collaboration
              across strategy, design, and engineering. The goal is not to sound bigger than we
              are. The goal is to do sharp work and communicate clearly.
            </p>
            <div className="flex items-center gap-2 text-primary font-bold tracking-tight">
              <span>REMOTE-FIRST</span>
              <span className="material-symbols-outlined text-sm">asterisk</span>
              <span>GLOBAL COLLABORATION</span>
            </div>
          </div>
        </div>
        <div className="mt-12 md:mt-20 rounded-xl overflow-hidden relative border border-outline/20 p-8 md:p-16 grainy-gradient-about min-h-[320px] md:min-h-[420px] flex items-end">
          <div className="max-w-2xl relative z-10">
            <p className="text-[0.6875rem] font-bold uppercase tracking-[0.3em] text-secondary mb-6">
              How We Work
            </p>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-6 text-primary">
              Small enough to move fast.
              <br />
              Senior enough to stay calm.
            </h2>
            <p className="text-lg leading-relaxed text-on-surface-variant">
              We prefer practical planning, visible progress, and systems that remain understandable
              after the first launch.
            </p>
          </div>
        </div>
      </section>

      <section className="px-8 max-w-screen-2xl mx-auto mb-20 md:mb-40">
        <div className="mb-10 md:mb-16">
          <h2 className="text-[1.75rem] font-bold tracking-tight mb-2">Core Principles</h2>
          <div className="w-12 h-1 bg-primary"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {principles.map((value) => (
            <div
              key={value.title}
              className="p-8 bg-surface-container-low border border-outline-variant/30 rounded-xl flex flex-col justify-between aspect-square group hover:bg-black hover:text-white transition-all duration-500"
            >
              <span className="material-symbols-outlined text-4xl group-hover:text-secondary-fixed transition-colors">
                {value.icon}
              </span>
              <div>
                <h3 className="text-base font-semibold mb-2">{value.title}</h3>
                <p className="text-sm opacity-70">{value.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-surface-container py-20 md:py-32 mb-20 md:mb-40">
        <div className="px-8 max-w-screen-2xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-20 gap-8">
            <h2 className="text-[3.5rem] font-extrabold tracking-[-0.04em] leading-tight">
              Working style,
              <br />
              not mythology.
            </h2>
            <p className="max-w-md text-on-surface-variant">
              Instead of invented biographies and inflated milestones, this section shows the kind
              of partnership teams can actually expect.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {workingStyle.map((item) => (
              <div
                key={item}
                className="rounded-xl border border-outline-variant/30 bg-white p-8 min-h-[220px] flex items-end"
              >
                <p className="text-2xl font-bold tracking-tight">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-8 max-w-screen-2xl mx-auto mb-20 md:mb-40">
        <div className="mb-10 md:mb-16 flex justify-between items-baseline border-b border-black/5 pb-6 md:pb-8">
          <h2 className="text-[1.75rem] font-bold tracking-tight">Process</h2>
          <span className="text-outline text-[0.6875rem] font-bold uppercase tracking-widest">
            DELIVERY MODEL
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
          <div className="md:col-span-3 lg:col-span-2 p-10 bg-white border border-outline-variant/30 rounded-xl relative overflow-hidden group">
            <div className="relative z-10">
              <span className="text-4xl font-black text-secondary/20 mb-6 block">
                {processSteps[0].number}
              </span>
              <h3 className="text-xl font-bold mb-4">{processSteps[0].title}</h3>
              <p className="text-on-surface-variant text-sm">{processSteps[0].description}</p>
            </div>
            <div className="absolute -bottom-8 -right-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <span className="material-symbols-outlined text-[8rem]">search</span>
            </div>
          </div>

          <div className="md:col-span-3 lg:col-span-4 p-10 grainy-gradient-about rounded-xl border border-black/5 flex items-center justify-between group">
            <div className="max-w-md">
              <span className="text-4xl font-black text-secondary/40 mb-6 block">
                {processSteps[1].number}
              </span>
              <h3 className="text-2xl font-bold mb-4">{processSteps[1].title}</h3>
              <p className="text-secondary/80 text-base font-medium">{processSteps[1].description}</p>
            </div>
            <div className="hidden lg:block">
              <span className="material-symbols-outlined text-[10rem] text-secondary/20 font-thin">
                architecture
              </span>
            </div>
          </div>

          <div className="md:col-span-4 p-10 bg-black text-white rounded-xl flex items-center gap-12 group">
            <div className="hidden md:block">
              <div className="w-32 h-32 border border-white/20 rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined text-5xl">terminal</span>
              </div>
            </div>
            <div>
              <span className="text-4xl font-black text-white/20 mb-6 block">
                {processSteps[2].number}
              </span>
              <h3 className="text-2xl font-bold mb-4">{processSteps[2].title}</h3>
              <p className="text-white/60 text-base">{processSteps[2].description}</p>
            </div>
          </div>

          <div className="md:col-span-2 p-10 bg-white border border-outline-variant/30 rounded-xl group relative overflow-hidden">
            <div className="relative z-10">
              <span className="text-4xl font-black text-secondary/20 mb-6 block">
                {processSteps[3].number}
              </span>
              <h3 className="text-xl font-bold mb-4">{processSteps[3].title}</h3>
              <p className="text-on-surface-variant text-sm">{processSteps[3].description}</p>
            </div>
            <div className="absolute -top-10 -right-10 opacity-5 group-hover:opacity-10 transition-opacity">
              <span className="material-symbols-outlined text-[10rem]">auto_awesome</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
