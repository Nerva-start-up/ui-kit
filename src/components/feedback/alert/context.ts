import { createContext, useContext } from "react";

export type AlertVariant = "info" | "success" | "warning" | "error";

export type AlertContextValue = {
  variant: AlertVariant;
  onDismiss?: () => void;
};

export const AlertContext = createContext<AlertContextValue | null>(null);

export function useAlertContext(): AlertContextValue {
  const ctx = useContext(AlertContext);
  if (!ctx) throw new Error("Alert sub-components must be used inside <Alert>");
  return ctx;
}
