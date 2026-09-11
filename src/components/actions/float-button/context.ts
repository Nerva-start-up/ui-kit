import { createContext, useContext } from "react";

export type FloatButtonShape = "circle" | "square";

export type FloatButtonGroupContextValue = {
  shape: FloatButtonShape;
};

export const FloatButtonGroupContext = createContext<FloatButtonGroupContextValue | null>(null);

/** `null`, если `FloatButton` используется вне `FloatButtonGroup` */
export function useFloatButtonGroupContext(): FloatButtonGroupContextValue | null {
  return useContext(FloatButtonGroupContext);
}
