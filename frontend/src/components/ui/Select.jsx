import { forwardRef, useId } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/utils/cn';

/**
 * Native select styled to match Input, with custom chevron.
 * @param {{ label?: string, hint?: string, error?: string, required?: boolean, options: {value:string,label:string}[], placeholder?: string }} props
 */
const Select = forwardRef(
  ({ label, hint, error, required, options = [], placeholder, id, className, ...props }, ref) => {
    const autoId = useId();
    const selectId = id || autoId;

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={selectId} className="mb-1.5 block text-sm font-medium text-ink-700">
            {label}
            {required && <span className="ml-0.5 text-danger-500">*</span>}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            aria-invalid={!!error}
            defaultValue=""
            className={cn(
              'h-11 w-full appearance-none rounded-xl border bg-white px-4 pr-10 text-sm text-ink-800',
              'transition-colors duration-150',
              'focus:outline-none focus:ring-2 focus:ring-primary-100',
              error
                ? 'border-danger-400 focus:border-danger-500 focus:ring-danger-100'
                : 'border-ink-200 focus:border-primary-500',
              'disabled:cursor-not-allowed disabled:bg-ink-50 disabled:text-ink-400',
              className,
            )}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
        </div>
        {error ? (
          <p className="mt-1.5 text-xs font-medium text-danger-600">{error}</p>
        ) : hint ? (
          <p className="mt-1.5 text-xs text-ink-400">{hint}</p>
        ) : null}
      </div>
    );
  },
);

Select.displayName = 'Select';
export default Select;