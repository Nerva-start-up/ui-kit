import { Toaster as SonnerToaster } from "sonner";

/** Монтируется один раз в корне. `toast()` вызывается из любого места. */
export function Toaster() {
  return (
    <SonnerToaster
      position="bottom-right"
      toastOptions={{
        style: {
          background: "var(--surface)",
          border: "1px solid var(--border)",
          color: "var(--text)",
          borderRadius: "var(--radius-md)",
          fontSize: "14px",
        },
        classNames: {
          success: "[&]:border-[var(--success)]",
          error: "[&]:border-[var(--error)]",
          info: "[&]:border-[var(--info)]",
        },
      }}
    />
  );
}
