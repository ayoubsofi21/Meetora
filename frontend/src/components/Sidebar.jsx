import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, LifeBuoy, LogOut, ChevronsLeft, ChevronsRight, X } from 'lucide-react';
import { cn } from '@/utils/cn';
import Logo from '@/components/common/Logo';
import { Tooltip, IconButton } from '@/components/ui';
import { useAuthStore } from '@/store/useAuthStore';
import { useUIStore } from '@/store/useUIStore';
import { SIDEBAR_NAV } from '@/config/navigation';
import { ROLE_PORTAL_LABELS, ROUTES } from '@/config/constants';

/**
 * Role-aware left navigation. Collapsible on desktop (icon-only rail),
 * slides in as a drawer on mobile/tablet.
 */
export default function Sidebar() {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();

  const isCollapsed = useUIStore((s) => s.isSidebarCollapsed);
  const toggleCollapsed = useUIStore((s) => s.toggleSidebarCollapsed);
  const isMobileOpen = useUIStore((s) => s.isMobileSidebarOpen);
  const closeMobile = useUIStore((s) => s.closeMobileSidebar);

  if (!user) return null;

  const navItems = SIDEBAR_NAV[user.role] || [];
  const portalLabel = ROLE_PORTAL_LABELS[user.role];

  const handleLogout = () => {
    logout();
    navigate(ROUTES.LOGIN, { replace: true });
  };

  const NavItem = ({ item }) => {
    const link = (
      <NavLink
        to={item.to}
        onClick={closeMobile}
        className={({ isActive }) =>
          cn(
            'group flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors',
            isActive ? 'bg-primary-100 text-primary-700' : 'text-ink-500 hover:bg-ink-100 hover:text-ink-800',
            isCollapsed && 'justify-center px-0',
          )
        }
      >
        <item.icon className="h-[18px] w-[18px] shrink-0" strokeWidth={2} />
        {!isCollapsed && <span className="truncate">{item.label}</span>}
      </NavLink>
    );

    if (isCollapsed) {
      return (
        <Tooltip content={item.label} placement="right">
          {link}
        </Tooltip>
      );
    }
    return link;
  };

  const sidebarContent = (
    <div className="flex h-full flex-col">
      {/* Brand */}
      <div className={cn('flex items-center gap-2 px-5 pb-2 pt-6', isCollapsed && 'justify-center px-2')}>
        <Logo subtitle={isCollapsed ? undefined : portalLabel} iconOnly={isCollapsed} />
        <IconButton
          aria-label="Fermer le menu"
          size="sm"
          onClick={closeMobile}
          className="ml-auto lg:hidden"
        >
          <X className="h-4 w-4" />
        </IconButton>
      </div>

      {/* Nav */}
      <nav className="mt-4 flex-1 space-y-1 overflow-y-auto px-3">
        {navItems.map((item) => (
          <NavItem key={item.to} item={item} />
        ))}
      </nav>

      {/* Footer actions */}
      <div className="border-t border-ink-100 px-3 py-4">
        {!isCollapsed ? (
          <button
            type="button"
            onClick={() => navigate(`${ROUTES.PATIENT_APPOINTMENTS}?new=1`.replace('/patient', `/${user.role}`))}
            className="mb-2 flex w-full items-center justify-center gap-2 rounded-xl bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white shadow-soft transition-colors hover:bg-primary-700"
          >
            <Plus className="h-4 w-4" />
            New Appointment
          </button>
        ) : (
          <Tooltip content="New Appointment" placement="right">
            <button
              type="button"
              aria-label="New Appointment"
              className="mb-2 flex w-full items-center justify-center rounded-xl bg-primary-600 py-2.5 text-white shadow-soft transition-colors hover:bg-primary-700"
            >
              <Plus className="h-4 w-4" />
            </button>
          </Tooltip>
        )}

        <button
          type="button"
          className={cn(
            'flex w-full items-center gap-3 rounded-xl px-3.5 py-2 text-sm font-medium text-ink-500 transition-colors hover:bg-ink-100 hover:text-ink-800',
            isCollapsed && 'justify-center px-0',
          )}
        >
          <LifeBuoy className="h-[18px] w-[18px] shrink-0" />
          {!isCollapsed && 'Support'}
        </button>
        <button
          type="button"
          onClick={handleLogout}
          className={cn(
            'flex w-full items-center gap-3 rounded-xl px-3.5 py-2 text-sm font-medium text-ink-500 transition-colors hover:bg-danger-50 hover:text-danger-600',
            isCollapsed && 'justify-center px-0',
          )}
        >
          <LogOut className="h-[18px] w-[18px] shrink-0" />
          {!isCollapsed && 'Log Out'}
        </button>

        <button
          type="button"
          onClick={toggleCollapsed}
          className="mt-3 hidden w-full items-center justify-center gap-2 rounded-xl border border-ink-200 py-2 text-xs font-medium text-ink-400 transition-colors hover:bg-ink-50 lg:flex"
        >
          {isCollapsed ? <ChevronsRight className="h-4 w-4" /> : <ChevronsLeft className="h-4 w-4" />}
          {!isCollapsed && 'Collapse'}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop / tablet rail */}
      <aside
        className={cn(
          'sticky top-0 hidden h-screen shrink-0 border-r border-ink-100 bg-surface-soft transition-all duration-300 lg:block',
          isCollapsed ? 'w-20' : 'w-[var(--sidebar-width)]',
        )}
      >
        {sidebarContent}
      </aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-ink-950/50 lg:hidden"
              onClick={closeMobile}
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
              className="fixed inset-y-0 left-0 z-50 w-[85vw] max-w-[19rem] bg-surface-soft shadow-elevated lg:hidden"
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}