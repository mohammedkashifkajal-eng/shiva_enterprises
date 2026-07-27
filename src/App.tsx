import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence, useInView } from "motion/react";
import {
  ArrowRight, ArrowUp, ChevronLeft, ChevronRight
} from "lucide-react";

import ThreeDCard from "./components/ThreeDCard";
import ServicesGrid from "./components/ServicesGrid";
import SiteHeader from "./components/SiteHeader";

import image1 from "./assets/carousal/1.jpg";
import bus2 from "./assets/carousal/bus2.jpg";
import girl3 from "./assets/carousal/girl3.jpg";
import camera4 from "./assets/carousal/camera4.jpeg";

const heroIdCard = image1;
const heroBus = bus2;
const heroCamera = camera4;

type HeroAction = { type: "scroll"; id: string } | { type: "route"; to: string };

interface HeroSlide {
  image: string;
  layout: "cover" | "split";
  title: string;
  description: string;
  primaryCta: { label: string; action: HeroAction };
  secondaryCta: { label: string; action: HeroAction };
  highlights: string[];
}

const heroSlides: HeroSlide[] = [
  {
    image: heroBus,
    layout: "cover",
    title: "Trusted Technology for the Safety & Security of Children.",
    description: "Live GPS, in-bus cameras, and instant alerts — keeping children safe on every route.",
    primaryCta: { label: "See Live Demo", action: { type: "route", to: "/bus-demo#live-demo" } },
    secondaryCta: { label: "Our Solutions", action: { type: "scroll", id: "services" } },
    highlights: [
      "Smart Attendance",
      "Fee Management",
      "Parent Portal",
      "Live Analytics",
    ],
  },
  {
    image: girl3,
    layout: "cover",
    title: "Modern School Website for Better Learning.",
    description: "Attendance, fees, grades, and parent communication — all in one platform.",
    primaryCta: { label: "See Live Demo", action: { type: "route", to: "/bus-demo#live-demo" } },
    secondaryCta: { label: "Our Solutions", action: { type: "scroll", id: "services" } },
    highlights: [
      "Access Control",
      "Digital ID Cards",
      "Campus Monitoring",
      "Smart Analytics",
    ],
  },
  {
    image: heroCamera,
    layout: "cover",
    title: "Advanced Security for Today's Digital World",
    description: "Create a safer, smarter environment with integrated security and identity solutions designed for organizations of every size.",
    primaryCta: { label: "Explore Live Demo", action: { type: "route", to: "/bus-demo#live-demo" } },
    secondaryCta: { label: "View Smart Solutions", action: { type: "scroll", id: "services" } },
    highlights: [
      "Digital Operations",
      "Access Control",
      "Campus Insights",
      "Secure Identity",
      "Smart Analytics",
    ],
  },
  {
    image: heroIdCard,
    layout: "cover",
    title: "Smart Campus Solutions for Modern Educational Institutions.",
    description: "Admissions, fees, transport, and operations — managed from a single dashboard.",
    primaryCta: { label: "See Live Demo", action: { type: "route", to: "/bus-demo#live-demo" } },
    secondaryCta: { label: "Our Solutions", action: { type: "scroll", id: "services" } },
    highlights: [
      "Smart ID Cards",
      "Attendance Tracking",
      "Fee Automation",
      "Campus Analytics",
    ],
  },
];

// ── CoverLayout ───────────────────────────────────────────────────────────────
// Renders the background image + overlay for each hero slide.
// overflow-hidden on the wrapper clips the image to the section bounds.
// The gradient overlay goes bottom-heavy so text always reads on mobile too.
function CoverLayout({ slide, isActive }: { slide: HeroSlide; isActive: boolean }) {
  return (
    <div className="absolute inset-0 w-full h-full bg-slate-900 overflow-hidden">
      <img
        src={slide.image}
        alt=""
        aria-hidden="true"
        loading={isActive ? "eager" : "lazy"}
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition: "center 30%" }}
      />
      {/* Bottom-heavy gradient so text on mobile (which sits lower) stays readable */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/75 via-slate-900/35 to-slate-900/15" />
    </div>
  );
}

// ── FadeIn ────────────────────────────────────────────────────────────────────
function FadeIn({ children }: { children: React.ReactNode }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8, ease: [0.21, 1.02, 0.43, 1.01] }}
    >
      {children}
    </motion.div>
  );
}

// ── HeroContentBlock ──────────────────────────────────────────────────────────
interface HeroContentBlockProps {
  slide: HeroSlide;
}

function HeroContentBlock({ slide }: HeroContentBlockProps) {
  return (
    <div className="flex flex-col items-center text-center md:items-start md:text-left w-full select-none">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="mt-6 font-display font-black leading-[1.05] tracking-tight text-white drop-shadow-md
                   text-[clamp(1.9rem,5vw,4rem)]
                   text-center md:text-left
                   max-w-xl md:max-w-2xl lg:max-w-3xl"
      >
        {slide.title}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.35 }}
        className="mt-3 max-w-sm md:max-w-lg text-sm text-white/75 leading-snug
                   text-center md:text-left tracking-wide"
      >
        {slide.description}
      </motion.p>

    </div>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [activeImage, setActiveImage] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const goToPrevImage = () =>
    setActiveImage((c) => (c === 0 ? heroSlides.length - 1 : c - 1));

  const goToNextImage = () =>
    setActiveImage((c) => (c + 1) % heroSlides.length);

  // Auto-advance slides
  useEffect(() => {
    const id = window.setInterval(goToNextImage, 5000);
    return () => window.clearInterval(id);
  }, []);

  // Keyboard nav
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goToPrevImage();
      else if (e.key === "ArrowRight") goToNextImage();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Hash-based scroll
  useEffect(() => {
    if (!location.hash) return;
    const el = document.getElementById(location.hash.slice(1));
    if (el) window.setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 80);
  }, [location.hash]);

  // Back-to-top button
  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleHeroAction = (action: HeroAction) => {
    if (action.type === "route") navigate(action.to);
    else scrollToSection(action.id);
  };

  return (
    // overflow-x-hidden only — never overflow-hidden on the root so the page scrolls freely
    <div className="min-h-screen text-slate-900 font-sans selection:bg-slate-300 selection:text-slate-900 overflow-x-hidden" style={{ background: 'var(--bg-base)', maxWidth: "none" }}>

      <SiteHeader />

      {/*
        Hero Section
        ─────────────
        - NO overflow:hidden on this element (that was trapping scroll)
        - Height: 100dvh with 100vh fallback — fills visible viewport on modern mobile browsers
        - position:relative so absolutely-positioned children (image, arrows, dots) are clipped to it
        - The section is a normal block element; the page scrolls past it naturally
      */}
      <section
        className="relative w-full flex flex-col justify-center hero-section"
        style={{ minHeight: "560px", maxWidth: "none" }}
      >
        {/* Background slides — positioned absolute inside the section, clipped by overflow:hidden on the section */}
        <div className="absolute inset-0 overflow-hidden" style={{ maxWidth: "none" }}>
          <AnimatePresence initial={false}>
            <motion.div
              key={activeImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <CoverLayout slide={heroSlides[activeImage]} isActive={true} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Content */}
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-24 flex flex-col justify-center h-full">
          <div className="w-full max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto md:mx-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <HeroContentBlock
                  slide={heroSlides[activeImage]}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Prev / Next arrows */}
        <button
          onClick={goToPrevImage}
          aria-label="Previous slide"
          className="absolute left-3 md:left-5 top-1/2 z-20 flex h-9 w-9 md:h-12 md:w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-white/15 text-white backdrop-blur-sm transition-all hover:bg-white/30"
        >
          <ChevronLeft className="h-4 w-4 md:h-6 md:w-6" />
        </button>
        <button
          onClick={goToNextImage}
          aria-label="Next slide"
          className="absolute right-3 md:right-5 top-1/2 z-20 flex h-9 w-9 md:h-12 md:w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-white/15 text-white backdrop-blur-sm transition-all hover:bg-white/30"
        >
          <ChevronRight className="h-4 w-4 md:h-6 md:w-6" />
        </button>

        {/* Slide dots */}
        <div className="absolute bottom-6 left-0 right-0 z-20 flex justify-center gap-2">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveImage(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === activeImage ? "w-6 bg-orange-400" : "w-2 bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      </section>

      {/* ── About ── */}
      <FadeIn>
        <section id="about" className="px-4 py-16 border-t border-[#d4dde8] md:px-8 md:py-20" style={{ background: 'var(--bg-base)' }}>
          <div className="max-w-6xl mx-auto grid grid-cols-1 gap-8 items-center lg:grid-cols-2 lg:gap-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-50 border border-slate-200 rounded-full text-orange-700 text-[10px] font-medium tracking-[0.12em] uppercase">
                About Shiva Enterprises
              </div>
              <h3 className="mt-5 text-2xl md:text-3xl font-bold leading-snug tracking-tight text-slate-900">
                Practical digital systems for schools, transport operators, and growing teams.
              </h3>
              <p className="mt-4 max-w-xl text-sm text-slate-600 leading-7">
                We combine reliable software, transport technology, and smart operations support to help institutions stay safer, more connected, and easier to manage.
              </p>
              <Link to="/about" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-orange-700 transition hover:text-orange-600 group">
                Learn more about our approach
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
            <div className="rounded-2xl border border-[#d4dde8] bg-white p-6 sm:p-8">
              <p className="text-sm text-slate-600 leading-7">
                From custom websites and school platforms to GPS tracking and digital ID card solutions, our work is designed to be simple to use and practical to deploy.
              </p>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* ── Services ── */}
      <FadeIn>
        <section id="services" className="px-4 py-16 border-t border-[#d4dde8] md:px-8 md:py-20" style={{ background: 'var(--bg-section)' }}>
          <div className="max-w-7xl mx-auto">
            <ServicesGrid />
          </div>
        </section>
      </FadeIn>

      {/* ── Footer ── */}
      <FadeIn>
        <footer className="border-t border-[#d4dde8] py-12 md:py-16" style={{ background: 'var(--bg-section)' }}>
          <div className="max-w-6xl mx-auto px-4 flex flex-col items-center gap-6">
            <div className="flex flex-wrap items-center justify-center gap-4 text-[10px] font-mono text-slate-500">
              <Link to="/about"            className="transition hover:text-orange-700">About</Link>
              <Link to="/services"         className="transition hover:text-orange-700">Solutions</Link>
              <Link to="/bus-demo"         className="transition hover:text-orange-700">Live Demo</Link>
              <Link to="/franchise"        className="transition hover:text-orange-700">Franchise</Link>
              <Link to="/pricing"          className="transition hover:text-orange-700">Pricing</Link>
              <Link to="/contact"          className="transition hover:text-orange-700">Contact</Link>
              <Link to="/request-proposal" className="transition hover:text-orange-700">Request Proposal</Link>
              <a href="http://shivaenterprises.net.in" target="_blank" rel="noopener noreferrer" className="transition hover:text-orange-700">Portal</a>
              <span>© 2026 SHIVA ENTERPRISES. All Rights Reserved.</span>
            </div>
          </div>
        </footer>
      </FadeIn>

      {/* Back to top */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            key="back-to-top"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.25 }}
            onClick={scrollToTop}
            aria-label="Back to top"
            className="fixed bottom-6 right-6 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-white shadow-lg transition hover:bg-slate-800"
          >
            <ArrowUp className="h-4 w-4" />
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  );
}
