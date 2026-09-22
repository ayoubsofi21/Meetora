import React from 'react';
import {
  BookOpen,
  CircleHelp,
  HeartPulse,
  ArrowRight,
  FileText,
  ShieldCheck,
} from 'lucide-react';

import PublicNavbar from '../../components/layout/PublicNavbar';
import PublicFooter from '../../components/layout/PublicFooter';

export default function ResourcesPage() {
  const resources = [
    {
      icon: BookOpen,
      title: 'Getting Started',
      description:
        'Learn how to create your account, find doctors and start using Meetora.',
    },
    {
      icon: CircleHelp,
      title: 'Help Center',
      description:
        'Find answers to common questions about appointments, accounts and medical records.',
    },
    {
      icon: HeartPulse,
      title: 'Patient Guide',
      description:
        'Understand how patients can manage appointments, prescriptions and medical information.',
    },
    {
      icon: FileText,
      title: 'Doctor Guide',
      description:
        'Learn how practitioners can manage patients, schedules and consultations.',
    },
    {
      icon: ShieldCheck,
      title: 'Privacy & Security',
      description:
        'Discover how Meetora approaches secure access and healthcare information.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F4F8FD] text-[#0F172A]">
      <PublicNavbar />

      <main className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
        <div className="max-w-2xl">
          <span className="text-sm font-bold text-[#3F38CA] uppercase tracking-wider">
            Resources
          </span>

          <h1 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight">
            Learn how to get the most out of Meetora
          </h1>

          <p className="mt-5 text-lg text-[#64748B]">
            Helpful guides and resources for patients, doctors and healthcare
            administrators.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
          {resources.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="group bg-white border border-[#E2E8F0]
                rounded-2xl p-6 hover:shadow-lg
                hover:border-[#C7D2FE] transition-all"
            >
              <div className="w-11 h-11 rounded-xl bg-[#EEF2FF] text-[#3F38CA] flex items-center justify-center">
                <Icon className="w-5 h-5" />
              </div>

              <h2 className="mt-5 font-bold text-lg">
                {title}
              </h2>

              <p className="mt-2 text-sm text-[#64748B] leading-6">
                {description}
              </p>

              <button className="mt-5 flex items-center gap-2 text-sm font-semibold text-[#3F38CA]">
                Learn more
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}