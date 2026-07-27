import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import BusSimulator from "../components/BusSimulator";

export default function BusDemo() {

  useEffect(() => {
    if (window.location.hash === "#live-demo") {
      setTimeout(() => {
        const el = document.getElementById("live-demo");
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 150);
    }
  }, []);

  return (
    <div
      className="min-h-screen text-slate-900 font-sans pt-[var(--header-h)]"
      style={{ background: "var(--bg-base)" }}
    >
      <SiteHeader />

      {/* Hero / Live System Demo Header */}
      <section id="live-demo" className="relative overflow-hidden border-b border-[#d4dde8]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#eef3f8] via-transparent to-transparent opacity-60" />
        <div
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage: "radial-gradient(#c8d8e8 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />
        {/* <div className="relative mx-auto max-w-7xl px-4 py-16 md:px-8 lg:py-20"> */}
          {/* <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-orange-700"> */}
            {/* <Bus className="h-3.5 w-3.5" /> */}
            {/* Live System Demo */}
          {/* </div> */}
          {/* <h1 className="mt-4 text-3xl font-black leading-tight tracking-tight text-slate-900 md:text-4xl lg:text-5xl"> */}
            {/* Smart School Bus Tracker */}
          {/* </h1> */}
          {/* <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-600 md:text-base md:leading-7"> */}
            {/* Experience our GPS-enabled school bus tracking system in real-time. Monitor routes, track live location, and explore smart transport safety features. */}
          {/* </p> */}
        {/* </div> */}
      </section>

      {/* Demo Tabs + Content */}
      <section
        className="px-4 py-12 md:py-16"
        style={{ background: "var(--bg-section)" }}
      >
        <div className="mx-auto max-w-7xl">
          <BusSimulator />
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="border-t border-[#d4dde8] px-4 py-12 md:px-8 text-center"
        style={{ background: "var(--bg-base)" }}
      >
        <div className="mx-auto max-w-7xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-slate-50 px-3 py-1 text-[10px] font-mono font-semibold uppercase tracking-wider text-orange-700">
            Get In Touch
          </div>
          <h3 className="mt-5 text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-slate-900">
            Ready to get started?
          </h3>
          <p className="mt-3 max-w-2xl mx-auto text-sm leading-6 text-slate-600">
            Reach out to our team in Kalaburagi for a custom proposal, or visit
            our contact page for direct details.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-white border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-orange-400 hover:text-orange-700"
            >
              View Contact Details
              <ArrowRight className="w-4 h-4 text-orange-600" />
            </Link>
            <Link
              to="/request-proposal"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-6 py-3 text-sm font-extrabold text-white shadow-lg transition hover:bg-slate-800"
            >
              Request a Custom Proposal
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
