import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '@/utils/cn';
import Portal from './Portal';
import IconButton from './IconButton';

const SIZES = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-2xl',
  '2xl': 'max-w-4xl',
  full: 'max-w-[calc(100vw-2rem)]',
};

/**
 * Accessible modal dialog with backdrop, ESC-to-close, and scroll lock.
 * @param {{ isOpen: boolean, onClose: () => void, title?: string, description?: string, size?: keyof typeof SIZES, footer?: React.ReactNode }} props
 */
export default function Modal({ isOpen, onClose, title, description, size = 'md', footer, children }) {
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  return (
    <Portal>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="absolute inset-0 bg-ink-950/50 backdrop-blur-sm"
              onClick={onClose}
              aria-hidden="true"
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby={title ? 'modal-title' : undefined}
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className={cn(
                'relative flex max-h-[90vh] w-full flex-col rounded-2xl bg-white shadow-elevated',
                SIZES[size],
              )}
            >
              {(title || description) && (
                <div className="flex items-start justify-between gap-4 border-b border-ink-100 p-6">
                  <div>
                    {title && (
                      <h2 id="modal-title" className="text-lg font-semibold text-ink-900">
                        {title}
                      </h2>
                    )}
                    {description && <p className="mt-1 text-sm text-ink-400">{description}</p>}
                  </div>
                  <IconButton aria-label="Fermer" size="sm" onClick={onClose}>
                    <X className="h-4 w-4" />
                  </IconButton>
                </div>
              )}
              {!title && !description && (
                <IconButton
                  aria-label="Fermer"
                  size="sm"
                  onClick={onClose}
                  className="absolute right-4 top-4 z-10 bg-white/80 backdrop-blur"
                >
                  <X className="h-4 w-4" />
                </IconButton>
              )}
              <div className="flex-1 overflow-y-auto p-6">{children}</div>
              {footer && <div className="flex items-center justify-end gap-3 border-t border-ink-100 p-6">{footer}</div>}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </Portal>
  );
}