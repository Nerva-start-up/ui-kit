import type React from "react";
import { cn } from "../../lib/cn";

const levelClasses = {
  1: "text-[length:var(--font-size-3xl)] font-[number:var(--font-weight-bold)] leading-[var(--line-height-tight)] tracking-[var(--tracking-tight)]",
  2: "text-[length:var(--font-size-2xl)] font-[number:var(--font-weight-bold)] leading-[var(--line-height-tight)]",
  3: "text-[length:var(--font-size-xl)] font-[number:var(--font-weight-semibold)] leading-[var(--line-height-tight)]",
  4: "text-[length:var(--font-size-lg)] font-[number:var(--font-weight-semibold)] leading-[var(--line-height-normal)]",
  5: "text-[length:var(--font-size-md)] font-[number:var(--font-weight-semibold)] leading-[var(--line-height-normal)]",
  6: "text-[length:var(--font-size-sm)] font-[number:var(--font-weight-semibold)] leading-[var(--line-height-normal)]",
} as const;

const colorClasses = {
  default: "text-[var(--text)]",
  sub: "text-[var(--text-sub)]",
  muted: "text-[var(--text-muted)]",
  primary: "text-[var(--primary)]",
};

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export type HeadingProps = {
  /** тег + размер */
  level?: HeadingLevel;
  /** override тега (напр. `as="div"` если h1 уже есть) */
  as?: React.ElementType;
  color?: keyof typeof colorClasses;
  /** обрезает с `…` */
  truncate?: boolean;
} & React.HTMLAttributes<HTMLHeadingElement>;

/** Заголовки `h1`–`h6`. Уровень задаёт одновременно семантический тег и размер шрифта. */
export function Heading({
  level = 1,
  as,
  color = "default",
  truncate = false,
  className,
  children,
  ...props
}: HeadingProps) {
  const Tag = as ?? (`h${level}` as React.ElementType);
  return (
    <Tag
      className={cn(levelClasses[level], colorClasses[color], truncate && "truncate", className)}
      {...props}
    >
      {children}
    </Tag>
  );
}
