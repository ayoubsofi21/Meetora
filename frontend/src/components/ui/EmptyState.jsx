import { cn } from '@/utils/cn';

/**
 * Centered placeholder for empty lists/pages (no appointments, no records, etc).
 * @param {{ icon?: React.ElementType, title: string, description?: string, action?: React.ReactNode }} props
 */
export default function EmptyState({ icon: Icon, title, description, action, className }) {
  return (
    <div className={cn('flex flex-col items-center justify-center px-6 py-12 text-center', className)}>
      {Icon && (
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-50 text-primary-600">
          <Icon className="h-7 w-7" strokeWidth={1.75} />
        </div>
      )}
      <h3 className="text-base font-semibold text-ink-800">{title}</h3>
      {description && <p className="mt-1.5 max-w-sm text-sm text-ink-400">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}