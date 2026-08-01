import { useEffect } from 'react';

/**
 * Fires a callback when a click/touch happens outside the given ref(s).
 * @param {import('react').RefObject|import('react').RefObject[]} ref
 * @param {(event: MouseEvent | TouchEvent) => void} handler
 * @param {boolean} enabled
 */
export function useOnClickOutside(ref, handler, enabled = true) {
  useEffect(() => {
    if (!enabled) return;

    const listener = (event) => {
      const refs = Array.isArray(ref) ? ref : [ref];
      const isInside = refs.some((r) => r.current && r.current.contains(event.target));
      if (isInside) return;
      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler, enabled]);
}