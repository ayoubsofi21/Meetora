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
    <header className="w-full h-20 bg-white border-b border-[#E2E8F0] sticky top-0 z-50">
      <div className="mx-auto h-full max-w-7xl px-6 lg:px-12 flex items-center justify-between">
        <Link
          to="/"
          className="group inline-flex items-center gap-0"
          aria-label="Meetora homepage"
        >
          <img
            src={logo}
            alt="Meetora"
            className="h-11 w-11 object-contain transition-transform duration-300 group-hover:scale-105"
          />

          <span className="-ml-1 text-xl font-extrabold tracking-tight text-[#3F38CA]">
            eetora
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.path}
              className="relative py-2 text-sm font-medium text-[#475569]
                hover:text-[#3F38CA] transition-colors
                after:absolute after:left-0 after:bottom-0 after:h-0.5
                after:w-0 after:bg-[#3F38CA] after:rounded-full
                after:transition-all hover:after:w-full"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            to="/login"
            className="text-sm font-semibold text-[#475569] hover:text-[#3F38CA] transition-colors"
          >
            Log In
          </Link>

          <Link
            to="/register"
            className="h-11 px-5 inline-flex items-center justify-center
              bg-[#3F38CA] hover:bg-[#312E81] text-white
              text-sm font-semibold rounded-xl shadow-sm transition-all"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Button */}
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen((current) => !current)}
          className="md:hidden w-10 h-10 flex items-center justify-center
            rounded-xl text-[#475569] hover:text-[#3F38CA]
            hover:bg-[#F8FAFC] transition-all"
          aria-label="Toggle navigation"
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
        <div className="md:hidden bg-white border-t border-[#E2E8F0] px-6 py-5 shadow-sm">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-lg text-sm font-medium
                  text-[#475569] hover:text-[#3F38CA]
                  hover:bg-[#F8FAFC] transition-all"
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="mt-4 pt-4 border-t border-[#E2E8F0] flex flex-col gap-3">
            <Link
              to="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="h-11 flex items-center justify-center border
                border-[#E2E8F0] text-[#0F172A]
                font-semibold rounded-xl text-sm"
            >
              Log In
            </Link>

            <Link
              to="/register"
              onClick={() => setIsMobileMenuOpen(false)}
              className="h-11 flex items-center justify-center
                bg-[#3F38CA] hover:bg-[#312E81]
                text-white font-semibold rounded-xl text-sm"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}