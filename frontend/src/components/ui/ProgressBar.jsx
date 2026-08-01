import { cn } from '@/utils/cn';

const FILL_COLORS = {
  primary: 'bg-primary-600',
  success: 'bg-success-500',
  warning: 'bg-warning-500',
  danger: 'bg-danger-500',
  teal: 'bg-teal-500',
  white: 'bg-white',
};

/**
 * Linear progress bar. Use `onDark` for use on colored/blue card backgrounds
 * (e.g. "Wellness Snapshot" widget), which switches the track to translucent white.
 * @param {{ value: number, max?: number, color?: keyof typeof FILL_COLORS, onDark?: boolean, label?: string, showValue?: boolean }} props
 */
export default function ProgressBar({
  value,
  max = 100,
  color = 'primary',
  onDark = false,
  label,
  showValue = false,
  className,
}) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className={cn('w-full', className)}>
      {(label || showValue) && (
        <div className={cn('mb-1.5 flex items-center justify-between text-xs font-medium', onDark ? 'text-white/90' : 'text-ink-500')}>
          {label && <span>{label}</span>}
          {showValue && <span>{Math.round(pct)}%</span>}
        </div>
      )}
      <div className={cn('h-2 w-full overflow-hidden rounded-pill', onDark ? 'bg-white/25' : 'bg-ink-100')}>
        <div
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
          className={cn('h-full rounded-pill transition-all duration-500 ease-out', onDark ? 'bg-white' : FILL_COLORS[color])}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}