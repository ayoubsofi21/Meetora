import React from 'react';
import {
  CalendarCheck,
  Stethoscope,
  Users,
  FileHeart,
  Clock3,
  ShieldCheck,
} from 'lucide-react';

import PublicNavbar from '../../components/layout/PublicNavbar';
import PublicFooter from '../../components/layout/PublicFooter';

export default function SolutionsPage() {
  const solutions = [
    {
      icon: CalendarCheck,
      title: 'Smart Appointment Management',
      description:
        'Book, organize and manage medical appointments through one simple platform.',
    },
    {
      icon: Stethoscope,
      title: 'Doctor Management',
      description:
        'Help healthcare professionals manage schedules, patients and consultations.',
    },
    {
      icon: Users,
      title: 'Patient Management',
      description:
        'Centralize patient information and simplify communication with medical teams.',
    },
    {
      icon: FileHeart,
      title: 'Medical Records',
      description:
        'Keep important medical information, history and clinical records organized.',
    },
    {
      icon: Clock3,
      title: 'Availability Management',
      description:
        'Doctors can define their availability while patients find suitable appointment times.',
    },
    {
      icon: ShieldCheck,
      title: 'Secure Healthcare Access',
      description:
        'Role-based access helps protect sensitive information across the platform.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F4F8FD] text-[#0F172A]">
      <PublicNavbar />

      <main>
        <section className="px-6 py-20 lg:py-28">
          <div className="max-w-7xl mx-auto text-center">
            <span className="inline-flex px-4 py-2 rounded-full bg-[#EEF2FF] text-[#3F38CA] text-sm font-semibold">
              Meetora Solutions
            </span>

            <h1 className="mt-6 text-4xl md:text-5xl font-extrabold tracking-tight">
              Everything you need to manage
              <span className="text-[#3F38CA]"> modern healthcare</span>
            </h1>

            <p className="max-w-2xl mx-auto mt-5 text-[#64748B] text-lg">
              Meetora connects patients, doctors and healthcare management
              through a simple and efficient digital experience.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16 text-left">
              {solutions.map(({ icon: Icon, title, description }) => (
                <div
                  key={title}
                  className="bg-white border border-[#E2E8F0] rounded-2xl p-7
                    hover:border-[#C7D2FE] hover:shadow-lg
                    transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#EEF2FF] text-[#3F38CA] flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h2 className="mt-5 text-lg font-bold">
                    {title}
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-[#64748B]">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  );
}