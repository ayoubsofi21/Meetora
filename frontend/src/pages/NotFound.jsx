// src/pages/public/NotFound.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, Search, Stethoscope, HelpCircle } from 'lucide-react';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F4F8FD] font-sans text-slate-800 antialiased flex flex-col justify-between">
      
      {/* Top Header Brand Minimal */}
      <header className="w-full bg-[#F4F8FD] border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <span className="font-extrabold text-2xl text-[#2563EB] tracking-tight">
              Meetora
            </span>
          </Link>
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-[#2563EB] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Go Back</span>
          </button>
        </div>
      </header>

      {/* Main 404 Hero Section */}
      <main className="flex-grow flex items-center justify-center py-16 px-6">
        <div className="max-w-xl w-full text-center">
          
          {/* Visual Badge Card */}
          <div className="relative inline-block mb-8">
            <div className="w-28 h-28 rounded-3xl bg-white shadow-xl shadow-slate-200/70 border border-slate-200/80 flex items-center justify-center mx-auto text-[#2563EB]">
              <Stethoscope className="w-14 h-14 stroke-[1.75]" />
            </div>
            
            {/* Floating Error Badge */}
            <span className="absolute -top-2 -right-2 bg-[#2563EB] text-white text-xs font-extrabold px-3 py-1 rounded-full shadow-md border-2 border-white">
              404 ERROR
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
            Page Not Found
          </h1>

          {/* Subtext */}
          <p className="text-slate-600 text-sm sm:text-base mt-3 max-w-md mx-auto leading-relaxed">
            The page or consultation record you are looking for might have been moved, removed, or is temporarily unavailable.
          </p>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-semibold px-6 py-3 rounded-xl shadow-sm hover:shadow transition-all"
            >
              <Home className="w-4 h-4" />
              <span>Back to Homepage</span>
            </Link>

            <Link
              to="/doctors"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-sm font-semibold px-6 py-3 rounded-xl shadow-sm transition-all"
            >
              <Search className="w-4 h-4 text-slate-400" />
              <span>Find a Doctor</span>
            </Link>
          </div>

          {/* Helpful Shortcuts Box */}
          <div className="mt-12 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm text-left">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              <HelpCircle className="w-4 h-4 text-[#2563EB]" />
              <span>Quick Navigation</span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs font-semibold text-slate-700">
              <Link to="/#platform" className="p-2.5 rounded-lg bg-[#F8FAFC] hover:bg-[#EBF3FF] hover:text-[#2563EB] transition-colors">
                Platform Overview
              </Link>
              <Link to="/#solutions" className="p-2.5 rounded-lg bg-[#F8FAFC] hover:bg-[#EBF3FF] hover:text-[#2563EB] transition-colors">
                Clinical Solutions
              </Link>
              <Link to="/login" className="p-2.5 rounded-lg bg-[#F8FAFC] hover:bg-[#EBF3FF] hover:text-[#2563EB] transition-colors">
                Patient Log In
              </Link>
              <Link to="/register" className="p-2.5 rounded-lg bg-[#F8FAFC] hover:bg-[#EBF3FF] hover:text-[#2563EB] transition-colors">
                Doctor Registration
              </Link>
            </div>
          </div>

        </div>
      </main>

      {/* Footer minimal sub-bar */}
      <footer className="py-6 border-t border-slate-200/60 text-center text-xs text-slate-400">
        © 2026 Meetora Inc. All rights reserved.
      </footer>
    </div>
  );
}