import React from "react";
import { cn } from "../../lib/cn";
import { type GapValue, resolveGap } from "./gap";
import { type ItemProps, resolveItemProps } from "./itemProps";

const alignClasses = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
  baseline: "items-baseline",
};

const justifyClasses = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
  around: "justify-around",
};

export type HStackProps = {
  /** gap — шкала Tailwind (0.5, 1, 1.5, 2…24) или произвольное значение */
  gap?: GapValue;
  /** align-items */
  align?: keyof typeof alignClasses;
  /** justify-content */
  justify?: keyof typeof justifyClasses;
  /** flex-wrap */
  wrap?: boolean;
  /** пробрасывает стили в дочерний элемент вместо рендера `<div>` — для кастомного тега/компонента */
  asChild?: boolean;
  ref?: React.Ref<HTMLDivElement>;
} & ItemProps &
  React.HTMLAttributes<HTMLDivElement>;

/** Горизонтальный flex-row стек. `align` по умолчанию `center`. */
export function HStack({
  gap = 2,
  align = "center",
  justify,
  wrap = false,
  self,
  justifySelf,
  shrink,
  basis,
  asChild = false,
  className,
  style,
  children,
  ref,
  ...props
}: HStackProps) {
  const gapResolved = resolveGap(gap);
  const itemResolved = resolveItemProps({ self, justifySelf, shrink, basis });
  const computedClassName = cn(
    "flex flex-row",
    gapResolved.className,
    alignClasses[align],
    justify && justifyClasses[justify],
    wrap && "flex-wrap",
    itemResolved.className,
    className
  );
  const computedStyle = { ...gapResolved.style, ...itemResolved.style, ...style };

  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<{
      className?: string;
      style?: React.CSSProperties;
    }>;
    return React.cloneElement(child, {
      className: cn(computedClassName, child.props.className),
      style: { ...computedStyle, ...child.props.style },
    });
  }

  return (
    <div ref={ref} className={computedClassName} style={computedStyle} {...props}>
      {children}
    </div>
  );
}
