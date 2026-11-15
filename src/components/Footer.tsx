import { BUSINESS_INFO, VERIFIED_MATERIALS, type PageRoute } from '../data/plumbingData';
import { BorderlessCTA } from './BorderlessCTA';

interface FooterProps {
  onNavigate: (page: PageRoute, hash?: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-[#1769E8] text-white pt-16 pb-12">
      <div className="max-w-[1380px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-14 border-b border-white/20">
          {/* Large Official Brand Logo & Identity */}
          <div className="lg:col-span-5 flex flex-col items-start gap-5">
            <div className="flex items-center gap-5">
              <img
                src={BUSINESS_INFO.logoCutout}
                alt="Mr. Plumber 2.0 official portrait logo"
                className="h-24 md:h-28 w-auto object-contain shrink-0"
              />
              <div>
                <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight text-white">
                  Mr. Plumber 2.0
                </h2>
                <p className="text-[#DDF1FF] text-sm font-semibold mt-1">
                  {BUSINESS_INFO.specialty} · {BUSINESS_INFO.location}
                </p>
              </div>
            </div>
            <p className="text-white/90 text-[15px] leading-relaxed max-w-md">
              Straightforward plumbing expertise rooted in material knowledge, clean pipework
              craftsmanship, and dependable personal service in Charlottesville, Virginia.
            </p>
            <BorderlessCTA
              arrow="↗"
              onClick={() => onNavigate('contact')}
              className="text-[#F4CF64] hover:text-white"
            >
              Send a Service Inquiry
            </BorderlessCTA>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-2">
            <h3 className="font-display text-sm font-bold uppercase tracking-[0.1em] text-[#DDF1FF] mb-5">
              Navigation
            </h3>
            <ul className="space-y-3 text-[15px] font-medium">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('home')}
                  className="text-white/90 hover:text-[#F4CF64] transition-colors bg-transparent cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('services')}
                  className="text-white/90 hover:text-[#F4CF64] transition-colors bg-transparent cursor-pointer"
                >
                  Plumbing Services
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('work-about', 'work')}
                  className="text-white/90 hover:text-[#F4CF64] transition-colors bg-transparent cursor-pointer"
                >
                  Our Work
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('work-about', 'about')}
                  className="text-white/90 hover:text-[#F4CF64] transition-colors bg-transparent cursor-pointer"
                >
                  About
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('contact')}
                  className="text-white/90 hover:text-[#F4CF64] transition-colors bg-transparent cursor-pointer"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Verified Materials */}
          <div className="lg:col-span-2">
            <h3 className="font-display text-sm font-bold uppercase tracking-[0.1em] text-[#DDF1FF] mb-5">
              Materials
            </h3>
            <ul className="space-y-2.5 text-[15px] font-medium">
              {VERIFIED_MATERIALS.map((mat) => (
                <li key={mat.id}>
                  <button
                    type="button"
                    onClick={() => onNavigate('services', mat.id)}
                    className="text-white/90 hover:text-[#F4CF64] transition-colors bg-transparent cursor-pointer"
                  >
                    {mat.shortLabel}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Verified Direct Contact */}
          <div className="lg:col-span-3">
            <h3 className="font-display text-sm font-bold uppercase tracking-[0.1em] text-[#DDF1FF] mb-5">
              Direct Contact
            </h3>
            <div className="space-y-4 text-[15px]">
              <div>
                <div className="text-xs uppercase tracking-[0.08em] text-[#DDF1FF]/80 mb-1">
                  Service Area
                </div>
                <p className="font-semibold text-white">{BUSINESS_INFO.location}</p>
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.08em] text-[#DDF1FF]/80 mb-1">
                  Email
                </div>
                <a
                  href={`mailto:${BUSINESS_INFO.email}`}
                  className="font-semibold text-white hover:text-[#F4CF64] transition-colors break-all"
                >
                  {BUSINESS_INFO.email}
                </a>
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.08em] text-[#DDF1FF]/80 mb-1">
                  Official Facebook
                </div>
                <a
                  href={BUSINESS_INFO.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[#F4CF64] hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  facebook.com/Mr.Plumber2.0 ↗
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-white/80">
          <p>© {new Date().getFullYear()} Mr. Plumber 2.0 · Charlottesville, Virginia</p>
          <p>Plomería &amp; Pipework Craftsmanship</p>
        </div>
      </div>
    </footer>
  );
}
