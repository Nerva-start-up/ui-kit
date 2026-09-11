import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "../../../lib/cn";

/** Вкладки на Radix UI — root (Radix `Tabs.Root`). */
export const Tabs = TabsPrimitive.Root;
/** Контент вкладки (Radix `Tabs.Content`). */
export const TabsContent = TabsPrimitive.Content;

/* ── List ─────────────────────────────────────────── */
interface TabsListProps extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> {
  variant?: "line" | "pills";
}

/** Строка с вкладками (нижняя граница). */
export function TabsList({ className, variant = "line", ...props }: TabsListProps) {
  return (
    <TabsPrimitive.List
      className={cn(
        variant === "pills"
          ? "flex gap-1 p-1 rounded-[var(--radius-md)] bg-[var(--surface-2)]"
          : "flex border-b border-[var(--border)]",
        className
      )}
      {...props}
    />
  );
}

/* ── Trigger ──────────────────────────────────────── */
interface TabsTriggerProps extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> {
  variant?: "line" | "pills";
}

/** Кнопка вкладки (активная — оранжевая подчёркивание). */
export function TabsTrigger({ className, variant = "line", ...props }: TabsTriggerProps) {
  return (
    <TabsPrimitive.Trigger
      className={cn(
        "text-sm font-medium transition-all disabled:opacity-40 disabled:cursor-not-allowed",
        variant === "pills"
          ? cn(
              "flex-1 px-4 py-2 rounded-[var(--radius-sm)]",
              "text-[var(--text-muted)] hover:text-[var(--text)]",
              "data-[state=active]:bg-[var(--primary)] data-[state=active]:text-white data-[state=active]:shadow-sm"
            )
          : cn(
              "px-4 py-2.5 -mb-px border-b-2 border-transparent",
              "text-[var(--text-muted)] hover:text-[var(--text)]",
              "data-[state=active]:border-[var(--primary)] data-[state=active]:text-[var(--primary)]"
            ),
        className
      )}
      {...props}
    />
  );
}
