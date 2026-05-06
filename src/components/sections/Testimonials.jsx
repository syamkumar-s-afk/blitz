export default function Testimonials() {
  return (
    <section className="py-12 md:py-16 border-b border-outline-variant/20 overflow-hidden">
      <div className="px-8 max-w-screen-2xl mx-auto flex flex-col md:flex-row gap-8 md:gap-12 items-start md:items-center">
        <div className="w-full md:w-[30%]">
          <span className="material-symbols-outlined text-4xl text-primary mb-4">format_quote</span>
          <h2 className="text-3xl md:text-[2rem] font-extrabold tracking-tighter">How we aim to show up.</h2>
        </div>
        <div className="w-full md:w-[70%] border-l border-primary/20 pl-6 md:pl-8 py-2">
          <blockquote className="text-xl md:text-2xl font-medium tracking-tight italic mb-6 leading-snug">
            We care about clean thinking, responsive collaboration, and shipping work that still
            feels solid when the deadline pressure is gone.
          </blockquote>
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-surface-container flex items-center justify-center font-black text-sm">
              BLITZ
            </div>
            <div>
              <p className="font-bold text-sm tracking-tighter">BLITZ SOLUTIONS</p>
              <p className="text-[0.6875rem] uppercase text-outline">Product and engineering partner</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
