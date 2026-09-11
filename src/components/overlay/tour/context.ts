import { createContext, useContext } from "react";

export type TourContextValue = {
  current: number;
  total: number;
  isFirst: boolean;
  isLast: boolean;
  type: "default" | "primary";
  next: () => void;
  prev: () => void;
  close: () => void;
  finish: () => void;
};

export const TourContext = createContext<TourContextValue | null>(null);

export function useTourContext(): TourContextValue {
  const ctx = useContext(TourContext);
  if (!ctx) throw new Error("TourStep и его дочерние компоненты должны быть внутри <Tour>");
  return ctx;
}
