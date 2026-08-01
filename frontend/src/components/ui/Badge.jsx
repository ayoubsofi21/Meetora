import { cn } from '@/utils/cn';
import { STATUS_STYLES } from '@/config/constants';

const VARIANTS = {
  primary: 'bg-primary-100 text-primary-700',
  neutral: 'bg-ink-100 text-ink-600',
  success: 'bg-success-100 text-success-700',
  warning: 'bg-warning-100 text-warning-700',
  danger: 'bg-danger-100 text-danger-700',
  info: 'bg-info-100 text-info-600',
  teal: 'bg-teal-100 text-teal-700',
  dark: 'bg-ink-900 text-white',
  outline: 'border border-ink-200 text-ink-600 bg-white',
};

const SIZES = {
  sm: 'px-2 py-0.5 text-[11px]',
  md: 'px-2.5 py-1 text-xs',
  lg: 'px-3 py-1.5 text-sm',
};

/**
 * Pill-shaped status/label badge. Pass `status` (from APPOINTMENT_STATUS)
 * to auto-derive colors, or `variant` for a manual color.
 * @param {{ variant?: keyof typeof VARIANTS, status?: string, size?: keyof typeof SIZES, dot?: boolean }} props
 */
export default function Badge({ children, variant = 'neutral', status, size = 'md', dot = false, className, ...props }) {
  const statusStyle = status ? STATUS_STYLES[status] : null;

  const colorClasses = statusStyle ? cn(statusStyle.bg, statusStyle.text) : VARIANTS[variant];
  const dotClasses = statusStyle ? statusStyle.dot : 'bg-current';

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-pill font-medium leading-none',
        colorClasses,
        SIZES[size],
        className,
      )}
      {...props}
    >
      {dot && <span className={cn('h-1.5 w-1.5 rounded-full', dotClasses)} />}
      {children}
    </span>
  );
}