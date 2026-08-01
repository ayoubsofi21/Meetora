import { cn } from '@/utils/cn';

const VARIANTS = {
  default: 'bg-white shadow-card border border-ink-100/70',
  soft: 'bg-surface-soft border border-ink-100/60',
  elevated: 'bg-white shadow-elevated border border-ink-100/50',
  outline: 'bg-white border border-ink-200',
  primary: 'bg-primary-600 text-white shadow-primary-glow border-0',
  flat: 'bg-transparent border-0 shadow-none',
};

/**
 * Base rounded card container.
 * @param {{ variant?: keyof typeof VARIANTS, padding?: 'none'|'sm'|'md'|'lg', hoverable?: boolean }} props
 */
export function Card({ children, variant = 'default', padding = 'md', hoverable = false, className, ...props }) {
  const paddingMap = { none: '', sm: 'p-4', md: 'p-6', lg: 'p-8' };
  return (
    <div
      className={cn(
        'rounded-2xl transition-shadow duration-200',
        VARIANTS[variant],
        paddingMap[padding],
        hoverable && 'hover:shadow-elevated',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className, ...props }) {
  return (
    <div className={cn('mb-4 flex items-center justify-between gap-3', className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className, ...props }) {
  return (
    <h3 className={cn('text-base font-semibold text-ink-900', className)} {...props}>
      {children}
    </h3>
  );
}

export function CardDescription({ children, className, ...props }) {
  return (
    <p className={cn('mt-0.5 text-sm text-ink-400', className)} {...props}>
      {children}
    </p>
  );
}

export function CardBody({ children, className, ...props }) {
  return (
    <div className={cn(className)} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ children, className, ...props }) {
  return (
    <div className={cn('mt-4 flex items-center justify-between gap-3 border-t border-ink-100 pt-4', className)} {...props}>
      {children}
    </div>
  );
}

export default Card;