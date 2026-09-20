import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logo from '../../assets/images/logo.png';

export default function PublicNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Platform', path: '#platform' },
    { name: 'Solutions', path: '#solutions' },
    { name: 'Resources', path: '#resources' },
    { name: 'Pricing', path: '#pricing' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-[#E2E8F0]">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-12">

        {/* Brand */}
        <Link
          to="/"
          className="group flex items-center gap-2.5"
          aria-label="Meetora homepage"
        >
          <img
            src={logo}
            alt="Meetora"
            className="h-11 w-11 object-contain transition-transform duration-300 group-hover:scale-105"
          />

          <span className="text-xl font-extrabold tracking-tight text-[#1764E8]">
            Meetora
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.path}
              className="
                relative py-2 text-sm font-semibold text-[#475569]
                transition-colors hover:text-[#1764E8]
                after:absolute after:left-0 after:bottom-0
                after:h-0.5 after:w-0 after:rounded-full
                after:bg-[#1764E8]
                after:transition-all after:duration-300
                hover:after:w-full
              "
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            to="/login"
            className="text-sm font-semibold text-[#1764E8] hover:text-[#3439D9] transition-colors"
          >
            Log In
          </Link>

          <Link
            to="/register"
            className="
              h-11 px-5 inline-flex items-center justify-center
              rounded-xl bg-[#1764E8] text-white text-sm font-semibold
              shadow-sm transition-all
              hover:bg-[#3439D9] hover:-translate-y-0.5 hover:shadow-md
              focus:outline-none focus:ring-2 focus:ring-[#1764E8]/30
            "
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Button */}
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen((current) => !current)}
          className="
            md:hidden w-10 h-10 rounded-xl
            flex items-center justify-center
            text-[#475569] hover:text-[#1764E8] hover:bg-[#F8FAFC]
            transition-all
          "
          aria-label={isMobileMenuOpen ? 'Close navigation' : 'Open navigation'}
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-[#E2E8F0] px-6 py-5 shadow-lg">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-lg text-sm font-semibold text-[#475569] hover:text-[#1764E8] hover:bg-[#F8FAFC]"
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="mt-4 pt-4 border-t border-[#E2E8F0] grid grid-cols-2 gap-3">
            <Link
              to="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="h-11 flex items-center justify-center rounded-xl border border-[#E2E8F0] text-sm font-semibold text-[#1764E8]"
            >
              Log In
            </Link>

            <Link
              to="/register"
              onClick={() => setIsMobileMenuOpen(false)}
              className="h-11 flex items-center justify-center rounded-xl bg-[#1764E8] text-white text-sm font-semibold"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}