import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Globe, ArrowRight, Clock, Navigation, Send, CheckCircle2, User, MessageSquare } from 'lucide-react';
import SiteHeader from '../components/SiteHeader';
import SiteFooter from '../components/SiteFooter';
import ServiceHero from '../components/services/ServiceHero';

const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:5000';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

function ContactForm() {
  const [name, setName]       = useState('');
  const [email, setEmail]     = useState('');
  const [phone, setPhone]     = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus]   = useState<FormStatus>('idle');
  const [errors, setErrors]   = useState<string[]>([]);

  const inputClass = 'w-full bg-white border border-[#d4dde8] focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 rounded-xl px-4 py-3 text-sm outline-none transition placeholder:text-slate-400';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrors([]);

    try {
      const res = await fetch(`${API_BASE}/api/contacts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), phone: phone.trim(), subject: subject.trim(), message: message.trim() }),
      });
      const json = await res.json();
      if (res.ok && json.success) {
        setStatus('success');
        setName(''); setEmail(''); setPhone(''); setSubject(''); setMessage('');
      } else {
        setErrors(json.errors ?? [json.error ?? 'Something went wrong. Please try again.']);
        setStatus('error');
      }
    } catch {
      setErrors(['Unable to reach the server. Please check your connection.']);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center gap-4 py-10 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600">
          <CheckCircle2 className="h-7 w-7" />
        </div>
        <div>
          <h4 className="text-lg font-bold text-slate-900">Message Sent!</h4>
          <p className="mt-1 text-sm text-slate-600">We typically reply within 24 hours.</p>
        </div>
        <button onClick={() => setStatus('idle')} className="text-sm text-orange-700 hover:text-orange-800 transition">
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      {errors.length > 0 && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 space-y-1">
          {errors.map((e, i) => <p key={i}>• {e}</p>)}
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="block mb-1.5 text-xs font-semibold text-slate-600 uppercase tracking-wide">Full Name *</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input type="text" required value={name} onChange={e => setName(e.target.value)}
              placeholder="Your name" className={`${inputClass} pl-9`} />
          </div>
        </div>
        <div>
          <label className="block mb-1.5 text-xs font-semibold text-slate-600 uppercase tracking-wide">Email Address *</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com" className={`${inputClass} pl-9`} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="block mb-1.5 text-xs font-semibold text-slate-600 uppercase tracking-wide">Phone (Optional)</label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input type="tel" value={phone} onChange={e => setPhone(e.target.value)}
              placeholder="+91 98765 43210" className={`${inputClass} pl-9`} />
          </div>
        </div>
        <div>
          <label className="block mb-1.5 text-xs font-semibold text-slate-600 uppercase tracking-wide">Subject</label>
          <input type="text" value={subject} onChange={e => setSubject(e.target.value)}
            placeholder="e.g. GPS Tracking Inquiry" className={inputClass} />
        </div>
      </div>

      <div>
        <label className="block mb-1.5 text-xs font-semibold text-slate-600 uppercase tracking-wide">Message *</label>
        <textarea required rows={5} value={message} onChange={e => setMessage(e.target.value)}
          placeholder="Tell us how we can help you..."
          className={`${inputClass} resize-none`} />
      </div>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3.5 text-sm font-extrabold text-white shadow-sm transition hover:bg-slate-800 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === 'submitting' ? (
          <>
            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" strokeOpacity="0.25" /><path d="M12 2a10 10 0 0 1 10 10" />
            </svg>
            Sending…
          </>
        ) : (
          <><Send className="h-4 w-4" />Send Message</>
        )}
      </button>
    </form>
  );
}

export default function Contact() {
  useEffect(() => {
    document.title = 'Contact Us — Shiva Enterprises';
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', 'Get in touch with Shiva Enterprises. We are based in Kalaburagi, serving schools, colleges, and businesses across the region.');
  }, []);

  return (
    <div className="min-h-screen text-slate-900 font-sans pt-[var(--header-h)] flex flex-col" style={{ background: 'var(--bg-base)' }}>
      <SiteHeader />
      <ServiceHero
        title="Contact Us For More Information"
        subtitle="Whether you need a new school portal, fleet tracking, or a professional website, our team in Kalaburagi is ready to help you build the right solution."
        tagline="Get In Touch"
      />
      <section className="relative px-4 py-12 md:py-16 flex-grow" style={{ background: 'var(--bg-section)' }}>
        <div className="absolute inset-0 bg-[radial-gradient(#c8d8e8_1px,transparent_1px)] [background-size:28px_28px] opacity-50 pointer-events-none" />
        <div className="relative mx-auto max-w-7xl space-y-8">

          {/* Info cards */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

            <div className="rounded-2xl border border-[#d4dde8] bg-white p-5 sm:p-6 shadow-sm transition hover:border-orange-300 hover:shadow-md">
              <div className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl border border-orange-200 bg-orange-50 text-orange-700">
                <MapPin className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-base sm:text-lg font-bold text-slate-900">Corporate Office</h3>
              <p className="mt-2 text-xs sm:text-sm leading-6 text-slate-600">
                Plot No. 4, Behind Central Bus Stand,<br />
                CIB Colony, KALABURAGI - 585 103,<br />
                Karnataka, India
              </p>
              <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
                <Clock className="h-3.5 w-3.5" />
                Mon – Sat: 9:00 AM – 6:00 PM
              </div>
            </div>

            <div className="rounded-2xl border border-[#d4dde8] bg-white p-5 sm:p-6 shadow-sm transition hover:border-orange-300 hover:shadow-md">
              <div className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl border border-orange-200 bg-orange-50 text-orange-700">
                <Phone className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-base sm:text-lg font-bold text-slate-900">Call Us</h3>
              <div className="mt-2 space-y-2 text-xs sm:text-sm text-slate-600">
                <a href="tel:7349018613" className="block hover:text-orange-700 transition">+91 7349018613</a>
                <a href="tel:9632325991" className="block hover:text-orange-700 transition">+91 9632325991</a>
                <a href="tel:9916871111" className="block hover:text-orange-700 transition">+91 9916871111</a>
              </div>
              <p className="mt-3 text-xs text-slate-500">Available during business hours</p>
            </div>

            <div className="rounded-2xl border border-[#d4dde8] bg-white p-5 sm:p-6 shadow-sm transition hover:border-orange-300 hover:shadow-md">
              <div className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl border border-orange-200 bg-orange-50 text-orange-700">
                <Mail className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-base sm:text-lg font-bold text-slate-900">Email Us</h3>
              <div className="mt-2 space-y-2 text-xs sm:text-sm text-slate-600">
                <a href="mailto:info@shivaenterprises.net.in" className="block hover:text-orange-700 transition">info@shivaenterprises.net.in</a>
              </div>
              <p className="mt-3 text-xs text-slate-500">We typically reply within 24 hours</p>
            </div>

            {/* Google Map */}
            <div className="rounded-2xl border border-[#d4dde8] bg-white p-5 sm:p-6 shadow-sm sm:col-span-2 lg:col-span-3">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-orange-200 bg-orange-50 text-orange-700">
                  <Navigation className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">Find Us</h3>
                  <p className="text-xs text-slate-500">Plot No. 4, Behind Central Bus Stand, CIB Colony, KALABURAGI - 585 103</p>
                </div>
              </div>
              <div className="w-full h-[280px] sm:h-[380px] overflow-hidden rounded-xl border border-[#e8edf3]">
                <iframe
                  title="Shiva Enterprises Location"
                  src="https://maps.google.com/maps?q=17.325195,76.8157049&z=16&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full"
                  style={{ height: '100%', minHeight: '100%' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Our Website */}
            <div className="rounded-2xl border border-[#d4dde8] bg-white p-5 sm:p-6 shadow-sm transition hover:border-orange-300 hover:shadow-md sm:col-span-2 lg:col-span-3">
              <div className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl border border-orange-200 bg-orange-50 text-orange-700">
                <Globe className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-base sm:text-lg font-bold text-slate-900">Our Website</h3>
              <div className="mt-2">
                <a href="http://shivaenterprises.net.in" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-orange-700 hover:text-orange-800 transition text-sm sm:text-base">
                  shivaenterprises.net.in
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
              <p className="mt-2 text-xs sm:text-sm text-slate-600">
                Visit our corporate portal for case studies, testimonials, and portfolio samples.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="rounded-2xl border border-[#d4dde8] bg-white p-5 sm:p-6 md:p-8 shadow-sm">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-orange-200 bg-orange-50 text-orange-700">
                <MessageSquare className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900">Send Us a Message</h3>
                <p className="text-xs text-slate-500">We reply within 24 hours on business days.</p>
              </div>
            </div>
            <ContactForm />
          </div>

          {/* Service Regions */}
          <div className="rounded-2xl border border-[#d4dde8] bg-white p-5 sm:p-6 md:p-8">
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">Service Regions</h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-600">
              We provide on-site deployment and support to schools, colleges, and businesses across:
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {['Kalaburagi (Gulbarga)', 'Bidar', 'Yadgir', 'Raichur', 'Sedam', 'Chittapur', 'Afzalpur', 'Shahapur', 'Wadi', 'Jevargi'].map((city) => (
                <span key={city} className="rounded-full border border-[#d4dde8] bg-[#fdfaf7] px-3 py-1.5 text-xs text-slate-700">
                  {city}
                </span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center pb-2">
            <Link to="/request-proposal"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-8 py-3 text-sm font-extrabold text-white shadow-sm transition hover:bg-slate-800">
              Request a Custom Proposal
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
