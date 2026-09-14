import { NavLink } from 'react-router-dom';
import { Search, Bell, CircleHelp } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

function initials(name = '') {
  return name
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export default function TopBar() {
  const { user } = useAuth();

  return (
    <header className="h-20 bg-white border-b border-[#E2E8F0] px-4 lg:px-6 flex items-center justify-between gap-4">
      
      {/* Search */}
      <div className="relative hidden sm:block w-full max-w-[360px] lg:max-w-[420px]">
        <Search
          className="w-5 h-5 text-[#94A3B8] absolute left-4 top-1/2 -translate-y-1/2"
          strokeWidth={1.75}
        />

        <label htmlFor="topbar-search" className="sr-only">
          Search
        </label>

        <input
          id="topbar-search"
          type="search"
          placeholder="Search patients, events, or reports..."
          className="w-full h-12 pl-12 pr-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-sm text-[#0F172A]
            placeholder:text-[#94A3B8] focus:outline-none focus:border-[#3F38CA]
            focus:ring-2 focus:ring-[#3F38CA]/10 transition-all"
        />
      </div>

      {/* Mobile Logo */}
      <p className="sm:hidden text-lg font-extrabold text-[#3F38CA]">
        Meetora
      </p>

      {/* Right Side */}
      <div className="flex items-center gap-4 lg:gap-5">
        
        {/* Navigation */}
        <NavLink
          to="/admin/patients"
          className={({ isActive }) =>
            `hidden lg:inline text-sm font-medium transition-colors ${
              isActive
                ? 'text-[#3F38CA]'
                : 'text-[#475569] hover:text-[#0F172A]'
            }`
          }
        >
          Patients
        </NavLink>

        <NavLink
          to="/admin/appointments"
          className={({ isActive }) =>
            `hidden lg:inline text-sm font-medium transition-colors ${
              isActive
                ? 'text-[#3F38CA]'
                : 'text-[#475569] hover:text-[#0F172A]'
            }`
          }
        >
          Schedule
        </NavLink>

        {/* Notifications */}
        <button
          aria-label="Notifications"
          className="relative w-10 h-10 rounded-xl flex items-center justify-center text-[#475569] hover:text-[#3F38CA] hover:bg-[#F8FAFC] transition-all"
        >
          <Bell className="w-6 h-6" strokeWidth={1.75} />

          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-[#EF4444] ring-2 ring-white" />
        </button>

        {/* Help */}
        <button
          aria-label="Help"
          className="hidden sm:flex w-10 h-10 rounded-xl items-center justify-center text-[#475569] hover:text-[#3F38CA] hover:bg-[#F8FAFC] transition-all"
        >
          <CircleHelp className="w-6 h-6" strokeWidth={1.75} />
        </button>

        {/* Divider */}
        <div className="hidden sm:block w-px h-9 bg-[#E2E8F0]" />

        {/* User */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:block text-right leading-tight">
            <p className="text-sm font-semibold text-[#0F172A]">
              {user?.name || 'Administrator'}
            </p>

            <p className="text-xs font-medium text-[#94A3B8] mt-1">
              System Admin
            </p>-
          </div>

          {/* Avatar */}
          <div
            className="w-11 h-11 rounded-full bg-[#EEF2FF] text-[#3F38CA]
              font-bold text-sm flex items-center justify-center shrink-0
              border border-[#E0E7FF]"
          >
            {initials(user?.name) || 'A'}
          </div>
        </div>
      </div>
    </header>
  );
}