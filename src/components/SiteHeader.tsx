import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, Phone, Play, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ServicesDropdown from './ServicesDropdown';

export default function SiteHeader() {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(() => window.scrollY > 10);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Close mobile menu and reset scroll state on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    // Re-check scroll position immediately when route changes
    setScrolled(window.scrollY > 10);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    // Fire once immediately to sync state with current scroll position
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    if (location.pathname !== '/') {
      navigate(`/#${id}`);
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      window.history.replaceState(null, '', `#${id}`);
    }
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    if (location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      window.history.replaceState(null, '', ' ');
    }
  };

  const isHome = location.pathname === '/';
  const isServiceDetail = location.pathname.startsWith('/services/') && location.pathname !== '/services';
  // On service detail pages the navbar is always solid — hero image sits below pt-[var(--header-h)]
  // On home page only, we allow the transparent dark mode at the very top
  const isDarkNavbar = isHome && !scrolled && !dropdownOpen;

  const brandTitleClass = `font-display text-xs sm:text-sm md:text-base font-bold uppercase tracking-[0.06em] sm:tracking-[0.08em] transition-colors duration-300 ${
    isDarkNavbar ? 'text-white' : 'text-slate-900'
  }`;

  const brandDescClass = `hidden truncate text-[11px] font-semibold tracking-wide sm:block sm:text-xs transition-colors duration-300 ${
    isDarkNavbar ? 'text-white/80' : 'text-slate-500'
  }`;

  const navLinkClass = (isActive: boolean) => {
    if (isDarkNavbar) {
      return `whitespace-nowrap rounded-lg px-3 py-2 text-sm font-semibold tracking-wide transition-all duration-200 ${
        isActive ? 'text-orange-400 bg-white/10' : 'text-white/80 hover:text-white hover:bg-white/10'
      }`;
    }
    return `whitespace-nowrap rounded-lg px-3 py-2 text-sm font-semibold tracking-wide transition-all duration-200 ${
      isActive ? 'text-orange-700 bg-slate-50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
    }`;
  };

  const mobileLinkClass = (isActive: boolean) =>
    `block rounded-lg px-3 py-2.5 text-sm font-semibold transition-all duration-200 ${
      isActive ? 'bg-slate-50 text-orange-700' : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
    }`;

  return (
    <header
      className={`fixed top-0 z-50 w-full border-b transition-all duration-300 ${
        scrolled || dropdownOpen || isServiceDetail
          ? 'border-slate-200 bg-white/95 shadow-sm shadow-slate-900/5 backdrop-blur-md'
          : 'border-transparent bg-transparent'
      }`}
      style={{ height: 'var(--header-h, 80px)' }}
    >
      <div className="mx-auto h-full max-w-7xl px-3 sm:px-6">
        <div
          className="flex h-full items-center justify-between gap-2 sm:gap-3"
          style={{ flexWrap: 'nowrap', whiteSpace: 'nowrap' }}
        >
          <Link
            to="/"
            onClick={handleLogoClick}
            aria-label="Shiva Enterprises — Home"
            className="flex min-w-0 shrink-0 items-center gap-1.5 sm:gap-2"
          >
            <div className="flex h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 shrink-0 items-center justify-center rounded-lg bg-slate-900 text-base font-black leading-none text-white sm:rounded-xl">
              S
            </div>
            <div className="min-w-0 leading-snug">
              <h1 className={brandTitleClass}>
                Shiva Enterprises
              </h1>
              <p className={brandDescClass}>
                Software Development & Affiliate Marketing Agency
              </p>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-2 xl:gap-4">
            <Link to="/about" className={navLinkClass(location.pathname === '/about')}>
              About
            </Link>
            <ServicesDropdown isDarkNavbar={isDarkNavbar} onOpenChange={setDropdownOpen} />
            <Link to="/franchise" className={navLinkClass(location.pathname === '/franchise')}>
              Franchise
            </Link>
            <Link to="/bus-demo#live-demo" className={`${navLinkClass(location.pathname === '/bus-demo')} inline-flex items-center gap-1.5`}>
              <Play className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-orange-600" />
              <span className="hidden xl:inline">Live Demo</span>
              <span className="xl:hidden">Demo</span>
            </Link>
            <Link to="/contact" className={navLinkClass(location.pathname === '/contact')}>
              Contact
            </Link>
          </nav>

          <div className="hidden lg:flex items-center gap-2 xl:gap-3">
            <a
              href="tel:7349018613"
              className={`inline-flex items-center gap-1.5 sm:gap-2 rounded-full border px-2.5 sm:px-3 py-2 font-mono text-[10px] sm:text-xs font-bold transition shadow-sm whitespace-nowrap ${
                isDarkNavbar
                  ? 'border-white/20 bg-white/10 text-white hover:border-orange-400/50 hover:bg-white/20'
                  : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-500/50 hover:text-slate-900'
              }`}
            >
              <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 text-orange-600" />
              <span>+91 7349018613</span>
            </a>
          </div>

          <motion.button
            type="button"
            whileTap={{ scale: 0.95 }}
            className={`inline-flex items-center justify-center rounded-lg sm:rounded-xl border p-2 sm:p-2.5 lg:hidden ${
              isDarkNavbar
                ? 'border-white/20 bg-white/10 text-white hover:bg-white/20'
                : 'border-slate-200 bg-slate-50 text-slate-600'
            }`}
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label="Toggle navigation"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6" />}
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-y-auto max-h-[calc(100vh-var(--header-h,64px))] border-t border-slate-200 lg:hidden bg-white/95 backdrop-blur-md"
          >
            <div className="space-y-1 p-3 pb-6 safe-area-bottom">
              <Link to="/about" onClick={() => setMobileMenuOpen(false)} className={mobileLinkClass(location.pathname === '/about')}>
                About
              </Link>
              <ServicesDropdown mobile onNavigate={() => setMobileMenuOpen(false)} />
              <Link to="/franchise" onClick={() => setMobileMenuOpen(false)} className={mobileLinkClass(location.pathname === '/franchise')}>
                Franchise
              </Link>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  scrollToSection('services');
                }}
                className="block w-full rounded-lg px-3 py-3 text-left text-sm font-semibold text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors"
              >
                Solutions
              </button>
              <Link
                to="/bus-demo#live-demo"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full rounded-lg px-3 py-3 text-left text-sm font-semibold text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors"
              >
                Live Demo
              </Link>
              <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className={mobileLinkClass(location.pathname === '/contact')}>
                Contact
              </Link>
              <div className="pt-3 mt-2 border-t border-slate-200">
                <a
                  href="tel:7349018613"
                  className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  <Phone className="h-5 w-5 text-orange-600" />
                  <span>+91 7349018613</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

