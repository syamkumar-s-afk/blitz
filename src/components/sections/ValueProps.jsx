export default function ValueProps() {
  return (
    <section className="py-20 md:py-32 px-8 max-w-screen-2xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
       

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
