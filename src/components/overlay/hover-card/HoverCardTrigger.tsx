import { cloneElement, isValidElement } from "react";
import type React from "react";
import { useHoverCardContext } from "./context";

export type HoverCardTriggerProps = {
  children: React.ReactElement;
};

/** Элемент, при наведении/фокусе на который открывается `HoverCardContent`. */
export function HoverCardTrigger({ children }: HoverCardTriggerProps) {
  const { triggerRef, onTriggerEnter, onTriggerLeave } = useHoverCardContext();

  if (!isValidElement(children)) return children;

  const childProps = children.props as React.HTMLAttributes<HTMLElement>;

  return cloneElement(
    children as React.ReactElement<React.HTMLAttributes<HTMLElement>>,
    {
      ref: triggerRef,
      onMouseEnter: (e: React.MouseEvent<HTMLElement>) => {
        childProps.onMouseEnter?.(e);
        onTriggerEnter();
      },
      onMouseLeave: (e: React.MouseEvent<HTMLElement>) => {
        childProps.onMouseLeave?.(e);
        onTriggerLeave();
      },
      onFocus: (e: React.FocusEvent<HTMLElement>) => {
        childProps.onFocus?.(e);
        onTriggerEnter();
      },
      onBlur: (e: React.FocusEvent<HTMLElement>) => {
        childProps.onBlur?.(e);
        onTriggerLeave();
      },
    } as Partial<React.HTMLAttributes<HTMLElement>> & { ref: typeof triggerRef }
  );
}
