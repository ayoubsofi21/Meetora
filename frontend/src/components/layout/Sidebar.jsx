import { NavLink } from "react-router-dom";
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
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/images/logo.png";

const NAV_ITEMS = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/doctors", label: "Doctors", icon: Stethoscope },
  { to: "/admin/specialties", label: "Specialties", icon: Tags },
  { to: "/admin/appointments", label: "Appointments", icon: CalendarDays },
  { to: "/admin/patients", label: "Patients", icon: Users },
  { to: "/admin/records", label: "Records", icon: FileText },
  { to: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/admin/settings", label: "Settings", icon: Settings },
];
const DOCTOR_NAV_ITEMS = [
  { to: "/doctor", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/doctor/schedule", label: "Schedule", icon: Stethoscope },
  { to: "/doctor/specialties", label: "Specialties", icon: Tags },
  { to: "/doctor/appointments", label: "Appointments", icon: CalendarDays },
  { to: "/doctor/patients", label: "Patients", icon: Users },
  { to: "/doctor/records", label: "Records", icon: FileText },
  { to: "/doctor/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/doctor/settings", label: "Settings", icon: Settings },
];
const Patient_NAV_ITEMS = [
  { to: "/patient", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/patient/records", label: "Records", icon: FileText },
  { to: "patient/prescriptions", label: "Prescriptions", icon: FileText },
  { to: "/patient/appointments", label: "Appointments", icon: CalendarDays },
  { to: "/patient/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/patient/settings", label: "Settings", icon: Settings },
];
const ADMIN_NAV_ITEMS = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/doctors", label: "Doctors", icon: Stethoscope },
  { to: "/admin/specialties", label: "Specialties", icon: Tags },
  { to: "/admin/patients", label: "Patients", icon: Users },
  { to: "/admin/appointments", label: "Appointments", icon: CalendarDays },
  { to: "/admin/records", label: "Records", icon: FileText },
  { to: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/admin/settings", label: "Settings", icon: Settings },
];
const linkClasses = ({ isActive }) =>
  `flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors duration-150 font-semibold ${
    isActive
      ? "bg-[#3F37C9] font-medium text-white bg-opacity-10 text-xl"
      : "text-[#475569] hover:bg-[#3F37C9] hover:bg-opacity-10  hover:text-white text-xml"
  }`;

export default function Sidebar() {
  const { logout } = useAuth();
  const { user } = useAuth();
  const navItems =
    user?.role === "doctor"
      ? DOCTOR_NAV_ITEMS
      : user?.role === "admin"
        ? ADMIN_NAV_ITEMS
        : Patient_NAV_ITEMS;
  return (
    <aside
      className="hidden lg:flex lg:flex-col fixed left-0 top-0 h-screen w-[240px]
        bg-white border-r border-[#E2E8F0] px-4 py-6"
    >
      <div className="mb-8 px-2">
        <a
          href="/"
          className="group inline-flex items-center "
          aria-label="Go to Meetora homepage"
        >
          <img
            src={logo}
            alt=""
            className="h-11 w-11 shrink-0 object-contain transition-transform duration-300 group-hover:scale-105"
          />

          <span className="text-xl font-extrabold tracking-tight text-[#1764E8]">
            eetora
          </span>
        </a>
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
        <button className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm text-[#475569] hover:bg-[#F1F5F9] font-semibold">
          <CircleHelp className="w-5 h-5" strokeWidth={1.75} />
          Support
        </button>

        <button
          onClick={logout}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm text-[#475569] hover:bg-[#F1F5F9] font-semibold"
        >
          <LogOut className="w-5 h-5" strokeWidth={1.75} />
          Log Out
        </button>
      </div>
    </aside>
  );
}
