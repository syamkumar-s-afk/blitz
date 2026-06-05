import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#services', label: 'Services' },
  { href: '#projects', label: 'Projects' },
  { href: '#about', label: 'About' },
];

const pageLinks = [
  { href: '/careers', label: 'Careers' },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const currentSection = isHomePage ? activeSection : '';

  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isHomePage) {
      return undefined;
    }

    const sections = navLinks.map((link) => document.querySelector(link.href));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: [0.5], rootMargin: '-80px 0px -50% 0px' }
    );

    sections.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, [isHomePage]);

  const mobileLinks = [
    ...navLinks.map((link) => ({
      ...link,
      href: `/${link.href}`,
      sectionId: link.href.replace('#', ''),
    })),
    ...pageLinks.map((link) => ({
      ...link,
      sectionId: link.href.replace('/', ''),
    })),
    { href: '/#contact', label: 'Contact', sectionId: 'contact' },
  ];

  return (
    <>
      <nav className={`fixed top-0 w-full transition-colors ${isMenuOpen ? 'z-[90] bg-zinc-50 dark:bg-zinc-950' : 'z-50 bg-white/70 backdrop-blur-xl border-b border-black/10'}`}>
        <div className="mx-auto flex max-w-screen-2xl items-center justify-between gap-4 px-5 py-4 sm:px-6 sm:py-5 md:px-8 md:py-6">
          <a href="/#home" className="brand-logo-link brand-logo-nav shrink-0">
            <img
              src="/images/blitz-logo-clean.png"
              alt="Blitz Solutions"
              className="brand-logo-image h-8 w-auto object-contain sm:h-10 md:h-12"
            />
          </a>

          <div className="hidden min-w-0 flex-1 items-center justify-center gap-4 lg:flex lg:gap-7">
            {navLinks.map(({ href, label }) => {
              const sectionId = href.replace('#', '');
              const isActive = currentSection === sectionId;

              return (
                <a
                  key={href}
                  className={`font-inter text-sm font-bold uppercase tracking-tighter transition-colors ${
                    isActive ? 'border-b-2 border-black pb-1 text-black' : 'text-zinc-500 hover:text-black'
                  }`}
                  href={`/${href}`}
                >
                  {label}
                </a>
              );
            })}

            {pageLinks.map(({ href, label }) => {
              const isActive = location.pathname === href;

              return (
                <a
                  key={href}
                  className={`font-inter text-sm font-bold uppercase tracking-tighter transition-colors ${
                    isActive ? 'border-b-2 border-black pb-1 text-black' : 'text-zinc-500 hover:text-black'
                  }`}
                  href={href}
                >
                  {label}
                </a>
              );
            })}
          </div>

          <a href="/#contact" className="hidden shrink-0 rounded-full bg-primary px-5 py-2 font-inter text-sm font-bold uppercase tracking-tighter text-white transition-opacity duration-200 hover:opacity-80 active:scale-95 lg:block">
            Contact us
          </a>

          <button
            type="button"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="relative z-50 text-black lg:hidden"
          >
            <span className="material-symbols-outlined text-3xl">{isMenuOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </nav>

      <div className={`fixed inset-0 z-[80] bg-zinc-50/95 backdrop-blur-2xl transition-all duration-500 lg:hidden ${isMenuOpen ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none translate-y-6'}`}>
        <div className="flex min-h-dvh flex-col px-5 pb-5 pt-24 sm:px-7 sm:pb-7 sm:pt-28">
          <div className="flex flex-1 flex-col justify-center gap-4 min-[380px]:gap-5">
            {mobileLinks.map(({ href, label, sectionId }) => {
              const isActive = location.pathname === href || currentSection === sectionId;

              return (
                <a
                  key={href}
                  href={href}
                  onClick={closeMenu}
                  className={`w-fit text-[2.25rem] font-black uppercase leading-[0.88] tracking-[-0.075em] transition-colors min-[380px]:text-[2.85rem] sm:text-[3.35rem] ${
                    isActive ? 'text-black hover:text-primary' : 'text-zinc-400 hover:text-black'
                  }`}
                >
                  {label}
                </a>
              );
            })}
          </div>

          <div className="rounded-2xl border border-black/8 bg-white/75 p-4 text-[0.64rem] font-bold uppercase tracking-[0.2em] text-zinc-500 shadow-[0_12px_32px_rgba(15,23,42,0.05)]">
            Inquiries
            <a href="mailto:blitzsolutions.dev@gmail.com" className="mt-2 block break-all text-[0.78rem] normal-case tracking-tight text-black">
              blitzsolutions.dev@gmail.com
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
