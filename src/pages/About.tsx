import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Building2, Shield, Users, Cpu, ArrowRight } from 'lucide-react';
import SiteHeader from '../components/SiteHeader';
import SiteFooter from '../components/SiteFooter';
import ServiceHero from '../components/services/ServiceHero';
import FeaturesSection from '../components/services/FeaturesSection';
import BenefitsSection from '../components/services/BenefitsSection';
import CTASection from '../components/services/CTASection';

const strengths = [
  {
    title: 'School & College Management',
    description: 'Complete administration platforms built for daily operations — attendance, fees, exams, and staff coordination.',
    icon: Building2,
  },
  {
    title: 'Smart Transport Solutions',
    description: 'GPS bus tracking, CCTV integration, and parent-facing visibility for safer routes.',
    icon: Shield,
  },
  {
    title: 'Digital Growth Tools',
    description: 'Business websites, e-commerce platforms, and PVC ID card systems for institutions.',
    icon: Users,
  },
  {
    title: 'Operational Support',
    description: 'Communication tools, deployment support, and ongoing systems maintenance for long-term reliability.',
    icon: Cpu,
  },
];

const values = [
  {
    title: 'Reliable First',
    description: 'We focus on systems that are stable, understandable, and easy for teams to adopt.',
  },
  {
    title: 'People-Centered',
    description: 'Every feature is shaped around administrators, staff, parents, students, and operators.',
  },
  {
    title: 'Smart Operations',
    description: 'Our work combines software, automation, and field-ready technology for real use cases.',
  },
];

export default function About() {
  useEffect(() => {
    document.title = 'About — Shiva Enterprises';
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', 'About Shiva Enterprises — Software and smart technology solutions for schools, transport operators, and growing businesses.');
  }, []);

  return (
    <div className="min-h-screen text-slate-900 font-sans pt-[var(--header-h)]" style={{ background: 'var(--bg-base)' }}>
      <SiteHeader />
      <ServiceHero
        title="About Shiva Enterprises"
        subtitle="Practical technology for safer schools, smarter transport, and growing businesses."
        tagline="Who We Are"
        ctaLabel="Explore Services"
        ctaLink="/#services"
      />
      <section className="relative px-4 py-12 md:py-16 border-t border-[#d4dde8]" style={{ background: 'var(--bg-base)' }}>
        <div className="absolute inset-0 bg-[radial-gradient(#c8d8e8_1px,transparent_1px)] [background-size:28px_28px] opacity-50 pointer-events-none" />
        <div className="relative mx-auto max-w-6xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-50 border border-slate-200 rounded-full text-orange-700 text-[10px] font-medium tracking-[0.12em] uppercase">
            About Shiva Enterprises
          </div>
          <h3 className="mt-5 text-2xl md:text-3xl font-bold leading-snug tracking-tight text-slate-900">
            Practical digital systems for schools, transport operators, and growing teams.
          </h3>
          <p className="mt-4 max-w-2xl text-sm text-slate-600 leading-7">
            We combine reliable software, transport technology, and smart operations support to help institutions stay safer, more connected, and easier to manage. From custom websites and school platforms to GPS tracking and digital ID card solutions, our work is designed to be simple to use and practical to deploy.
          </p>
          <Link to="/services" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-orange-700 transition hover:text-orange-600 group">
            Learn more about our solutions
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </section>
      <section className="px-4 py-12 md:py-16" style={{ background: 'var(--bg-section)' }}>
        <div className="mx-auto max-w-7xl space-y-8">
          <FeaturesSection
            title="What We Build"
            subtitle="From school platforms to fleet visibility — we deliver tools that match how modern organisations actually operate."
            features={strengths}
          />
          <BenefitsSection title="Our Approach" subtitle="Clear systems, thoughtful support, and technology that fits the work." benefits={values} />
          <CTASection
            title="Want to work with us?"
            description="Tell us about your requirements and we will put together a practical plan."
            ctaText="Contact Team"
            ctaLink="/contact"
          />
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
