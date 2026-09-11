import { createContext, useContext } from "react";

export type SidebarContextValue = {
  collapsed: boolean;
  onToggle: () => void;
};

export const SidebarContext = createContext<SidebarContextValue | null>(null);

export function useSidebarContext(): SidebarContextValue {
  const ctx = useContext(SidebarContext);
  if (!ctx) throw new Error("Sidebar sub-components must be used inside <Sidebar>");
  return ctx;
}
