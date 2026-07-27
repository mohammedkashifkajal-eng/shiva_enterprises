import React from "react";
import { motion } from "motion/react";
import {
  Cpu,
  Layers,
  ShieldCheck,
  Cloud,
  Database,
  Smartphone,
  Code2,
  Wrench,
} from "lucide-react";

export type TechSpecGroup = {
  title: string;
  items: string[];
};

type TechSpecsSectionProps = {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  groups: TechSpecGroup[];
};

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Frontend: Code2,
  Backend: Database,
  Cloud: Cloud,
  Security: ShieldCheck,
  Mobile: Smartphone,
  Integrations: Layers,
  DevOps: Cpu,
  Support: Wrench,
};

export default function TechSpecsSection({
  eyebrow = "Tech & Delivery",
  title = "Built on a modern stack with long-term support.",
  subtitle,
  groups,
}: TechSpecsSectionProps) {
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
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map((g, i) => {
            const Icon = ICON_MAP[g.title] ?? Layers;
            return (
              <motion.div
                key={g.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: i * 0.04 }}
                className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-900 text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900">{g.title}</h3>
                </div>
                <ul className="mt-4 space-y-2">
                  {g.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-600 sm:text-sm"
                    >
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

