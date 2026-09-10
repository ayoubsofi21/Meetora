import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Stethoscope, CalendarDays, Users, Settings } from 'lucide-react';

const ITEMS = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/doctors', label: 'Doctors', icon: Stethoscope },
  { to: '/admin/appointments', label: 'Appts', icon: CalendarDays },
  { to: '/admin/patients', label: 'Patients', icon: Users },
  { to: '/admin/settings', label: 'Settings', icon: Settings },
];

const linkClasses = ({ isActive }) =>
  `flex flex-col items-center justify-center gap-1 text-[11px] font-medium
   ${isActive ? 'text-[#2563EB]' : 'text-[#94A3B8]'}`;

export default function BottomNav() {
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-white border-t
      border-[#E2E8F0] shadow-[0_-1px_4px_rgba(15,23,42,0.04)] flex items-center justify-around z-50">
      {ITEMS.map(({ to, label, icon: Icon, end }) => (
        <NavLink key={to} to={to} end={end} className={linkClasses}>
          <Icon className="w-5 h-5" strokeWidth={1.75} />
          {label}
        </NavLink>
      ))}
    </nav>
  );
}