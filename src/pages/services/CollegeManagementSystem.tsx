import React, { useEffect } from 'react';
import SiteHeader from '../../components/SiteHeader';
import ServiceHero from '../../components/services/ServiceHero';
import FeaturesSection from '../../components/services/FeaturesSection';
import BenefitsSection from '../../components/services/BenefitsSection';
import CTASection from '../../components/services/CTASection';
import { GraduationCap, BookOpen, Building2 } from 'lucide-react';
import { collegeImg } from '../../data/serviceImages';

export default function CollegeManagementSystem() {
  useEffect(() => {
    document.title = 'College Management System — Shiva Enterprises';
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', 'Management systems for colleges: admissions, exams, and campus operations.');
  }, []);

  const features = [
    { title: 'Admissions', description: 'Online admissions and workflows', icon: GraduationCap },
    { title: 'Exams', description: 'Timetables and grading automation', icon: BookOpen },
    { title: 'Campus', description: 'Hostel and transport management', icon: Building2 },
  ];
  const benefits = [
    { title: 'Streamline', description: 'Streamline administrative tasks' },
    { title: 'Analytics', description: 'Improve reporting and analytics' },
    { title: 'Lifecycle', description: 'Better student lifecycle management' },
  ];

  return (
    <div className="min-h-screen text-slate-900 font-sans pt-[var(--header-h)]" style={{ background: 'var(--bg-base)' }}>
      <SiteHeader />
      <ServiceHero title="College Management System" subtitle="Solutions for admissions, exams, and campus administration." tagline="Campus-Wide Digital Control" image={collegeImg} />
      <div style={{ background: 'var(--bg-section)' }}>
        <FeaturesSection features={features} />
        <BenefitsSection benefits={benefits} />
        <CTASection ctaText="Discuss College System" />
      </div>
    </div>
  );
}
