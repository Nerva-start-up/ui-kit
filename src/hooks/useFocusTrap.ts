import { useEffect } from "react";

const FOCUSABLE = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
  '[contenteditable="true"]',
].join(", ");

/**
 * Запирает фокус внутри `containerRef` пока `active = true`.
 * При активации — фокусируется на первый focusable-элемент.
 * При деактивации — возвращает фокус на элемент, который был активен до.
 *
 * @example
 * const ref = useRef<HTMLDivElement>(null);
 * useFocusTrap(ref, isOpen);
 *
 * <div ref={ref}>
 *   <button>Action</button>
 *   <button onClick={close}>Close</button>
 * </div>
 */
export function useFocusTrap(
  containerRef: React.RefObject<HTMLElement | null>,
  active: boolean
): void {
  useEffect(() => {
    if (!active) return;

    const container = containerRef.current;
    if (!container) return;

    const previousFocus = document.activeElement as HTMLElement | null;

    const focusable = (): HTMLElement[] =>
      Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE));

    const first = focusable()[0];
    first?.focus();

    const listener = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      const els = focusable();
      if (els.length === 0) {
        e.preventDefault();
        return;
      }

      const firstEl = els[0];
      const lastEl = els[els.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        }
      } else {
        if (document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    };

    document.addEventListener("keydown", listener);

    return () => {
      document.removeEventListener("keydown", listener);
      previousFocus?.focus();
    };
  }, [active, containerRef]);
}
