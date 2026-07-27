import {
  Code2, Smartphone, Palette, Zap, Shield, Rocket,
  Users, GraduationCap, ClipboardList, CreditCard, FileText, BarChart3, Bell, ShieldCheck,
  ShoppingCart, Package, Truck, BarChart2,
  Gauge, Camera, MapPin, Radio,
  BookOpen, CalendarDays, Building2, Library, ClipboardCheck,
  LucideIcon,
} from "lucide-react";

import { webDevImg, ecommerceImg, schoolImg, busImg, collegeImg } from "./serviceImages";

export interface FeatureItem {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface ServiceConfig {
  slug: string;
  title: string;
  subtitle: string;
  image?: string;
  tagline: string;
  features: FeatureItem[];
  benefits: { title: string; description: string }[];
  ctaTitle: string;
  ctaDescription: string;
  ctaText: string;
  ctaLink: string;
  metaTitle: string;
  metaDescription: string;
}

export const services: ServiceConfig[] = [
  {
    slug: "web-development",
    title: "Web Development",
    subtitle: "Custom, blazing-fast, and beautifully designed web platforms that make your school, transport business, or brand stand out.",
    image: webDevImg,
    tagline: "Digital Experiences That Convert",
    features: [
      { title: "Custom Design Systems", description: "Pixel-perfect, brand-aligned interfaces built with modern design systems and accessibility standards.", icon: Palette },
      { title: "Lightning Fast", description: "Optimized bundles, lazy loading, and caching strategies that deliver sub-second page loads.", icon: Zap },
      { title: "Mobile First", description: "Fully responsive layouts that work seamlessly on phones, tablets, and desktop environments.", icon: Smartphone },
      { title: "Modern Stack", description: "React, Vite, and TypeScript for maintainable codebases that scale with your business.", icon: Code2 },
      { title: "Security Built-In", description: "HTTPS, CSP headers, input sanitization, and regular audits to protect your platform.", icon: Shield },
      { title: "SEO & Performance", description: "Technical SEO optimization and performance monitoring to help you rank higher and convert better.", icon: Rocket },
    ],
    benefits: [
      { title: "Stronger First Impression", description: "A polished, professional website builds immediate trust with parents, partners, and stakeholders." },
      { title: "24/7 Availability", description: "Your digital storefront serves customers and parents around the clock, even when offices are closed." },
      { title: "Easy Updates", description: "Manage content, announcements, and events yourself with an intuitive admin panel." },
      { title: "Better Conversions", description: "Clear calls to action and smooth user journeys turn visitors into enquiries and enrollments." },
      { title: "Long-Term Support", description: "We provide ongoing maintenance, security updates, and feature enhancements after launch." },
      { title: "Multi-Device Ready", description: "Your platform works on every device without layout breaks or feature loss." },
    ],
    ctaTitle: "Ready to launch your project?",
    ctaDescription: "Get a detailed proposal with timelines, designs, and transparent pricing for your web project.",
    ctaText: "Contact For Web Dev",
    ctaLink: "/request-proposal",
    metaTitle: "Web Development — Shiva Enterprises",
    metaDescription: "Custom web development services for schools and transport businesses.",
  },
  {
    slug: "e-commerce-development",
    title: "E-Commerce Development",
    subtitle: "Scalable online stores with secure payments, inventory management, and automated order workflows.",
    image: ecommerceImg,
    tagline: "Online Stores That Grow With You",
    features: [
      { title: "Custom Storefronts", description: "Beautiful, brand-aligned product catalogs with advanced filtering, search, and category management.", icon: ShoppingCart },
      { title: "Secure Payments", description: "Integrated Razorpay and Stripe gateways with SSL security and fraud protection for peace of mind.", icon: CreditCard },
      { title: "Inventory Management", description: "Real-time stock tracking, low-stock alerts, and automated reordering to prevent overselling.", icon: Package },
      { title: "Order Fulfillment", description: "Automated order confirmation, dispatch tracking, and delivery notifications for complete transparency.", icon: Truck },
      { title: "Sales Analytics", description: "Live dashboards with revenue, conversion rates, top products, and customer behavior insights.", icon: BarChart2 },
      { title: "Admin Security", description: "Role-based access, activity logs, and secure authentication to protect your business data.", icon: ShieldCheck },
    ],
    benefits: [
      { title: "Sell More Online", description: "Reach parents and customers 24/7 with an always-open digital storefront tied to your brand." },
      { title: "Simplify Payments", description: "Automated invoicing and payment reconciliation reduce manual bookkeeping and errors." },
      { title: "Inventory Confidence", description: "Never oversell or run out unexpectedly with real-time stock visibility across channels." },
      { title: "Customer Satisfaction", description: "Instant order confirmations and tracking keep buyers informed and reduce support tickets." },
      { title: "Business Insights", description: "Make smarter decisions with live reports on revenue, top products, and customer trends." },
      { title: "Low Maintenance", description: "A reliable, well-architected platform that requires minimal upkeep after launch." },
    ],
    ctaTitle: "Ready to sell online?",
    ctaDescription: "Start with a free consultation and get a tailored e-commerce plan that matches your products and audience.",
    ctaText: "Get E-Commerce Quote",
    ctaLink: "/request-proposal",
    metaTitle: "E-Commerce Development — Shiva Enterprises",
    metaDescription: "E-commerce solutions including storefronts, payments, and inventory for schools and small businesses.",
  },
  {
    slug: "school-management-system",
    title: "School Management System",
    subtitle: "All-in-one school administration platform for admissions, fees, grades, attendance, and parent communication.",
    image: schoolImg,
    tagline: "Paperless School Operations",
    features: [
      { title: "Admissions Portal", description: "Streamlined online admissions with automated document collection and seat allocation workflows.", icon: ClipboardList },
      { title: "Digital Gradebook", description: "Real-time grade capture with printable report cards, subject-wise analysis, and auto-ranking.", icon: FileText },
      { title: "Fee Management", description: "Automated fee reminders, online payment tracking, and instant receipt generation for accountants.", icon: CreditCard },
      { title: "Attendance Tracking", description: "Biometric or RFID-based daily attendance with instant parent notifications for absent students.", icon: Users },
      { title: "Parent Communication", description: "Built-in messaging, event announcements, and circulars delivered directly to parent devices.", icon: Bell },
      { title: "Analytics Dashboard", description: "School-wide insights on admissions, fee collection, attendance trends, and academic performance.", icon: BarChart3 },
    ],
    benefits: [
      { title: "Paperless Operations", description: "Replace registers and files with a unified digital platform accessible on any device." },
      { title: "Faster Administration", description: "Reduce the time spent on data entry, report generation, and fee follow-ups." },
      { title: "Better Parent Engagement", description: "Keep families informed with real-time updates and transparent progress tracking." },
      { title: "Staff Productivity", description: "Empower teachers with tools for lesson planning, grading, and communication in one place." },
      { title: "Scalable Architecture", description: "Support multiple branches, academic years, and student cohorts from a single database." },
      { title: "Secure Data", description: "Role-based access and encrypted storage protect sensitive student and staff information." },
    ],
    ctaTitle: "Ready to digitize your school?",
    ctaDescription: "Let us show you a tailored demo and implementation plan that fits your institution's size and budget.",
    ctaText: "Discuss School System",
    ctaLink: "/request-proposal",
    metaTitle: "School Management System — Shiva Enterprises",
    metaDescription: "Comprehensive school management systems for attendance, grades, fees, and administration.",
  },
  {
    slug: "school-bus-tracking-system",
    title: "School Bus Tracking System",
    subtitle: "Real-time GPS tracking, parent mobile alerts, and live CCTV streaming for complete transport safety.",
    image: busImg,
    tagline: "Safety On Every Route",
    features: [
      { title: "Real-Time GPS Tracking", description: "Continuous telemetry with route replay and live position updates for dispatchers and parents.", icon: Gauge },
      { title: "Parent Mobile App", description: "Instant arrival and delay alerts with a simple interface designed for non-technical users.", icon: Bell },
      { title: "CCTV Live Streaming", description: "High-definition dome cameras inside each bus with secure, encrypted live feeds.", icon: Camera },
      { title: "Driver Verification", description: "Multi-factor driver authentication and route adherence monitoring for complete accountability.", icon: ShieldCheck },
      { title: "Route Optimization", description: "Analytics-driven route planning to reduce fuel consumption and improve punctuality.", icon: MapPin },
      { title: "Fleet Analytics", description: "Comprehensive dashboards showing speed, idle time, stop coverage, and daily summaries.", icon: Radio },
    ],
    benefits: [
      { title: "Student Safety", description: "Give parents real-time visibility and peace of mind during every commute." },
      { title: "Operational Control", description: "Monitor speeds, routes, and driver behavior from a single command dashboard." },
      { title: "Time Savings", description: "Automate attendance, notifications, and route planning to reduce manual work." },
      { title: "Faster Response", description: "Instant alerts let administrators respond to route deviations within seconds." },
      { title: "Trust Building", description: "Transparent tracking builds stronger relationships with parents and guardians." },
      { title: "Scalable Growth", description: "Easily onboard new buses, routes, and schools as your fleet expands." },
    ],
    ctaTitle: "Ready to make your fleet safer?",
    ctaDescription: "Request a free demo and discover how our tracking system can transform your school transport operations.",
    ctaText: "Request a Tracking Demo",
    ctaLink: "/request-proposal",
    metaTitle: "School Bus Tracking System — Shiva Enterprises",
    metaDescription: "Real-time school bus tracking with parent notifications, CCTV monitoring, and driver safety features.",
  },
  {
    slug: "college-management-system",
    title: "College Management System",
    subtitle: "Comprehensive higher-education platform for admissions, exams, placements, and campus operations.",
    image: collegeImg,
    tagline: "Campus-Wide Digital Control",
    features: [
      { title: "Modular Admissions", description: "Online application forms, document verification, merit lists, and seat allocation in one portal.", icon: GraduationCap },
      { title: "Exam Management", description: "Automated timetable generation, seating arrangements, grading rubrics, and transcript publication.", icon: BookOpen },
      { title: "Academic Calendar", description: "Shared event scheduler for classes, exams, holidays, and placements visible to all departments.", icon: CalendarDays },
      { title: "Hostel & Campus", description: "Room allocation, mess billing, visitor logs, and facility booking for residential campuses.", icon: Building2 },
      { title: "Library System", description: "Barcode-based issue/return tracking, fine calculation, and searchable digital catalogs.", icon: Library },
      { title: "Faculty Portal", description: "Attendance, lesson plans, leave applications, and performance tracking for professors and staff.", icon: ClipboardCheck },
    ],
    benefits: [
      { title: "Simplified Administration", description: "Reduce paperwork and manual coordination across departments, freeing staff for higher-value work." },
      { title: "Better Student Experience", description: "Unified access to grades, schedules, fees, and notifications from any device." },
      { title: "Data-Driven Decisions", description: "Live analytics on admissions, exam results, placement records, and resource utilization." },
      { title: "Faster Placements", description: "Integrated placement cell tools for job postings, resume collection, and interview scheduling." },
      { title: "Multi-Dept Scaling", description: "Separate departmental views with centralized control for principals and management." },
      { title: "Compliance Ready", description: "Audit logs, report generation, and record retention built for AICTE, NBA, and university standards." },
    ],
    ctaTitle: "Ready to modernize your campus?",
    ctaDescription: "Book a campus demo or request a proposal tailored to your department structure and student count.",
    ctaText: "Discuss College System",
    ctaLink: "/request-proposal",
    metaTitle: "College Management System — Shiva Enterprises",
    metaDescription: "Management systems for colleges: admissions, exams, and campus operations.",
  },
];

export function getService(slug: string | undefined): ServiceConfig | undefined {
  return services.find((s) => s.slug === slug);
}
