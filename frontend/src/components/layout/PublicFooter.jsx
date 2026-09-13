// src/components/layout/PublicFooter.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Lock, Globe } from 'lucide-react';

export default function PublicFooter() {
  return (
    <footer className="bg-[#0F172A] text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Brand & Mission Column */}
          <div className="md:col-span-5 space-y-4">
            <Link to="/" className="flex items-center">
              <span className="font-extrabold text-2xl text-white tracking-tight">
                Meetora
              </span>
            </Link>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm font-normal">
              A unified healthcare management platform designed for modern medical professionals and patients. Streamline scheduling, access medical records, and elevate care delivery.
            </p>

            <div className="inline-flex items-center gap-2 bg-slate-800/60 px-3 py-1.5 rounded-xl border border-slate-700/60 text-[11px] font-semibold text-[#BFDBFE]">
              <ShieldCheck className="w-4 h-4 text-[#2563EB]" />
              <span>HIPAA & GDPR Compliant Security</span>
            </div>
          </div>

          {/* Column 2: Platform Links */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-white">
              Platform
            </h4>
            <ul className="space-y-2 text-xs font-medium text-slate-400">
              <li>
                <a href="#platform" className="hover:text-white transition-colors">
                  Overview
                </a>
              </li>
              <li>
                <a href="#solutions" className="hover:text-white transition-colors">
                  Solutions
                </a>
              </li>
              <li>
                <Link to="/doctors" className="hover:text-white transition-colors">
                  Find Doctors
                </Link>
              </li>
              <li>
                <a href="#pricing" className="hover:text-white transition-colors">
                  Pricing
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-white">
              Resources
            </h4>
            <ul className="space-y-2 text-xs font-medium text-slate-400">
              <li>
                <a href="#docs" className="hover:text-white transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#help" className="hover:text-white transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#guides" className="hover:text-white transition-colors">
                  Practice Guides
                </a>
              </li>
              <li>
                <a href="#api" className="hover:text-white transition-colors">
                  API Status
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Account & Legal */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-white">
              Account & Legal
            </h4>
            <ul className="space-y-2 text-xs font-medium text-slate-400">
              <li>
                <Link to="/login" className="hover:text-white transition-colors">
                  Log In
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-white transition-colors">
                  Get Started
                </Link>
              </li>
              <li>
                <a href="#privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#terms" className="hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Sub-footer */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 Meetora Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 hover:text-slate-300 transition-colors">
              <Globe className="w-3.5 h-3.5 text-slate-400" /> English (US)
            </span>
            <span className="flex items-center gap-1.5 hover:text-slate-300 transition-colors">
              <Lock className="w-3.5 h-3.5 text-slate-400" /> 256-Bit SSL Encryption
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}