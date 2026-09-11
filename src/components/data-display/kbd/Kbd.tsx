import React from "react";
import { cn } from "../../../lib/cn";
import { KbdContext } from "./context";

export type KbdProps = {
  /** размер — пробрасывается в дочерние KbdKey через контекст */
  size?: "sm" | "md";
  /** символ между клавишами */
  separator?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
};

/** Контейнер комбинации клавиш, вставляет разделители между KbdKey. */
export function Kbd({ size = "md", separator = "+", className, children }: KbdProps) {
  const items = React.Children.toArray(children);

  return (
    <KbdContext.Provider value={{ size }}>
      <span className={cn("inline-flex items-center gap-1", className)}>
        {items.map((child, i) => (
          <React.Fragment key={i}>
            {child}
            {i < items.length - 1 && (
              <span
                className={cn(
                  "select-none text-[var(--text-muted)]",
                  size === "sm" ? "text-[10px]" : "text-xs"
                )}
              >
                {separator}
              </span>
            )}
          </React.Fragment>
        ))}
      </span>
    </KbdContext.Provider>
  );
}
