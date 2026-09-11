import { X } from "lucide-react";
import type React from "react";
import { cn } from "../../../lib/cn";

export type ChipProps = {
  label: string;
  /** Оранжевый акцент */
  selected?: boolean;
  /** Делает chip кнопкой */
  onClick?: () => void;
  /** Добавляет × кнопку */
  onRemove?: () => void;
  disabled?: boolean;
  /** Иконка слева от текста */
  icon?: React.ReactNode;
  className?: string;
};

/** Кликабельный pill-тег для фильтров, suggestion-подсказок, выбранных значений */
export function Chip({ label, selected, onClick, onRemove, disabled, icon, className }: ChipProps) {
  const baseCls = cn(
    "inline-flex items-center rounded-full border text-[13px] font-medium",
    "transition-colors duration-150",
    selected
      ? "bg-[var(--primary-dim)] border-[var(--primary)] text-[var(--primary)]"
      : "bg-[var(--surface-2)] border-[var(--border)] text-[var(--text-sub)]",
    disabled && "opacity-40 cursor-not-allowed pointer-events-none",
    className
  );

  const inner = (
    <>
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{label}</span>
    </>
  );

  // Chip with remove button — outer span wraps two buttons
  if (onRemove) {
    return (
      <span className={baseCls}>
        {onClick ? (
          <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            className="pl-3 py-[7px] flex items-center gap-1.5 outline-none focus-visible:underline"
          >
            {inner}
          </button>
        ) : (
          <span className="pl-3 py-[7px] flex items-center gap-1.5">{inner}</span>
        )}
        <button
          type="button"
          onClick={onRemove}
          disabled={disabled}
          aria-label="Удалить"
          className="pr-2.5 py-[7px] shrink-0 flex items-center hover:text-[var(--text)] transition-colors outline-none"
        >
          <X size={11} />
        </button>
      </span>
    );
  }

  // Clickable chip
  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        className={cn(
          baseCls,
          "px-3 py-[7px] gap-1.5 cursor-pointer",
          !selected && !disabled && "hover:border-[var(--text-muted)]",
          "outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
        )}
      >
        {inner}
      </button>
    );
  }

  // Static chip
  return <span className={cn(baseCls, "px-3 py-[7px] gap-1.5")}>{inner}</span>;
}
