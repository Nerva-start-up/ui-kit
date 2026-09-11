import type React from "react";
import { cn } from "../../lib/cn";

export type SpacerProps = {
  /** направление */
  axis?: "horizontal" | "vertical" | "both";
  /** без size → flex-1 (растягивается). Шкала Tailwind (1, 2, 3…24) через класс, либо произвольное значение (число → px, строка → как есть) */
  size?: number | string;
  className?: string;
};

const WIDTH_CLASSES: Record<number, string> = {
  1: "w-1",
  2: "w-2",
  3: "w-3",
  4: "w-4",
  5: "w-5",
  6: "w-6",
  8: "w-8",
  10: "w-10",
  12: "w-12",
  16: "w-16",
  20: "w-20",
  24: "w-24",
};

const HEIGHT_CLASSES: Record<number, string> = {
  1: "h-1",
  2: "h-2",
  3: "h-3",
  4: "h-4",
  5: "h-5",
  6: "h-6",
  8: "h-8",
  10: "h-10",
  12: "h-12",
  16: "h-16",
  20: "h-20",
  24: "h-24",
};

const SIZE_CLASSES: Record<number, string> = {
  1: "w-1 h-1",
  2: "w-2 h-2",
  3: "w-3 h-3",
  4: "w-4 h-4",
  5: "w-5 h-5",
  6: "w-6 h-6",
  8: "w-8 h-8",
  10: "w-10 h-10",
  12: "w-12 h-12",
  16: "w-16 h-16",
  20: "w-20 h-20",
  24: "w-24 h-24",
};

function resolveSpacer(
  axis: "horizontal" | "vertical" | "both",
  size: number | string
): { className?: string; style?: React.CSSProperties } {
  if (axis === "horizontal") {
    if (typeof size === "number" && size in WIDTH_CLASSES) {
      return { className: cn(WIDTH_CLASSES[size], "shrink-0") };
    }
    return { style: { width: typeof size === "number" ? `${size}px` : size, flexShrink: 0 } };
  }

  if (axis === "vertical") {
    if (typeof size === "number" && size in HEIGHT_CLASSES) {
      return { className: cn(HEIGHT_CLASSES[size], "shrink-0") };
    }
    return { style: { height: typeof size === "number" ? `${size}px` : size, flexShrink: 0 } };
  }

  if (typeof size === "number" && size in SIZE_CLASSES) {
    return { className: SIZE_CLASSES[size] };
  }
  const value = typeof size === "number" ? `${size}px` : size;
  return { style: { width: value, height: value, flexShrink: 0 } };
}

/** Гибкий разделитель в flex-контейнере. Без size — grow:1. */
export function Spacer({ axis = "both", size, className }: SpacerProps) {
  if (size === undefined) {
    return <span aria-hidden className={cn("block flex-1", className)} />;
  }

  const resolved = resolveSpacer(axis, size);
  return (
    <span
      aria-hidden
      className={cn("block", resolved.className, className)}
      style={resolved.style}
    />
  );
}
