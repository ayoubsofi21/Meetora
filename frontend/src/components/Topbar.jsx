import { NavLink } from 'react-router-dom';
import { Search, Menu, HelpCircle } from 'lucide-react';
import { cn } from '@/utils/cn';
import { IconButton, Input } from '@/components/ui';
import { useAuthStore } from '@/store/useAuthStore';
import { useUIStore } from '@/store/useUIStore';
import { TOPBAR_QUICK_LINKS } from '@/config/navigation';
import NotificationsMenu from './NotificationsMenu';
import UserMenu from './UserMenu';

/**
 * Sticky top header: mobile menu toggle, global search, role-based quick links,
 * notifications, help, and the user menu.
 * @param {{ notifications?: Array }} props
 */
export default function Topbar({ notifications = [] }) {
  const user = useAuthStore((s) => s.user);
  const openMobileSidebar = useUIStore((s) => s.openMobileSidebar);

  const quickLinks = user ? TOPBAR_QUICK_LINKS[user.role] || [] : [];

  return (
    <header className="sticky top-0 z-20 flex h-[var(--header-height)] items-center gap-3 border-b border-ink-100 bg-white/80 px-4 backdrop-blur-md sm:px-6">
      <IconButton aria-label="Ouvrir le menu" onClick={openMobileSidebar} className="lg:hidden">
        <Menu className="h-5 w-5" />
      </IconButton>

      <div className="max-w-md flex-1">
        <Input
          type="search"
          placeholder="Search patients, records, or files..."
          leftIcon={<Search />}
          className="h-11 border-transparent bg-surface-muted focus:border-primary-500 focus:bg-white"
          containerClassName="w-full"
          aria-label="Recherche"
        />
      </div>

      {quickLinks.length > 0 && (
        <nav className="hidden items-center gap-1 md:flex">
          {quickLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                cn(
                  'rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  isActive ? 'text-primary-700' : 'text-ink-500 hover:text-ink-800',
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      )}

      <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
        <NotificationsMenu notifications={notifications} />
        <IconButton aria-label="Aide">
          <HelpCircle className="h-[18px] w-[18px]" />
        </IconButton>
        <span className="mx-1 hidden h-6 w-px bg-ink-200 sm:block" />
        <UserMenu />
      </div>
    </header>
  );
}