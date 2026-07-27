import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useInView, AnimatePresence } from "motion/react";
import {
  ArrowRight, CheckCircle2, TrendingUp, Users, Shield,
  Handshake, MapPin, Phone, Mail, ChevronDown, Star,
  Briefcase, Globe, Award, Zap, HeartHandshake, Building2, Bus,
} from "lucide-react";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import ServiceHero from "../components/services/ServiceHero";

// ─── Data ──────────────────────────────────────────────────────────────────────

const benefits = [
  {
    icon: TrendingUp,
    title: "Proven Business Model",
    description:
      "Operate under a tested system with established sales processes, pricing structures, and customer acquisition playbooks refined over years of field experience.",
  },
  {
    icon: Shield,
    title: "Brand & Credibility",
    description:
      "Leverage the Shiva Enterprises brand to win trust faster. Schools and institutions prefer working with names they recognise.",
  },
  {
    icon: Briefcase,
    title: "Full Product Portfolio",
    description:
      "Sell the entire suite — GPS tracking, school management systems, ID card solutions, websites, and e-commerce — from day one.",
  },
  {
    icon: Users,
    title: "Dedicated Support",
    description:
      "Get a dedicated onboarding manager, technical helpdesk access, and a regional partner community to help you close deals faster.",
  },
  {
    icon: Globe,
    title: "Exclusive Territory",
    description:
      "Each franchise is assigned an exclusive district or city zone, giving you a protected market to build your customer base without internal competition.",
  },
  {
    icon: Award,
    title: "Training & Certification",
    description:
      "Comprehensive initial training covering product demos, objection handling, pricing negotiations, and post-sale support workflows.",
  },
];

const steps = [
  { step: "01", title: "Submit Inquiry", description: "Fill out the franchise inquiry form below. Our team reviews every application within 24–48 hours." },
  { step: "02", title: "Discovery Call", description: "A senior partner will schedule a video call to understand your market, background, and investment capacity." },
  { step: "03", title: "Agreement & Onboarding", description: "Sign the franchise agreement and complete your onboarding week — product training, demo kit, and brand assets included." },
  { step: "04", title: "Launch & Grow", description: "Start pitching to schools and businesses in your territory. We support every deal with technical demos and proposal assistance." },
];

const faqs = [
  {
    question: "Do I need a technical background to run a Shiva Enterprises franchise?",
    answer:
      "No. Our training program is designed for business owners and sales professionals. The technical delivery is handled by our central team — your role is to identify clients, build relationships, and close deals.",
  },
  {
    question: "How long does it take to get my first client?",
    answer:
      "Most franchise partners close their first deal within 30–60 days of launch. We provide a lead pipeline starter pack and a product demo kit to help you get in front of schools immediately.",
  },
  {
    question: "Is the territory truly exclusive?",
    answer:
      "Yes. Once you sign the agreement, we do not onboard another franchise partner in your assigned district or zone for the duration of your contract.",
  },
  {
    question: "What is the revenue sharing model?",
    answer:
      "Franchise partners earn 20–40% commission on every product sold, depending on the product line and tier. Recurring SaaS contracts earn ongoing monthly commissions.",
  },
  {
    question: "What happens after I submit the inquiry form?",
    answer:
      "Our franchise team will contact you via phone or email within 24–48 hours to schedule an introductory call and share the detailed franchise prospectus.",
  },
];

// ─── Sub-components ────────────────────────────────────────────────────────────

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.21, 1.02, 0.43, 1.01] }}
    >
      {children}
    </motion.div>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-[#d4dde8] bg-white overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold text-slate-800 hover:bg-slate-50 transition-colors"
        aria-expanded={open}
      >
        <span>{question}</span>
        <ChevronDown className={`h-4 w-4 shrink-0 text-orange-600 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-5 text-sm leading-6 text-slate-600">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Inquiry Form ──────────────────────────────────────────────────────────────

type FormState = "idle" | "submitting" | "success" | "error";

interface FormData {
  name: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  investment: string;
  message: string;
}

const INITIAL_FORM: FormData = {
  name: "", email: "", phone: "", city: "", state: "", investment: "", message: "",
};

const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:5000";

function InquiryForm() {
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [status, setStatus] = useState<FormState>("idle");
  const [serverErrors, setServerErrors] = useState<string[]>([]);
  const [successId, setSuccessId] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setServerErrors([]);

    try {
      const res = await fetch(`${API_BASE}/api/franchise/inquiry`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json();

      if (res.ok && json.success) {
        setSuccessId(json.id ?? "");
        setStatus("success");
        setForm(INITIAL_FORM);
      } else {
        setServerErrors(json.errors ?? ["Something went wrong. Please try again."]);
        setStatus("error");
      }
    } catch {
      setServerErrors(["Unable to reach the server. Please check your connection."]);
      setStatus("error");
    }
  };

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/20 transition";
  const labelClass = "block mb-1.5 text-xs font-semibold text-slate-600 uppercase tracking-wide";

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center gap-5 rounded-2xl border border-green-200 bg-green-50 p-10 text-center"
      >
        <CheckCircle2 className="h-14 w-14 text-green-500" />
        <div>
          <h3 className="text-xl font-bold text-slate-900">Inquiry Submitted!</h3>
          <p className="mt-2 text-sm text-slate-600">
            Thank you for your interest. Our franchise team will reach out within 24–48 hours.
          </p>
          {successId && (
            <p className="mt-3 font-mono text-xs text-slate-500">Reference ID: <span className="text-orange-700 font-semibold">{successId}</span></p>
          )}
        </div>
        <button
          onClick={() => { setStatus("idle"); setSuccessId(""); }}
          className="rounded-xl bg-slate-900 px-6 py-2.5 text-sm font-bold text-white transition hover:bg-slate-700"
        >
          Submit Another Inquiry
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {serverErrors.length > 0 && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 space-y-1">
          {serverErrors.map((err, i) => <p key={i}>• {err}</p>)}
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>Full Name *</label>
          <input id="name" name="name" type="text" required value={form.name} onChange={handleChange}
            placeholder="Your full name" className={inputClass} />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>Email Address *</label>
          <input id="email" name="email" type="email" required value={form.email} onChange={handleChange}
            placeholder="you@example.com" className={inputClass} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className={labelClass}>Phone Number *</label>
          <input id="phone" name="phone" type="tel" required value={form.phone} onChange={handleChange}
            placeholder="+91 98765 43210" className={inputClass} />
        </div>
        <div>
          <label htmlFor="investment" className={labelClass}>Investment Range *</label>
          <select id="investment" name="investment" required value={form.investment} onChange={handleChange} className={inputClass}>
            <option value="" disabled>Select range</option>
            <option value="50000-100000">₹50,000 – ₹1,00,000 (Starter)</option>
            <option value="100000-300000">₹1,00,000 – ₹3,00,000 (Growth)</option>
            <option value="300000+">₹3,00,000+ (Enterprise)</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="city" className={labelClass}>City *</label>
          <input id="city" name="city" type="text" required value={form.city} onChange={handleChange}
            placeholder="e.g. Kalaburagi" className={inputClass} />
        </div>
        <div>
          <label htmlFor="state" className={labelClass}>State *</label>
          <input id="state" name="state" type="text" required value={form.state} onChange={handleChange}
            placeholder="e.g. Karnataka" className={inputClass} />
        </div>
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>Additional Message (Optional)</label>
        <textarea id="message" name="message" rows={4} value={form.message} onChange={handleChange}
          placeholder="Tell us about your background, experience, or any questions you have..."
          className={`${inputClass} resize-none`} />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-6 py-3.5 text-sm font-extrabold text-white shadow-lg transition hover:bg-slate-700 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
      >
        {status === "submitting" ? (
          <>
            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
              <path d="M12 2a10 10 0 0 1 10 10" />
            </svg>
            Submitting…
          </>
        ) : (
          <>
            Apply for Franchise
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </button>

      <p className="text-center text-[11px] text-slate-400">
        By submitting this form you agree to be contacted by Shiva Enterprises regarding franchise opportunities.
      </p>
    </form>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function Franchise() {
  useEffect(() => {
    document.title = "Franchise Opportunity — Shiva Enterprises";
    const desc = document.querySelector('meta[name="description"]');
    if (desc)
      desc.setAttribute(
        "content",
        "Join the Shiva Enterprises franchise network. Sell GPS tracking, school management systems, and digital solutions in your region with full training and support."
      );
  }, []);

  useEffect(() => {
    if (window.location.hash === '#live-demo') {
      const el = document.getElementById('live-demo');
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, []);

  return (
    <div className="min-h-screen text-slate-900 font-sans overflow-x-hidden pt-[var(--header-h)] flex flex-col" style={{ background: 'white' }}>
      <SiteHeader />

      {/* ── Hero ── */}
      <ServiceHero
        title="Franchise Opportunity"
        subtitle="Join our authorised partner network. Sell school management systems, GPS tracking, and digital solutions in your region with full training and support."
        tagline="Franchise"
      />

      {/* ── Why Partner ── */}
      <section className="px-4 py-12 md:py-16 border-b border-[#d4dde8]" style={{ background: 'white' }}>
        <FadeIn>
          <div className="mx-auto max-w-7xl">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-orange-700">
                Why Partner With Us
              </div>
              <h2 className="mt-4 text-2xl font-black tracking-tight text-slate-900 md:text-3xl lg:text-4xl">
                Everything you need to succeed from day one.
              </h2>
              <p className="mt-3 mx-auto max-w-2xl text-sm leading-6 text-slate-600">
                We have built the products, refined the sales process, and trained the support team. You bring local knowledge and ambition — we bring everything else.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {benefits.map((b, i) => (
                <FadeIn key={b.title} delay={i * 0.07}>
                  <div className="flex h-full flex-col gap-3 rounded-2xl border border-[#d4dde8] bg-white p-5 sm:p-6 shadow-sm transition hover:border-orange-300 hover:shadow-md">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white">
                      <b.icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-base font-bold text-slate-900 sm:text-lg">{b.title}</h3>
                    <p className="text-sm leading-6 text-slate-600">{b.description}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ── How It Works ── */}
      <section id="how-it-works" className="px-4 py-12 md:py-16 border-b border-[#d4dde8]" style={{ background: 'white' }}>
        <FadeIn>
          <div className="mx-auto max-w-7xl">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-orange-700">
                How It Works
              </div>
              <h2 className="mt-4 text-2xl font-black tracking-tight text-slate-900 md:text-3xl">
                From inquiry to your first sale in 4 steps.
              </h2>
            </div>

            <div className="relative mx-auto max-w-4xl">
              <div className="absolute left-[18px] top-0 bottom-0 w-px bg-slate-200 md:left-1/2 hidden md:block" />
              <div className="space-y-8 md:space-y-0">
                {steps.map((s, i) => (
                  <FadeIn key={s.step} delay={i * 0.1}>
                    <div className={`flex gap-5 md:gap-8 items-start md:items-center ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                      <div className={`w-full md:w-[calc(50%-2.5rem)] rounded-2xl border border-[#d4dde8] bg-white p-5 shadow-sm transition hover:border-orange-300 hover:shadow-md ${i % 2 !== 0 ? "md:text-right" : ""}`}>
                        <span className="font-mono text-xs font-bold text-orange-600">{s.step}</span>
                        <h3 className="mt-1 text-base font-bold text-slate-900 sm:text-lg">{s.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-slate-600">{s.description}</p>
                      </div>
                      <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-900 text-white font-bold text-sm shadow-md">
                        {i + 1}
                      </div>
                      <div className="hidden md:block md:w-[calc(50%-2.5rem)]" />
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ── FAQ ── */}
      <section className="px-4 py-12 md:py-16 border-b border-[#d4dde8]" style={{ background: 'white' }}>
        <FadeIn>
          <div className="mx-auto max-w-7xl">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-orange-700">
                FAQs
              </div>
              <h2 className="mt-4 text-2xl font-black tracking-tight text-slate-900 md:text-3xl">
                Common questions answered.
              </h2>
            </div>
            <div className="mx-auto max-w-3xl space-y-3">
              {faqs.map((faq) => (
                <FaqItem key={faq.question} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ── Apply Form ── */}
      <section id="apply" className="px-4 py-12 md:py-16" style={{ background: 'white' }}>
        <FadeIn>
          <div className="mx-auto max-w-7xl">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-orange-700">
                <Handshake className="h-3.5 w-3.5" />
                Apply Now
              </div>
              <h2 className="mt-4 text-2xl font-black tracking-tight text-slate-900 md:text-3xl">
                Start your franchise journey today.
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Fill in the form below and our franchise team will get in touch within 24–48 hours.
              </p>
            </div>

            <div className="mx-auto max-w-2xl rounded-2xl border border-[#d4dde8] bg-white p-6 sm:p-8 shadow-sm">
              <InquiryForm />
            </div>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-slate-600">
              <a href="tel:7349018613" className="flex items-center gap-2 hover:text-orange-700 transition">
                <Phone className="h-4 w-4 text-orange-600" />
                +91 7349018613
              </a>
              <a href="mailto:info@shivaenterprises.net.in" className="flex items-center gap-2 hover:text-orange-700 transition">
                <Mail className="h-4 w-4 text-orange-600" />
                info@shivaenterprises.net.in
              </a>
              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-orange-600" />
                Kalaburagi, Karnataka
              </span>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ── Footer CTA ── */}
      <section className="border-t border-[#d4dde8] px-4 py-12 md:py-16 text-center" style={{ background: 'white' }}>
        <p className="text-sm text-slate-500">
          Already a partner?{" "}
          <Link to="/contact" className="font-semibold text-orange-700 hover:text-orange-600 transition">
            Contact your account manager
          </Link>
          {" "}·{" "}
          <Link to="/" className="font-semibold text-slate-700 hover:text-orange-700 transition">
            Back to Home
          </Link>
        </p>
      </section>
      <SiteFooter style={{ background: 'white' }} />
    </div>
  );
}

