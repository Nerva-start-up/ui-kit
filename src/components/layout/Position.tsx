import React from "react";
import { cn } from "../../lib/cn";
import { type ItemProps, resolveItemProps } from "./itemProps";

const positionClasses = {
  static: "static",
  relative: "relative",
  absolute: "absolute",
  fixed: "fixed",
  sticky: "sticky",
};

type CSSValue = string | number;

function toCSSValue(v: CSSValue): string {
  return typeof v === "number" ? `${v}px` : v;
}

export type PositionProps = {
  /** position */
  position?: keyof typeof positionClasses;
  /** number → px */
  top?: CSSValue;
  right?: CSSValue;
  bottom?: CSSValue;
  left?: CSSValue;
  inset?: CSSValue;
  /** z-index */
  zIndex?: number;
  /** пробрасывает стили в дочерний элемент вместо рендера `<div>` — для кастомного тега/компонента */
  asChild?: boolean;
} & ItemProps &
  React.HTMLAttributes<HTMLDivElement>;

/** Позиционирующая обёртка с inline-стилями для произвольных значений. */
export function Position({
  position = "relative",
  top,
  right,
  bottom,
  left,
  inset,
  zIndex,
  self,
  justifySelf,
  shrink,
  basis,
  asChild = false,
  className,
  style,
  children,
  ...props
}: PositionProps) {
  const itemResolved = resolveItemProps({ self, justifySelf, shrink, basis });
  const computedClassName = cn(positionClasses[position], itemResolved.className, className);
  const computedStyle: React.CSSProperties = {
    ...(inset !== undefined && { inset: toCSSValue(inset) }),
    ...(top !== undefined && { top: toCSSValue(top) }),
    ...(right !== undefined && { right: toCSSValue(right) }),
    ...(bottom !== undefined && { bottom: toCSSValue(bottom) }),
    ...(left !== undefined && { left: toCSSValue(left) }),
    ...(zIndex !== undefined && { zIndex }),
    ...itemResolved.style,
    ...style,
  };

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
