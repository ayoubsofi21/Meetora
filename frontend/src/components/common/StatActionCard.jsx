import { Link } from 'react-router-dom';
import { cn } from '@/utils/cn';

const COLOR_MAP = {
  primary: 'bg-primary-50 text-primary-600',
  teal: 'bg-teal-50 text-teal-600',
  success: 'bg-success-50 text-success-600',
  danger: 'bg-danger-50 text-danger-600',
  warning: 'bg-warning-50 text-warning-600',
};

/**
 * Quick-action tile used in the top row of every dashboard
 * (Book Appointment / Medical Records / Prescriptions / Lab Results, etc).
 * @param {{ icon: React.ElementType, title: string, subtitle: string, to: string, color?: keyof typeof COLOR_MAP }} props
 */
export default function StatActionCard({ icon: Icon, title, subtitle, to, color = 'primary', className }) {
  return (
    <Link
      to={to}
      className={cn(
        'group flex flex-col gap-3.5 rounded-2xl border border-ink-100/70 bg-white p-5 shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-elevated',
        className,
      )}
    >
      <span className={cn('flex h-11 w-11 items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-105', COLOR_MAP[color])}>
        <Icon className="h-5 w-5" strokeWidth={2} />
      </span>
      <div>
        <p className="text-sm font-semibold text-ink-900">{title}</p>
        <p className="mt-0.5 text-xs text-ink-400">{subtitle}</p>
      </div>
    </Link>
  );
}