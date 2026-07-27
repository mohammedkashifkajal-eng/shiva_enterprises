import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus, HelpCircle } from "lucide-react";

export type FAQItem = {
  question: string;
  answer: string;
};

type FAQSectionProps = {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  items: FAQItem[];
};

export default function FAQSection({
  eyebrow = "Frequently Asked",
  title = "Answers to the questions we hear most often.",
  subtitle,
  items,
}: FAQSectionProps) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="border-t border-slate-100 bg-white px-4 py-12 sm:px-6 sm:py-16 md:px-8 md:py-20">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-12">
        <div className="md:col-span-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[10px] font-mono font-semibold uppercase tracking-[0.18em] text-orange-700">
            {eyebrow}
          </div>
          <h2 className="mt-4 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-3 text-sm leading-7 text-slate-500 sm:text-base">
              {subtitle}
            </p>
          )}
          <div className="mt-6 inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-xs text-slate-600">
            <HelpCircle className="h-4 w-4 text-orange-600" />
            Need a deeper walkthrough? Book a 20-minute discovery call.
          </div>
        </div>
        <div className="md:col-span-8">
          <div className="space-y-3">
            {items.map((item, i) => {
              const isOpen = openIdx === i;
              return (
                <div
                  key={item.question}
                  className={`overflow-hidden rounded-2xl border transition ${
                    isOpen
                      ? "border-slate-200 bg-slate-50/40"
                      : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIdx(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left sm:px-5"
                    aria-expanded={isOpen}
                  >
                    <span className="text-sm font-semibold text-slate-900 sm:text-base">
                      {item.question}
                    </span>
                    <span
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border ${
                        isOpen
                          ? "border-slate-200 bg-slate-100 text-orange-700"
                          : "border-slate-200 text-slate-400"
                      }`}
                    >
                      {isOpen ? (
                        <Minus className="h-3.5 w-3.5" />
                      ) : (
                        <Plus className="h-3.5 w-3.5" />
                      )}
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                      >
                        <div className="px-4 pb-4 text-sm leading-7 text-slate-600 sm:px-5">
                          {item.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

