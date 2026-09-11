import type React from "react";
import { cn } from "../../lib/cn";

export type ListItemProps = React.LiHTMLAttributes<HTMLLIElement>;

/** Элемент списка `<li>` для `List`. */
export function ListItem({ className, children, ...props }: ListItemProps) {
  return (
    <li className={cn("pl-1 marker:text-[var(--text-muted)]", className)} {...props}>
      {children}
    </li>
  );
}
