import { forwardRef, useId } from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/utils/cn';

/**
 * Accessible custom-styled checkbox.
 * @param {{ label?: string, description?: string }} props
 */
const Checkbox = forwardRef(({ label, description, id, className, ...props }, ref) => {
  const autoId = useId();
  const checkboxId = id || autoId;

  return (
    <label htmlFor={checkboxId} className={cn('group flex cursor-pointer items-start gap-3', className)}>
      <span className="relative mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center">
        <input ref={ref} id={checkboxId} type="checkbox" className="peer sr-only" {...props} />
        <span
          className={cn(
            'h-5 w-5 rounded-[6px] border-2 border-ink-300 bg-white transition-all duration-150',
            'peer-checked:border-primary-600 peer-checked:bg-primary-600',
            'peer-focus-visible:ring-2 peer-focus-visible:ring-primary-200',
            'peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
          )}
        />
        <Check className="pointer-events-none absolute h-3.5 w-3.5 scale-0 text-white transition-transform duration-150 peer-checked:scale-100" />
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

Checkbox.displayName = 'Checkbox';
export default Checkbox;