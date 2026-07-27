import React, { useEffect } from 'react';
import SiteHeader from '../../components/SiteHeader';
import ServiceHero from '../../components/services/ServiceHero';
import FeaturesSection from '../../components/services/FeaturesSection';
import BenefitsSection from '../../components/services/BenefitsSection';
import CTASection from '../../components/services/CTASection';
import { Smartphone, Zap, Shield } from 'lucide-react';
import { webDevImg } from '../../data/serviceImages';

export default function WebDevelopment() {
  useEffect(() => {
    document.title = 'Web Development — Shiva Enterprises';
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', 'Custom web development services for schools and transport businesses.');
  }, []);

  const features = [
    { title: 'Responsive Design', description: 'Pixel-perfect responsive layouts', icon: Smartphone },
    { title: 'Performance', description: 'Optimised bundles and lazy loading', icon: Zap },
    { title: 'Integrations', description: 'Payment gateways, SMS, GPS telemetry', icon: Shield },
  ];
  const benefits = [
    { title: 'Admins', description: 'Faster onboarding for administrators' },
    { title: 'Uptime', description: 'Reduced downtime and maintenance overhead' },
    { title: 'Safety', description: 'Improved parent communication and safety' },
  ];

  return (
    <div className="min-h-screen text-slate-900 font-sans pt-[var(--header-h)]" style={{ background: 'var(--bg-base)' }}>
      <SiteHeader />
      <ServiceHero title="Web Development" subtitle="Custom, reliable web applications for schools and transport operators." tagline="Digital Experiences That Convert" image={webDevImg} />
      <div style={{ background: 'var(--bg-section)' }}>
        <FeaturesSection features={features} />
        <BenefitsSection benefits={benefits} />
        <CTASection ctaText="Contact For Web Dev" />
      </div>
    </div>
  );
}
