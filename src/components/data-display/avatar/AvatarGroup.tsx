import { Children, cloneElement, isValidElement } from "react";
import type React from "react";
import { cn } from "../../../lib/cn";

const sizeBox = { sm: "w-7 h-7 text-xs", md: "w-9 h-9 text-sm", lg: "w-12 h-12 text-base" };
const sizeOverlap = { sm: "-ml-2", md: "-ml-2.5", lg: "-ml-3" };

export type AvatarGroupProps = {
  /** `Avatar` — участники группы */
  children: React.ReactNode;
  /** Сколько аватаров показать до сворачивания в "+N" */
  max?: number;
  /** sm=28px, md=36px, lg=48px — должен совпадать с `size` дочерних `Avatar` */
  size?: keyof typeof sizeBox;
  className?: string;
};

/** Стопка перекрывающихся `Avatar` с "+N" для скрытого остатка. */
export function AvatarGroup({ children, max = 5, size = "md", className }: AvatarGroupProps) {
  const items = Children.toArray(children).filter(isValidElement) as React.ReactElement<{
    className?: string;
  }>[];
  const visible = items.slice(0, max);
  const overflow = items.length - visible.length;

  return (
    <div className={cn("flex items-center", className)}>
      {visible.map((child, i) =>
        cloneElement(child, {
          key: i,
          className: cn(
            "ring-2 ring-[var(--surface)]",
            i > 0 && sizeOverlap[size],
            child.props.className
          ),
        })
      )}
      {overflow > 0 && (
        <span
          className={cn(
            "inline-flex shrink-0 select-none items-center justify-center rounded-full",
            "bg-[var(--surface-2)] font-semibold text-[var(--text-muted)]",
            "ring-2 ring-[var(--surface)]",
            sizeBox[size],
            sizeOverlap[size]
          )}
        >
          +{overflow}
        </span>
      )}
    </div>
  );
}
