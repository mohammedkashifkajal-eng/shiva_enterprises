import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ServiceHeroProps {
  title: React.ReactNode;
  subtitle?: string;
  tagline?: React.ReactNode;
  ctaLabel?: string;
  ctaLink?: string;
  secondaryCtaLabel?: string;
  secondaryCtaLink?: string;
  image?: string;
  children?: React.ReactNode;
}

// Icon-based gradient backgrounds per service — no image dependency
const gradients: Record<string, string> = {
  'Digital Experiences That Convert':   'from-indigo-900 via-slate-900 to-slate-950',
  'Online Stores That Grow With You':   'from-emerald-900 via-slate-800 to-slate-900',
  'Paperless School Operations':        'from-violet-900 via-slate-800 to-slate-900',
  'Safety On Every Route':              'from-orange-900 via-slate-800 to-slate-900',
  'Campus-Wide Digital Control':        'from-teal-900 via-slate-800 to-slate-900',
};

function getGradient(tagline?: React.ReactNode): string {
  if (typeof tagline === 'string' && gradients[tagline]) {
    return gradients[tagline];
  }
  return 'from-slate-900 via-slate-800 to-slate-900';
}

export default function ServiceHero({
  title,
  subtitle,
  tagline = 'SHIVA ENTERPRISES',
  ctaLabel = 'Request a Proposal',
  ctaLink = '/request-proposal',
  secondaryCtaLabel = 'View All Services',
  secondaryCtaLink = '/services',
  image,
  children,
}: ServiceHeroProps) {
  const gradient = getGradient(tagline);

  const renderCta = (label: string, link: string, primary: boolean) => {
    const isAnchor = link.startsWith('#') || link.startsWith('http');
    const className = primary
      ? "inline-flex items-center gap-2 rounded-2xl bg-orange-500 px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-orange-400 hover:-translate-y-0.5"
      : "inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20";

    if (isAnchor) {
      return (
        <a href={link} className={className}>
          {label}
          {primary && <ArrowRight className="h-4 w-4" />}
        </a>
      );
    }
    return (
      <Link to={link} className={className}>
        {label}
        {primary && <ArrowRight className="h-4 w-4" />}
      </Link>
    );
  };

  return (
    <section className="relative overflow-hidden border-b border-slate-200">
      {/* Dark gradient background with subtle texture */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`}>
        {/* Dot grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
            backgroundSize: '10px 10px',
          }}
        />
        {/* Radial glow bottom-left */}
        <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-orange-500/20 blur-3xl" />
        {/* Radial glow top-right */}
        <div className="absolute -top-32 -right-16 h-80 w-80 rounded-full bg-white/5 blur-2xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-20 lg:py-24 xl:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="max-w-2xl">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-orange-400/40 bg-orange-400/10 px-3 py-1.5 font-mono text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.18em] text-orange-400"
            >
              {tagline}
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-4 font-display font-black leading-[1.05] tracking-tight text-white
                         text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl"
            >
              {title}
            </motion.h1>

            {/* Subtitle */}
            {subtitle && (
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-3 sm:mt-4 text-sm md:text-base leading-6 text-slate-300 md:leading-7 max-w-xl"
              >
                {subtitle}
              </motion.p>
            )}

            {/* CTA */}
            {(ctaLabel || secondaryCtaLabel) && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-5 flex flex-wrap items-center gap-3"
              >
                {ctaLabel && renderCta(ctaLabel, ctaLink, true)}
                {secondaryCtaLabel && renderCta(secondaryCtaLabel, secondaryCtaLink, false)}
              </motion.div>
            )}

            {children && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                {children}
              </motion.div>
            )}
          </div>

          {image && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative hidden lg:flex justify-center"
            >
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              >
                <img
                  src={image}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  decoding="async"
                  className="w-[320px] h-[320px] object-cover rounded-full shadow-2xl border-4 border-white/10"
                />
                <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-orange-500/10 to-transparent -z-10 blur-2xl" />
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
