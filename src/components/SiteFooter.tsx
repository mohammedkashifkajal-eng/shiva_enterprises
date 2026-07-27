import React from 'react';
import { Link } from 'react-router-dom';

const footerLinks = [
  { label: 'About',            to: '/about' },
  { label: 'Solutions',        to: '/services' },
  { label: 'Live Demo',        to: '/bus-demo#live-demo' },
  { label: 'Franchise',        to: '/franchise' },
  { label: 'Pricing',          to: '/pricing' },
  { label: 'Contact',          to: '/contact' },
  { label: 'Request Proposal', to: '/request-proposal' },
];

export default function SiteFooter({ style }: { style?: React.CSSProperties } = {}) {
  return (
    <footer
      className="border-t border-[#d4dde8] py-10 md:py-14"
      style={style || { background: 'var(--bg-section)' }}
    >
      <div className="mx-auto max-w-6xl px-4 flex flex-col items-center gap-5">

        {/* Brand */}
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-sm font-black text-white">
            S
          </div>
          <span className="font-display text-xs font-bold uppercase tracking-[0.08em] text-slate-900">
            Shiva Enterprises
          </span>
        </div>

        {/* Nav links */}
        <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          {footerLinks.map(({ label, to }) => (
            <Link
              key={to}
              to={to}
              className="text-[11px] font-mono text-slate-500 transition hover:text-orange-700"
            >
              {label}
            </Link>
          ))}
          <a
            href="http://shivaenterprises.net.in"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] font-mono text-slate-500 transition hover:text-orange-700"
          >
            Portal
          </a>
        </nav>

        {/* Contact strip */}
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-[11px] font-mono text-slate-400">
          <a href="tel:7349018613" className="hover:text-orange-700 transition">+91 7349018613</a>
          <span className="hidden sm:inline text-slate-300">·</span>
          <a href="mailto:info@shivaenterprises.net.in" className="hover:text-orange-700 transition">
            info@shivaenterprises.net.in
          </a>
          <span className="hidden sm:inline text-slate-300">·</span>
          <span>Kalaburagi, Karnataka</span>
        </div>

        {/* Copyright */}
        <p className="text-[10px] font-mono text-slate-400">
          © {new Date().getFullYear()} SHIVA ENTERPRISES. All Rights Reserved.
        </p>

      </div>
    </footer>
  );
}
