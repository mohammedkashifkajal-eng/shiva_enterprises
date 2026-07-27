import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, CheckCircle2, ShieldCheck, Mail, Phone, Zap } from 'lucide-react';
import SiteHeader from '../components/SiteHeader';
import InsuranceCalculator from '../components/InsuranceCalculator';

export default function Pricing() {
  useEffect(() => {
    document.title = 'Pricing — Shiva Enterprises';
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', "See how much your school saves when digital solutions are reinvested through our insurance partnership model, or explore our custom development packages.");
  }, []);

  const customTiers = [
    {
      name: 'Custom Web Dev',
      price: '₹25,000',
      period: 'starting price',
      description: 'Stunning websites built to load instantly, optimized for search engines, and fully mobile responsive.',
      features: [
        'Custom Design System',
        'Vite + React modern frontend',
        'SEO & Performance Optimization',
        'Free Domain & SSL setup support',
        '1 month post-launch revisions'
      ]
    },
    {
      name: 'E-Commerce Platform',
      price: '₹55,000',
      period: 'starting price',
      description: 'Fully-featured digital storefronts designed to streamline invoicing, cart, payments, and tracking.',
      features: [
        'Razorpay / Stripe Payments Integration',
        'Dynamic Inventory management',
        'Admin CRM & Dashboard panels',
        'Automated Invoicing PDF engines',
        '3 months post-launch support'
      ]
    },
    {
      name: 'Enterprise Solutions',
      price: 'Custom',
      period: 'get a quote',
      description: 'Custom portal architectures, biometric systems, or dedicated vehicle camera setups designed for scaling teams.',
      features: [
        'Tailored dashboard logic & database',
        'Hardware integrations (RFID / Biometrics)',
        'Server-side scaling configurations',
        'On-site field team training sessions',
        '1-year priority SLA support package'
      ]
    }
  ];

  return (
    <div className="min-h-screen text-slate-900 font-sans pt-[var(--header-h)]" style={{ background: 'var(--bg-base)' }}>
      <SiteHeader />

      <main>
        {/* Header section matching Image 2 style */}
        <section className="relative overflow-hidden border-b border-[#d4dde8] py-12 md:py-16" style={{ background: 'var(--bg-base)' }}>
          <div className="absolute inset-0 bg-[radial-gradient(#c8d8e8_1px,transparent_1px)] [background-size:22px_22px] opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#eef3f8] via-transparent to-transparent opacity-60" />
          
          <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6">
            <div className="max-w-3xl mx-auto space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-50 border border-slate-200 rounded-full text-orange-700 text-[10px] font-mono tracking-wider uppercase">
                Smart Insurance Model
              </div>
              <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
                Calculate Your <span className="text-orange-600">School's Savings</span>
              </h1>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
                See how much your school saves when digital solutions are reinvested through our insurance partnership model.
              </p>
            </div>
          </div>
        </section>

        {/* Insurance Calculator Section */}
        <section className="px-4 py-12 md:py-16 lg:py-20" style={{ background: 'var(--bg-section)' }}>
          <div className="mx-auto max-w-7xl">
            <InsuranceCalculator />
          </div>
        </section>

        {/* Custom Development Pricing Section */}
        <section className="px-4 py-16 border-t border-b border-[#d4dde8] md:py-20" style={{ background: 'var(--bg-base)' }}>
          <div className="mx-auto max-w-7xl">
            <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-900 text-white rounded-full text-[10px] font-mono uppercase tracking-widest">
                <Zap className="w-3.5 h-3.5 text-orange-400" />
                Direct Purchase Models
              </div>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
                Custom Development Packages
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                For organizations looking for direct custom solutions outside the Insurance Reinvestment model.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {customTiers.map((tier) => (
                <div
                  key={tier.name}
                  className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-orange-400 hover:shadow-md sm:p-8"
                >
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">{tier.name}</h3>
                      <p className="mt-2 text-xs text-slate-500 leading-relaxed">{tier.description}</p>
                    </div>
                    
                    <div className="flex items-baseline gap-1 py-2 border-b border-slate-100">
                      <span className="text-3xl font-black text-slate-900 tracking-tight">{tier.price}</span>
                      <span className="text-xs text-slate-400 font-medium">/ {tier.period}</span>
                    </div>

                    <ul className="space-y-2.5 pt-2">
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2.5 text-xs text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8">
                    <Link
                      to="/request-proposal"
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-xs font-bold text-white transition hover:bg-slate-800"
                    >
                      Request Detailed Quote
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Contact Info Footer */}
        <section className="px-4 py-16 md:py-20" style={{ background: 'var(--bg-section)' }}>
          <div className="mx-auto max-w-4xl text-center space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-slate-50 px-3 py-1 text-[10px] font-mono font-semibold uppercase tracking-wider text-orange-700">
              Get Started
            </div>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-slate-900">
              Ready to unlock your digital platform?
            </h3>
            <p className="mx-auto max-w-2xl text-xs sm:text-sm leading-relaxed text-slate-600">
              Contact our team in Kalaburagi for a detailed walk-through, or let us assist with your bus insurance setup to activate your school's reinvestment benefits.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link
                to="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-white border border-slate-200 px-6 py-3.5 text-xs sm:text-sm font-semibold text-slate-700 shadow-sm transition hover:border-orange-400 hover:text-orange-700"
              >
                <Phone className="w-4 h-4 text-orange-600" />
                View Contact Info
              </Link>
              <Link
                to="/request-proposal"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-6 py-3.5 text-xs sm:text-sm font-extrabold text-white shadow-lg transition hover:bg-slate-800 hover:shadow-xl"
              >
                Request Custom Proposal
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#d4dde8] py-12 md:py-16" style={{ background: 'var(--bg-base)' }}>
        <div className="max-w-6xl mx-auto px-4 flex flex-col items-center gap-6">
          <div className="flex flex-wrap items-center justify-center gap-4 text-[10px] font-mono text-slate-500">
            <Link to="/about"            className="transition hover:text-orange-700">About</Link>
            <Link to="/services"         className="transition hover:text-orange-700">Solutions</Link>
             <Link to="/bus-demo#live-demo"         className="transition hover:text-orange-700">Live Demo</Link>
            <Link to="/franchise"        className="transition hover:text-orange-700">Franchise</Link>
            <Link to="/pricing"          className="transition hover:text-orange-700">Pricing</Link>
            <Link to="/contact"          className="transition hover:text-orange-700">Contact</Link>
            <Link to="/request-proposal" className="transition hover:text-orange-700">Request Proposal</Link>
            <a href="http://shivaenterprises.net.in" target="_blank" rel="noopener noreferrer" className="transition hover:text-orange-700">Portal</a>
            <span>© 2026 SHIVA ENTERPRISES. All Rights Reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

