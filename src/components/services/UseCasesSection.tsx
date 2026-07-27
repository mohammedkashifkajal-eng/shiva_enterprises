import React from "react";
import { motion } from "motion/react";
import {
  LucideIcon,
  Building2,
  GraduationCap,
  ShoppingBag,
  Bus,
  Briefcase,
  Factory,
} from "lucide-react";

export type UseCaseItem = {
  title: string;
  description: string;
  icon?: LucideIcon;
  industry: string;
};

type UseCasesSectionProps = {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  items: UseCaseItem[];
};

const ICON_FALLBACK: Record<string, LucideIcon> = {
  School: GraduationCap,
  College: GraduationCap,
  Transport: Bus,
  Retail: ShoppingBag,
  Business: Briefcase,
  Enterprise: Building2,
  Manufacturing: Factory,
};

export default function UseCasesSection({
  eyebrow = "Who It's For",
  title = "Designed for the realities of Indian schools, fleets, and growing businesses.",
  subtitle,
  items,
}: UseCasesSectionProps) {
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
          {items.map((item, i) => {
            const Icon = item.icon ?? ICON_FALLBACK[item.industry] ?? Building2;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: i * 0.04 }}
                className="flex h-full flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-900 text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider text-slate-600">
                    {item.industry}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 sm:text-lg">
                  {item.title}
                </h3>
                <p className="text-sm leading-6 text-slate-600">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

