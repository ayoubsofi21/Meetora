import React from 'react';
import PublicNavbar from '../../components/layout/PublicNavbar';
import HeroSection from '../../components/home/HeroSection';
import DoctorsSection from '../../components/home/DoctorsSection';
import PublicFooter from '../../components/layout/PublicFooter';
export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#F4F8FD] font-sans text-slate-800 antialiased">
      <PublicNavbar />
      <main>
        <HeroSection />
        <DoctorsSection />
      </main>
      <PublicFooter />
    </div>
  );
}