import type React from "react";
import { cn } from "../../lib/cn";

const sizeClasses = {
  xs: "text-[length:var(--font-size-xs)]",
  sm: "text-[length:var(--font-size-sm)]",
  md: "text-[length:var(--font-size-md)]",
  lg: "text-[length:var(--font-size-lg)]",
};

const variantClasses = {
  default: "text-[var(--text)]",
  sub: "text-[var(--text-sub)]",
  muted: "text-[var(--text-muted)]",
  primary: "text-[var(--primary)]",
  success: "text-[var(--success)]",
  error: "text-[var(--error)]",
  info: "text-[var(--info)]",
};

const weightClasses = {
  normal: "font-[number:var(--font-weight-normal)]",
  medium: "font-[number:var(--font-weight-medium)]",
  semibold: "font-[number:var(--font-weight-semibold)]",
  bold: "font-[number:var(--font-weight-bold)]",
};

const alignClasses = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

export type TextProps = {
  /** HTML-тег */
  as?: React.ElementType;
  /** размер (xs=12px, sm=14px, md=16px, lg=18px) */
  size?: keyof typeof sizeClasses;
  /** цвет */
  variant?: keyof typeof variantClasses;
  /** жирность */
  weight?: keyof typeof weightClasses;
  /** выравнивание */
  align?: keyof typeof alignClasses;
  /** моноширинный шрифт */
  mono?: boolean;
  /** обрезает с `…` */
  truncate?: boolean;
} & React.HTMLAttributes<HTMLElement>;

/** Универсальный текстовый компонент: параграфы, inline-метки, подписи, статусы. */
export function Text({
  as: Tag = "p",
  size = "md",
  variant = "default",
  weight = "normal",
  align,
  mono = false,
  truncate = false,
  className,
  children,
  ...props
}: TextProps) {
  return (
    <Tag
      className={cn(
        sizeClasses[size],
        "leading-[var(--line-height-normal)]",
        variantClasses[variant],
        weightClasses[weight],
        align && alignClasses[align],
        mono && "font-[family-name:var(--font-mono)]",
        truncate && "truncate",
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
