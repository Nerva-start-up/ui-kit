import type React from "react";
import { cn } from "../../lib/cn";
import { type ItemProps, resolveItemProps } from "./itemProps";

export type BoxProps = {
  /** HTML-тег или компонент */
  as?: React.ElementType;
} & ItemProps &
  React.HTMLAttributes<HTMLElement>;

/** Generic-контейнер с полиморфным `as` prop. */
export function Box({
  as: Tag = "div",
  self,
  justifySelf,
  shrink,
  basis,
  className,
  style,
  children,
  ...props
}: BoxProps) {
  const item = resolveItemProps({ self, justifySelf, shrink, basis });
  return (
    <Tag className={cn(item.className, className)} style={{ ...item.style, ...style }} {...props}>
      {children}
    </Tag>
  );
}
