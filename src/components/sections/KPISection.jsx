const stats = [
  {
    label: "The Velocity",
    value: "10+",
    description: "Digital products engineered from zero to launch.",
  },
  {
    label: "The Impact",
    value: "2000+",
    description: "Active daily users across our client ecosystem.",
  },
];

export default function KPISection() {
  return (
    <section className="bg-primary text-white py-20 md:py-32 grain-texture relative overflow-hidden">
      <div className="absolute top-0 right-0 opacity-10 pointer-events-none translate-x-1/4 -translate-y-1/4">
        <span
          className="material-symbols-outlined text-[30rem]"
          style={{ fontVariationSettings: "'wght' 100" }}
        >
          language
        </span>
      </div>
      <div className="px-8 max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 max-w-3xl mx-auto">
          {stats.map((stat, index) => (
            <div key={index} className="space-y-4">
              <span className="text-[0.6875rem] font-bold uppercase tracking-[0.3em] text-outline-variant">
                {stat.label}
              </span>
              <h2 className="text-7xl font-black tracking-tighter">
                {stat.value}
              </h2>
              <p className="text-xl text-outline-variant">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
