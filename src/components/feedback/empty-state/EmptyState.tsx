import type React from "react";
import { cn } from "../../../lib/cn";

export type EmptyStateProps = {
  title: string;
  /** Дополнительный текст */
  description?: string;
  /** Lucide-иконка (оранжевый фон) */
  icon?: React.ElementType;
  /** Кнопка или ссылка */
  action?: React.ReactNode;
  className?: string;
};

/** Заглушка для пустых списков / страниц без данных. */
export function EmptyState({ title, description, icon: Icon, action, className }: EmptyStateProps) {
  return (
    <div
      className={cn("flex flex-col items-center justify-center py-16 px-4 text-center", className)}
    >
      {Icon && (
        <div
          className="flex items-center justify-center w-16 h-16 rounded-[var(--radius-lg)] mb-5"
          style={{ background: "rgba(249,115,22,.08)" }}
        >
          <Icon size={28} style={{ color: "var(--primary)", opacity: 0.7 }} />
        </div>
      )}
      <h3 className="text-base font-semibold mb-1" style={{ color: "var(--text)" }}>
        {title}
      </h3>
      {description && (
        <p className="text-sm max-w-xs mb-5" style={{ color: "var(--text-muted)" }}>
          {description}
        </p>
      )}
      {action}
    </div>
  );
}
