import type React from "react";
import { cn } from "../../lib/cn";
import { type ItemProps, resolveItemProps } from "./itemProps";

export type AspectRatioProps = {
  /** width / height */
  ratio?: number;
} & ItemProps &
  React.HTMLAttributes<HTMLDivElement>;

/**
 * Контейнер с фиксированным соотношением сторон.
 * ratio = width / height, например: 16/9, 4/3, 1 (квадрат).
 */
export function AspectRatio({
  ratio = 16 / 9,
  self,
  justifySelf,
  shrink,
  basis,
  className,
  style,
  children,
  ...props
}: AspectRatioProps) {
  const itemResolved = resolveItemProps({ self, justifySelf, shrink, basis });
  return (
    <div
      className={cn("relative w-full", itemResolved.className, className)}
      style={{ ...itemResolved.style, ...style }}
      {...props}
    >
      <div style={{ paddingTop: `${(1 / ratio) * 100}%` }} />
      <div className="absolute inset-0">{children}</div>
    </div>
  );
}
