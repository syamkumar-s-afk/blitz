export default function Testimonials() {
  return (
    <section className="py-32 border-b border-outline-variant/20 overflow-hidden">
      <div className="px-8 max-w-screen-2xl mx-auto flex flex-col md:flex-row gap-20 items-center">
        <div className="w-full md:w-1/3">
          <span className="material-symbols-outlined text-5xl text-primary mb-6">format_quote</span>
          <h2 className="text-4xl font-extrabold tracking-tighter">Words from the front line.</h2>
        </div>
        <div className="w-full md:w-2/3 border-l border-primary/20 pl-12 py-4">
          <blockquote className="text-3xl font-medium tracking-tight italic mb-8">
            "Blitz didn't just design an app; they architected a new category for our brand. Their Swiss-level precision is unmatched in the industry."
          </blockquote>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-surface-container overflow-hidden">
              <img 
                alt="Marcus Chen" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCoA8B0UgistB-XmD8hkjmZIxEluzaaCDOGSmGY-qhn8w10FZC7_hH7x1ncwxVYZRbENfG6NVInC-6zY63Z8N3dxg3f3oGNce6KQrUHFilh4Fx_q0CEC5_zqK3upLlwM0NUV3ofp_MM-noYUxU7qjURuT9sp943BUkmT7avU_CIn_TAy405s2H8ZceaTsEZFVprmATWIx-GxzLrv69A7cww96PWtPI21Qilm2DXG0BJfqqZ8LO7X22-wnPEUA_gFZmJp3YI1bk90io"
              />
            </div>
            <div>
              <p className="font-bold text-sm tracking-tighter">MARCUS CHEN</p>
              <p className="text-[0.6875rem] uppercase text-outline">CTO, AETHER SYSTEMS</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
