import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Home,
  ArrowLeft,
  Search,
  Stethoscope,
  HelpCircle,
} from 'lucide-react';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] antialiased flex flex-col">
      
      {/* Header */}
      <header className="h-20 bg-white border-b border-[#E2E8F0] px-4 lg:px-6 flex items-center">
        <div className="max-w-7xl w-full mx-auto flex items-center justify-between">
          
          {/* Brand */}
          <Link to="/" className="flex items-center">
            <span className="font-extrabold text-xl text-[#3F38CA] tracking-tight">
              Meetora
            </span>
          </Link>

          {/* Back */}
          <button
            onClick={() => navigate(-1)}
            className="h-10 px-4 inline-flex items-center justify-center gap-2
              text-sm font-semibold text-[#475569]
              hover:text-[#3F38CA] hover:bg-[#F8FAFC]
              rounded-xl transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Go Back</span>
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-16">
        <div className="max-w-xl w-full text-center">

         {/* Icon */}
          <div className="flex justify-center items-center mb-4">
            {/* 404 Badge */}
            <span
              className="
                bg-[#3F38CA] text-white text-center
                text-xs font-bold px-10 py-2
                rounded-full border-2 border-white shadow-sm
              "
            >
              404 ERROR
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#0F172A] tracking-tight">
            Page Not Found
          </h1>

          {/* Description */}
          <p className="text-sm sm:text-base text-[#64748B] mt-4 max-w-md mx-auto leading-relaxed">
            The page or consultation record you are looking for might
            have been moved, removed, or is temporarily unavailable.
          </p>

          {/* Actions */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">

            {/* Primary */}
            <Link
              to="/"
              className="w-full sm:w-auto h-12 px-6
                inline-flex items-center justify-center gap-2.5
                bg-[#3F38CA] hover:bg-[#312E81]
                text-white text-sm font-semibold
                rounded-xl transition-all"
            >
              <Home className="w-5 h-5" />
              <span>Back to Homepage</span>
            </Link>

            {/* Secondary */}
            <Link
              to="/doctors"
              className="w-full sm:w-auto h-12 px-6
                inline-flex items-center justify-center gap-2.5
                bg-white hover:bg-[#F8FAFC]
                text-[#475569] hover:text-[#0F172A]
                border border-[#E2E8F0]
                text-sm font-semibold rounded-xl
                transition-all"
            >
              <Search className="w-5 h-5 text-[#64748B]" />
              <span>Find a Doctor</span>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 px-4 bg-white border-t border-[#E2E8F0] text-center">
        <p className="text-xs text-[#94A3B8]">
          © 2026 Meetora Inc. All rights reserved.
        </p>
      </footer>
    </div>
  );
}