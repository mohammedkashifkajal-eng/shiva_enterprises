import React from "react";
import { motion } from "motion/react";
import { LucideIcon } from "lucide-react";

export type ProcessStep = {
  step: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

type ProcessSectionProps = {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  steps: ProcessStep[];
};

export default function ProcessSection({
  eyebrow = "How We Deliver",
  title = "A simple, transparent process that gets you live quickly.",
  subtitle,
  steps,
}: ProcessSectionProps) {
  return (
    <section className="border-t border-slate-100 bg-white px-4 py-12 sm:px-6 sm:py-16 md:px-8 md:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[10px] font-mono font-semibold uppercase tracking-[0.18em] text-orange-700">
            {eyebrow}
          </div>
          <h2 className="mt-4 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl md:text-4xl">
            {title}
          </h2>
          {subtitle && (
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
              {subtitle}
            </p>
          )}
        </div>
        <ol className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.li
                key={s.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
                className="relative flex h-full flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-slate-900 text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="font-mono text-xs font-bold text-orange-600">
                    {s.step}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 sm:text-lg">
                  {s.title}
                </h3>
                <p className="text-sm leading-6 text-slate-600">
                  {s.description}
                </p>
                {i < steps.length - 1 && (
                  <div
                    className="absolute right-4 top-1/2 hidden h-px w-6 -translate-y-1/2 bg-slate-200 lg:block"
                    aria-hidden
                  />
                )}
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

