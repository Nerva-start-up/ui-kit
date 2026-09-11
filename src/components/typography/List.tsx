import type React from "react";
import { cn } from "../../lib/cn";

const markerClasses = {
  disc: "list-disc",
  decimal: "list-decimal",
  none: "list-none",
};

export type ListProps = {
  /** `ul` (неупорядоченный) или `ol` (нумерованный) */
  as?: "ul" | "ol";
  /** стиль маркера */
  marker?: keyof typeof markerClasses;
} & React.HTMLAttributes<HTMLUListElement | HTMLOListElement>;

/** Список `<ul>`/`<ol>` на токенах шрифта. Элементы — `ListItem`. */
export function List({
  as: Tag = "ul",
  marker = "disc",
  className,
  children,
  ...props
}: ListProps) {
  return (
    <Tag
      className={cn(
        "flex flex-col gap-1.5 pl-5 text-[length:var(--font-size-md)] leading-[var(--line-height-normal)] text-[var(--text)]",
        markerClasses[marker],
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
