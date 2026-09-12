import { Link } from 'react-router-dom';
import {
  Search, Bell, HelpCircle, Stethoscope, User, ShieldCheck,
  Calendar, ArrowRight, Lock,
} from 'lucide-react';
import doctorImage from '../assets/images/doctor.jpg';
const NAV_LINKS = ['Product', 'Solutions', 'Pricing', 'Resources'];

const TRUSTED_LOGOS = ['Clinic One', 'MedGroup', 'CarePlus', 'HealthLine', 'Vitalis'];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <TrustedBy />
      <Ecosystem />
      <Footer />
    </div>
  );
}

function Navbar() {
  return (
    <header className="border-b border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-10">
          <span className="text-xl font-extrabold text-[#2563EB]">Meetora</span>
          {/* <a href="">svg</a> */}
          
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            {NAV_LINKS.map((link, i) => (
              <a
                key={link}
                href="#"
                className={i === 0 ? 'text-[#2563EB] border-b-2 border-[#2563EB] pb-5 -mb-5' : 'text-[#475569] hover:text-[#0F172A]'}
              >
                {link}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-2 h-10 px-3 rounded-full border border-[#E2E8F0] bg-[#F8FAFC] text-sm text-[#94A3B8]">
            <Search className="w-4 h-4" />
            <span>Search...</span>
            <kbd className="ml-2 text-xs px-1.5 py-0.5 rounded border border-[#E2E8F0] bg-white">⌘K</kbd>
          </div>
          <button aria-label="Notifications" className="text-[#475569]">
            <Bell className="w-5 h-5" strokeWidth={1.75} />
          </button>
          <button aria-label="Help" className="text-[#475569]">
            <HelpCircle className="w-5 h-5" strokeWidth={1.75} />
          </button>
          <Link to="/login" className="text-sm font-semibold text-[#0F172A] hover:text-[#2563EB]">
            Log In
          </Link>
          <Link
            to="/register"
            className="h-10 px-5 flex items-center bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-semibold rounded-full transition-colors"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="bg-[#F6F7FB]">
      <div className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#E2E8F0] text-xs font-medium text-[#475569] mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
            v2.0 Now Available
          </span>

          <h1 className="text-5xl font-extrabold text-[#0F172A] leading-tight tracking-tight">
            Healthcare
            <br />
            Management,
            <br />
            <span className="text-[#2563EB]">Reimagined.</span>
          </h1>

          <p className="mt-6 text-base text-[#475569] max-w-md leading-relaxed">
            Empower your medical practice with an intuitive, unified platform.
            Streamline scheduling, patient records, and analytics with
            enterprise-grade security and modern design.
          </p>

          <div className="mt-8 flex items-center gap-3">
            <Link
              to="/register"
              className="h-12 px-6 flex items-center bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold rounded-xl transition-colors shadow-[0_2px_6px_rgba(37,99,235,0.25)]"
            >
              Get Started
            </Link>
            <button className="h-12 px-6 flex items-center bg-white border border-[#E2E8F0] hover:bg-[#F8FAFC] text-[#0F172A] font-semibold rounded-xl transition-colors">
              View Demo
            </button>
          </div>

          <dl className="mt-12 pt-8 border-t border-[#E2E8F0] grid grid-cols-3 gap-6 max-w-md">
            <Stat value="24.5k+" label="Active Users" />
            <Stat value="1.2M+" label="Appointments" />
            <Stat value="99.9%" label="Uptime SLA" />
          </dl>
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }) {
  return (
    <div>
      <p className="text-2xl font-bold text-[#0F172A]">{value}</p>
      <p className="text-xs text-[#94A3B8] mt-1">{label}</p>
    </div>
  );
}

function TrustedBy() {
  return (
    <section className="border-b border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <p className="text-center text-xs font-semibold tracking-widest text-[#94A3B8] uppercase mb-8">
          Trusted by leading healthcare providers
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8">
          {TRUSTED_LOGOS.map((name) => (
            <div
              key={name}
              className="h-8 w-32 rounded-md bg-[#F1F5F9] flex items-center justify-center text-xs text-[#CBD5E1] font-medium"
            >
              {name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Ecosystem() {
  return (
    <section className="bg-[#F6F7FB]">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center max-w-xl mx-auto mb-12">
          <h2 className="text-3xl font-extrabold text-[#0F172A]">A unified ecosystem for everyone</h2>
          <p className="mt-3 text-[#475569]">
            Meetora bridges the gap between administrators, medical professionals, and
            patients with tailored interfaces for each role.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <EcosystemCard
            icon={Stethoscope}
            iconBg="bg-[#DBEAFE]"
            iconColor="text-[#2563EB]"
            title="For Doctors"
            description="Focus on care, not paperwork. Access patient histories, write prescriptions, and review lab results instantly."
          />
          <EcosystemCard
            icon={User}
            iconBg="bg-[#F1F5F9]"
            iconColor="text-[#475569]"
            title="For Patients"
            description="Seamless booking, telemedicine integration, and secure access to personal health records anytime."
            linkLabel="Explore Patient Portal"
            linkHref="/register"
          />
          <EcosystemCard
            icon={ShieldCheck}
            iconBg="bg-[#FEF3C7]"
            iconColor="text-[#D97706]"
            title="For Admins"
            description="Centralized control panel for scheduling, billing, compliance reporting, and staff management."
          />

          <div className="rounded-2xl bg-[#0F172A] text-white p-8 flex flex-col justify-center">
            <span className="inline-flex items-center gap-2 w-fit px-3 py-1 rounded-full bg-white/10 text-xs font-medium mb-4">
              <Lock className="w-3.5 h-3.5" />
              HIPAA Compliant
            </span>
            <h3 className="text-xl font-bold">Enterprise-Grade Security</h3>
            <p className="text-sm text-white/70 mt-2 leading-relaxed">
              Your data is protected with end-to-end encryption, regular audits, and
              granular role-based access control.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function EcosystemCard({ icon: Icon, iconBg, iconColor, title, description, linkLabel, linkHref }) {
  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] p-8">
      <div className={`w-10 h-10 rounded-lg ${iconBg} flex items-center justify-center mb-5`}>
        <Icon className={`w-5 h-5 ${iconColor}`} strokeWidth={1.75} />
      </div>
      <h3 className="text-xl font-bold text-[#0F172A]">{title}</h3>
      <p className="text-sm text-[#475569] mt-2 leading-relaxed">{description}</p>
      {linkLabel && (
        <Link
          to={linkHref}
          className="inline-flex items-center gap-1 text-sm font-semibold text-[#2563EB] hover:text-[#1D4ED8] mt-4"
        >
          {linkLabel}
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      )}
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-[#F6F7FB] border-t border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div>
          <span className="text-lg font-extrabold text-[#0F172A]">Meetora</span>
          <p className="text-xs text-[#94A3B8] mt-1">© 2026 Meetora Health Technologies. All rights reserved.</p>
        </div>
        <nav className="flex flex-wrap gap-6 text-sm text-[#475569]">
          <a href="#" className="hover:text-[#0F172A]">Privacy Policy</a>
          <a href="#" className="hover:text-[#0F172A]">Terms of Service</a>
          <a href="#" className="hover:text-[#0F172A]">HIPAA Compliance</a>
          <a href="#" className="hover:text-[#0F172A]">Contact Us</a>
        </nav>
      </div>
    </footer>
  );
}