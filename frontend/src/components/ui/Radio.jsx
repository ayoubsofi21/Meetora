import { forwardRef, useId } from 'react';
import { cn } from '@/utils/cn';

/**
 * Single radio input. Compose multiple inside a RadioGroup with the same `name`.
 * @param {{ label?: string, description?: string }} props
 */
const Radio = forwardRef(({ label, description, id, className, ...props }, ref) => {
  const autoId = useId();
  const radioId = id || autoId;

  return (
    <label htmlFor={radioId} className={cn('group flex cursor-pointer items-start gap-3', className)}>
      <span className="relative mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center">
        <input ref={ref} id={radioId} type="radio" className="peer sr-only" {...props} />
        <span
          className={cn(
            'h-5 w-5 rounded-full border-2 border-ink-300 bg-white transition-all duration-150',
            'peer-checked:border-primary-600',
            'peer-focus-visible:ring-2 peer-focus-visible:ring-primary-200',
            'peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
          )}
        />
        <span className="pointer-events-none absolute h-2.5 w-2.5 scale-0 rounded-full bg-primary-600 transition-transform duration-150 peer-checked:scale-100" />
      </span>
      {(label || description) && (
        <span className="select-none">
          {label && <span className="block text-sm font-medium text-ink-700">{label}</span>}
          {description && <span className="mt-0.5 block text-xs text-ink-400">{description}</span>}
        </span>
      )}
    </label>
  );
});

Radio.displayName = 'Radio';

/**
 * Layout wrapper for a group of Radio buttons.
 * @param {{ direction?: 'row'|'col' }} props
 */
export function RadioGroup({ children, direction = 'col', className, ...props }) {
  return (
    <div
      role="radiogroup"
      className={cn('flex gap-3', direction === 'col' ? 'flex-col' : 'flex-row flex-wrap', className)}
      {...props}
    >
      {children}
    </div>
  );
}

export default Radio;