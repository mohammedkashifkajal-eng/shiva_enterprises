import React, { useEffect } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowRight, LayoutGrid } from "lucide-react";
import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";
import ServiceHero from "../../components/services/ServiceHero";
import FeaturesSection from "../../components/services/FeaturesSection";
import BenefitsSection from "../../components/services/BenefitsSection";
import CTASection from "../../components/services/CTASection";
import { services, getService, type ServiceConfig } from "../../data/services";

function useMeta(config: { metaTitle: string; metaDescription: string }) {
  useEffect(() => {
    document.title = config.metaTitle;
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", config.metaDescription);
  }, [config.metaTitle, config.metaDescription]);
}

export default function ServicePage() {
  const { slug } = useParams<{ slug: string }>();
  const config = getService(slug);

  if (!config) return <Navigate to="/services" replace />;
  return <ServiceDetail config={config} />;
}

function ServiceDetail({ config }: { config: ServiceConfig }) {
  useMeta(config);

  return (
    <div className="min-h-screen text-slate-900 font-sans pt-[var(--header-h)]" style={{ background: 'var(--bg-base)' }}>
      <SiteHeader />
      <ServiceHero
        title={config.title}
        subtitle={config.subtitle}
        tagline={config.tagline}
        image={config.image}
      />
      <div style={{ background: 'var(--bg-section)' }}>
        <FeaturesSection
          title="Everything Your Institution Needs"
          subtitle="Designed for administrators, teachers, parents, and students — with workflows that match how modern organizations actually operate."
          features={config.features}
        />
        <BenefitsSection title="Built for Growth" benefits={config.benefits} />
        <CTASection
          title={config.ctaTitle}
          description={config.ctaDescription}
          ctaText={config.ctaText}
          ctaLink={config.ctaLink}
        />
      </div>
      <SiteFooter />
    </div>
  );
}

export function ServicesIndex() {
  useEffect(() => {
    document.title = "Our Services — Shiva Enterprises";
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", "Explore the software, web, and smart technology services offered by Shiva Enterprises.");
  }, []);

  return (
    <div className="min-h-screen text-slate-900 font-sans pt-[var(--header-h)]" style={{ background: 'var(--bg-base)' }}>
      <SiteHeader />

      <section className="relative overflow-hidden border-b border-[#d4dde8]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#eef3f8] via-transparent to-transparent opacity-60" />
        <div className="absolute inset-0 bg-[radial-gradient(#c8d8e8_1px,transparent_1px)] [background-size:22px_22px] opacity-50" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 md:px-8 lg:py-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-orange-700">
              <LayoutGrid className="h-3.5 w-3.5" />
              Our Services
            </div>
            <h1 className="mt-5 text-3xl font-black leading-tight tracking-tight text-slate-900 md:text-4xl lg:text-5xl">
              Practical technology for schools, transport, and growing businesses.
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-6 text-slate-600 md:text-base md:leading-7">
              Explore our core service areas — from custom web platforms to complete school and fleet management systems.
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 py-12 md:py-16" style={{ background: 'var(--bg-section)' }}>
        <div className="mx-auto grid max-w-7xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <Link
              key={s.slug}
              to={`/services/${s.slug}`}
              className="group flex flex-col gap-3 rounded-2xl border border-[#d4dde8] bg-white p-5 shadow-sm transition hover:border-orange-300 hover:shadow-md sm:p-6"
            >
              <h3 className="text-lg font-bold text-slate-900">{s.title}</h3>
              <p className="flex-1 text-sm leading-6 text-slate-600">{s.subtitle}</p>
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-orange-700 transition group-hover:gap-3">
                Learn more
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}

