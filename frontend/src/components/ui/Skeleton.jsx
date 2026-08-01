import { cn } from '@/utils/cn';

/**
 * Base shimmer skeleton block.
 * @param {{ variant?: 'text'|'circle'|'rect', width?: string, height?: string }} props
 */
export function Skeleton({ variant = 'rect', width, height, className, style, ...props }) {
  const variantClasses = {
    text: 'h-3.5 rounded-md',
    circle: 'rounded-full',
    rect: 'rounded-xl',
  };

  return (
    <div
      className={cn('skeleton', variantClasses[variant], className)}
      style={{ width, height, ...style }}
      {...props}
    />
  );
}

/** Multiple lines of text skeleton, last line shorter. */
export function SkeletonText({ lines = 3, className }) {
  return (
    <div className={cn('space-y-2', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton key={i} variant="text" width={i === lines - 1 ? '60%' : '100%'} />
      ))}
    </div>
  );
}

/** Card-shaped skeleton preset — used while dashboard data loads. */
export function SkeletonCard({ className }) {
  return (
    <div className={cn('rounded-2xl border border-ink-100 bg-white p-6', className)}>
      <div className="flex items-center gap-3">
        <Skeleton variant="circle" width="2.75rem" height="2.75rem" />
        <div className="flex-1 space-y-2">
          <Skeleton variant="text" width="50%" />
          <Skeleton variant="text" width="30%" />
        </div>
      </div>
      <div className="mt-5 space-y-2.5">
        <Skeleton variant="text" width="100%" />
        <Skeleton variant="text" width="90%" />
        <Skeleton variant="text" width="70%" />
      </div>
    </div>
  );
}

/** Row-shaped skeleton preset — used in lists/tables while loading. */
export function SkeletonRow({ className }) {
  return (
    <div className={cn('flex items-center gap-3 rounded-xl p-3', className)}>
      <Skeleton variant="circle" width="2.5rem" height="2.5rem" />
      <div className="flex-1 space-y-2">
        <Skeleton variant="text" width="40%" />
        <Skeleton variant="text" width="25%" />
      </div>
      <Skeleton variant="rect" width="4.5rem" height="1.75rem" />
    </div>
  );
}

export default Skeleton;