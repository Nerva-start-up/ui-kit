import React from "react";
import { cn } from "../../lib/cn";
import { type GapValue, resolveGap } from "./gap";
import { type ItemProps, resolveItemProps } from "./itemProps";

const alignClasses = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
};

const justifyClasses = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
  around: "justify-around",
  evenly: "justify-evenly",
};

export type StackProps = {
  /** gap между элементами — шкала Tailwind (0.5, 1, 1.5, 2…24) или произвольное значение */
  gap?: GapValue;
  /** align-items */
  align?: keyof typeof alignClasses;
  /** justify-content */
  justify?: keyof typeof justifyClasses;
  /** пробрасывает стили в дочерний элемент вместо рендера `<div>` — для кастомного тега/компонента */
  asChild?: boolean;
} & ItemProps &
  React.HTMLAttributes<HTMLDivElement>;

/** Вертикальный flex-col стек. */
export function Stack({
  gap = 4,
  align,
  justify,
  self,
  justifySelf,
  shrink,
  basis,
  asChild = false,
  className,
  style,
  children,
  ...props
}: StackProps) {
  const gapResolved = resolveGap(gap);
  const itemResolved = resolveItemProps({ self, justifySelf, shrink, basis });
  const computedClassName = cn(
    "flex flex-col",
    gapResolved.className,
    align && alignClasses[align],
    justify && justifyClasses[justify],
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
    <div className={computedClassName} style={computedStyle} {...props}>
      {children}
    </div>
  );
}
