import { forwardRef, useId } from 'react';
import { cn } from '@/utils/cn';

/**
 * Multi-line text input, styled to match Input.
 * @param {{ label?: string, hint?: string, error?: string, required?: boolean }} props
 */
const Textarea = forwardRef(
  ({ label, hint, error, required, id, className, rows = 4, ...props }, ref) => {
    const autoId = useId();
    const textareaId = id || autoId;

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={textareaId} className="mb-1.5 block text-sm font-medium text-ink-700">
            {label}
            {required && <span className="ml-0.5 text-danger-500">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          rows={rows}
          aria-invalid={!!error}
          className={cn(
            'w-full resize-none rounded-xl border bg-white px-4 py-3 text-sm text-ink-800 placeholder:text-ink-400',
            'transition-colors duration-150',
            'focus:outline-none focus:ring-2 focus:ring-primary-100',
            error
              ? 'border-danger-400 focus:border-danger-500 focus:ring-danger-100'
              : 'border-ink-200 focus:border-primary-500',
            'disabled:cursor-not-allowed disabled:bg-ink-50 disabled:text-ink-400',
            className,
          )}
          {...props}
        />
        {error ? (
          <p className="mt-1.5 text-xs font-medium text-danger-600">{error}</p>
        ) : hint ? (
          <p className="mt-1.5 text-xs text-ink-400">{hint}</p>
        ) : null}
      </div>
    );
  },
);

Textarea.displayName = 'Textarea';
export default Textarea;