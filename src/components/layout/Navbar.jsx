import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#services', label: 'Services' },
  { href: '#projects', label: 'Projects' },
  { href: '#about', label: 'About' }
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
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isHomePage) {
      return undefined;
    }

    const sections = navLinks.map(link => document.querySelector(link.href));
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: [0.5], rootMargin: '-80px 0px -50% 0px' }
    );

    sections.forEach(section => {
      if (section) observer.observe(section);
    });

    return () => {
      sections.forEach(section => {
        if (section) observer.unobserve(section);
      });
    };
  }, [isHomePage]);

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 transition-colors ${isMenuOpen ? 'bg-zinc-50 dark:bg-zinc-950' : 'bg-white/70 backdrop-blur-xl border-b border-black/10'}`}>
        <div className="flex justify-between items-center px-8 py-6 max-w-screen-2xl mx-auto">
          <a href="/#home" className="text-2xl font-black tracking-tighter text-black uppercase">BLITZ</a>
          <div className="hidden md:flex gap-8 items-center">
            {navLinks.map(({ href, label }) => {
              const sectionId = href.replace('#', '');
              const isActive = currentSection === sectionId;
              return (
                <a
                  key={href}
                  className={`font-inter tracking-tighter font-bold uppercase transition-colors ${
                    isActive
                      ? 'text-black border-b-2 border-black pb-1'
                      : 'text-zinc-500 hover:text-black'
                  }`}
                  href={`/${href}`}
                >
                  {label}
                </a>
              );
            })}
          </div>
          <a href="/#contact" className="hidden md:block font-inter tracking-tighter font-bold uppercase px-6 py-2 bg-primary text-white rounded-full hover:opacity-80 transition-opacity active:scale-95 duration-200">
            CONTACT US
          </a>
          <button
            type="button"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-black z-50 relative"
          >
            <span className="material-symbols-outlined text-3xl">{isMenuOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-40 bg-zinc-50/95 backdrop-blur-2xl flex flex-col justify-center px-12 transition-all duration-500 md:hidden ${isMenuOpen ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none translate-y-8'}`}>
        <div className="flex flex-col gap-8 text-5xl font-black tracking-tighter uppercase mb-16 pt-20">
          {navLinks.map(({ href, label }) => {
            const sectionId = href.replace('#', '');
            const isActive = currentSection === sectionId;
            return (
              <a
                key={href}
                href={`/${href}`}
                onClick={closeMenu}
                className={`transition-colors ${
                  isActive ? 'text-black hover:text-primary' : 'text-zinc-400 hover:text-black'
                }`}
              >
                {label}
              </a>
            );
          })}
          <a href="/#contact" onClick={closeMenu} className="text-zinc-400 hover:text-black transition-colors">Contact</a>
        </div>
        <div className="text-xs font-bold tracking-widest uppercase text-zinc-500">
          Inquiries <br/>
          <a href="mailto:blitzsolutions.dev@gmail.com" className="text-black text-sm mt-2 block">blitzsolutions.dev@gmail.com</a>
        </div>
      </div>
    </>
  );
}
