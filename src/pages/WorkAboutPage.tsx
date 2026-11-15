import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  BUSINESS_INFO,
  PERSONAL_INTERESTS,
  SITE_IMAGES,
  type PageRoute,
} from '../data/plumbingData';
import { BorderlessCTA } from '../components/BorderlessCTA';

gsap.registerPlugin(ScrollTrigger);

interface WorkAboutPageProps {
  onNavigate: (page: PageRoute, hash?: string) => void;
  initialAnchor?: string;
}

const WORK_SHOWCASES = [
  {
    title: 'Copper Supply Headers & Brass Isolation',
    system: 'Copper · Potable Water',
    description:
      'Parallel rigid copper supply lines anchored neatly along timber framing with accessible quarter-turn brass ball valves.',
    image: SITE_IMAGES.heroCopper,
    alt: 'Precision copper water supply pipes and brass shutoff valves along timber framing',
  },
  {
    title: 'Color-Coded PEX-A & PEX-B Manifold Routing',
    system: 'PEX-A & PEX-B · Distribution',
    description:
      'Dedicated hot and cold manifold branches with sweeping curves, pressure gauges, and individual fixture shutoffs.',
    image: SITE_IMAGES.pexManifold,
    alt: 'Red hot and blue cold PEX plumbing manifold with brass ball valves',
  },
  {
    title: 'CPVC Hot/Cold & Schedule 40 PVC Alignment',
    system: 'CPVC & PVC · Framing Rough-In',
    description:
      'Properly supported supply risers paired alongside graded PVC drain-waste-vent runs inside open wall framing.',
    image: SITE_IMAGES.cpvcPvc,
    alt: 'Cream CPVC water supply lines alongside white Schedule 40 PVC DWV piping',
  },
  {
    title: 'Cast Iron Soil Stack to ABS Transition',
    system: 'Cast Iron & ABS · Drainage',
    description:
      'Heavy-duty vertical cast iron stack joined cleanly to ABS drainage lines via stainless steel shielded no-hub couplings.',
    image: SITE_IMAGES.castIronAbs,
    alt: 'Black cast iron vertical stack joined to ABS drainage with shielded couplings',
  },
];

export function WorkAboutPage({ onNavigate, initialAnchor }: WorkAboutPageProps) {
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
      gsap.from('.work-hero-stagger', {
        y: 26,
        opacity: 0,
        duration: 0.85,
        stagger: 0.1,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
      });

      gsap.utils.toArray<HTMLElement>('.work-reveal').forEach((el) => {
        gsap.from(el, {
          y: 28,
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
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef}>
      {/* Full-bleed Hero Header behind Transparent Navbar */}
      <section className="relative min-h-[72vh] flex items-end overflow-hidden bg-[#0E2238] text-white">
        <img
          src={SITE_IMAGES.toolsVirginia}
          alt="Plumbing cutters, PEX expander, brass fittings, and level beside a window overlooking Charlottesville Virginia foothills"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#0B1E33]/90 via-[#0B1E33]/45 to-[#0B1E33]/35"
        />

        <div className="relative z-10 w-full max-w-[1380px] mx-auto px-6 md:px-10 pt-36 pb-16 md:pb-24">
          <p className="work-hero-stagger text-xs font-bold uppercase tracking-[0.12em] text-[#F4CF64] mb-4">
            Our Work &amp; Brand Story · {BUSINESS_INFO.location}
          </p>
          <h1 className="work-hero-stagger font-display font-extrabold text-[clamp(2.5rem,5.4vw,4.6rem)] leading-[1.0] max-w-4xl mb-6">
            Practical trade skill, clean tools, and respect for the home.
          </h1>
          <p className="work-hero-stagger text-white/92 text-lg md:text-xl leading-relaxed max-w-2xl">
            Behind Mr. Plumber 2.0 is a hands-on commitment to neat pipework, durable materials,
            and straightforward communication with homeowners across Charlottesville, Virginia.
          </p>
        </div>
      </section>

      {/* #work — OPEN ASYMMETRIC GALLERY (Zero Boxes / Zero Card Borders) */}
      <section id="work" className="bg-white text-[#34414A] py-20 md:py-28 scroll-mt-20">
        <div className="max-w-[1380px] mx-auto px-6 md:px-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 border-b border-[#34414A]/12 work-reveal">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#1769E8] mb-3">
                Pipework &amp; Systems Showcase
              </p>
              <h2 className="font-display font-bold text-[clamp(2rem,3.6vw,3.1rem)] leading-[1.08]">
                Workmanship across supply, manifold, and drainage assemblies.
              </h2>
            </div>
            <BorderlessCTA
              href={BUSINESS_INFO.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              arrow="↗"
              className="text-[#1769E8] hover:text-[#FF914D] shrink-0"
            >
              View Official Facebook Page
            </BorderlessCTA>
          </div>

          <p className="text-sm text-[#34414A]/68 pt-5 pb-12 max-w-3xl work-reveal">
            Note on photography: Direct post albums on Facebook sit behind a login gate, so the
            editorial visuals below illustrate the verified piping materials and assembly standards
            featured in the Mr. Plumber 2.0 profile. Follow{' '}
            <a
              href={BUSINESS_INFO.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1769E8] font-semibold hover:underline"
            >
              facebook.com/Mr.Plumber2.0
            </a>{' '}
            for live updates.
          </p>

          {/* Staggered Asymmetric Open Editorial Layout */}
          <div className="space-y-20 md:space-y-28">
            {WORK_SHOWCASES.map((item, idx) => {
              const offsetRight = idx % 2 === 1;
              return (
                <div
                  key={item.title}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-end work-reveal"
                >
                  <div
                    className={`lg:col-span-8 overflow-hidden ${
                      offsetRight ? 'lg:order-2' : 'lg:order-1'
                    }`}
                  >
                    <img
                      src={item.image}
                      alt={item.alt}
                      className="w-full aspect-[16/10] object-cover transition-transform duration-700 hover:scale-[1.02]"
                      loading="lazy"
                    />
                  </div>
                  <div
                    className={`lg:col-span-4 pb-2 ${
                      offsetRight ? 'lg:order-1' : 'lg:order-2'
                    }`}
                  >
                    <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#08B9B0] mb-2">
                      0{idx + 1} · {item.system}
                    </p>
                    <h3 className="font-display font-bold text-2xl md:text-3xl text-[#34414A] mb-3">
                      {item.title}
                    </h3>
                    <p className="text-[16px] leading-relaxed text-[#34414A]/82 mb-6">
                      {item.description}
                    </p>
                    <BorderlessCTA
                      onClick={() => onNavigate('services')}
                      arrow="→"
                      className="text-[#1769E8] hover:text-[#FF914D]"
                    >
                      Material Details
                    </BorderlessCTA>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* #about — HUMAN BRAND STORY IN SKY BLUE & SOFT MINT */}
      <section id="about" className="bg-[#DDF1FF] text-[#34414A] py-20 md:py-28 scroll-mt-20">
        <div className="max-w-[1380px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-5 work-reveal">
              <img
                src={BUSINESS_INFO.logoCutout}
                alt="Mr. Plumber 2.0 official illustrated brand portrait"
                className="w-64 md:w-80 h-auto object-contain mb-6"
              />
              <div className="border-t border-[#34414A]/15 pt-4 text-sm text-[#34414A]/80 space-y-1">
                <p className="font-bold text-[#34414A]">Mr. Plumber 2.0</p>
                <p>{BUSINESS_INFO.specialty}</p>
                <p>{BUSINESS_INFO.location}</p>
              </div>
            </div>

            <div className="lg:col-span-7 work-reveal">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#1769E8] mb-3">
                About Mr. Plumber 2.0
              </p>
              <h2 className="font-display font-bold text-[clamp(2rem,3.6vw,3.1rem)] leading-[1.08] mb-6">
                Built on hands-on problem solving and honest trade craft.
              </h2>
              <p className="text-[17px] leading-[1.75] text-[#34414A]/88 mb-5">
                Plumbing is the unseen backbone of every comfortable home. Mr. Plumber 2.0 focuses
                on understanding how water supply and drainage materials work together—whether that
                means Copper, PEX-A, PEX-B, CPVC, PVC, ABS, or Cast Iron.
              </p>
              <p className="text-[17px] leading-[1.75] text-[#34414A]/88 mb-8">
                Based in Charlottesville, Virginia, the goal stays simple: listen carefully to what
                you are experiencing, explain the material options plainly, and leave every joint,
                valve, and drain run tidy and dependable.
              </p>

              <div className="flex flex-wrap gap-8">
                <BorderlessCTA
                  onClick={() => onNavigate('contact')}
                  arrow="↗"
                  className="text-[#1769E8] hover:text-[#FF914D]"
                >
                  Contact Mr. Plumber 2.0
                </BorderlessCTA>
                <BorderlessCTA
                  href={`mailto:${BUSINESS_INFO.email}`}
                  arrow="↗"
                  className="text-[#34414A] hover:text-[#1769E8]"
                >
                  {BUSINESS_INFO.email}
                </BorderlessCTA>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HUMAN TOUCH — PERSONAL INTERESTS (WARM IVORY, ZERO BOXES) */}
      <section className="bg-[#FFF9EF] text-[#34414A] py-20 md:py-24">
        <div className="max-w-[1380px] mx-auto px-6 md:px-10">
          <div className="max-w-2xl mb-12 work-reveal">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#FF914D] mb-3">
              Beyond the Wrench
            </p>
            <h2 className="font-display font-bold text-[clamp(1.85rem,3.2vw,2.75rem)] leading-[1.1]">
              A real person behind the brand in Charlottesville.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 pt-8 border-t border-[#34414A]/15 work-reveal">
            {PERSONAL_INTERESTS.map((interest, idx) => (
              <div key={interest.name}>
                <span className="text-xs font-bold text-[#08B9B0] tabular-nums block mb-2">
                  0{idx + 1}
                </span>
                <h3 className="font-display text-xl font-bold text-[#34414A] mb-2">
                  {interest.name}
                </h3>
                <p className="text-sm leading-relaxed text-[#34414A]/78">{interest.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
