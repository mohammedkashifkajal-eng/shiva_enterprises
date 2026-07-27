import React, { useEffect } from 'react';
import SiteHeader from '../../components/SiteHeader';
import ServiceHero from '../../components/services/ServiceHero';
import FeaturesSection from '../../components/services/FeaturesSection';
import BenefitsSection from '../../components/services/BenefitsSection';
import CTASection from '../../components/services/CTASection';
import { ClipboardList, FileText, Users } from 'lucide-react';
import { schoolImg } from '../../data/serviceImages';

export default function SchoolManagementSystem() {
  useEffect(() => {
    document.title = 'School Management System — Shiva Enterprises';
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', 'Comprehensive school management systems for attendance, grades, and administration.');
  }, []);

  const features = [
    { title: 'Attendance', description: 'Automated attendance and reporting', icon: ClipboardList },
    { title: 'Grades', description: 'Gradebook and performance dashboards', icon: FileText },
    { title: 'Parent Portal', description: 'Notifications and communication', icon: Users },
  ];
  const benefits = [
    { title: 'Reduce Workload', description: 'Reduce paperwork and manual errors' },
    { title: 'Communication', description: 'Improve parent-teacher communication' },
    { title: 'Scalability', description: 'Scalable for multiple branches' },
  ];

  return (
    <div className="min-h-screen text-slate-900 font-sans pt-[var(--header-h)]" style={{ background: 'var(--bg-base)' }}>
      <SiteHeader />
      <ServiceHero title="School Management System" subtitle="Manage attendance, grades, fees, and communication." tagline="Paperless School Operations" image={schoolImg} />
      <div style={{ background: 'var(--bg-section)' }}>
        <FeaturesSection features={features} />
        <BenefitsSection benefits={benefits} />
        <CTASection ctaText="Discuss School System" />
      </div>
    </div>
  );
}
