import { forwardRef, useId, useState } from 'react';
import { Eye, EyeOff, Lock } from 'lucide-react';
import { cn } from '@/utils/cn';

/**
 * Password input with a show/hide toggle, styled to match Input.
 * @param {{ label?: string, hint?: string, error?: string, required?: boolean }} props
 */
const PasswordInput = forwardRef(({ label, hint, error, required, id, className, ...props }, ref) => {
  const [visible, setVisible] = useState(false);
  const autoId = useId();
  const inputId = id || autoId;

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="mb-1.5 block text-sm font-medium text-ink-700">
          {label}
          {required && <span className="ml-0.5 text-danger-500">*</span>}
        </label>
      )}
      <div className="relative">
        <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400">
          <Lock className="h-[18px] w-[18px]" />
        </span>
        <input
          ref={ref}
          id={inputId}
          type={visible ? 'text' : 'password'}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
          className={cn(
            'h-11 w-full rounded-xl border bg-white pl-11 pr-11 text-sm text-ink-800 placeholder:text-ink-400',
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
        <button
          type="button"
          tabIndex={-1}
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? 'Hide password' : 'Show password'}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-400 transition-colors hover:text-ink-600"
        >
          {visible ? <EyeOff className="h-[18px] w-[18px]" /> : <Eye className="h-[18px] w-[18px]" />}
        </button>
      </div>
      {error ? (
        <p id={`${inputId}-error`} className="mt-1.5 text-xs font-medium text-danger-600">
          {error}
        </p>
      ) : hint ? (
        <p id={`${inputId}-hint`} className="mt-1.5 text-xs text-ink-400">
          {hint}
        </p>
      ) : null}
    </div>
  );
});

PasswordInput.displayName = 'PasswordInput';
export default PasswordInput;