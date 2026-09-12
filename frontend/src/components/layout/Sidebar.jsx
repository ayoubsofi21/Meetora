import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Stethoscope,
  Tags,
  CalendarDays,
  Users,
  FileText,
  BarChart3,
  Settings,
  Plus,
  CircleHelp,
  LogOut,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const NAV_ITEMS = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/doctors', label: 'Doctors', icon: Stethoscope },
  { to: '/admin/specialties', label: 'Specialties', icon: Tags },
  { to: '/admin/appointments', label: 'Appointments', icon: CalendarDays },
  { to: '/admin/patients', label: 'Patients', icon: Users },
  { to: '/admin/records', label: 'Records', icon: FileText },
  { to: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
  { to: '/admin/settings', label: 'Settings', icon: Settings },
];
const DOCTOR_NAV_ITEMS = [
  { to: '/doctor', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/doctor/schedule', label: 'Schedule', icon: Stethoscope },
  { to: '/doctor/specialties', label: 'Specialties', icon: Tags },
  { to: '/doctor/appointments', label: 'Appointments', icon: CalendarDays },
  { to: '/doctor/patients', label: 'Patients', icon: Users },
  { to: '/doctor/records', label: 'Records', icon: FileText },
  { to: '/doctor/analytics', label: 'Analytics', icon: BarChart3 },
  { to: '/doctor/settings', label: 'Settings', icon: Settings },
];
const linkClasses = ({ isActive }) =>
  `flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors duration-150 ${
    isActive
      ? 'bg-[#E8EEFF] text-[#2563EB] font-medium'
      : 'text-[#475569] hover:bg-[#F1F5F9]'
  }`;

export default function Sidebar() {
  const { logout } = useAuth();
  const { user } = useAuth();
  const navItems = user?.role === 'doctor' ? DOCTOR_NAV_ITEMS : NAV_ITEMS;    
  return (
    <aside
      className="hidden lg:flex lg:flex-col fixed left-0 top-0 h-screen w-[240px]
        bg-white border-r border-[#E2E8F0] px-4 py-6"
    >
      <div className="px-2 mb-8">
        <p className="text-lg font-extrabold text-[#2563EB] leading-tight">Meetora Health</p>
        <p className="text-xs text-[#94A3B8]">Practitioner Portal</p>
      </div>

      <nav className="flex-1 flex flex-col gap-1 overflow-y-auto">
        {navItems.map(({ to, label, icon: Icon, end }) => (
          <NavLink key={to} to={to} end={end} className={linkClasses}>
            <Icon className="w-5 h-5" strokeWidth={1.75} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="mt-4 space-y-1">
        <NavLink
          to="/admin/appointments/new"
          className="flex items-center justify-center gap-2 h-11 rounded-xl bg-[#2563EB]
            hover:bg-[#1D4ED8] text-white text-sm font-semibold transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Appointment
        </NavLink>

        <button className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm text-[#475569] hover:bg-[#F1F5F9]">
          <CircleHelp className="w-5 h-5" strokeWidth={1.75} />
          Support
        </button>

        <button
          onClick={logout}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm text-[#475569] hover:bg-[#F1F5F9]"
        >
          <LogOut className="w-5 h-5" strokeWidth={1.75} />
          Log Out
        </button>
      </div>
    </aside>
  );
}