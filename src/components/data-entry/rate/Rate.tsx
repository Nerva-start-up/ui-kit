import { Star } from "lucide-react";
import type React from "react";
import { cn } from "../../../lib/cn";
import { useRate } from "./useRate";
import { getStarFill, getValueFromPointer } from "./utils";

const sizeClasses = { sm: 16, md: 20, lg: 26 } as const;

export type RateProps = {
  /** Controlled значение (0..count, шаг 0.5 при allowHalf) */
  value?: number;
  /** Uncontrolled начальное значение */
  defaultValue?: number;
  /** Callback изменения */
  onChange?: (value: number) => void;
  /** Количество звёзд */
  count?: number;
  /** Разрешить выбор половины звезды */
  allowHalf?: boolean;
  /** Повторный клик по текущему значению сбрасывает рейтинг в 0 */
  allowClear?: boolean;
  /** Только просмотр — без интерактивности и hover-превью, но не тускнеет как disabled */
  readOnly?: boolean;
  /** Блокирует взаимодействие и тускнеет */
  disabled?: boolean;
  /** Иконка звезды (по умолчанию — lucide `Star`) */
  icon?: React.ElementType;
  /** Размер иконок */
  size?: keyof typeof sizeClasses;
  /** Подпись слева над рейтингом */
  label?: string;
  /** Подсказка под рейтингом (скрывается при error) */
  hint?: string;
  /** Текст ошибки */
  error?: string;
  /** Для интеграции с FormControl */
  "aria-invalid"?: boolean | "true" | "false";
  "aria-describedby"?: string;
  className?: string;
};

/** Рейтинг звёздами. Controlled/uncontrolled, поддерживает половину звезды и управление стрелками. */
export function Rate({
  value,
  defaultValue = 0,
  onChange,
  count = 5,
  allowHalf = false,
  allowClear = true,
  readOnly = false,
  disabled = false,
  icon: Icon = Star,
  size = "md",
  label,
  hint,
  error,
  "aria-invalid": ariaInvalid,
  "aria-describedby": ariaDescribedBy,
  className,
}: RateProps) {
  const { displayValue, setHover, select } = useRate({
    value,
    defaultValue,
    onChange,
    count,
    allowClear,
    disabled,
    readOnly,
  });

  const iconSize = sizeClasses[size];
  const isInteractive = !disabled && !readOnly;
  const step = allowHalf ? 0.5 : 1;

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!isInteractive) return;
    if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      e.preventDefault();
      select(displayValue + step);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      e.preventDefault();
      select(displayValue - step);
    }
  }

  return (
    <div className={cn("flex flex-col gap-[6px]", className)}>
      {label && (
        <span className="text-[13px] font-medium text-[var(--text-sub)] select-none">{label}</span>
      )}

      <div
        role="slider"
        aria-label={label ?? "Рейтинг"}
        aria-valuemin={0}
        aria-valuemax={count}
        aria-valuenow={displayValue}
        aria-valuetext={`${displayValue} из ${count}`}
        aria-disabled={disabled || undefined}
        aria-invalid={ariaInvalid}
        aria-describedby={ariaDescribedBy}
        tabIndex={isInteractive ? 0 : undefined}
        onKeyDown={handleKeyDown}
        onMouseLeave={() => setHover(null)}
        className={cn(
          "inline-flex items-center gap-1 w-fit rounded-[var(--radius-sm)] outline-none",
          isInteractive && "cursor-pointer",
          disabled && "cursor-not-allowed opacity-50",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]"
        )}
      >
        {Array.from({ length: count }, (_, i) => {
          const fill = getStarFill(i, displayValue, allowHalf);
          return (
            <button
              key={i}
              type="button"
              tabIndex={-1}
              aria-hidden
              disabled={disabled}
              className="relative inline-block shrink-0"
              style={{ width: iconSize, height: iconSize }}
              onMouseMove={(e) => {
                if (!isInteractive) return;
                const rect = e.currentTarget.getBoundingClientRect();
                setHover(getValueFromPointer(i, e.clientX - rect.left, rect.width, allowHalf));
              }}
              onClick={(e) => {
                if (!isInteractive) return;
                const rect = e.currentTarget.getBoundingClientRect();
                select(getValueFromPointer(i, e.clientX - rect.left, rect.width, allowHalf));
              }}
            >
              <Icon size={iconSize} className="absolute inset-0 text-[var(--border)]" />
              {fill > 0 && (
                <span
                  className="absolute inset-y-0 left-0 overflow-hidden"
                  style={{ width: fill === 1 ? "100%" : "50%" }}
                >
                  <Icon size={iconSize} fill="currentColor" className="text-[var(--primary)]" />
                </span>
              )}
            </button>
          );
        })}
      </div>

      {error && <p className="text-[12px] text-[var(--error)] leading-snug">{error}</p>}
      {!error && hint && (
        <p className="text-[12px] text-[var(--text-muted)] leading-snug">{hint}</p>
      )}
    </div>
  );
}
