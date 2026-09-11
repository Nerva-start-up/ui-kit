import type React from "react";
import { cn } from "../../lib/cn";

const sizeClasses = {
  sm: "max-w-screen-sm",
  md: "max-w-screen-md",
  lg: "max-w-screen-lg",
  xl: "max-w-screen-xl",
  "2xl": "max-w-screen-2xl",
  full: "max-w-full",
};

export type ContainerProps = {
  /** HTML-тег */
  as?: React.ElementType;
  /** max-width */
  size?: keyof typeof sizeClasses;
  /** mx-auto */
  centered?: boolean;
  /** px-4 sm:px-6 lg:px-8 */
  padded?: boolean;
} & React.HTMLAttributes<HTMLElement>;

/** Max-width центрированная обёртка. */
export function Container({
  as: Tag = "div",
  size = "xl",
  centered = true,
  padded = true,
  className,
  children,
  ...props
}: ContainerProps) {
  return (
    <Tag
      className={cn(
        "w-full",
        sizeClasses[size],
        centered && "mx-auto",
        padded && "px-4 sm:px-6 lg:px-8",
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
