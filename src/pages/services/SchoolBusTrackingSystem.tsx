import React, { useEffect } from 'react';
import SiteHeader from '../../components/SiteHeader';
import ServiceHero from '../../components/services/ServiceHero';
import FeaturesSection from '../../components/services/FeaturesSection';
import BenefitsSection from '../../components/services/BenefitsSection';
import CTASection from '../../components/services/CTASection';
import { Gauge, Bell, Camera } from 'lucide-react';
import { busImg } from '../../data/serviceImages';

export default function SchoolBusTrackingSystem() {
  useEffect(() => {
    document.title = 'School Bus Tracking System — Shiva Enterprises';
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', 'Real-time school bus tracking with parent notifications and driver safety features.');
  }, []);

  const features = [
    { title: 'Real-Time Tracking', description: 'GPS telemetry and route replay', icon: Gauge },
    { title: 'Notifications', description: 'Arrival and delay alerts for parents', icon: Bell },
    { title: 'Safety', description: 'CCTV and driver verification', icon: Camera },
  ];
  const benefits = [
    { title: 'Student Safety', description: 'Increase student safety and parent trust' },
    { title: 'Efficiency', description: 'Reduce route inefficiencies' },
    { title: 'Fleet Insights', description: 'Actionable fleet insights' },
  ];

  return (
    <div className="min-h-screen text-slate-900 font-sans pt-[var(--header-h)]" style={{ background: 'var(--bg-base)' }}>
      <SiteHeader />
      <ServiceHero title="School Bus Tracking System" subtitle="Live GPS tracking, alerts, and safety integrations." tagline="Safety On Every Route" image={busImg} />
      <div style={{ background: 'var(--bg-section)' }}>
        <FeaturesSection features={features} />
        <BenefitsSection benefits={benefits} />
        <CTASection ctaText="Request Tracking Demo" />
      </div>
    </div>
  );
}
