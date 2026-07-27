import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface FeatureItem {
  title: string;
  description: string;
  icon: LucideIcon;
}

interface FeaturesSectionProps {
  title?: string;
  subtitle?: string;
  features: FeatureItem[];
}

export default function FeaturesSection({
  title = 'What We Build',
  subtitle,
  features,
}: FeaturesSectionProps) {
  return (
    <section
      className="border-t border-[#d4dde8] px-4 py-12 sm:px-6 sm:py-16 md:px-8 md:py-20"
      style={{ background: 'var(--bg-base)' }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-orange-700">
            Features
          </div>
          <h2 className="mt-4 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl md:text-4xl">
            {title}
          </h2>
          {subtitle && (
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base sm:leading-7">
              {subtitle}
            </p>
          )}
        </div>
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
                className="flex h-full flex-col gap-4 rounded-2xl border border-[#d4dde8] bg-white p-5 sm:p-6 shadow-sm transition hover:border-orange-300 hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 text-white">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900 sm:text-lg">
                  {feature.title}
                </h3>
                <p className="flex-1 text-sm leading-6 text-slate-600">
                  {feature.description}
                </p>
                <div className="flex items-center gap-2 text-xs text-orange-600">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span className="uppercase tracking-wider font-semibold">Core Capability</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
