import { useCallback, useEffect, useRef, useState } from "react";

export type UseKeyboardNavOptions = {
  /** Общее число элементов */
  count: number;
  /** Начальный индекс (default: -1 — ничего не выбрано) */
  initialIndex?: number;
  /** Ориентация навигации (default: 'vertical') */
  orientation?: "vertical" | "horizontal" | "both";
  /** Зацикливать при выходе за границы (default: true) */
  loop?: boolean;
  /** Слушать только когда активно */
  enabled?: boolean;
  /** Колбэк при выборе Enter/Space */
  onSelect?: (index: number) => void;
  /** Колбэк при выходе по Escape */
  onEscape?: () => void;
  /** Опциональный DOM-контейнер. По умолчанию — document */
  target?: React.RefObject<HTMLElement | null>;
};

export type UseKeyboardNavReturn = {
  activeIndex: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  /** Пропс для навешивания на корневой контейнер списка */
  containerProps: {
    role: string;
    "aria-activedescendant": string | undefined;
  };
  /** Получить пропсы для конкретного элемента по индексу */
  getItemProps: (index: number) => {
    id: string;
    role: string;
    "aria-selected": boolean;
    onMouseEnter: () => void;
  };
};

/**
 * Стрелочная навигация по списку элементов.
 *
 * @example
 * const { activeIndex, getItemProps, containerProps } = useKeyboardNav({
 *   count: items.length,
 *   onSelect: (i) => selectItem(items[i]),
 *   onEscape: () => close(),
 * });
 *
 * <ul {...containerProps}>
 *   {items.map((item, i) => (
 *     <li key={item.id} {...getItemProps(i)} className={activeIndex === i ? 'bg-accent' : ''}>
 *       {item.label}
 *     </li>
 *   ))}
 * </ul>
 */
export function useKeyboardNav(options: UseKeyboardNavOptions): UseKeyboardNavReturn {
  const {
    count,
    initialIndex = -1,
    orientation = "vertical",
    loop = true,
    enabled = true,
    onSelect,
    onEscape,
    target,
  } = options;

  const [activeIndex, setActiveIndex] = useState(initialIndex);

  const onSelectRef = useRef(onSelect);
  const onEscapeRef = useRef(onEscape);
  onSelectRef.current = onSelect;
  onEscapeRef.current = onEscape;

  const move = useCallback(
    (delta: number) => {
      setActiveIndex((prev) => {
        if (count === 0) return prev;
        const next = prev + delta;
        if (loop) return ((next % count) + count) % count;
        return Math.max(0, Math.min(count - 1, next));
      });
    },
    [count, loop]
  );

  useEffect(() => {
    if (!enabled) return;

    const el: EventTarget = target?.current ?? document;

    const listener = (e: Event) => {
      const ke = e as KeyboardEvent;

      const prevKeys = orientation === "horizontal" ? ["ArrowLeft"] : ["ArrowUp"];
      const nextKeys = orientation === "horizontal" ? ["ArrowRight"] : ["ArrowDown"];
      const bothPrev = orientation === "both" ? ["ArrowLeft", "ArrowUp"] : prevKeys;
      const bothNext = orientation === "both" ? ["ArrowRight", "ArrowDown"] : nextKeys;

      if (bothPrev.includes(ke.key)) {
        ke.preventDefault();
        move(-1);
      } else if (bothNext.includes(ke.key)) {
        ke.preventDefault();
        move(1);
      } else if (ke.key === "Home") {
        ke.preventDefault();
        setActiveIndex(0);
      } else if (ke.key === "End") {
        ke.preventDefault();
        setActiveIndex(count - 1);
      } else if (ke.key === "Enter" || ke.key === " ") {
        if (activeIndex >= 0) {
          ke.preventDefault();
          onSelectRef.current?.(activeIndex);
        }
      } else if (ke.key === "Escape") {
        onEscapeRef.current?.();
      }
    };

    el.addEventListener("keydown", listener);
    return () => el.removeEventListener("keydown", listener);
  }, [enabled, orientation, move, activeIndex, count, target]);

  const getItemProps = useCallback(
    (index: number) => ({
      id: `kbd-nav-item-${index}`,
      role: "option",
      "aria-selected": index === activeIndex,
      onMouseEnter: () => setActiveIndex(index),
    }),
    [activeIndex]
  );

  return {
    activeIndex,
    setActiveIndex,
    containerProps: {
      role: "listbox",
      "aria-activedescendant": activeIndex >= 0 ? `kbd-nav-item-${activeIndex}` : undefined,
    },
    getItemProps,
  };
}
