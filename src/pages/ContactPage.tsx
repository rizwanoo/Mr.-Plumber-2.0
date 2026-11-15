import { useEffect, useRef, useState, type FormEvent } from 'react';
import gsap from 'gsap';
import { BUSINESS_INFO, SITE_IMAGES, VERIFIED_MATERIALS } from '../data/plumbingData';
import { BorderlessCTA } from '../components/BorderlessCTA';

interface ContactPageProps {
  prefillMaterial?: string;
}

interface FormState {
  name: string;
  phone: string;
  email: string;
  location: string;
  issue: string;
  material: string;
  details: string;
  website_url: string; // honeypot
}

interface SubmissionStatus {
  kind: 'idle' | 'submitting' | 'delivered' | 'smtp_unconfigured' | 'error';
  message: string;
  mailtoUrl?: string;
}

export function ContactPage({ prefillMaterial }: ContactPageProps) {
  const pageRef = useRef<HTMLDivElement>(null);
  const [csrfToken, setCsrfToken] = useState<string>('');
  const [formLoadedAt] = useState<number>(() => Date.now());
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<SubmissionStatus>({ kind: 'idle', message: '' });

  const [form, setForm] = useState<FormState>({
    name: '',
    phone: '',
    email: '',
    location: 'Charlottesville, VA',
    issue: '',
    material: prefillMaterial || '',
    details: '',
    website_url: '',
  });

  useEffect(() => {
    if (prefillMaterial) {
      setForm((prev) => ({ ...prev, material: prefillMaterial }));
    }
  }, [prefillMaterial]);

  useEffect(() => {
    let active = true;
    fetch('/api/csrf-token')
      .then((res) => res.json())
      .then((data) => {
        if (active && typeof data?.csrfToken === 'string') {
          setCsrfToken(data.csrfToken);
        }
      })
      .catch(() => {
        // Handled cleanly at submit time if token missing
      });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !pageRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.contact-stagger', {
        y: 24,
        opacity: 0,
        duration: 0.75,
        stagger: 0.1,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const validateClient = (): Record<string, string> => {
    const errs: Record<string, string> = {};
    if (form.name.trim().length < 2) errs.name = 'Please enter your full name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) {
      errs.email = 'Please enter a valid email address.';
    }
    if (form.phone.trim() && !/^[+\d\s().-]{7,25}$/.test(form.phone.trim())) {
      errs.phone = 'Please enter a valid phone number or leave blank.';
    }
    if (form.location.trim().length < 2) errs.location = 'Please provide your city or area.';
    if (form.issue.trim().length < 3) errs.issue = 'Please describe the plumbing issue or request.';
    if (form.details.trim().length < 10) {
      errs.details = 'Please include at least a brief sentence of details.';
    }
    return errs;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const clientErrors = validateClient();
    if (Object.keys(clientErrors).length > 0) {
      setFieldErrors(clientErrors);
      setStatus({
        kind: 'error',
        message: 'Please correct the highlighted fields before sending.',
      });
      return;
    }

    setFieldErrors({});
    setStatus({ kind: 'submitting', message: 'Validating and sending your inquiry...' });

    try {
      let tokenToSend = csrfToken;
      if (!tokenToSend) {
        const tokRes = await fetch('/api/csrf-token');
        const tokData = await tokRes.json();
        tokenToSend = tokData.csrfToken || '';
        setCsrfToken(tokenToSend);
      }

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          csrfToken: tokenToSend,
          formLoadedAt,
        }),
      });

      const data = await response.json();

      if (response.ok && data.delivered) {
        setStatus({
          kind: 'delivered',
          message: data.message,
        });
        setForm({
          name: '',
          phone: '',
          email: '',
          location: 'Charlottesville, VA',
          issue: '',
          material: '',
          details: '',
          website_url: '',
        });
        return;
      }

      if (data.errors) {
        setFieldErrors(data.errors);
      }

      if (data.smtpConfigured === false || data.mailtoUrl) {
        setStatus({
          kind: 'smtp_unconfigured',
          message: data.message,
          mailtoUrl: data.mailtoUrl,
        });
        return;
      }

      setStatus({
        kind: 'error',
        message: data.message || 'Unable to submit inquiry right now. Please email directly.',
      });
    } catch {
      setStatus({
        kind: 'error',
        message: `Network issue while contacting the server. You can reach Mr. Plumber 2.0 directly at ${BUSINESS_INFO.email}.`,
      });
    }
  };

  return (
    <div ref={pageRef}>
      {/* Full-bleed Vibrant Header Behind Transparent Navbar */}
      <section className="relative bg-[#1769E8] text-white pt-36 pb-20 md:pt-44 md:pb-24 overflow-hidden">
        <img
          src={SITE_IMAGES.heroCopper}
          alt="Copper supply pipes and brass shutoff valves"
          className="absolute inset-0 w-full h-full object-cover opacity-18"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-[#0E2E5C]/92 via-[#1769E8]/85 to-[#08B9B0]/80"
        />

        <div className="relative z-10 max-w-[1380px] mx-auto px-6 md:px-10">
          <p className="contact-stagger text-xs font-bold uppercase tracking-[0.12em] text-[#F4CF64] mb-4">
            Contact &amp; Service Inquiry · {BUSINESS_INFO.location}
          </p>
          <h1 className="contact-stagger font-display font-extrabold text-[clamp(2.5rem,5.4vw,4.5rem)] leading-[1.0] max-w-3xl mb-5">
            Reach Mr. Plumber 2.0 directly.
          </h1>
          <p className="contact-stagger text-white/92 text-lg md:text-xl leading-relaxed max-w-2xl">
            Share the details of your plumbing issue or pipework project in Charlottesville,
            Virginia. Reach out via the inquiry form, email, or official Facebook page.
          </p>
        </div>
      </section>

      {/* Main Split Editorial Layout — Open Form + Verified Contact Details (Zero Boxes) */}
      <section className="bg-white text-[#34414A] py-20 md:py-28">
        <div className="max-w-[1380px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20 items-start">
            {/* Left Column: Open Underline-Style Inquiry Form */}
            <div className="lg:col-span-7 contact-stagger">
              <h2 className="font-display font-bold text-3xl md:text-4xl text-[#34414A] mb-3">
                Service Inquiry Form
              </h2>
              <p className="text-[16px] text-[#34414A]/75 mb-10 max-w-xl">
                Every field uses clean server-side validation and CSRF protection. Tell us which
                material or system is involved so we can prepare properly.
              </p>

              <form onSubmit={handleSubmit} noValidate className="space-y-8">
                {/* Honeypot anti-spam field hidden from real users */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="website_url">Leave blank</label>
                  <input
                    id="website_url"
                    name="website_url"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={form.website_url}
                    onChange={(e) => setForm({ ...form, website_url: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-xs font-semibold uppercase tracking-[0.08em] text-[#34414A]/75 mb-1"
                    >
                      Customer Name *
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      aria-invalid={Boolean(fieldErrors.name)}
                      placeholder="Your full name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="underline-field"
                    />
                    {fieldErrors.name && (
                      <p className="mt-1.5 text-xs font-medium text-[#D1432F]">
                        {fieldErrors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-xs font-semibold uppercase tracking-[0.08em] text-[#34414A]/75 mb-1"
                    >
                      Phone Number (Optional)
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      aria-invalid={Boolean(fieldErrors.phone)}
                      placeholder="(434) 555-0100"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="underline-field"
                    />
                    {fieldErrors.phone && (
                      <p className="mt-1.5 text-xs font-medium text-[#D1432F]">
                        {fieldErrors.phone}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs font-semibold uppercase tracking-[0.08em] text-[#34414A]/75 mb-1"
                    >
                      Email Address *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      aria-invalid={Boolean(fieldErrors.email)}
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="underline-field"
                    />
                    {fieldErrors.email && (
                      <p className="mt-1.5 text-xs font-medium text-[#D1432F]">
                        {fieldErrors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="location"
                      className="block text-xs font-semibold uppercase tracking-[0.08em] text-[#34414A]/75 mb-1"
                    >
                      Location / Neighborhood *
                    </label>
                    <input
                      id="location"
                      name="location"
                      type="text"
                      required
                      aria-invalid={Boolean(fieldErrors.location)}
                      placeholder="Charlottesville, VA"
                      value={form.location}
                      onChange={(e) => setForm({ ...form, location: e.target.value })}
                      className="underline-field"
                    />
                    {fieldErrors.location && (
                      <p className="mt-1.5 text-xs font-medium text-[#D1432F]">
                        {fieldErrors.location}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label
                      htmlFor="issue"
                      className="block text-xs font-semibold uppercase tracking-[0.08em] text-[#34414A]/75 mb-1"
                    >
                      Plumbing Issue or Project *
                    </label>
                    <input
                      id="issue"
                      name="issue"
                      type="text"
                      required
                      aria-invalid={Boolean(fieldErrors.issue)}
                      placeholder="e.g., Valve replacement, pipe leak, drain line"
                      value={form.issue}
                      onChange={(e) => setForm({ ...form, issue: e.target.value })}
                      className="underline-field"
                    />
                    {fieldErrors.issue && (
                      <p className="mt-1.5 text-xs font-medium text-[#D1432F]">
                        {fieldErrors.issue}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="material"
                      className="block text-xs font-semibold uppercase tracking-[0.08em] text-[#34414A]/75 mb-1"
                    >
                      Material or System Involved
                    </label>
                    <select
                      id="material"
                      name="material"
                      value={form.material}
                      onChange={(e) => setForm({ ...form, material: e.target.value })}
                      className="underline-field bg-transparent cursor-pointer"
                    >
                      <option value="">Not sure / Multiple systems</option>
                      {VERIFIED_MATERIALS.map((mat) => (
                        <option key={mat.id} value={mat.shortLabel}>
                          {mat.shortLabel} ({mat.category})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="details"
                    className="block text-xs font-semibold uppercase tracking-[0.08em] text-[#34414A]/75 mb-1"
                  >
                    Additional Details *
                  </label>
                  <textarea
                    id="details"
                    name="details"
                    rows={4}
                    required
                    aria-invalid={Boolean(fieldErrors.details)}
                    placeholder="Describe what is happening, access location (basement, crawlspace, utility room), and preferred timeframe..."
                    value={form.details}
                    onChange={(e) => setForm({ ...form, details: e.target.value })}
                    className="underline-field resize-y"
                  />
                  {fieldErrors.details && (
                    <p className="mt-1.5 text-xs font-medium text-[#D1432F]">
                      {fieldErrors.details}
                    </p>
                  )}
                </div>

                {/* Submission Status Output (Honest, Zero Fake Success) */}
                {status.kind !== 'idle' && (
                  <div
                    role="status"
                    aria-live="polite"
                    className={`py-4 border-t border-b text-sm leading-relaxed ${
                      status.kind === 'delivered'
                        ? 'border-[#08B9B0] text-[#0B5A56]'
                        : status.kind === 'smtp_unconfigured'
                          ? 'border-[#FF914D] text-[#34414A]'
                          : status.kind === 'error'
                            ? 'border-[#D1432F] text-[#9E2B1C]'
                            : 'border-[#1769E8] text-[#1769E8]'
                    }`}
                  >
                    <p className="font-medium">{status.message}</p>
                    {status.mailtoUrl && (
                      <div className="mt-4 flex flex-wrap items-center gap-6">
                        <BorderlessCTA
                          href={status.mailtoUrl}
                          arrow="↗"
                          className="text-[#1769E8] hover:text-[#FF914D]"
                        >
                          Open Pre-Filled Email to {BUSINESS_INFO.email}
                        </BorderlessCTA>
                        <BorderlessCTA
                          href={BUSINESS_INFO.facebookUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          arrow="↗"
                          className="text-[#08B9B0] hover:text-[#1769E8]"
                        >
                          Message on Facebook
                        </BorderlessCTA>
                      </div>
                    )}
                  </div>
                )}

                <div className="pt-2">
                  <BorderlessCTA
                    type="submit"
                    disabled={status.kind === 'submitting'}
                    arrow="→"
                    className="text-[#1769E8] hover:text-[#FF914D] text-base"
                  >
                    {status.kind === 'submitting' ? 'Sending Inquiry' : 'Submit Service Inquiry'}
                  </BorderlessCTA>
                </div>
              </form>
            </div>

            {/* Right Column: Verified Contact Details & Configurable Placeholders (No Boxes) */}
            <div className="lg:col-span-5 contact-stagger bg-[#FFF9EF] p-8 md:p-12">
              <img
                src={BUSINESS_INFO.logoCutout}
                alt="Mr. Plumber 2.0 official portrait logo"
                className="w-28 h-auto object-contain mb-6"
              />
              <h2 className="font-display font-bold text-2xl md:text-3xl text-[#34414A] mb-6">
                Verified Contact Channels
              </h2>

              <div className="divide-y divide-[#34414A]/14">
                <div className="py-5">
                  <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#1769E8] mb-1.5">
                    Direct Email
                  </p>
                  <a
                    href={`mailto:${BUSINESS_INFO.email}`}
                    className="text-lg font-semibold text-[#34414A] hover:text-[#1769E8] transition-colors break-all"
                  >
                    {BUSINESS_INFO.email}
                  </a>
                </div>

                <div className="py-5">
                  <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#08B9B0] mb-1.5">
                    Official Facebook Page
                  </p>
                  <a
                    href={BUSINESS_INFO.facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg font-semibold text-[#34414A] hover:text-[#1769E8] transition-colors inline-flex items-center gap-2"
                  >
                    <span>facebook.com/Mr.Plumber2.0</span>
                    <span aria-hidden="true">↗</span>
                  </a>
                </div>

                <div className="py-5">
                  <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#FF914D] mb-1.5">
                    Service Location
                  </p>
                  <p className="text-lg font-semibold text-[#34414A]">{BUSINESS_INFO.location}</p>
                </div>

                <div className="py-5">
                  <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#34414A]/55 mb-1.5">
                    Phone &amp; Hours
                  </p>
                  <p className="text-sm leading-relaxed text-[#34414A]/78">
                    {BUSINESS_INFO.phone
                      ? BUSINESS_INFO.phone
                      : 'Direct phone number and posted business hours are kept configurable until verified directly with Mr. Plumber 2.0—please connect by email or Facebook in the meantime.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
