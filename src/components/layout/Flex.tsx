import React from "react";
import { cn } from "../../lib/cn";
import { type GapValue, resolveGap } from "./gap";
import { type ItemProps, resolveItemProps } from "./itemProps";

const directionClasses = {
  row: "flex-row",
  col: "flex-col",
  "row-reverse": "flex-row-reverse",
  "col-reverse": "flex-col-reverse",
};

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
  evenly: "justify-evenly",
};

const wrapClasses = {
  wrap: "flex-wrap",
  nowrap: "flex-nowrap",
  "wrap-reverse": "flex-wrap-reverse",
};

export type FlexProps = {
  /** flex-direction */
  direction?: keyof typeof directionClasses;
  /** align-items */
  align?: keyof typeof alignClasses;
  /** justify-content */
  justify?: keyof typeof justifyClasses;
  /** flex-wrap */
  wrap?: keyof typeof wrapClasses;
  /** gap — шкала Tailwind (0.5, 1, 1.5, 2…24) или произвольное значение (число → px, строка → как есть) */
  gap?: GapValue;
  /** inline-flex */
  inline?: boolean;
  /** flex-1 */
  grow?: boolean;
  /** пробрасывает стили в дочерний элемент вместо рендера `<div>` — для кастомного тега/компонента */
  asChild?: boolean;
} & ItemProps &
  React.HTMLAttributes<HTMLDivElement>;

/** Flexbox-контейнер. */
export function Flex({
  direction = "row",
  align,
  justify,
  wrap,
  gap,
  inline = false,
  grow = false,
  self,
  justifySelf,
  shrink,
  basis,
  asChild = false,
  className,
  style,
  children,
  ...props
}: FlexProps) {
  const gapResolved = resolveGap(gap);
  const itemResolved = resolveItemProps({ self, justifySelf, shrink, basis });
  const computedClassName = cn(
    inline ? "inline-flex" : "flex",
    directionClasses[direction],
    align && alignClasses[align],
    justify && justifyClasses[justify],
    wrap && wrapClasses[wrap],
    gapResolved.className,
    grow && "flex-1",
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
