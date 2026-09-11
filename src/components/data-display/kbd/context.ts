import { createContext, useContext } from "react";

export type KbdContextValue = { size: "sm" | "md" };

export const KbdContext = createContext<KbdContextValue>({ size: "md" });

export const useKbdContext = () => useContext(KbdContext);
