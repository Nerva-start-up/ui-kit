import { createContext, useContext } from "react";
import type React from "react";

export type HoverCardContextValue = {
  open: boolean;
  triggerRef: React.RefObject<HTMLElement | null>;
  onTriggerEnter: () => void;
  onTriggerLeave: () => void;
  onContentEnter: () => void;
  onContentLeave: () => void;
};

export const HoverCardContext = createContext<HoverCardContextValue | null>(null);

export function useHoverCardContext(): HoverCardContextValue {
  const ctx = useContext(HoverCardContext);
  if (!ctx) throw new Error("HoverCard sub-components must be used inside <HoverCard>");
  return ctx;
}
