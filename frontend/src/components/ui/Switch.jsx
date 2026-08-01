import { forwardRef, useId } from 'react';
import { cn } from '@/utils/cn';

/**
 * Toggle switch (on/off), styled as track + animated thumb.
 * @param {{ label?: string, description?: string }} props
 */
const Switch = forwardRef(({ label, description, id, className, ...props }, ref) => {
  const autoId = useId();
  const switchId = id || autoId;

  return (
    <label htmlFor={switchId} className={cn('flex cursor-pointer items-center justify-between gap-4', className)}>
      {(label || description) && (
        <span className="select-none">
          {label && <span className="block text-sm font-medium text-ink-700">{label}</span>}
          {description && <span className="mt-0.5 block text-xs text-ink-400">{description}</span>}
        </span>
      )}
      <span className="relative inline-flex h-6 w-11 shrink-0 items-center">
        <input ref={ref} id={switchId} type="checkbox" className="peer sr-only" {...props} />
        <span className="h-6 w-11 rounded-pill bg-ink-200 transition-colors duration-200 peer-checked:bg-primary-600 peer-focus-visible:ring-2 peer-focus-visible:ring-primary-200 peer-disabled:cursor-not-allowed peer-disabled:opacity-50" />
        <span className="pointer-events-none absolute left-1 h-4 w-4 rounded-full bg-white shadow-soft transition-transform duration-200 peer-checked:translate-x-5" />
      </span>
    </label>
  );
});

Switch.displayName = 'Switch';
export default Switch;