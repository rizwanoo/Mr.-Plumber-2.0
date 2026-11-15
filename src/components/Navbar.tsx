import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { BUSINESS_INFO, VERIFIED_MATERIALS, type PageRoute } from '../data/plumbingData';
import { BorderlessCTA } from './BorderlessCTA';

interface NavbarProps {
  currentPage: PageRoute;
  onNavigate: (page: PageRoute, hash?: string) => void;
}

export function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 36);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
  }, [currentPage]);

  const openServicesMenu = () => {
    if (closeTimeoutRef.current) {
      window.clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setServicesOpen(true);
  };

  const scheduleCloseServicesMenu = () => {
    closeTimeoutRef.current = window.setTimeout(() => {
      setServicesOpen(false);
    }, 160);
  };

  const handleLinkClick = (page: PageRoute, hash?: string) => {
    setMobileOpen(false);
    setServicesOpen(false);
    onNavigate(page, hash);
  };

  const isLightHeader = scrolled || mobileOpen;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isLightHeader
          ? 'bg-white/95 backdrop-blur-md text-[#34414A] border-b border-[#34414A]/10 py-2'
          : 'bg-gradient-to-b from-[#0E2238]/55 via-[#0E2238]/20 to-transparent text-white py-3'
      }`}
    >
      <div className="max-w-[1380px] mx-auto px-5 md:px-10 flex items-center justify-between gap-6">
        {/* Zone 1: Prominent Official Logo + Single-Line Brand Title */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick('home');
          }}
          className="flex items-center gap-3.5 shrink-0 whitespace-nowrap group"
          aria-label="Mr. Plumber 2.0 Home"
        >
          <img
            src={BUSINESS_INFO.logoCutout}
            alt="Mr. Plumber 2.0 official portrait logo"
            className="h-14 md:h-16 w-auto object-contain shrink-0 transition-transform duration-300 group-hover:scale-[1.03]"
          />
          <span
            className={`font-display text-xl md:text-2xl font-extrabold tracking-tight transition-colors ${
              isLightHeader ? 'text-[#1769E8]' : 'text-white drop-shadow-sm'
            }`}
          >
            Mr. Plumber 2.0
          </span>
        </a>

        {/* Zone 2: Horizontal Desktop Navigation */}
        <nav
          aria-label="Primary navigation"
          className="hidden lg:flex items-center gap-7 text-[14px] font-semibold tracking-[0.04em] uppercase"
        >
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('home');
            }}
            className={`whitespace-nowrap shrink-0 py-2 transition-colors border-b-2 ${
              currentPage === 'home'
                ? isLightHeader
                  ? 'border-[#1769E8] text-[#1769E8]'
                  : 'border-[#F4CF64] text-[#F4CF64]'
                : isLightHeader
                  ? 'border-transparent text-[#34414A] hover:text-[#1769E8]'
                  : 'border-transparent text-white/95 hover:text-[#F4CF64]'
            }`}
          >
            Home
          </a>

          {/* Dropdown container with seamless hover bridge */}
          <div
            className="relative"
            onMouseEnter={openServicesMenu}
            onMouseLeave={scheduleCloseServicesMenu}
          >
            <button
              type="button"
              aria-expanded={servicesOpen}
              aria-haspopup="true"
              onClick={() => handleLinkClick('services')}
              className={`whitespace-nowrap shrink-0 py-2 inline-flex items-center gap-1.5 transition-colors border-b-2 cursor-pointer bg-transparent ${
                currentPage === 'services'
                  ? isLightHeader
                    ? 'border-[#1769E8] text-[#1769E8]'
                    : 'border-[#F4CF64] text-[#F4CF64]'
                  : isLightHeader
                    ? 'border-transparent text-[#34414A] hover:text-[#1769E8]'
                    : 'border-transparent text-white/95 hover:text-[#F4CF64]'
              }`}
            >
              <span>Plumbing Services</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  servicesOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {servicesOpen && (
              <div
                onMouseEnter={openServicesMenu}
                onMouseLeave={scheduleCloseServicesMenu}
                className="absolute left-0 top-full pt-2 w-72 z-50"
              >
                <div className="bg-white text-[#34414A] py-4 px-5 shadow-[0_18px_40px_rgba(14,34,56,0.16)] border-t-2 border-[#1769E8]">
                  <button
                    type="button"
                    onClick={() => handleLinkClick('services')}
                    className="w-full text-left pb-3 mb-2 border-b border-[#34414A]/12 text-xs font-bold uppercase tracking-[0.08em] text-[#1769E8] hover:text-[#08B9B0] transition-colors cursor-pointer bg-transparent"
                  >
                    All Materials &amp; Systems →
                  </button>
                  <ul className="space-y-1">
                    {VERIFIED_MATERIALS.map((mat) => (
                      <li key={mat.id}>
                        <button
                          type="button"
                          onClick={() => handleLinkClick('services', mat.id)}
                          className="w-full text-left py-2 px-1 flex items-baseline justify-between gap-3 text-[13px] font-semibold normal-case tracking-normal text-[#34414A] hover:text-[#1769E8] transition-colors cursor-pointer bg-transparent"
                        >
                          <span>{mat.shortLabel}</span>
                          <span className="text-[11px] font-medium text-[#34414A]/60">
                            {mat.index}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>

          <a
            href="#our-work"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('work-about', 'work');
            }}
            className={`whitespace-nowrap shrink-0 py-2 transition-colors border-b-2 ${
              currentPage === 'work-about'
                ? isLightHeader
                  ? 'border-[#1769E8] text-[#1769E8]'
                  : 'border-[#F4CF64] text-[#F4CF64]'
                : isLightHeader
                  ? 'border-transparent text-[#34414A] hover:text-[#1769E8]'
                  : 'border-transparent text-white/95 hover:text-[#F4CF64]'
            }`}
          >
            Our Work
          </a>

          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('work-about', 'about');
            }}
            className={`whitespace-nowrap shrink-0 py-2 transition-colors border-b-2 ${
              isLightHeader
                ? 'border-transparent text-[#34414A] hover:text-[#1769E8]'
                : 'border-transparent text-white/95 hover:text-[#F4CF64]'
            }`}
          >
            About
          </a>

          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('contact');
            }}
            className={`whitespace-nowrap shrink-0 py-2 transition-colors border-b-2 ${
              currentPage === 'contact'
                ? isLightHeader
                  ? 'border-[#1769E8] text-[#1769E8]'
                  : 'border-[#F4CF64] text-[#F4CF64]'
                : isLightHeader
                  ? 'border-transparent text-[#34414A] hover:text-[#1769E8]'
                  : 'border-transparent text-white/95 hover:text-[#F4CF64]'
            }`}
          >
            Contact
          </a>
        </nav>

        {/* Zone 3: Single Borderless Primary CTA + Mobile Toggle */}
        <div className="flex items-center gap-4 shrink-0">
          <div className="hidden md:block">
            <BorderlessCTA
              arrow="↗"
              onClick={() => handleLinkClick('contact')}
              className={
                isLightHeader
                  ? 'text-[#1769E8] hover:text-[#FF914D]'
                  : 'text-[#F4CF64] hover:text-white'
              }
            >
              Get in Touch
            </BorderlessCTA>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            className={`lg:hidden p-2.5 min-w-[44px] min-h-[44px] inline-flex items-center justify-center bg-transparent cursor-pointer transition-colors ${
              isLightHeader ? 'text-[#34414A]' : 'text-white'
            }`}
          >
            {mobileOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </div>

      {/* Responsive Mobile Navigation Drawer (Borderless Editorial Overlay) */}
      {mobileOpen && (
        <nav
          aria-label="Mobile navigation"
          className="lg:hidden bg-white text-[#34414A] border-t border-[#34414A]/10 px-6 py-6 max-h-[calc(100vh-80px)] overflow-y-auto"
        >
          <div className="flex flex-col divide-y divide-[#34414A]/10">
            <button
              type="button"
              onClick={() => handleLinkClick('home')}
              className="text-left py-4 min-h-[48px] font-display text-2xl font-bold text-[#34414A] hover:text-[#1769E8] bg-transparent cursor-pointer"
            >
              Home
            </button>

            <div className="py-4">
              <button
                type="button"
                onClick={() => handleLinkClick('services')}
                className="w-full text-left min-h-[44px] font-display text-2xl font-bold text-[#1769E8] bg-transparent cursor-pointer"
              >
                Plumbing Services &amp; Materials
              </button>
              <div className="mt-3 pl-4 grid grid-cols-2 gap-x-4 gap-y-2 border-l border-[#1769E8]/25">
                {VERIFIED_MATERIALS.map((mat) => (
                  <button
                    key={mat.id}
                    type="button"
                    onClick={() => handleLinkClick('services', mat.id)}
                    className="text-left py-1.5 min-h-[40px] text-sm font-semibold text-[#34414A]/85 hover:text-[#1769E8] bg-transparent cursor-pointer"
                  >
                    {mat.shortLabel}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleLinkClick('work-about', 'work')}
              className="text-left py-4 min-h-[48px] font-display text-2xl font-bold text-[#34414A] hover:text-[#1769E8] bg-transparent cursor-pointer"
            >
              Our Work
            </button>

            <button
              type="button"
              onClick={() => handleLinkClick('work-about', 'about')}
              className="text-left py-4 min-h-[48px] font-display text-2xl font-bold text-[#34414A] hover:text-[#1769E8] bg-transparent cursor-pointer"
            >
              About
            </button>

            <button
              type="button"
              onClick={() => handleLinkClick('contact')}
              className="text-left py-4 min-h-[48px] font-display text-2xl font-bold text-[#FF914D] bg-transparent cursor-pointer"
            >
              Contact &amp; Service Inquiry ↗
            </button>
          </div>
        </nav>
      )}
    </header>
  );
}
