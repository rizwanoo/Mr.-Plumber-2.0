import { useEffect, useRef, useState } from 'react';
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

interface HomePageProps {
  onNavigate: (page: PageRoute, hash?: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const pageRef = useRef<HTMLDivElement>(null);
  const [activeMaterialIdx, setActiveMaterialIdx] = useState(3); // Start on Copper

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !pageRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.hero-stagger', {
        y: 28,
        opacity: 0,
        duration: 0.85,
        stagger: 0.12,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
      });

      gsap.to('.hero-parallax-img', {
        yPercent: 12,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero-section',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      gsap.utils.toArray<HTMLElement>('.reveal-editorial').forEach((el) => {
        gsap.from(el, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out',
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: el,
            start: 'top 84%',
            once: true,
          },
        });
      });

      gsap.utils.toArray<HTMLElement>('.reveal-photo').forEach((el) => {
        gsap.from(el, {
          scale: 1.05,
          opacity: 0,
          duration: 0.95,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            once: true,
          },
        });
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const activeMaterial = VERIFIED_MATERIALS[activeMaterialIdx];

  return (
    <div ref={pageRef}>
      {/* 1. CINEMATIC FULL-BLEED HERO (Extends behind transparent navbar) */}
      <section className="hero-section relative min-h-[92vh] lg:min-h-screen w-full overflow-hidden flex items-end">
        <img
          src={SITE_IMAGES.heroCopper}
          alt="Sunlit residential copper water supply lines with soldered brass ball valves along warm timber framing"
          className="hero-parallax-img absolute inset-0 w-full h-[112%] -top-[6%] object-cover object-center"
        />
        {/* Measured scrim only at bottom-left so daylight copper photography stays bright and vibrant */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-tr from-[#0B1E33]/85 via-[#0B1E33]/35 to-transparent"
        />

        <div className="relative z-10 w-full max-w-[1380px] mx-auto px-6 md:px-10 pt-32 pb-16 md:pb-24">
          <div className="max-w-3xl">
            <p className="hero-stagger text-[#F4CF64] text-sm md:text-base font-semibold tracking-[0.12em] uppercase mb-4">
              {BUSINESS_INFO.specialty} · {BUSINESS_INFO.location}
            </p>
            <h1 className="hero-stagger font-display font-extrabold text-white text-[clamp(2.65rem,6vw,5.25rem)] leading-[0.98] tracking-tight mb-6">
              Plumbing Expertise. Built on Experience.
            </h1>
            <p className="hero-stagger text-white/92 text-lg md:text-xl leading-relaxed max-w-2xl mb-10 font-normal">
              Professional plumbing knowledge, dependable piping materials, and careful
              craftsmanship committed to getting the job done right across Charlottesville, Virginia.
            </p>

            <div className="hero-stagger flex flex-wrap items-center gap-x-10 gap-y-4">
              <BorderlessCTA
                onClick={() => onNavigate('services')}
                arrow="→"
                className="text-[#F4CF64] hover:text-white"
              >
                Explore Plumbing Services
              </BorderlessCTA>
              <BorderlessCTA
                onClick={() => onNavigate('contact')}
                arrow="↗"
                className="text-white hover:text-[#08B9B0]"
              >
                Get in Touch
              </BorderlessCTA>
            </div>
          </div>
        </div>
      </section>

      {/* 2. BRAND INTRODUCTION — SKY BLUE EDITORIAL BAND (Zero boxes) */}
      <section className="bg-[#DDF1FF] text-[#34414A] py-20 md:py-28">
        <div className="max-w-[1380px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-5 reveal-editorial flex flex-col items-start">
              <img
                src={BUSINESS_INFO.logoCutout}
                alt="Mr. Plumber 2.0 original portrait brand emblem"
                className="w-56 md:w-72 h-auto object-contain mb-6"
              />
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#1769E8]">
                Direct Trade Craftsmanship · Charlottesville, VA
              </p>
            </div>

            <div className="lg:col-span-7 reveal-editorial">
              <h2 className="font-display font-bold text-[clamp(2rem,3.8vw,3.35rem)] leading-[1.06] text-[#34414A] mb-6">
                Clean pipework starts with understanding every material behind the wall.
              </h2>
              <p className="text-[17px] leading-[1.75] text-[#34414A]/88 mb-6 max-w-2xl">
                Mr. Plumber 2.0 brings practical plomería skill directly to homeowners and projects in
                Charlottesville, Virginia. Instead of rushing through shortcuts, every assembly—from
                copper water headers and PEX manifolds to cast iron stacks and PVC or ABS drainage—is
                planned for clean routing, accessible shutoffs, and lasting reliability.
              </p>
              <p className="text-[17px] leading-[1.75] text-[#34414A]/88 mb-9 max-w-2xl">
                When you reach out to Mr. Plumber 2.0, you connect directly with the person who knows
                your piping systems firsthand.
              </p>

              <BorderlessCTA
                onClick={() => onNavigate('work-about', 'about')}
                arrow="→"
                className="text-[#1769E8] hover:text-[#FF914D]"
              >
                Read the Story &amp; Approach
              </BorderlessCTA>
            </div>
          </div>
        </div>
      </section>

      {/* 3. VERIFIED PLUMBING MATERIALS OVERVIEW — PURE WHITE ASYMMETRIC SPLIT (Zero Cards) */}
      <section className="bg-white text-[#34414A] py-20 md:py-28">
        <div className="max-w-[1380px] mx-auto px-6 md:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-[#34414A]/12 reveal-editorial">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#08B9B0] mb-3">
                Verified Piping Systems
              </p>
              <h2 className="font-display font-bold text-[clamp(2rem,3.6vw,3.1rem)] leading-[1.08]">
                Seven materials mastered for supply, drain, waste, and vent.
              </h2>
            </div>
            <BorderlessCTA
              onClick={() => onNavigate('services')}
              arrow="→"
              className="text-[#1769E8] hover:text-[#08B9B0] shrink-0"
            >
              View Full Material Guide
            </BorderlessCTA>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pt-12 items-start">
            {/* Interactive Unboxed Hairline List */}
            <div className="lg:col-span-6 divide-y divide-[#34414A]/12 reveal-editorial">
              {VERIFIED_MATERIALS.map((mat, index) => {
                const isActive = index === activeMaterialIdx;
                return (
                  <button
                    key={mat.id}
                    type="button"
                    onClick={() => setActiveMaterialIdx(index)}
                    className="w-full text-left py-5 flex items-baseline justify-between gap-6 group bg-transparent cursor-pointer transition-colors"
                  >
                    <div className="flex items-baseline gap-5">
                      <span
                        className={`font-display text-lg font-bold tabular-nums transition-colors ${
                          isActive ? 'text-[#FF914D]' : 'text-[#34414A]/40 group-hover:text-[#1769E8]'
                        }`}
                      >
                        {mat.index}
                      </span>
                      <div>
                        <span
                          className={`font-display text-2xl md:text-[26px] font-bold block transition-colors ${
                            isActive ? 'text-[#1769E8]' : 'text-[#34414A] group-hover:text-[#1769E8]'
                          }`}
                        >
                          {mat.shortLabel}
                        </span>
                        <span className="text-sm text-[#34414A]/70">{mat.category}</span>
                      </div>
                    </div>
                    <span
                      aria-hidden="true"
                      className={`text-lg font-bold transition-transform duration-200 ${
                        isActive
                          ? 'text-[#FF914D] translate-x-1'
                          : 'text-[#34414A]/35 group-hover:text-[#1769E8]'
                      }`}
                    >
                      →
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Active Material Open Editorial Preview (No Box / No Border) */}
            <div className="lg:col-span-6 reveal-editorial">
              <div className="overflow-hidden mb-7">
                <img
                  src={activeMaterial.image}
                  alt={activeMaterial.imageAlt}
                  className="w-full aspect-[4/3] object-cover transition-transform duration-500 hover:scale-[1.02]"
                  loading="lazy"
                />
              </div>
              <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#08B9B0] mb-2">
                {activeMaterial.index} · {activeMaterial.category}
              </p>
              <h3 className="font-display font-bold text-2xl md:text-3xl text-[#34414A] mb-3">
                {activeMaterial.name}
              </h3>
              <p className="text-[16px] leading-relaxed text-[#34414A]/85 mb-6">
                {activeMaterial.details}
              </p>
              <BorderlessCTA
                onClick={() => onNavigate('services', activeMaterial.id)}
                arrow="→"
                className="text-[#1769E8] hover:text-[#FF914D]"
              >
                Explore {activeMaterial.shortLabel} Details
              </BorderlessCTA>
            </div>
          </div>
        </div>
      </section>

      {/* 4. WORKMANSHIP & INSTALLATION SHOWCASE — FRESH AQUA + SOFT MINT SPLIT */}
      <section className="grid grid-cols-1 lg:grid-cols-12">
        <div className="lg:col-span-5 bg-[#08B9B0] text-white px-6 md:px-14 py-20 md:py-28 flex flex-col justify-center reveal-editorial">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#FFF9EF] mb-4">
            Workmanship Standards
          </p>
          <h2 className="font-display font-bold text-[clamp(2rem,3.6vw,3.1rem)] leading-[1.06] mb-6">
            Orderly routing you can inspect with confidence.
          </h2>
          <p className="text-white/95 text-[17px] leading-[1.7] mb-8 max-w-lg">
            Whether routing color-coded PEX-A and PEX-B manifold branches, balancing PVC drain-waste-vent
            slope, or transitioning heavy cast iron stacks with shielded couplings, clean layout makes
            systems easier to service and far less likely to leak.
          </p>
          <div>
            <BorderlessCTA
              onClick={() => onNavigate('work-about', 'work')}
              arrow="→"
              className="text-[#FFF9EF] hover:text-[#34414A]"
            >
              See Pipework &amp; Craftsmanship
            </BorderlessCTA>
          </div>
        </div>

        <div className="lg:col-span-7 bg-[#E8F4EC] grid grid-cols-1 sm:grid-cols-2">
          <div className="overflow-hidden reveal-photo">
            <img
              src={SITE_IMAGES.pexManifold}
              alt="Organized red and blue PEX-A and PEX-B manifold with brass ball valves"
              className="w-full h-full min-h-[340px] object-cover"
              loading="lazy"
            />
          </div>
          <div className="overflow-hidden reveal-photo">
            <img
              src={SITE_IMAGES.castIronAbs}
              alt="Cast iron vertical soil stack transitioned to ABS drainage with shielded couplings"
              className="w-full h-full min-h-[340px] object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* 5. WHY CHOOSE MR. PLUMBER 2.0 — WARM IVORY TYPOGRAPHIC EDITORIAL */}
      <section className="bg-[#FFF9EF] text-[#34414A] py-20 md:py-28">
        <div className="max-w-[1380px] mx-auto px-6 md:px-10">
          <div className="max-w-2xl mb-14 reveal-editorial">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#FF914D] mb-3">
              Why Work With Us
            </p>
            <h2 className="font-display font-bold text-[clamp(2rem,3.6vw,3.1rem)] leading-[1.08]">
              Honest plumbing communication without corporate scripts.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-10 border-t border-[#34414A]/15 reveal-editorial">
            <div>
              <span className="font-display text-3xl font-extrabold text-[#1769E8] block mb-3">
                01
              </span>
              <h3 className="font-display text-2xl font-bold mb-3">Material Literacy</h3>
              <p className="text-[16px] leading-relaxed text-[#34414A]/85">
                From older cast iron and rigid copper to modern PEX-A, PEX-B, CPVC, PVC, and ABS,
                every material behaves differently under heat, pressure, and seasonal shifts.
              </p>
            </div>

            <div>
              <span className="font-display text-3xl font-extrabold text-[#08B9B0] block mb-3">
                02
              </span>
              <h3 className="font-display text-2xl font-bold mb-3">Clean Execution</h3>
              <p className="text-[16px] leading-relaxed text-[#34414A]/85">
                Level horizontal runs, properly supported hangers, clean transitions, and clear
                shutoff access—built neatly rather than hidden hastily behind drywall.
              </p>
            </div>

            <div>
              <span className="font-display text-3xl font-extrabold text-[#FF914D] block mb-3">
                03
              </span>
              <h3 className="font-display text-2xl font-bold mb-3">Direct Accountability</h3>
              <p className="text-[16px] leading-relaxed text-[#34414A]/85">
                Serving Charlottesville, Virginia with transparent, personal correspondence by email
                or Facebook—never automated call-center handoffs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. STRONG INQUIRY CTA BAND — FULL-BLEED TOOLS + ELECTRIC BLUE OVERLAY */}
      <section className="relative overflow-hidden bg-[#1769E8] text-white py-24 md:py-32">
        <img
          src={SITE_IMAGES.toolsVirginia}
          alt="Plumbing tools on an oak workbench looking out over Charlottesville Virginia foothills"
          className="absolute inset-0 w-full h-full object-cover opacity-28"
          loading="lazy"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-[#1769E8]/92 via-[#1769E8]/78 to-[#08B9B0]/70"
        />

        <div className="relative z-10 max-w-[1380px] mx-auto px-6 md:px-10 flex flex-col lg:flex-row lg:items-end justify-between gap-10 reveal-editorial">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#F4CF64] mb-4">
              Charlottesville, Virginia
            </p>
            <h2 className="font-display font-extrabold text-[clamp(2.2rem,4.5vw,3.8rem)] leading-[1.02] mb-5">
              Need a clear assessment on your pipes or project?
            </h2>
            <p className="text-white/92 text-lg leading-relaxed">
              Share your location, the plumbing system involved, and what you are seeing—we respond
              directly without pressure.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-8 shrink-0">
            <BorderlessCTA
              onClick={() => onNavigate('contact')}
              arrow="↗"
              className="text-[#F4CF64] hover:text-white text-base"
            >
              Start a Service Inquiry
            </BorderlessCTA>
            <BorderlessCTA
              href={`mailto:${BUSINESS_INFO.email}`}
              arrow="↗"
              className="text-white hover:text-[#DDF1FF] text-base"
            >
              Email Directly
            </BorderlessCTA>
          </div>
        </div>
      </section>
    </div>
  );
}
