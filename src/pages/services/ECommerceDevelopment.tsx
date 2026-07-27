import React, { useEffect } from 'react';
import SiteHeader from '../../components/SiteHeader';
import ServiceHero from '../../components/services/ServiceHero';
import FeaturesSection from '../../components/services/FeaturesSection';
import BenefitsSection from '../../components/services/BenefitsSection';
import CTASection from '../../components/services/CTASection';
import { ShoppingCart, CreditCard, Package } from 'lucide-react';
import { ecommerceImg } from '../../data/serviceImages';

export default function ECommerceDevelopment() {
  useEffect(() => {
    document.title = 'E-Commerce Development — Shiva Enterprises';
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', 'E-commerce solutions including storefronts, payments, and inventory for schools and small businesses.');
  }, []);

  const features = [
    { title: 'Storefronts', description: 'Custom product catalogs and CMS', icon: ShoppingCart },
    { title: 'Payments', description: 'Payment gateway integrations and security', icon: CreditCard },
    { title: 'Inventory', description: 'Real-time inventory and order management', icon: Package },
  ];
  const benefits = [
    { title: 'Uniforms & Books', description: 'Sell uniforms, books, and services online' },
    { title: 'Secure Gateway', description: 'Secure payments and simple reconciliation' },
    { title: 'Tracking', description: 'Automated order notifications and tracking' },
  ];

  return (
    <div className="min-h-screen text-slate-900 font-sans pt-[var(--header-h)]" style={{ background: 'var(--bg-base)' }}>
      <SiteHeader />
      <ServiceHero title="E-Commerce Development" subtitle="Full-stack e-commerce solutions tailored to your needs." tagline="Online Stores That Grow With You" image={ecommerceImg} />
      <div style={{ background: 'var(--bg-section)' }}>
        <FeaturesSection features={features} />
        <BenefitsSection benefits={benefits} />
        <CTASection ctaText="Get E-Commerce Quote" />
      </div>
    </div>
  );
}
