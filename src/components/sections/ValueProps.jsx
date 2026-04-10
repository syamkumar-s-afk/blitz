export default function ValueProps() {
  return (
    <section className="py-32 px-8 max-w-screen-2xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Technical Rigor Card */}
        <div className="md:col-span-7 bg-surface-container-low p-12 rounded-3xl border border-outline-variant/20 flex flex-col justify-between min-h-[400px]">
          <span className="material-symbols-outlined text-4xl text-primary">architecture</span>
          <div className="space-y-4">
            <h3 className="text-3xl font-bold tracking-tight">Technical Rigor</h3>
            <p className="text-lg text-on-surface-variant max-w-md">
              Our engineering process is rooted in architectural precision, ensuring every line of code serves a strategic purpose in your growth.
            </p>
          </div>
        </div>

        {/* Velocity Focused Card */}
        <div className="md:col-span-5 bg-primary text-white p-12 rounded-3xl flex flex-col justify-between min-h-[400px]">
          <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
          <div className="space-y-4">
            <h3 className="text-3xl font-bold tracking-tight">Velocity Focused</h3>
            <p className="text-lg opacity-80">
              We eliminate the friction between concept and deployment. Fast iterations without compromising structural integrity.
            </p>
          </div>
        </div>

        {/* Modular Mindset Card */}
        <div className="md:col-span-12 bg-surface-container-highest p-12 rounded-3xl border border-outline-variant/20 flex items-center justify-between gap-12 group">
          <div className="space-y-4">
            <h3 className="text-3xl font-bold tracking-tight">The Modular Mindset</h3>
            <p className="text-lg text-on-surface-variant max-w-xl">
              Scalability isn't a feature; it's a foundation. We build modular systems that evolve as your user base expands into the millions.
            </p>
          </div>
          <div className="hidden md:block w-40 h-40 grainy-gradient rounded-full border border-primary/10 group-hover:scale-110 transition-transform duration-500"></div>
        </div>
      </div>
    </section>
  );
}
