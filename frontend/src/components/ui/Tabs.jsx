import { createContext, useContext, useId, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

const TabsContext = createContext(null);

/**
 * Compound tabs: <Tabs defaultValue="a"><TabList><Tab value="a"/></TabList><TabPanel value="a"/></Tabs>
 * Works controlled (pass `value` + `onChange`) or uncontrolled (pass `defaultValue`).
 */
export function Tabs({ children, defaultValue, value, onChange, className }) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const isControlled = value !== undefined;
  const activeValue = isControlled ? value : internalValue;
  const layoutId = useId();

  const setActiveValue = (v) => {
    if (!isControlled) setInternalValue(v);
    onChange?.(v);
  };

  return (
    <TabsContext.Provider value={{ activeValue, setActiveValue, layoutId }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
}

/** @param {{ variant?: 'pill'|'underline' }} props */
export function TabList({ children, variant = 'pill', className }) {
  return (
    <div
      role="tablist"
      className={cn(
        'inline-flex items-center gap-1',
        variant === 'pill' && 'rounded-xl bg-ink-100 p-1',
        variant === 'underline' && 'gap-6 border-b border-ink-200',
        className,
      )}
    >
      {children}
    </div>
  );
}

/** @param {{ value: string, variant?: 'pill'|'underline' }} props */
export function Tab({ value, children, variant = 'pill', className }) {
  const { activeValue, setActiveValue, layoutId } = useContext(TabsContext);
  const isActive = activeValue === value;

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      onClick={() => setActiveValue(value)}
      className={cn(
        'relative whitespace-nowrap text-sm font-medium transition-colors',
        variant === 'pill' && ['rounded-lg px-4 py-2', isActive ? 'text-primary-700' : 'text-ink-500 hover:text-ink-700'],
        variant === 'underline' && ['pb-3', isActive ? 'text-primary-700' : 'text-ink-500 hover:text-ink-700'],
        className,
      )}
    >
      {isActive && variant === 'pill' && (
        <motion.span
          layoutId={`${layoutId}-pill`}
          className="absolute inset-0 rounded-lg bg-white shadow-soft"
          transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
        />
      )}
      <span className="relative z-10">{children}</span>
      {isActive && variant === 'underline' && (
        <motion.span
          layoutId={`${layoutId}-underline`}
          className="absolute -bottom-px left-0 right-0 h-0.5 rounded-full bg-primary-600"
          transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
        />
      )}
    </button>
  );
}

export function TabPanel({ value, children, className }) {
  const { activeValue } = useContext(TabsContext);
  if (activeValue !== value) return null;
  return (
    <div role="tabpanel" className={cn('animate-fade-in', className)}>
      {children}
    </div>
  );
}

export default Tabs;