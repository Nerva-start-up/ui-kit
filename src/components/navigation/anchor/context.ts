import { createContext, useContext } from "react";
import type React from "react";

export type AnchorContextValue = {
  activeLink: string | null;
  registerLink: (href: string) => void;
  unregisterLink: (href: string) => void;
  onLinkClick: (href: string, e: React.MouseEvent<HTMLAnchorElement>) => void;
};

export const AnchorContext = createContext<AnchorContextValue | null>(null);

export function useAnchorContext(): AnchorContextValue {
  const ctx = useContext(AnchorContext);
  if (!ctx) throw new Error("AnchorLink must be used inside <Anchor>");
  return ctx;
}
