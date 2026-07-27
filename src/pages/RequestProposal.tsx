import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Send, CheckCircle2, User, Mail, Building2, Bus,
  MessageSquare, ArrowRight
} from 'lucide-react';
import SiteHeader from '../components/SiteHeader';
import SiteFooter from '../components/SiteFooter';

const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:5000';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function RequestProposal() {
  const [status, setStatus]           = useState<Status>('idle');
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [schoolName, setSchoolName]   = useState('');
  const [busEstimate, setBusEstimate] = useState('1-3');
  const [message, setMessage]         = useState('');
  const [serverErrors, setServerErrors] = useState<string[]>([]);
  const [refId, setRefId]             = useState('');

  useEffect(() => {
    document.title = 'Request a Proposal — Shiva Enterprises';
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', 'Request a free custom proposal for your school, transport, or business project with Shiva Enterprises.');
  }, []);

  const resetForm = () => {
    setContactName('');
    setContactEmail('');
    setSchoolName('');
    setBusEstimate('1-3');
    setMessage('');
    setServerErrors([]);
    setRefId('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !contactEmail.trim()) return;

    setStatus('submitting');
    setServerErrors([]);

    try {
      const res = await fetch(`${API_BASE}/api/proposals`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contactName:  contactName.trim(),
          contactEmail: contactEmail.trim(),
          schoolName:   schoolName.trim(),
          busEstimate,
          message:      message.trim(),
        }),
      });

      const json = await res.json();

      if (res.ok && json.success) {
        setRefId(json.id ?? '');
        setStatus('success');
        resetForm();
      } else {
        setServerErrors(json.errors ?? [json.error ?? 'Something went wrong. Please try again.']);
        setStatus('error');
      }
    } catch {
      setServerErrors(['Unable to reach the server. Please check your connection.']);
      setStatus('error');
    }
  };

  const inputClass = 'w-full bg-white border border-slate-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 rounded-xl px-4 py-3 text-sm outline-none transition placeholder:text-slate-400';
  const labelClass = 'block mb-1.5 text-xs font-semibold text-slate-600 uppercase tracking-wide';

  return (
    <div className="min-h-screen text-slate-900 font-sans pt-[var(--header-h)]" style={{ background: 'var(--bg-base)' }}>
      <SiteHeader />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-[#d4dde8]" style={{ background: 'var(--bg-base)' }}>
          <div className="absolute inset-0 bg-[radial-gradient(#c8d8e8_1px,transparent_1px)] [background-size:22px_22px] opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#eef3f8] via-transparent to-transparent opacity-60" />
          <div className="relative mx-auto max-w-7xl px-4 py-12 md:px-8 lg:py-16">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3 py-1 font-mono text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.15em] sm:tracking-[0.22em] text-orange-700">
                <MessageSquare className="h-3.5 w-3.5" />
                Custom Proposal
              </div>
              <h1 className="mt-4 sm:mt-5 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-tight tracking-tight text-slate-900">
                Let's build a plan tailored to your needs
              </h1>
              <p className="mt-4 sm:mt-5 max-w-2xl text-xs sm:text-sm leading-6 text-slate-600 md:text-base md:leading-7">
                Tell us about your school, fleet, or business and we will prepare a clear, no-pressure recommendation with timelines and pricing options.
              </p>
            </div>
          </div>
        </section>

        {/* Form + sidebar */}
        <section className="px-4 py-8 md:py-12 lg:py-16" style={{ background: 'var(--bg-section)' }}>
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">

              {/* Sidebar */}
              <div className="space-y-4 sm:space-y-5">
                <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-900 text-white">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-base sm:text-lg font-bold text-slate-900">What happens next?</h3>
                  <ol className="mt-3 sm:mt-4 space-y-2.5 sm:space-y-3">
                    {[
                      'Submit your details below',
                      'Our team reviews your requirements within 24 hours',
                      'We schedule a quick call or site visit',
                      'You receive a detailed proposal with options',
                    ].map((step, i) => (
                      <li key={i} className="flex gap-2.5 sm:gap-3 text-sm text-slate-700">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-xs font-bold text-slate-900">
                          {i + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
                  <h4 className="text-sm font-bold text-slate-900">Need immediate assistance?</h4>
                  <p className="mt-2 text-xs text-slate-600">
                    For urgent inquiries, call us directly or email our Kalaburagi base.
                  </p>
                  <div className="mt-3 space-y-2 text-sm">
                    <a href="tel:7349018613" className="block text-orange-700 hover:text-orange-800 transition">+91 7349018613</a>
                    <a href="mailto:info@shivaenterprises.net.in" className="block text-orange-700 hover:text-orange-800 transition">info@shivaenterprises.net.in</a>
                  </div>
                </div>
              </div>

              {/* Form card */}
              <div className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 md:p-8 shadow-sm">
                <AnimatePresence mode="wait">

                  {/* Success */}
                  {status === 'success' ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="flex h-full flex-col items-center justify-center text-center space-y-5 py-8"
                    >
                      <div className="w-14 h-14 sm:w-16 sm:h-16 bg-emerald-50 border border-emerald-200 rounded-full flex items-center justify-center text-emerald-600">
                        <CheckCircle2 className="w-7 h-7 sm:w-8 sm:h-8" />
                      </div>
                      <div>
                        <h4 className="text-lg sm:text-xl font-bold text-slate-900">Request Received!</h4>
                        <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                          Our team will get back to you within 24 hours with a tailored proposal.
                        </p>
                        {refId && (
                          <p className="mt-3 font-mono text-xs text-slate-500">
                            Reference ID: <span className="text-orange-700 font-semibold">{refId}</span>
                          </p>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => setStatus('idle')}
                        className="text-sm text-orange-700 hover:text-orange-800 transition"
                      >
                        Submit another request
                      </button>
                    </motion.div>

                  ) : (
                    /* Form */
                    <motion.form
                      key="form"
                      onSubmit={handleSubmit}
                      className="space-y-5"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <div className="space-y-1">
                        <h4 className="text-lg sm:text-xl font-bold text-slate-900">Request Custom Proposal</h4>
                        <p className="text-xs text-slate-500">
                          Fill in your details and we will prepare a detailed recommendation for your organisation.
                        </p>
                      </div>

                      {/* Server errors */}
                      {serverErrors.length > 0 && (
                        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 space-y-1">
                          {serverErrors.map((err, i) => <p key={i}>• {err}</p>)}
                        </div>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <div>
                          <label className={labelClass}>Your Full Name *</label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <input
                              type="text"
                              required
                              value={contactName}
                              onChange={(e) => setContactName(e.target.value)}
                              className={`${inputClass} pl-9`}
                              placeholder="e.g. Anand Patil"
                            />
                          </div>
                        </div>
                        <div>
                          <label className={labelClass}>Email Address *</label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <input
                              type="email"
                              required
                              value={contactEmail}
                              onChange={(e) => setContactEmail(e.target.value)}
                              className={`${inputClass} pl-9`}
                              placeholder="e.g. anand@school.com"
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className={labelClass}>School / Institution / Business Name</label>
                        <div className="relative">
                          <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                          <input
                            type="text"
                            value={schoolName}
                            onChange={(e) => setSchoolName(e.target.value)}
                            className={`${inputClass} pl-9`}
                            placeholder="e.g. Kalaburagi Public School"
                          />
                        </div>
                      </div>

                      <div>
                        <label className={labelClass}>Approximate Bus Count</label>
                        <div className="relative">
                          <Bus className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                          <select
                            value={busEstimate}
                            onChange={(e) => setBusEstimate(e.target.value)}
                            className={`${inputClass} pl-9 cursor-pointer appearance-none`}
                          >
                            <option value="1-3">1 to 3 Buses</option>
                            <option value="4-10">4 to 10 Buses</option>
                            <option value="11-20">11 to 20 Buses</option>
                            <option value="20+">More than 20 Buses</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className={labelClass}>Additional Notes</label>
                        <textarea
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          rows={4}
                          className={`${inputClass} resize-none`}
                          placeholder="Tell us about your project, timeline, or any specific requirements..."
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={status === 'submitting'}
                        className="w-full mt-2 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-sm rounded-xl transition flex items-center justify-center gap-2 shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {status === 'submitting' ? (
                          <>
                            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                              <path d="M12 2a10 10 0 0 1 10 10" />
                            </svg>
                            Sending…
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            Send My Request
                          </>
                        )}
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>

            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

