import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface CTASectionProps {
  title?: string;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
  variant?: 'primary' | 'outline';
}

export default function CTASection({
  title = 'Ready to get started?',
  description = 'Get a tailored plan and quote for your project. No obligation.',
  ctaText = 'Contact Us',
  ctaLink = '/request-proposal',
  variant = 'primary',
}: CTASectionProps) {
  const nav = useNavigate();
  const handleClick = () => {
    if (ctaLink.startsWith('/') && !ctaLink.startsWith('tel:') && !ctaLink.startsWith('mailto:')) {
      nav(ctaLink);
    } else {
      window.open(ctaLink, '_self');
    }
  };

  return (
    <section
      className="border-t border-[#d4dde8] px-4 py-12 sm:px-6 sm:py-16 md:px-8 md:py-20"
      style={{ background: 'var(--bg-base)' }}
    >
      <div className="mx-auto max-w-5xl">
        <div className="relative overflow-hidden rounded-3xl border border-[#d4dde8] bg-white p-6 sm:p-8 md:p-10 lg:p-12 shadow-sm">
          {/* Subtle background accent */}
          <div className="absolute inset-0 bg-[radial-gradient(#c8d8e8_1px,transparent_1px)] [background-size:22px_22px] opacity-30 pointer-events-none" />
          <div className="relative text-center max-w-2xl mx-auto space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-orange-700">
              Get Started
            </div>
            <h4 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-slate-900">
              {title}
            </h4>
            <p className="text-sm sm:text-base leading-6 text-slate-500 sm:leading-7">
              {description}
            </p>
            <div className="pt-2">
              <button
                onClick={handleClick}
                className={`inline-flex items-center justify-center gap-2 rounded-2xl px-7 py-3.5 text-sm font-extrabold transition ${
                  variant === 'primary'
                    ? 'bg-slate-900 text-white shadow-sm hover:bg-slate-800 hover:-translate-y-0.5'
                    : 'border border-[#d4dde8] bg-white text-slate-700 hover:border-orange-300 hover:text-orange-700'
                }`}
              >
                {ctaText}
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
