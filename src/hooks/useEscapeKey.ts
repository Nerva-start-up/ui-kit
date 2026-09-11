import { useKeyPress } from "./useKeyPress";

/**
 * Удобная обёртка над `useKeyPress` для клавиши Escape.
 * Типичный случай: закрытие модала, дравера, тултипа.
 *
 * @example
 * useEscapeKey(() => setOpen(false), isOpen)
 */
export function useEscapeKey(handler: (e: KeyboardEvent) => void, enabled = true): void {
  useKeyPress("Escape", handler, { enabled });
}
