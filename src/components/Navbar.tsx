'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/src/context/language-context';
import { translations } from '@/src/translations';

export default function Navbar() {
  const { lang, toggle } = useLanguage();
  const t = translations[lang].nav;
  const pathname = usePathname();
  const isListings = pathname === '/listings';

  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastY, setLastY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 50);
      setHidden(y > lastY && y > 200);
      setLastY(y);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [lastY]);

  const links = [
    { href: isListings ? '/#services' : '#services', label: t.services },
    { href: isListings ? '/#about' : '#about', label: t.about },
    { href: '/listings', label: t.vehicles },
    { href: isListings ? '/#contact' : '#contact', label: t.contact },
  ];

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: scrolled
            ? 'rgba(7,7,7,0.95)'
            : 'linear-gradient(to bottom, rgba(7,7,7,0.85) 0%, transparent 100%)',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : 'none',
          transform: hidden ? 'translateY(-100%)' : 'translateY(0)',
          transition: 'transform 0.4s ease, background 0.3s ease',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between" style={{ height: '72px' }}>
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 flex-shrink-0">
              <Image
                src="/images/hpr_logo.png"
                alt="HPR Motorsport"
                width={52}
                height={32}
                priority
                className="object-contain"
              />
              <div className="hidden sm:block">
                <div
                  className="text-white font-black tracking-[0.2em] text-sm leading-none"
                  style={{ fontFamily: 'var(--font-barlow), sans-serif' }}
                >
                  HPR MOTORSPORT
                </div>
                <div className="text-[10px] text-gray-500 tracking-[0.2em] uppercase mt-0.5">
                  London
                </div>
              </div>
            </Link>

            {/* Desktop links */}
            <div className="hidden lg:flex items-center gap-8">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`nav-link ${l.href === '/listings' && isListings ? 'active' : ''}`}
                >
                  {l.label}
                </Link>
              ))}
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-4">
              <button
                onClick={toggle}
                className="flex items-center gap-2 px-3 py-1.5 border border-white/15 hover:border-white/35 transition-colors duration-200 rounded-sm"
              >
                <span className="text-xs font-bold tracking-widest text-white/70 hover:text-white transition-colors">
                  {lang === 'en' ? '🇧🇷 PT' : '🇬🇧 EN'}
                </span>
              </button>

              <Link
                href={isListings ? '/#contact' : '#contact'}
                className="hidden md:block btn-primary text-xs py-2.5 px-5"
              >
                {t.bookNow}
              </Link>

              {/* Hamburger */}
              <button
                className="lg:hidden flex flex-col gap-1.5 p-2"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Menu"
              >
                <span
                  className="block w-5 h-0.5 bg-white transition-all duration-300"
                  style={{ transform: menuOpen ? 'rotate(45deg) translateY(6px)' : 'none' }}
                />
                <span
                  className="block w-5 h-0.5 bg-white transition-all duration-300"
                  style={{ opacity: menuOpen ? 0 : 1 }}
                />
                <span
                  className="block w-5 h-0.5 bg-white transition-all duration-300"
                  style={{ transform: menuOpen ? 'rotate(-45deg) translateY(-6px)' : 'none' }}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className="lg:hidden overflow-hidden transition-all duration-400"
          style={{
            maxHeight: menuOpen ? '400px' : '0',
            background: 'rgba(7,7,7,0.97)',
            borderTop: menuOpen ? '1px solid rgba(255,255,255,0.06)' : 'none',
          }}
        >
          <div className="px-6 py-4 flex flex-col gap-5">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="nav-link text-base"
                onClick={() => setMenuOpen(false)}
              >
                {l.label}
              </Link>
            ))}
            <Link
              href={isListings ? '/#contact' : '#contact'}
              className="btn-primary text-center mt-2"
              onClick={() => setMenuOpen(false)}
            >
              {t.bookNow}
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
