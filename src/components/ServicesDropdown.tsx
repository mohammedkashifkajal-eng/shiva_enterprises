import React, { useEffect, useRef, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { ChevronDown, Globe, ShoppingCart, GraduationCap, Bus, Building2, LayoutGrid } from 'lucide-react';

const services = [
  { label: 'Web Development',           path: '/services/web-development',           icon: Globe },
  { label: 'E-Commerce Development',    path: '/services/e-commerce-development',    icon: ShoppingCart },
  { label: 'School Management System',  path: '/services/school-management-system',  icon: GraduationCap },
  { label: 'School Bus Tracking System',path: '/services/school-bus-tracking-system',icon: Bus },
  { label: 'College Management System', path: '/services/college-management-system', icon: Building2 },
];

type ServicesDropdownProps = {
  mobile?: boolean;
  onNavigate?: () => void;
  isDarkNavbar?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export default function ServicesDropdown({
  mobile = false,
  onNavigate,
  isDarkNavbar = false,
  onOpenChange,
}: ServicesDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  const toggle = (next: boolean) => {
    setOpen(next);
    onOpenChange?.(next);
  };

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        toggle(false);
      }
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  const handleNavigate = () => {
    toggle(false);
    onNavigate?.();
  };

  // On dark navbar, when dropdown is open the button should look "active" (white background)
  const buttonClass = mobile
    ? 'flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm font-semibold text-slate-700 transition hover:bg-slate-100 hover:text-slate-900'
    : isDarkNavbar
      ? `flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold tracking-wide transition-all duration-200 ${
          open
            ? 'bg-white text-slate-900'
            : 'text-white/80 hover:text-white hover:bg-white/10'
        }`
      : `flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold tracking-wide transition-all duration-200 ${
          open
            ? 'bg-slate-50 text-orange-700'
            : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
        }`;

  const chevronClass = `h-4 w-4 transition-transform duration-200 ${
    open
      ? 'rotate-180 text-orange-600'
      : isDarkNavbar && !open
        ? 'text-white/60'
        : 'text-slate-500'
  }`;

  return (
    <div className={mobile ? 'relative w-full' : 'relative z-50'} ref={ref}>
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => toggle(!open)}
        onKeyDown={(e) => { if (e.key === 'Escape') toggle(false); }}
        className={buttonClass}
      >
        Services
        <ChevronDown className={chevronClass} />
      </button>

      {/* Desktop dropdown panel */}
      {!mobile && (
        <div
          role="menu"
          aria-hidden={!open}
          className={`absolute left-1/2 top-full z-50 mt-2 w-80 -translate-x-1/2 rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-900/10 transition-all duration-200 origin-top overflow-hidden ${
            open ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'
          }`}
        >
          {/* Panel header */}
          <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/80">
            <p className="text-[10px] font-mono font-bold uppercase tracking-[0.18em] text-slate-400">Our Services</p>
          </div>

          {/* Service links */}
          <div className="p-2">
            {services.map((s) => {
              const Icon = s.icon;
              return (
                <NavLink
                  key={s.path}
                  to={s.path}
                  onClick={handleNavigate}
                  role="menuitem"
                  className={({ isActive }) =>
                    `flex items-center gap-3 w-full rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150 group ${
                      isActive
                        ? 'bg-slate-50 text-orange-700'
                        : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors ${
                        isActive ? 'bg-slate-100 text-orange-700' : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200 group-hover:text-slate-700'
                      }`}>
                        <Icon className="h-4 w-4" />
                      </span>
                      <span>{s.label}</span>
                    </>
                  )}
                </NavLink>
              );
            })}
          </div>

          {/* View all footer */}
          <div className="px-3 pb-3">
            <Link
              to="/services"
              onClick={handleNavigate}
              className="flex items-center justify-center gap-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-semibold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 hover:text-orange-700"
            >
              <LayoutGrid className="h-3.5 w-3.5" />
              View All Services
            </Link>
          </div>
        </div>
      )}

      {/* Mobile accordion panel */}
      {mobile && (
        <div
          role="menu"
          aria-hidden={!open}
          className={`mt-1 space-y-1 overflow-hidden rounded-xl border bg-white transition-all duration-200 ${
            open ? 'max-h-[500px] opacity-100 border-slate-200 p-2' : 'max-h-0 border-transparent p-0 opacity-0'
          }`}
        >
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <NavLink
                key={s.path}
                to={s.path}
                onClick={handleNavigate}
                role="menuitem"
                className={({ isActive }) =>
                  `flex items-center gap-3 w-full rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                    isActive ? 'bg-slate-50 text-orange-700' : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${
                      isActive ? 'bg-slate-100 text-orange-700' : 'bg-slate-100 text-slate-500'
                    }`}>
                      <Icon className="h-3.5 w-3.5" />
                    </span>
                    {s.label}
                  </>
                )}
              </NavLink>
            );
          })}
          <Link
            to="/services"
            onClick={handleNavigate}
            className="flex items-center gap-2 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-orange-700 mt-1"
          >
            <LayoutGrid className="h-4 w-4" />
            View All Services
          </Link>
        </div>
      )}
    </div>
  );
}

