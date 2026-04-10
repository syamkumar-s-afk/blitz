const teamMembers = [
  {
    name: 'Marcus Thorne',
    role: 'Founding Partner',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBcut7qF_l1x9q1nu8RO4iu6E0Y_xEPV8clnQ4a8jjqyD67yBbKgO3M0WQmrva0f6eVfXY-46Edu4bFnYNFKulAd9pEDuwy1q9bVi7OaRIX2i3RnlIwuIqqpv23AyrmzzJ7zWSsxxS5tDYTwmJywhPIbN4sqv734jQ4IGLCmRjtGXeFIPBZFVLLBlsRP8Siod6GR8yfvM3k1ZLk6uYv97px6pt3jfQiQawxALXVdWn6NWB7ezWqP460L7cJiTi2u1wbZrTSWg1yDTg'
  },
  {
    name: 'Elena Vance',
    role: 'Head of Engineering',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAYMGHacifWLl5PxxZJ-Ia_7SboFJvoDrrXX8a1ln6Ljbl552EvJA8yRctNXUgQ92nQVowOBXjlzHH9WuhC4F__PDkCiVflpLuaWcR4dQ4w7h1c-IwUyumbkIyYYWbXMWE8c-7-2bwd95CRQO1Oj4W5YHxfq199emUnpJvJpT2n3i5QbSjWED7rVTW2X93FsQb0gkbHHvskJWkTOiZMMzEc45QTK15ap9BDEEMLbpKJ9k8V5P4zVZ1_XWkAlzHix4yco6fzK225mEg'
  },
  {
    name: 'Julian Baek',
    role: 'Design Director',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDEW4zYR_hc49N93jZ8BsTzLZuB5ZuS1dOKvOQI7gnZyIz7SWJWNX1p_JFeDowaptRJ9Syqr8uZpi5RRT1iKbT7oE7c_QOcyEzDsRSp89QeHEelrrYFjux5lavmavIImFahj7JJ_PUgT5v897uqR92_enoDQ8jf2R9DO7yqWyatTS1gbi-sorFs9QpZMEBpMsp4tCbVME6amKV135Q5UD-0eBlGqS05XYb1tWsZrW57-xTO1y6PS7C-Y4bp87mMKXsLQ-rpszCpCBQ'
  },
  {
    name: 'Sonia Park',
    role: 'Strategy Lead',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDH52QejGmo5uxPoy643yvVJAGPRe_Fb0_YyNvNsRi3zyP1UWWpUb0RrITysfvRfvC3qzitKjikSIhZAw34V5He60mokq2luXL2Ewffmn7WgmNJ9JpiiqiFmKrakVQnK_TzCY40sQlKH4gqn6Ui5NfZT9sDeW3VLrfsaQEABM7cQAhTL077vhlBLxOep_1kVe4GxiNen12XifzaJ7lIYgRWZ6PrkScv3u2WJDC1fvj6pk-xN9DQzr2KMUFLUZXRT4VZT6U73m_6ayo'
  }
];

const values = [
  { icon: 'precision_manufacturing', title: 'Crafted with Precision', description: 'Pixel-perfect execution where every line of code serves a strategic purpose.' },
  { icon: 'speed', title: 'Built for Scale', description: 'Architectures designed to grow from MVP to global infrastructure without friction.' },
  { icon: 'palette', title: 'Creative Integrity', description: 'We believe functional tools should be objects of beauty and joy.' },
  { icon: 'all_inclusive', title: 'Continuous Evolution', description: 'The landscape shifts daily; our engineering mindset is perpetually adaptive.' }
];

const milestones = [
  { year: '2018', title: 'Inception', description: "Blitz Studio is established in a small warehouse in East London with a team of three and a vision for 'Technical Craft'." },
  { year: '2020', title: 'The Pivot to Scale', description: 'Launched our first enterprise-grade fintech platform, proving that editorial design could thrive in complex regulated environments.' },
  { year: '2022', title: 'Global Expansion', description: 'Opened our New York hub and expanded the team to 25 specialists across design, dev-ops, and AI strategy.' },
  { year: '2024', title: 'The AI Paradigm', description: 'Integrating generative intelligence into our core architectural design workflow, redefining speed-to-market for our partners.' }
];

const processSteps = [
  { number: '01', title: 'Discovery & Audit', description: 'We peel back the layers of your business to find the hidden friction points and untapped opportunities.', icon: 'search', variant: 'light' },
  { number: '02', title: 'Architectural Design', description: "Drafting the blueprints of a scalable ecosystem. This isn't just UX; it's structural integrity for the digital age.", icon: 'architecture', variant: 'gradient' },
  { number: '03', title: 'Rapid Engineering', description: 'Moving from prototype to production with zero compromise. We ship clean, documented, and resilient codebases.', icon: 'terminal', variant: 'dark' },
  { number: '04', title: 'Continuous Evolution', description: 'Launch is just the beginning. We optimize, iterate, and protect your digital assets as they grow.', icon: 'auto_awesome', variant: 'light' }
];

export default function About() {
  return (
    <div id="about" className="scroll-mt-24">
      {/* Brand Story Hero */}
      <section className="px-8 max-w-screen-2xl mx-auto mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-8">
            <span className="text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-outline mb-6 block">Our Genesis</span>
            <h1 className="text-[3.5rem] font-extrabold tracking-[-0.04em] leading-[1] mb-8 lg:mb-0">
              The Alchemy of <br/>
              <span className="text-secondary">Code & Design.</span>
            </h1>
          </div>
          <div className="lg:col-span-4">
            <p className="text-lg leading-relaxed text-on-surface-variant mb-4">
              We don't just build software; we engineer digital legacies. Founded on the principle that technical precision and creative soul are not mutually exclusive, Blitz bridges the gap between the mechanical and the aesthetic.
            </p>
            <div className="flex items-center gap-2 text-primary font-bold tracking-tight">
              <span>EST. 2018</span>
              <span className="material-symbols-outlined text-sm">asterisk</span>
              <span>LONDON / NEW YORK</span>
            </div>
          </div>
        </div>
        <div className="mt-20 w-full h-[614px] rounded-xl overflow-hidden relative border border-outline/20">
          <img 
            className="w-full h-full object-cover grayscale brightness-95" 
            alt="Modern office interior"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAETXgvRcIMLewTFzjnKlCDGUBP8Yh4YdkafTVT49uV5fkzf1D3uUmK86PVOW4RcjAGV6GPusjVXiLgG3QKD-spU9NR3HUkAfEiVO4TI6eLnS59IlVm4zKixxmxlmRIyLhNJF5GYXLRsHpT6lHlKFafCyIO9Vx3SQRiJOz13qYScbBIjHwSAlK_Dq54-UcifZpi115495AGgr6IhADGzqtJORIBHt2kXVhGDurAMnyDIEBXzqtgwfEONtPPdj2GbJ9B-op74S4u1Wk"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
        </div>
      </section>

      {/* Mission and Values */}
      <section className="px-8 max-w-screen-2xl mx-auto mb-40">
        <div className="mb-16">
          <h2 className="text-[1.75rem] font-bold tracking-tight mb-2">Core Philosophy</h2>
          <div className="w-12 h-1 bg-primary"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {values.map((value, index) => (
            <div key={index} className="p-8 bg-surface-container-low border border-outline-variant/30 rounded-xl flex flex-col justify-between aspect-square group hover:bg-black hover:text-white transition-all duration-500">
              <span className="material-symbols-outlined text-4xl group-hover:text-secondary-fixed transition-colors">{value.icon}</span>
              <div>
                <h3 className="text-base font-semibold mb-2">{value.title}</h3>
                <p className="text-sm opacity-70">{value.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-surface-container py-32 mb-40">
        <div className="px-8 max-w-screen-2xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <h2 className="text-[3.5rem] font-extrabold tracking-[-0.04em] leading-tight">The Minds Behind <br/>the Machine.</h2>
            <p className="max-w-md text-on-surface-variant">A curated collective of engineers, designers, and strategists obsessed with the details most people ignore.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <div key={index} className="group">
                <div className="relative aspect-[4/5] rounded-xl overflow-hidden mb-4 border border-outline-variant">
                  <img 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
                    alt={member.name}
                    src={member.image}
                  />
                  <div className="absolute inset-0 bg-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <h4 className="font-bold uppercase tracking-tight">{member.name}</h4>
                <p className="text-[0.6875rem] font-bold text-outline uppercase tracking-widest">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Philosophy (Bento) */}
      <section className="px-8 max-w-screen-2xl mx-auto mb-40">
        <div className="mb-16 flex justify-between items-baseline border-b border-black/5 pb-8">
          <h2 className="text-[1.75rem] font-bold tracking-tight">Process Philosophy</h2>
          <span className="text-outline text-[0.6875rem] font-bold uppercase tracking-widest">METHODOLOGY 1.0</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
          {/* Step 1 */}
          <div className="md:col-span-3 lg:col-span-2 p-10 bg-white border border-outline-variant/30 rounded-xl relative overflow-hidden group">
            <div className="relative z-10">
              <span className="text-4xl font-black text-secondary/20 mb-6 block">01</span>
              <h3 className="text-xl font-bold mb-4">Discovery & Audit</h3>
              <p className="text-on-surface-variant text-sm">We peel back the layers of your business to find the hidden friction points and untapped opportunities.</p>
            </div>
            <div className="absolute -bottom-8 -right-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <span className="material-symbols-outlined text-[8rem]">search</span>
            </div>
          </div>
          
          {/* Step 2 */}
          <div className="md:col-span-3 lg:col-span-4 p-10 grainy-gradient-about rounded-xl border border-black/5 flex items-center justify-between group">
            <div className="max-w-md">
              <span className="text-4xl font-black text-secondary/40 mb-6 block">02</span>
              <h3 className="text-2xl font-bold mb-4">Architectural Design</h3>
              <p className="text-secondary/80 text-base font-medium">Drafting the blueprints of a scalable ecosystem. This isn't just UX; it's structural integrity for the digital age.</p>
            </div>
            <div className="hidden lg:block">
              <span className="material-symbols-outlined text-[10rem] text-secondary/20 font-thin">architecture</span>
            </div>
          </div>
          
          {/* Step 3 */}
          <div className="md:col-span-4 p-10 bg-black text-white rounded-xl flex items-center gap-12 group">
            <div className="hidden md:block">
              <div className="w-32 h-32 border border-white/20 rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined text-5xl">terminal</span>
              </div>
            </div>
            <div>
              <span className="text-4xl font-black text-white/20 mb-6 block">03</span>
              <h3 className="text-2xl font-bold mb-4">Rapid Engineering</h3>
              <p className="text-white/60 text-base">Moving from prototype to production with zero compromise. We ship clean, documented, and resilient codebases.</p>
            </div>
          </div>
          
          {/* Step 4 */}
          <div className="md:col-span-2 p-10 bg-white border border-outline-variant/30 rounded-xl group relative overflow-hidden">
            <div className="relative z-10">
              <span className="text-4xl font-black text-secondary/20 mb-6 block">04</span>
              <h3 className="text-xl font-bold mb-4">Continuous Evolution</h3>
              <p className="text-on-surface-variant text-sm">Launch is just the beginning. We optimize, iterate, and protect your digital assets as they grow.</p>
            </div>
            <div className="absolute -top-10 -right-10 opacity-5 group-hover:opacity-10 transition-opacity">
              <span className="material-symbols-outlined text-[10rem]">auto_awesome</span>
            </div>
          </div>
        </div>
      </section>

      {/* Milestones / Timeline */}
      <section className="px-8 max-w-screen-2xl mx-auto mb-40">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          <div className="lg:col-span-4">
            <h2 className="text-4xl font-black tracking-tighter uppercase mb-6">Our Journey <br/>So Far.</h2>
            <p className="text-on-surface-variant">Defining moments that shaped our trajectory from a small London studio to an international tech partner.</p>
          </div>
          <div className="lg:col-span-8 space-y-12">
            {milestones.map((milestone, index) => (
              <div key={index} className={`flex gap-10 group ${index < milestones.length - 1 ? 'border-b border-black/5 pb-10' : ''}`}>
                <div className="text-3xl font-black tracking-tighter text-outline group-hover:text-black transition-colors">{milestone.year}</div>
                <div className="flex-1">
                  <h4 className="text-xl font-bold mb-2">{milestone.title}</h4>
                  <p className="text-on-surface-variant leading-relaxed">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
