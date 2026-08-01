import { Outlet } from 'react-router-dom';
import { ShieldCheck, CalendarCheck, HeartPulse } from 'lucide-react';
import Logo from '@/components/common/Logo';

const FEATURES = [
  { icon: CalendarCheck, text: 'Book appointments with top specialists in seconds' },
  { icon: HeartPulse, text: 'Access your full medical history, anytime, anywhere' },
  { icon: ShieldCheck, text: 'Bank-grade security for your health data' },
];

/**
 * Split-screen shell for Login / Register / Forgot Password pages:
 * left brand panel (desktop only) + right form panel via <Outlet/>.
 */
export default function AuthLayout() {
  return (
    <div className="flex min-h-screen bg-surface-page">
      <aside className="relative hidden w-[42%] max-w-xl overflow-hidden bg-gradient-to-br from-primary-700 via-primary-600 to-primary-800 lg:flex lg:flex-col lg:justify-between lg:p-12">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 20%, white 1px, transparent 1px), radial-gradient(circle at 80% 60%, white 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        <Logo variant="light" />

        <div className="relative">
          <h1 className="text-3xl font-extrabold leading-tight text-white">
            Healthcare, made simple.
          </h1>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/70">
            Meetora connects patients, doctors, and clinics on one secure platform —
            booking, records, and care in one place.
          </p>

          <ul className="mt-8 space-y-4">
            {FEATURES.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/15">
                  <Icon className="h-4 w-4 text-white" />
                </span>
                <span className="text-sm text-white/85">{text}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="relative text-xs text-white/50">
          © {new Date().getFullYear()} Meetora Health. All rights reserved.
        </p>
      </aside>

      <div className="flex flex-1 flex-col items-center justify-center px-6 py-12 sm:px-10">
        <div className="mb-8 lg:hidden">
          <Logo subtitle="Healthcare made simple" />
        </div>
        <div className="w-full max-w-md animate-slide-up">
          <Outlet />
        </div>
      </div>
    </div>
  );
}