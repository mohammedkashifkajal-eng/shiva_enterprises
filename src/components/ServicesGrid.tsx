import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import ThreeDCard from "./ThreeDCard";
import { Globe, ShoppingCart, GraduationCap, Bus, ChevronDown, Check, Server, ArrowRight } from "lucide-react";

interface ServiceItem {
  id: string;
  slug: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  shortDesc: string;
  detailedDesc: string;
  techSpecs: string[];
  colorClass: string;
}

export default function ServicesGrid() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const services: ServiceItem[] = [
    {
      id: "web_dev",
      slug: "web-development",
      icon: Globe,
      title: "Web Development",
      shortDesc: "Complete website design and hosting solutions for schools and businesses.",
      detailedDesc: "We build fully responsive, blazing-fast, and custom-styled web experiences with modular code. Fully customizable school portals are offered at zero upfront charge, completely integrated with parent and staff databases.",
      techSpecs: ["HTML5 / Tailwind CSS", "React & Vite Frontends", "SEO & Speed Optimization", "Free Cloud SSL & Domain Setups"],
      colorClass: "from-slate-50 to-white"
    },
    {
      id: "ecommerce",
      slug: "e-commerce-development",
      icon: ShoppingCart,
      title: "E-Commerce Development",
      shortDesc: "Turn-key digital commerce systems with integrated invoicing and inventory.",
      detailedDesc: "Empower your retail business with professional, scale-ready store structures. Setup products, handle payment gateways (Razorpay/Stripe), track student fees, and automate order notifications directly on parent emails.",
      techSpecs: ["Payment Gateway Setup", "Product Category Filters", "Interactive Cart & Checkouts", "Invoice PDF Generators"],
      colorClass: "from-slate-50 to-white"
    },
    {
      id: "school_sys",
      slug: "school-management-system",
      icon: GraduationCap,
      title: "School Management System",
      shortDesc: "Comprehensive digital portal to administer grades, fee lists, and attendance.",
      detailedDesc: "Ditch manual registers! Manage admissions, grades, fee histories, parent notifications, report card sheets, and staff assignments from an all-in-one unified dashboard with instant mobile access.",
      techSpecs: ["Student Admissions Database", "Gradebook & Report Card Builder", "Fee Due Automated Reminders", "Teacher Assignment Tracker"],
      colorClass: "from-slate-50 to-white"
    },
    {
      id: "bus_track",
      slug: "school-bus-tracking-system",
      icon: Bus,
      title: "School Bus Tracking System",
      shortDesc: "Real-time fleet tracking & live inside-cabin camera parent monitors.",
      detailedDesc: "Complete peace-of-mind GPS hardware and cloud software integration. Delivers instantaneous notifications to parents when the bus approaches stops, monitors live speeds, and broadcasts real-time bus CCTV feeds.",
      techSpecs: ["Real-Time GPS Tracking", "Parent Mobile Tracking App", "Bus CCTV Live Streaming", "Automatic Arrival Alerts"],
      colorClass: "from-slate-50 to-white"
    },
    {
      id: "college_sys",
      slug: "college-management-system",
      icon: Server,
      title: "College Management System",
      shortDesc: "Advanced multi-department college software with modular student registries.",
      detailedDesc: "Custom-developed software designed for higher education institutes. Handles department partitions, semester exams, credits tracking, attendance counters, library logs, and custom placement portals.",
      techSpecs: ["Department & Semester Partition", "Credit Hours & GPA Calculators", "Library Card Barcode Scan", "Staff & Professor Payroll Portal"],
      colorClass: "from-slate-50 to-white"
    }
  ];

  return (
    <div className="space-y-6">

      {/* Grid Headline */}
      <div className="text-center max-w-xl mx-auto space-y-2">
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
          Our Core Services
        </h3>
        <p className="text-xs sm:text-sm text-slate-400">
          Tap the cards below to explore service details and specifications.
        </p>
      </div>

      {/* Services Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {services.map((svc) => {
          const IconComponent = svc.icon;
          const isExpanded = expandedId === svc.id;

          return (
            <ThreeDCard
              key={svc.id}
              className="h-full flex flex-col justify-between"
            >
              <div
                onClick={() => setExpandedId(isExpanded ? null : svc.id)}
                className={`cursor-pointer rounded-2xl border border-slate-200 bg-gradient-to-br ${svc.colorClass} p-4 sm:p-5 md:p-6 transition-all duration-300 h-full flex flex-col justify-between shadow-lg shadow-slate-200/50 relative group overflow-hidden ${
                  isExpanded ? "border-orange-400 shadow-orange-400/20" : "hover:border-slate-300"
                }`}
              >

                <div className="space-y-3 sm:space-y-4">
                  {/* Service Icon */}
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center group-hover:scale-110 group-hover:bg-slate-500 transition shadow-sm">
                    <IconComponent className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>

                  {/* Title & Short Description */}
                  <div className="space-y-1">
                    <h4 className="text-base sm:text-lg font-bold text-slate-900 tracking-wide group-hover:text-orange-600 transition">
                      {svc.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {svc.shortDesc}
                    </p>
                  </div>
                </div>

                {/* Expanded Details inside Card */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-slate-200 space-y-2 sm:space-y-3 relative z-10"
                    >
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {svc.detailedDesc}
                      </p>

                      <div className="space-y-1.5">
                        <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Specifications:</div>
                        <div className="space-y-1">
                          {svc.techSpecs.map((spec, index) => (
                            <div key={index} className="flex items-center gap-1.5 text-[10px] sm:text-xs font-mono text-slate-600">
                              <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-500" />
                              <span>{spec}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Bottom button / Expand trigger */}
                <div className="flex items-center justify-between mt-4 sm:mt-5 pt-2 sm:pt-3 border-t border-slate-200 text-slate-400 group-hover:text-orange-600 transition">
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : svc.id)}
                    className="text-[10px] font-mono tracking-widest uppercase"
                  >
                    {isExpanded ? "Close Specs" : "Explore Details"}
                  </button>
                  <div className="flex items-center gap-3">
                    <Link
                      to={`/services/${svc.slug}`}
                      onClick={(e) => e.stopPropagation()}
                      className="text-[10px] font-mono tracking-widest uppercase text-orange-600 hover:text-orange-700 flex items-center gap-1 transition"
                    >
                      Full Page
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                    <ChevronDown
                      onClick={() => setExpandedId(isExpanded ? null : svc.id)}
                      className={`w-4 h-4 transition-transform duration-300 cursor-pointer ${isExpanded ? "rotate-180" : ""}`}
                    />
                  </div>
                </div>

              </div>
            </ThreeDCard>
          );
        })}
      </div>

    </div>
  );
}

