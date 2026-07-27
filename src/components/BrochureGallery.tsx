import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BookOpen, ChevronLeft, ChevronRight, CheckCircle2, PhoneCall, Info } from "lucide-react";

interface PageData {
  title: string;
  subtitle?: string;
  image?: string;
  highlights: string[];
  description: string;
  callout?: string;
  badge?: string;
}

export default function BrochureGallery() {
  const [currentPage, setCurrentPage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward

  // Standardize brochure pages details based on original photos
  const pages: PageData[] = [
    {
      badge: "PAGE 1: BRAND OVERVIEW",
      title: "SHIVA ENTERPRISES",
      subtitle: "SOFTWARE & SMART SOLUTIONS",
      image: "https://ahkvjgaeitpjpaaczttv.supabase.co/storage/v1/object/sign/shiva/shiva_hero_1782835364065.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mYTE1N2M0Mi1jMzkwLTQ2MmUtOTU4Yy1jMDM5YWEwMzc0ZGMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzaGl2YS9zaGl2YV9oZXJvXzE3ODI4MzUzNjQwNjUuanBnIiwic2NvcGUiOiJkb3dubG9hZCIsImlhdCI6MTc4Mjg5MDQ3OCwiZXhwIjoxODE0NDI2NDc4fQ.Lo6WnlfCrp0_-HBkHFkR7Rl-IHPbzB1H3VDwvxronhk",
      highlights: [
        "Web Solutions that Build Businesses",
        "E-Commerce & Customized Portals",
        "School & College Management Systems",
        "Commercial School Bus Tracking Modules"
      ],
      description: "Based in Kalaburagi, Shiva Enterprises specializes in helping modern businesses and institutions establish robust, scalable, and premium online presences. We merge digital tools with practical safety features.",
      callout: "📍 Plot No. 4, Behind Central Bus Stand, CIB Colony, KALABURAGI - 585 103"
    },
    {
      badge: "PAGE 2: SCHOOL SITES & CCTV SECURITY",
      title: "Custom Websites & Live CCTV",
      subtitle: "Compulsory Safety with Zero Out-Of-Pocket Charges",
      image: "https://ahkvjgaeitpjpaaczttv.supabase.co/storage/v1/object/sign/shiva/shiva_bus_camera_1782835390209.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mYTE1N2M0Mi1jMzkwLTQ2MmUtOTU4Yy1jMDM5YWEwMzc0ZGMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzaGl2YS9zaGl2YV9idXNfY2FtZXJhXzE3ODI4MzUzOTAyMDkuanBnIiwic2NvcGUiOiJkb3dubG9hZCIsImlhdCI6MTc4Mjg5MDAyOSwiZXhwIjoxODE0NDI2MDI5fQ.K3nULudMvnlurjOvLBXeTgHP2lRxWoM5BB8PSqwakxw",
      highlights: [
        "Free Customized School Websites for branding",
        "High-End Security Dome CCTV inside each bus",
        "Parents can view live cabin feeds on mobile",
        "Complete school admin control and compliance"
      ],
      description: "We provide high-definition CCTV security solutions for school buses, giving parents and administrators instantaneous visibility into child safety during commutes. Alongside, we design a modern customized website to elevate your school's enrollment potential.",
      callout: "🔒 Safety First: Fully encrypted camera feeds monitored securely by school admins."
    },
    {
      badge: "PAGE 3: STUDENT PVC IDENTIFICATION",
      title: "Free Premium PVC Student ID Cards",
      subtitle: "High-Grade PVC Lanyards & Printing",
      image: "https://ahkvjgaeitpjpaaczttv.supabase.co/storage/v1/object/sign/shiva/shiva_id_cards_1782835405212.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mYTE1N2M0Mi1jMzkwLTQ2MmUtOTU4Yy1jMDM5YWEwMzc0ZGMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzaGl2YS9zaGl2YV9pZF9jYXJkc18xNzgyODM1NDA1MjEyLmpwZyIsInNjb3BlIjoiZG93bmxvYWQiLCJpYXQiOjE3ODI4OTA3MTcsImV4cCI6MTgxNDQyNjcxN30.5U-9xJhwVl4OX0LO-mIFzLjSJcSXL35d2MWijxZiIFE",
      highlights: [
        "100% Free of Cost PVC Badges for all students",
        "High-definition thermal printing systems",
        "Scratch-resistant gloss finish lamination",
        "Tailored layout designs with school emblem"
      ],
      description: "Understand the ultimate value of student identification and security. We manage complete layout creation, student database mapping, printing, and delivery of high-grade plastic ID badges without charging the school a single rupee.",
      callout: "💳 Outstanding PVC quality: Scratch-resistant, flexible, and completely customized."
    },
    {
      badge: "PAGE 4: THE INSURANCE BUNDLE EXPLAINED",
      title: "The Ultimate Reinvestment Model",
      subtitle: "How It Works: Connecting Insurance to Digital Excellence",
      image: "https://ahkvjgaeitpjpaaczttv.supabase.co/storage/v1/object/sign/shiva/shiva_web_dev_1782835378944.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mYTE1N2M0Mi1jMzkwLTQ2MmUtOTU4Yy1jMDM5YWEwMzc0ZGMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzaGl2YS9zaGl2YV93ZWJfZGV2XzE3ODI4MzUzNzg5NDQuanBnIiwic2NvcGUiOiJkb3dubG9hZCIsImlhdCI6MTc4Mjg5MDgyOCwiZXhwIjoxODE0NDI2ODI4fQ.yauK5Ltb7L6uQV_cPfiIdvgsqNARhLPJ8DKSmXc8m_Y",
      highlights: [
        "Website, GPS Tracking & CCTV given Free",
        "Unlocked when school bus insurance is placed with us",
        "Same competitive insurance premiums as standard brokers",
        "Commissions reinvested directly back into your school!"
      ],
      description: "Shiva Enterprises provides high-value digital solutions to educational institutions at absolute zero cost. By consolidating your mandatory school bus commercial vehicle insurance with us, we leverage broker commissions to pay for your smart school tracker, live CCTV cameras, student ID cards, and web portal.",
      callout: "🏆 Winner: A brilliant, mutually-beneficial business model that saves schools thousands annually."
    }
  ];

  const handleNext = () => {
    if (isAnimating) return;
    setDirection(1);
    setIsAnimating(true);
    setCurrentPage((prev) => (prev + 1) % pages.length);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setDirection(-1);
    setIsAnimating(true);
    setCurrentPage((prev) => (prev - 1 + pages.length) % pages.length);
  };

  const page = pages[currentPage];

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      
      {/* Brochure Heading */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-xl font-semibold text-white md:text-2xl">
            <BookOpen className="w-5 h-5 shrink-0 text-orange-400" />
            <span>Interactive <span className="text-orange-400">3D Brochure Reader</span></span>
          </h3>
          <p className="text-xs text-zinc-400 mt-1">
            Turn the pages of our physical corporate brochure to explore how we revolutionize schools.
          </p>
        </div>
        
        {/* Navigation Controls */}
        <div className="flex items-center justify-between gap-3 md:justify-end">
          <span className="text-xs font-mono text-zinc-500">
            PAGE {currentPage + 1} OF {pages.length}
          </span>
          <div className="flex gap-1.5">
            <button
              onClick={handlePrev}
              className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-orange-400/50 hover:bg-zinc-800 text-zinc-300 transition"
              disabled={isAnimating}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-orange-400/50 hover:bg-zinc-800 text-zinc-300 transition"
              disabled={isAnimating}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 3D Flipping Book container */}
      <div 
        className="w-full bg-zinc-950/80 border border-zinc-800/80 rounded-2xl overflow-hidden shadow-2xl relative min-h-[760px] sm:min-h-[680px] md:min-h-[480px] md:rounded-3xl"
        style={{ perspective: "1500px" }}
      >
        <AnimatePresence
          initial={false}
          custom={direction}
          onExitComplete={() => setIsAnimating(false)}
        >
          <motion.div
            key={currentPage}
            custom={direction}
            variants={{
              enter: (dir) => ({
                rotateY: dir > 0 ? 45 : -45,
                opacity: 0,
                x: dir > 0 ? 100 : -100,
              }),
              center: {
                rotateY: 0,
                opacity: 1,
                x: 0,
              },
              exit: (dir) => ({
                rotateY: dir > 0 ? -45 : 45,
                opacity: 0,
                x: dir > 0 ? -100 : 100,
              })
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              type: "spring",
              stiffness: 180,
              damping: 20
            }}
            style={{ transformStyle: "preserve-3d" }}
            className="absolute inset-0 grid h-full w-full grid-cols-1 gap-5 p-4 sm:p-6 md:grid-cols-12 md:gap-8 md:p-8"
          >
            
            {/* Left Hand: Stylized 3D rendering of Brochure image */}
            <div className="md:col-span-5 h-full flex flex-col justify-between">
              <div className="relative group overflow-hidden rounded-2xl border border-zinc-800 aspect-video md:aspect-[4/3] w-full bg-zinc-900 flex items-center justify-center">
                {page.image ? (
                  <img
                    src={page.image}
                    alt={page.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-zinc-950 flex items-center justify-center text-zinc-700">
                    Image Not Loaded
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 max-w-[calc(100%-1.5rem)] truncate text-[10px] font-mono text-orange-400 bg-zinc-950/80 px-2 py-0.5 rounded border border-zinc-800">
                  SHIVA_ENTERPRISES_3D_ASSET
                </div>
              </div>

              {/* Callout box under photo */}
              <div className="hidden md:block bg-zinc-900/60 border border-zinc-800 rounded-xl p-4 text-xs text-zinc-400 mt-4">
                <div className="flex gap-2 items-start">
                  <Info className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
                  <span>{page.callout}</span>
                </div>
              </div>
            </div>

            {/* Right Hand: Detailed brochure information with high formatting */}
            <div className="md:col-span-7 flex flex-col justify-between space-y-4">
              <div className="space-y-4">
                <span className="text-[10px] font-mono font-bold text-orange-400 tracking-wider bg-slate-500/10 px-2 py-0.5 rounded border border-slate-500/20">
                  {page.badge}
                </span>

                <div className="space-y-1.5">
                  <h4 className="text-xl font-bold tracking-tight text-white leading-tight sm:text-2xl md:text-3xl">
                    {page.title}
                  </h4>
                  {page.subtitle && (
                    <p className="text-xs text-zinc-400 font-mono italic">
                      {page.subtitle}
                    </p>
                  )}
                </div>

                <p className="text-xs md:text-sm text-zinc-400 leading-relaxed">
                  {page.description}
                </p>

                {/* Highlights list */}
                <div className="space-y-2 pt-2">
                  <h5 className="text-[10px] font-mono uppercase text-zinc-500 tracking-wider">
                    KEY HIGHLIGHTS FROM BROCHURE
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {page.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-zinc-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-orange-400 flex-shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Page footer controls */}
              <div className="pt-4 border-t border-zinc-900 flex flex-col gap-1 text-[10px] font-mono text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
                <span>SHIVA ENTERPRISES BROCHURE</span>
                <span>GULBARGA REGION</span>
              </div>
            </div>

          </motion.div>
        </AnimatePresence>
      </div>

      {/* Touch instruction / page dots */}
      <div className="flex justify-center gap-1.5 mt-2">
        {pages.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setDirection(idx > currentPage ? 1 : -1);
              setCurrentPage(idx);
            }}
            className={`w-2 h-2 rounded-full transition-all ${
              idx === currentPage ? "bg-orange-400 w-6" : "bg-zinc-800 hover:bg-zinc-700"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

