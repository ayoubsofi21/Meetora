import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Lock, Globe } from 'lucide-react';

export default function PublicFooter() {
  return (
    <footer className="bg-[#0F172A] text-[#CBD5E1] border-t border-[#1E293B]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-14 pb-8">

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#1E293B]">

          {/* Brand */}
          <div className="md:col-span-5">
            <Link
              to="/"
              className="text-2xl font-extrabold tracking-tight text-white"
            >
              Meetora
            </Link>

            <p className="mt-4 text-sm text-[#94A3B8] leading-relaxed max-w-sm">
              A unified healthcare management platform designed for
              modern medical professionals and patients.
            </p>

            <div className="mt-5 inline-flex items-center gap-2 px-3 py-2
              rounded-xl bg-[#1E293B] border border-[#334155]
              text-xs font-medium text-[#C7D2FE]"
            >
              <ShieldCheck className="w-4 h-4 text-[#818CF8]" />
              HIPAA & GDPR Compliant Security
            </div>
          </div>

          {/* Platform */}
          <FooterColumn title="Platform">
            <a href="#platform">Overview</a>
            <a href="#solutions">Solutions</a>
            <Link to="/doctors">Find Doctors</Link>
            <a href="#pricing">Pricing</a>
          </FooterColumn>

          {/* Resources */}
          <FooterColumn title="Resources">
            <a href="#docs">Documentation</a>
            <a href="#help">Help Center</a>
            <a href="#guides">Practice Guides</a>
            <a href="#api">API Status</a>
          </FooterColumn>

          {/* Account */}
          <div className="md:col-span-3">
            <FooterColumn title="Account & Legal">
              <Link to="/login">Log In</Link>
              <Link to="/register">Get Started</Link>
              <a href="#privacy">Privacy Policy</a>
              <a href="#terms">Terms of Service</a>
            </FooterColumn>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#64748B]">
          <p>© 2026 Meetora Inc. All rights reserved.</p>

          <div className="flex flex-wrap items-center justify-center gap-5">
            <span className="flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5" />
              English (US)
            </span>

            <span className="flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5" />
              256-Bit SSL Encryption
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }) {
  return (
    <div className="md:col-span-2">
      <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
        {title}
      </h4>

      <div className="flex flex-col gap-2.5 text-sm text-[#94A3B8]
        [&>*]:transition-colors [&>*]:hover:text-white"
      >
        {children}
      </div>
    </div>
  );
}