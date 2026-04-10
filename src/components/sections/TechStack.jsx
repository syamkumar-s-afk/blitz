const technologies = [
  { abbr: 'RE', name: 'React' },
  { abbr: 'FL', name: 'Flutter' },
  { abbr: 'PY', name: 'Python' },
  { abbr: 'AW', name: 'AWS' },
  { abbr: 'GO', name: 'Golang' },
  { abbr: 'TS', name: 'TypeScript' }
];

export default function TechStack() {
  return (
    <section className="px-8 max-w-screen-2xl mx-auto py-32">
      <h2 className="text-[0.6875rem] font-black uppercase tracking-[0.3em] mb-16 text-center">
        Engineered with Precision
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-12 gap-y-16">
        {technologies.map((tech, index) => (
          <div key={index} className="flex flex-col items-center gap-4 opacity-40 hover:opacity-100 transition-opacity">
            <div className="w-12 h-12 bg-zinc-200 rounded-lg flex items-center justify-center font-black">
              {tech.abbr}
            </div>
            <span className="text-[0.6875rem] font-bold uppercase tracking-widest">{tech.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
