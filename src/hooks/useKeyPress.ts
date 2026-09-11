import { useEffect, useRef } from "react";

export type UseKeyPressOptions = {
  /** Срабатывать только когда target в фокусе. По умолчанию — весь document */
  target?: React.RefObject<HTMLElement | null>;
  /** Слушать только когда условие true (default: true) */
  enabled?: boolean;
  /** keydown (default) | keyup | keypress */
  event?: "keydown" | "keyup" | "keypress";
};

/**
 * Вызывает `handler` при нажатии указанной клавиши.
 *
 * @example
 * useKeyPress('Escape', () => close())
 * useKeyPress('Enter', submit, { enabled: isFormReady })
 */
export function useKeyPress(
  key: string | string[],
  handler: (event: KeyboardEvent) => void,
  options: UseKeyPressOptions = {}
): void {
  const { target, enabled = true, event = "keydown" } = options;

  const handlerRef = useRef(handler);
  handlerRef.current = handler;

  useEffect(() => {
    if (!enabled) return;

    const keys = Array.isArray(key) ? key : [key];
    const el: EventTarget = target?.current ?? document;

    const listener = (e: Event) => {
      const ke = e as KeyboardEvent;
      if (keys.includes(ke.key)) handlerRef.current(ke);
    };

    el.addEventListener(event, listener);
    return () => el.removeEventListener(event, listener);
  }, [key, enabled, event, target]);
}
