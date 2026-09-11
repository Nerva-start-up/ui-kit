import { useEffect, useRef } from "react";

type Modifier = "ctrl" | "meta" | "alt" | "shift";

function parseCombo(combo: string): { modifiers: Set<Modifier>; key: string } {
  const parts = combo.toLowerCase().split("+");
  const key = parts[parts.length - 1] ?? "";
  const modifiers = new Set(parts.slice(0, -1) as Modifier[]);
  return { modifiers, key };
}

/** Физическая клавиша (`e.code`) в нижнем регистре, без привязки к раскладке — `KeyK` → `k`, `Digit1` → `1`. */
function codeToKey(code: string): string {
  if (code.startsWith("Key")) return code.slice(3).toLowerCase();
  if (code.startsWith("Digit")) return code.slice(5);
  return code.toLowerCase();
}

function matchCombo(e: KeyboardEvent, combo: string): boolean {
  const { modifiers, key } = parseCombo(combo);

  if (modifiers.has("ctrl") !== e.ctrlKey) return false;
  if (modifiers.has("meta") !== e.metaKey) return false;
  if (modifiers.has("alt") !== e.altKey) return false;
  if (modifiers.has("shift") !== e.shiftKey) return false;

  // Сравниваем по e.code, а не e.key: иначе Ctrl/⌘+K не сработает
  // на нелатинской раскладке (физическая K даёт e.key другого языка).
  return codeToKey(e.code) === key;
}

export type UseHotkeyOptions = {
  /** Слушать только когда условие true (default: true) */
  enabled?: boolean;
  /** Не срабатывать внутри input/textarea/[contenteditable] (default: true) */
  ignoreInput?: boolean;
  /** preventDefault при срабатывании (default: true) */
  preventDefault?: boolean;
  target?: React.RefObject<HTMLElement | null>;
};

/**
 * Глобальный хоткей (одна или несколько комбинаций).
 * Формат строки: `'ctrl+k'`, `'meta+shift+p'`, `'alt+f4'`.
 * Для кросс-платформенных сокращений передавай массив: `['ctrl+k', 'meta+k']`.
 *
 * @example
 * useHotkey('ctrl+k', openSearch)
 * useHotkey(['ctrl+k', 'meta+k'], openSearch)
 * useHotkey('ctrl+s', save, { preventDefault: true })
 */
export function useHotkey(
  combo: string | string[],
  handler: (event: KeyboardEvent) => void,
  options: UseHotkeyOptions = {}
): void {
  const { enabled = true, ignoreInput = true, preventDefault = true, target } = options;

  const handlerRef = useRef(handler);
  handlerRef.current = handler;

  useEffect(() => {
    if (!enabled) return;

    const combos = Array.isArray(combo) ? combo : [combo];
    const el: EventTarget = target?.current ?? document;

    const listener = (e: Event) => {
      const ke = e as KeyboardEvent;

      if (ignoreInput) {
        const tag = (ke.target as HTMLElement)?.tagName;
        const editable = (ke.target as HTMLElement)?.isContentEditable;
        if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || editable) return;
      }

      if (combos.some((c) => matchCombo(ke, c))) {
        if (preventDefault) ke.preventDefault();
        handlerRef.current(ke);
      }
    };

    el.addEventListener("keydown", listener);
    return () => el.removeEventListener("keydown", listener);
  }, [combo, enabled, ignoreInput, preventDefault, target]);
}
