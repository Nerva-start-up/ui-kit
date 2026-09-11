import type React from "react";
import { useRef } from "react";
import { HoverCardContext } from "./context";
import { useHoverCard } from "./useHoverCard";

export type HoverCardProps = {
  /** Задержка перед открытием при наведении, мс */
  openDelay?: number;
  /** Задержка перед закрытием после ухода курсора, мс */
  closeDelay?: number;
  /** `HoverCardTrigger` + `HoverCardContent` */
  children: React.ReactNode;
};

/** Всплывающая карточка по наведению. В отличие от `Tooltip` может содержать богатый интерактивный контент; в отличие от `Popover` открывается по hover, а не клику. */
export function HoverCard({ openDelay = 300, closeDelay = 200, children }: HoverCardProps) {
  const triggerRef = useRef<HTMLElement>(null);
  const { open, scheduleOpen, scheduleClose, cancelClose } = useHoverCard({
    openDelay,
    closeDelay,
  });

  return (
    <HoverCardContext.Provider
      value={{
        open,
        triggerRef,
        onTriggerEnter: scheduleOpen,
        onTriggerLeave: scheduleClose,
        onContentEnter: cancelClose,
        onContentLeave: scheduleClose,
      }}
    >
      {children}
    </HoverCardContext.Provider>
  );
}
