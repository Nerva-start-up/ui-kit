import React from "react";
import { cn } from "../../lib/cn";
import { type ItemProps, resolveItemProps } from "./itemProps";

export type CenterProps = {
  /** inline-flex */
  inline?: boolean;
  /** пробрасывает стили в дочерний элемент вместо рендера `<div>` — для кастомного тега/компонента */
  asChild?: boolean;
} & ItemProps &
  React.HTMLAttributes<HTMLDivElement>;

/** Центрирует содержимое по обеим осям (flex + items-center + justify-center). */
export function Center({
  inline = false,
  self,
  justifySelf,
  shrink,
  basis,
  asChild = false,
  className,
  style,
  children,
  ...props
}: CenterProps) {
  const itemResolved = resolveItemProps({ self, justifySelf, shrink, basis });
  const computedClassName = cn(
    inline ? "inline-flex" : "flex",
    "items-center justify-center",
    itemResolved.className,
    className
  );
  const computedStyle = { ...itemResolved.style, ...style };

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
