import { NavLink } from 'react-router-dom';
import { cn } from '@/utils/cn';
import { useAuthStore } from '@/store/useAuthStore';
import { MOBILE_NAV } from '@/config/navigation';

/** Fixed bottom tab bar shown only on small screens, matches mobile mockups. */
export default function MobileBottomNav() {
  const user = useAuthStore((s) => s.user);
  if (!user) return null;

  const items = MOBILE_NAV[user.role] || [];

  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 flex items-center justify-around border-t border-ink-100 bg-white/95 px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur lg:hidden">
      {items.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            cn(
              'flex min-w-[3.5rem] flex-col items-center gap-1 rounded-xl px-2 py-1.5 text-[11px] font-medium transition-colors',
              isActive ? 'text-primary-600' : 'text-ink-400',
            )
          }
        >
          {({ isActive }) => (
            <>
              <span
                className={cn(
                  'flex h-9 w-9 items-center justify-center rounded-xl transition-colors',
                  isActive && 'bg-primary-600 text-white',
                )}
              >
                <item.icon className="h-[18px] w-[18px]" strokeWidth={2} />
              </span>
              {item.label}
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}