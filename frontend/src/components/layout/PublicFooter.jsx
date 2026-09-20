import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Lock, Globe } from 'lucide-react';
import logo from '../../assets/images/logo.png';

export default function PublicFooter() {
  return (
    <footer className="bg-[#212E31] text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-16 pb-8">

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">

          {/* Brand */}
          <div className="md:col-span-5">
            <Link to="/" className="inline-flex items-center gap-2.5">
              <img
                src={logo}
                alt="Meetora"
                className="w-11 h-11 object-contain"
              />

              <span className="text-2xl font-extrabold tracking-tight text-white">
                Meetora
              </span>
            </Link>

            <p className="mt-4 text-sm text-white/60 leading-relaxed max-w-sm">
              A unified healthcare management platform designed for
              modern medical professionals and patients.
            </p>

            <div className="
              mt-5 inline-flex items-center gap-2
              px-3 py-2 rounded-xl
              bg-white/5 border border-white/10
              text-xs font-medium text-[#93C5FD]
            ">
              <ShieldCheck className="w-4 h-4 text-[#1687F8]" />
              Secure Healthcare Platform
            </div>
          </div>

          <FooterColumn
            title="Platform"
            links={[
              ['Overview', '#platform'],
              ['Solutions', '#solutions'],
              ['Find Doctors', '/doctors'],
              ['Pricing', '#pricing'],
            ]}
          />

          <FooterColumn
            title="Resources"
            links={[
              ['Documentation', '#docs'],
              ['Help Center', '#help'],
              ['Practice Guides', '#guides'],
              ['API Status', '#api'],
            ]}
          />

          <FooterColumn
            title="Account & Legal"
            wide
            links={[
              ['Log In', '/login'],
              ['Get Started', '/register'],
              ['Privacy Policy', '#privacy'],
              ['Terms of Service', '#terms'],
            ]}
          />
        </div>

        {/* Bottom */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <p>© 2026 Meetora. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5" />
              English (US)
            </span>

            <span className="flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5" />
              Secure Connection
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links, wide = false }) {
  return (
    <div className={wide ? 'md:col-span-3' : 'md:col-span-2'}>
      <h4 className="text-xs font-bold uppercase tracking-wider text-white">
        {title}
      </h4>

      <ul className="mt-4 space-y-2.5">
        {links.map(([label, path]) => (
          <li key={label}>
            {path.startsWith('/') ? (
              <Link
                to={path}
                className="text-xs font-medium text-white/50 hover:text-[#60A5FA] transition-colors"
              >
                {label}
              </Link>
            ) : (
              <a
                href={path}
                className="text-xs font-medium text-white/50 hover:text-[#60A5FA] transition-colors"
              >
                {label}
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}