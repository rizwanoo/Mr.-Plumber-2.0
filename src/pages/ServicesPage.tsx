import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  BUSINESS_INFO,
  SITE_IMAGES,
  VERIFIED_MATERIALS,
  type PageRoute,
} from '../data/plumbingData';
import { BorderlessCTA } from '../components/BorderlessCTA';

gsap.registerPlugin(ScrollTrigger);

interface ServicesPageProps {
  onNavigate: (page: PageRoute, hash?: string, prefillMaterial?: string) => void;
  initialAnchor?: string;
}

export function ServicesPage({ onNavigate, initialAnchor }: ServicesPageProps) {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialAnchor) {
      const target = document.getElementById(initialAnchor);
      if (target) {
        setTimeout(() => {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 80);
      }
    }
  }, [initialAnchor]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !pageRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.services-hero-item', {
        y: 26,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
      });

      gsap.utils.toArray<HTMLElement>('.material-band').forEach((band) => {
        gsap.from(band.querySelectorAll('.band-animate'), {
          y: 28,
          opacity: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power2.out',
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: band,
            start: 'top 80%',
            once: true,
          },
        });
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const jumpToMaterial = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div ref={pageRef}>
      {/* Full-bleed Hero Header for Transparent Navbar */}
      <section className="relative bg-[#1769E8] text-white pt-36 pb-20 md:pt-44 md:pb-24 overflow-hidden">
        <img
          src={SITE_IMAGES.cpvcPvc}
          alt="Neatly framed CPVC water lines and PVC drain-waste-vent pipes"
          className="absolute inset-0 w-full h-full object-cover opacity-22"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-[#0E2E5C]/80 via-[#1769E8]/85 to-[#1769E8]"
        />

        <div className="relative z-10 max-w-[1380px] mx-auto px-6 md:px-10">
          <p className="services-hero-item text-xs font-bold uppercase tracking-[0.12em] text-[#F4CF64] mb-4">
            Plumbing Services &amp; Materials · {BUSINESS_INFO.location}
          </p>
          <h1 className="services-hero-item font-display font-extrabold text-[clamp(2.5rem,5.4vw,4.6rem)] leading-[1.0] max-w-4xl mb-6">
            Piping systems selected for performance, compatibility, and longevity.
          </h1>
          <p className="services-hero-item text-white/92 text-lg md:text-xl leading-relaxed max-w-3xl mb-12">
            Every pipe material verified in the Mr. Plumber 2.0 profile serves a distinct purpose in
            residential supply, drain, waste, and vent architecture. Explore each system below to
            understand how they perform inside your home.
          </p>

          {/* Unboxed Underline Quick-Jump Bar */}
          <div className="services-hero-item flex flex-wrap items-center gap-x-8 gap-y-3 pt-6 border-t border-white/25">
            {VERIFIED_MATERIALS.map((mat) => (
              <button
                key={mat.id}
                type="button"
                onClick={() => jumpToMaterial(mat.id)}
                className="text-sm font-bold tracking-[0.04em] text-white/90 hover:text-[#F4CF64] py-2 border-b-2 border-transparent hover:border-[#F4CF64] transition-all bg-transparent cursor-pointer whitespace-nowrap"
              >
                {mat.index} · {mat.shortLabel}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Six Full-Width Alternating Editorial Material Sections (Zero Cards) */}
      {VERIFIED_MATERIALS.map((mat, idx) => {
        const imageLeft = idx % 2 === 1;
        return (
          <section
            key={mat.id}
            id={mat.id}
            style={{ backgroundColor: mat.bgColor, color: mat.textColor }}
            className="material-band py-20 md:py-28 scroll-mt-20"
          >
            <div className="max-w-[1380px] mx-auto px-6 md:px-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                {/* Photo Column */}
                <div
                  className={`lg:col-span-6 band-animate ${
                    imageLeft ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <div className="overflow-hidden">
                    <img
                      src={mat.image}
                      alt={mat.imageAlt}
                      className="w-full aspect-[4/3] object-cover transition-transform duration-700 hover:scale-[1.03]"
                      loading="lazy"
                    />
                  </div>
                  <p className="mt-3 text-xs font-medium text-[#34414A]/60">{mat.imageNote}</p>
                </div>

                {/* Editorial Copy Column */}
                <div
                  className={`lg:col-span-6 band-animate ${
                    imageLeft ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <div className="flex items-baseline gap-4 mb-4">
                    <span
                      className="font-display text-4xl font-extrabold tabular-nums"
                      style={{ color: mat.accentColor }}
                    >
                      {mat.index}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-[0.12em] text-[#34414A]/65">
                      {mat.category}
                    </span>
                  </div>

                  <h2 className="font-display font-bold text-[clamp(2rem,3.5vw,3rem)] leading-[1.08] mb-5">
                    {mat.name}
                  </h2>

                  <p className="text-lg font-medium text-[#34414A] leading-relaxed mb-4">
                    {mat.summary}
                  </p>
                  <p className="text-[16px] text-[#34414A]/82 leading-[1.72] mb-8">
                    {mat.details}
                  </p>

                  {/* Unboxed Hairline Specifications List */}
                  <div className="border-t border-[#34414A]/15 pt-5 mb-9">
                    <h3 className="text-xs font-bold uppercase tracking-[0.1em] text-[#34414A]/65 mb-3">
                      Key System Applications
                    </h3>
                    <ul className="space-y-2.5 text-[15px] text-[#34414A]/90">
                      {mat.applications.map((app) => (
                        <li key={app} className="flex items-start gap-3">
                          <span
                            aria-hidden="true"
                            className="font-bold mt-0.5"
                            style={{ color: mat.accentColor }}
                          >
                            —
                          </span>
                          <span>{app}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <BorderlessCTA
                    onClick={() => onNavigate('contact', undefined, mat.shortLabel)}
                    arrow="↗"
                    className="text-[#1769E8] hover:text-[#FF914D]"
                  >
                    Inquire About {mat.shortLabel}
                  </BorderlessCTA>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* Transparent Scope & Verification Notice Band — Fresh Aqua */}
      <section className="bg-[#08B9B0] text-white py-20">
        <div className="max-w-[1380px] mx-auto px-6 md:px-10 flex flex-col lg:flex-row lg:items-center justify-between gap-10">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#FFF9EF] mb-3">
              Project Evaluation
            </p>
            <h2 className="font-display font-bold text-[clamp(1.9rem,3.4vw,2.8rem)] leading-[1.08] mb-4">
              Unsure which pipe material runs through your walls?
            </h2>
            <p className="text-white/95 text-[16px] leading-relaxed">
              Send a short description or reach out via Facebook or email. Mr. Plumber 2.0 will
              discuss the system involved and confirm availability for your Charlottesville project.
            </p>
          </div>
          <BorderlessCTA
            onClick={() => onNavigate('contact')}
            arrow="↗"
            className="text-[#FFF9EF] hover:text-[#34414A] text-base shrink-0"
          >
            Request an Assessment
          </BorderlessCTA>
        </div>
      </section>
    </div>
  );
}
