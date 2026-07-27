import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';

interface BenefitsSectionProps {
  title?: string;
  subtitle?: string;
  benefits: { title: string; description: string }[];
}

export default function BenefitsSection({
  title = 'Why It Matters',
  subtitle,
  benefits,
}: BenefitsSectionProps) {
  return (
    <section
      className="border-t border-[#d4dde8] px-4 py-12 sm:px-6 sm:py-16 md:px-8 md:py-20"
      style={{ background: 'var(--bg-section)' }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-orange-700">
            Benefits
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
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, i) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
              className="flex flex-col gap-3 rounded-2xl border border-[#d4dde8] bg-white p-5 sm:p-6 shadow-sm transition hover:border-orange-300 hover:shadow-md"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-50 text-orange-600">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  {benefit.title}
                </h4>
              </div>
              <p className="text-sm leading-6 text-slate-600">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
