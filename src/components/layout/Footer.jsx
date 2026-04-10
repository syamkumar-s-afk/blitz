export default function Footer() {
  return (
    <footer className="bg-zinc-50 border-t border-black/5 rounded-t-3xl mt-20">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 px-8 py-20 max-w-screen-2xl mx-auto">
        <div className="md:col-span-2">
          <a href="#home" className="text-4xl font-black tracking-tighter text-black mb-8 block">BLITZ</a>
          <p className="text-zinc-600 max-w-sm font-inter text-base tracking-tight mb-8">
            An editorial software studio. Crafting digital futures through structural precision and
            high-fidelity engineering.
          </p>
          <div className="flex gap-4">
            <span className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center hover:bg-black hover:text-white transition-colors cursor-pointer">𝕏</span>
            <span className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center hover:bg-black hover:text-white transition-colors cursor-pointer">in</span>
            <span className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center hover:bg-black hover:text-white transition-colors cursor-pointer">ig</span>
          </div>
        </div>
        <div>
          <h6 className="font-black text-xs uppercase tracking-[0.2em] mb-8 text-zinc-400">Navigation</h6>
          <ul className="space-y-4 font-inter text-base tracking-tight">
            <li><a className="text-black font-bold hover:underline decoration-1 underline-offset-4" href="#services">Services</a></li>
            <li><a className="text-zinc-600 hover:underline decoration-1 underline-offset-4" href="#projects">Projects</a></li>
            <li><a className="text-zinc-600 hover:underline decoration-1 underline-offset-4" href="#about">About</a></li>
            <li><a className="text-zinc-600 hover:underline decoration-1 underline-offset-4" href="#contact">Contact</a></li>
          </ul>
        </div>
        <div>
          <h6 className="font-black text-xs uppercase tracking-[0.2em] mb-8 text-zinc-400">Legal</h6>
          <ul className="space-y-4 font-inter text-base tracking-tight">
            <li><a className="text-zinc-600 hover:underline decoration-1 underline-offset-4" href="#">Privacy</a></li>
            <li><a className="text-zinc-600 hover:underline decoration-1 underline-offset-4" href="#">Terms</a></li>
          </ul>
          <div className="mt-12 text-zinc-500 text-xs">
            © 2024 BLITZ STUDIO. ALL RIGHTS RESERVED.
          </div>
        </div>
      </div>
    </footer>
  );
}
