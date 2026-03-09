import { Calendar, Menu, X } from 'lucide-react';
import { useState } from 'react';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-slate-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Calendar className="size-8 text-indigo-600" />
            <span className="text-2xl">Meetora</span>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-slate-700 hover:text-indigo-600 transition-colors">
              Features
            </a>
            <a href="#pricing" className="text-slate-700 hover:text-indigo-600 transition-colors">
              Pricing
            </a>
            <a href="#testimonials" className="text-slate-700 hover:text-indigo-600 transition-colors">
              Testimonials
            </a>
            <a href="#about" className="text-slate-700 hover:text-indigo-600 transition-colors">
              About
            </a>
          </nav>
          
          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <button className="text-slate-700 hover:text-indigo-600 transition-colors">
              Sign In
            </button>
            <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
              Get Started
            </button>
          </div>
          
          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-slate-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white">
          <nav className="flex flex-col px-4 py-4 gap-4">
            <a href="#features" className="text-slate-700 hover:text-indigo-600 transition-colors py-2">
              Features
            </a>
            <a href="#pricing" className="text-slate-700 hover:text-indigo-600 transition-colors py-2">
              Pricing
            </a>
            <a href="#testimonials" className="text-slate-700 hover:text-indigo-600 transition-colors py-2">
              Testimonials
            </a>
            <a href="#about" className="text-slate-700 hover:text-indigo-600 transition-colors py-2">
              About
            </a>
            <div className="flex flex-col gap-2 pt-4 border-t border-slate-200">
              <button className="py-2 text-slate-700 hover:text-indigo-600 transition-colors">
                Sign In
              </button>
              <button className="py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                Get Started
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
