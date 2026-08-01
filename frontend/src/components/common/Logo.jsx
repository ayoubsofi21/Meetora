import { Link } from 'react-router-dom';
import { HeartPulse } from 'lucide-react';
import { cn } from '@/utils/cn';
import { ROUTES } from '@/config/constants';

/**
 * Meetora wordmark + icon. Used in Sidebar and AuthLayout.
 * @param {{ variant?: 'dark'|'light', subtitle?: string, to?: string, iconOnly?: boolean }} props
 */
export default function Logo({ variant = 'dark', subtitle, to = ROUTES.HOME, iconOnly = false, className }) {
  const isLight = variant === 'light';

  return (
    <Link to={to} className={cn('flex items-center gap-2.5', className)}>
      <span
        className={cn(
          'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl',
          isLight ? 'bg-white/15' : 'bg-primary-600',
        )}
      >
        <HeartPulse className={cn('h-5 w-5', isLight ? 'text-white' : 'text-white')} strokeWidth={2.25} />
      </span>
      {!iconOnly && (
        <span className="min-w-0">
          <span
            className={cn(
              'block truncate text-lg font-extrabold leading-tight tracking-tight',
              isLight ? 'text-white' : 'text-primary-700',
            )}
          >
            Meetora
          </span>
          {subtitle && (
            <span
              className={cn(
                'block truncate text-[11px] font-medium uppercase tracking-wide',
                isLight ? 'text-white/70' : 'text-ink-400',
              )}
            >
              {subtitle}
            </span>
          )}
        </span>
      )}
    </Link>
  );
}