import { FaBriefcase, FaEnvelope, FaHouse, FaInstagram, FaLinkedinIn, FaPaperPlane } from 'react-icons/fa6';

const socialLinks = [
  {
    label: 'Instagram',
    href: 'https://instagram.com/',
    icon: FaInstagram,
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/',
    icon: FaLinkedinIn,
  },
  {
    label: 'Email',
    href: 'mailto:blitzsolutions.dev@gmail.com',
    icon: FaEnvelope,
  },
];

const quickLinks = [
  { label: 'Home', href: '/#home', icon: FaHouse },
  { label: 'Services', href: '/#services', icon: FaBriefcase },
  { label: 'Contact', href: '/#contact', icon: FaPaperPlane },
];

export default function Footer() {
  return (
    <footer className="bg-zinc-50 border-t border-black/5 rounded-t-3xl mt-8 md:mt-10">
      <div className="px-8 py-10 md:py-12 max-w-screen-2xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 md:gap-10">
          <div className="max-w-md">
            <a href="/#home" className="text-3xl font-black tracking-tighter text-black mb-3 block">
              BLITZ
            </a>
            <p className="text-sm md:text-base text-zinc-600 leading-relaxed tracking-tight">
              Compact digital products, clear execution, and fast-moving support from idea to launch.
            </p>
            <div className="flex flex-wrap items-center gap-3 mt-5">
              {quickLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-black hover:text-white"
                >
                  <Icon size={13} />
                  <span>{label}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-start md:items-end gap-4">
            <a
              href="mailto:blitzsolutions.dev@gmail.com"
              className="text-sm md:text-base font-medium text-zinc-700 hover:text-black transition-colors"
            >
              blitzsolutions.dev@gmail.com
            </a>

            <div className="flex items-center gap-3">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center text-zinc-600 hover:bg-black hover:text-white transition-colors"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>

            <div className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">
              Copyright 2026 Blitz Studio
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
