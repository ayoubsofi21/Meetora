import { NavLink } from 'react-router-dom';
import { Search, Bell, CircleHelp } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

function initials(name = '') {
  return name.split(' ').map((p) => p[0]).slice(0, 2).join('').toUpperCase();
}

export default function TopBar() {
  const { user } = useAuth();

  return (
    <header className="h-16 bg-white border-b border-[#E2E8F0] px-4 lg:px-6 flex items-center justify-between gap-4">
      {/* Search — hidden on very small screens to save space */}
      <div className="relative hidden sm:block w-full max-w-[360px] lg:max-w-[420px]">
        <Search className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
        <label htmlFor="topbar-search" className="sr-only">Search</label>
        <input
          id="topbar-search"
          type="search"
          placeholder="Search patients, events, or reports..."
          className="w-full h-10 pl-10 pr-4 bg-[#F1F5F9] rounded-xl text-sm
            placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30"
        />
      </div>

      {/* Mobile: just the wordmark, since search is hidden */}
      <p className="sm:hidden text-base font-extrabold text-[#2563EB]">Meetora</p>

      <div className="flex items-center gap-4 lg:gap-5">
        <NavLink to="/admin/patients" className="hidden lg:inline text-sm text-[#475569] hover:text-[#0F172A]">
          Patients
        </NavLink>
        <NavLink to="/admin/appointments" className="hidden lg:inline text-sm text-[#475569] hover:text-[#0F172A]">
          Schedule
        </NavLink>

        <button aria-label="Notifications" className="relative">
          <Bell className="w-5 h-5 text-[#475569]" strokeWidth={1.75} />
          <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-[#DC2626]" />
        </button>

        <button aria-label="Help" className="hidden sm:inline">
          <CircleHelp className="w-5 h-5 text-[#475569]" strokeWidth={1.75} />
        </button>

        <div className="hidden sm:block w-px h-8 bg-[#E2E8F0]" />

        <div className="flex items-center gap-3">
          <div className="hidden sm:block text-right leading-tight">
            <p className="text-sm font-semibold text-[#0F172A]">{user?.name || 'Administrator'}</p>
            <p className="text-[11px] font-semibold text-[#94A3B8] uppercase">System Admin</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-[#DBEAFE] text-[#2563EB] font-bold text-xs
            flex items-center justify-center shrink-0">
            {initials(user?.name) || 'A'}
          </div>
        </div>
      </div>
    </header>
  );
}