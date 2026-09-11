import { motion } from "motion/react";
import { useCallback, useId, useLayoutEffect, useRef, useState } from "react";
import { cn } from "../../../lib/cn";
import { springTransition } from "../../../motion/variants";
import type { SegmentedOption } from "./types";
import { useSegmented } from "./useSegmented";

const sizeClasses = {
  sm: "h-7 px-2.5 text-xs gap-1",
  md: "h-9 px-3 text-sm gap-1.5",
  lg: "h-11 px-4 text-[15px] gap-2",
};

type IndicatorPosition = {
  x: number;
  y: number;
  width: number;
  height: number;
  opacity: number;
};

export type SegmentedProps = {
  /** Список опций */
  options: SegmentedOption[];
  /** Controlled значение */
  value?: string;
  /** Uncontrolled начальное значение (по умолчанию — первая опция) */
  defaultValue?: string;
  /** Callback изменения */
  onChange?: (value: string) => void;
  /** Размер */
  size?: keyof typeof sizeClasses;
  /** Растянуть на всю ширину контейнера, опции равной ширины */
  block?: boolean;
  /** Блокирует весь контрол */
  disabled?: boolean;
  /** aria-label контейнера */
  "aria-label"?: string;
  className?: string;
};

/** Сегментированный переключатель (iOS-стиль) с анимированной подложкой активного пункта. */
export function Segmented({
  options,
  value,
  defaultValue,
  onChange,
  size = "md",
  block = false,
  disabled = false,
  "aria-label": ariaLabel,
  className,
}: SegmentedProps) {
  const groupName = useId();
  const groupRef = useRef<HTMLDivElement>(null);
  const optionRefs = useRef(new Map<string, HTMLLabelElement>());
  const [indicatorPosition, setIndicatorPosition] = useState<IndicatorPosition>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    opacity: 0,
  });
  const { current, select } = useSegmented({
    value,
    defaultValue: defaultValue ?? options[0]?.value,
    onChange,
  });

  const updateIndicatorPosition = useCallback(() => {
    const group = groupRef.current;
    const activeOption = optionRefs.current.get(current);
    if (!group || !activeOption) return;

    const groupRect = group.getBoundingClientRect();
    const optionRect = activeOption.getBoundingClientRect();
    const nextPosition: IndicatorPosition = {
      x: optionRect.left - groupRect.left,
      y: optionRect.top - groupRect.top,
      width: optionRect.width,
      height: optionRect.height,
      opacity: 1,
    };

    setIndicatorPosition((previous) =>
      previous.x === nextPosition.x &&
      previous.y === nextPosition.y &&
      previous.width === nextPosition.width &&
      previous.height === nextPosition.height &&
      previous.opacity === nextPosition.opacity
        ? previous
        : nextPosition
    );
  }, [current]);

  useLayoutEffect(() => {
    updateIndicatorPosition();

    const group = groupRef.current;
    if (!group || typeof ResizeObserver === "undefined") return;

    const resizeObserver = new ResizeObserver(updateIndicatorPosition);
    resizeObserver.observe(group);
    for (const option of optionRefs.current.values()) {
      resizeObserver.observe(option);
    }
    return () => resizeObserver.disconnect();
  }, [updateIndicatorPosition]);

  return (
    <div
      ref={groupRef}
      role="radiogroup"
      aria-label={ariaLabel}
      className={cn(
        "relative inline-flex gap-0.5 rounded-[var(--radius-md)] bg-[var(--surface-2)] p-1",
        block && "flex w-full",
        disabled && "opacity-50",
        className
      )}
    >
      <motion.span
        aria-hidden="true"
        initial={false}
        animate={indicatorPosition}
        transition={springTransition}
        className="pointer-events-none absolute left-0 top-0 z-0 rounded-[var(--radius-sm)] bg-[var(--surface)] shadow-sm"
      />
      {options.map((option) => {
        const isActive = option.value === current;
        const isDisabled = disabled || option.disabled;
        const Icon = option.icon;

        const inputId = `${groupName}-${option.value}`;

        return (
          <label
            key={option.value}
            ref={(node) => {
              if (node) optionRefs.current.set(option.value, node);
              else optionRefs.current.delete(option.value);
            }}
            htmlFor={inputId}
            className={cn(
              "relative z-10 flex select-none items-center justify-center rounded-[var(--radius-sm)]",
              "font-medium transition-colors focus-within:outline-2 focus-within:outline-offset-2",
              "focus-within:outline-[var(--primary)]",
              sizeClasses[size],
              block && "flex-1",
              isDisabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
              isActive ? "text-[var(--text)]" : "text-[var(--text-muted)] hover:text-[var(--text)]"
            )}
          >
            <input
              id={inputId}
              type="radio"
              name={groupName}
              value={option.value}
              checked={isActive}
              disabled={isDisabled}
              onChange={() => select(option.value)}
              className="sr-only"
            />

            {Icon && <Icon size={14} />}
            {option.label}
          </label>
        );
      })}
    </div>
  );
}
