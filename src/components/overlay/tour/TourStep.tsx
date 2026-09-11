import { Button } from "@components/actions/button/Button";
import { HStack } from "@components/layout/HStack";
import { cn } from "@lib/cn";
import { X } from "lucide-react";
import type React from "react";
import { useTourContext } from "./context";
import type { TourPlacement, TourTarget } from "./types";
import { getArrowSide } from "./utils";

export type TourStepProps = {
  /** DOM-элемент для подсветки — `ref` или геттер-функция (полезна, когда элемент ещё не существует при монтировании `Tour`, либо резолвится динамически). Без `target`/возврат `null` — шаг без подсветки, карточка по центру экрана */
  target?: TourTarget;
  /** Расположение карточки относительно `target` (default: `'bottom'`) */
  placement?: TourPlacement;
  /** Показывать маску на этом шаге — переопределяет `Tour.mask` (default: наследуется) */
  mask?: boolean;
  /** Содержимое карточки — `TourCover`, `TourTitle`, `TourDescription` или произвольный JSX */
  children?: React.ReactNode;
  className?: string;
};

/** Один шаг тура: карточка со стрелкой к `target`, крестиком закрытия и футером навигации (индикаторы + Назад/Далее). `target`/`placement`/`mask` также читает родительский `Tour` для позиционирования — сам компонент их не использует напрямую, кроме `placement` (сторона стрелки). */
export function TourStep({ placement = "bottom", children, className }: TourStepProps) {
  const { current, total, isFirst, isLast, type, next, prev, close, finish } = useTourContext();
  const primary = type === "primary";
  const arrowSide = placement === "center" ? null : getArrowSide(placement);

  return (
    <section
      aria-label="Шаг тура"
      className={cn(
        "relative w-80 rounded-[var(--radius-lg)] border p-4 shadow-xl",
        primary
          ? "border-[var(--primary)] bg-[var(--primary)] text-white"
          : "border-[var(--border)] bg-[var(--surface)] text-[var(--text)]",
        className
      )}
    >
      {arrowSide && (
        <div
          className={cn(
            "absolute h-3 w-3 rotate-45 border",
            primary
              ? "border-[var(--primary)] bg-[var(--primary)]"
              : "border-[var(--border)] bg-[var(--surface)]",
            arrowSide === "top" && "-top-1.5 left-1/2 -translate-x-1/2 border-b-0 border-r-0",
            arrowSide === "bottom" && "-bottom-1.5 left-1/2 -translate-x-1/2 border-l-0 border-t-0",
            arrowSide === "left" && "-left-1.5 top-1/2 -translate-y-1/2 border-r-0 border-t-0",
            arrowSide === "right" && "-right-1.5 top-1/2 -translate-y-1/2 border-b-0 border-l-0"
          )}
        />
      )}

      <button
        type="button"
        onClick={close}
        aria-label="Закрыть тур"
        className={cn(
          "absolute right-3 top-3 rounded-[var(--radius-sm)] p-1 transition-colors",
          primary
            ? "text-white/80 hover:bg-white/15 hover:text-white"
            : "text-[var(--text-muted)] hover:bg-[var(--surface-2)] hover:text-[var(--text)]"
        )}
      >
        <X size={16} />
      </button>

      <div className="pr-6">{children}</div>

      <HStack justify={total > 1 ? "between" : "end"} className="mt-4">
        {total > 1 && (
          <HStack gap={1.5}>
            {Array.from({ length: total }, (_, i) => (
              <span
                key={i}
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  i === current ? "w-4" : "w-1.5",
                  primary
                    ? i === current
                      ? "bg-white"
                      : "bg-white/40"
                    : i === current
                      ? "bg-[var(--primary)]"
                      : "bg-[var(--border)]"
                )}
              />
            ))}
          </HStack>
        )}

        <HStack gap={2}>
          {!isFirst && (
            <Button
              variant={primary ? "ghost" : "outline"}
              size="sm"
              onClick={prev}
              className={primary ? "text-white hover:bg-white/15" : undefined}
            >
              Назад
            </Button>
          )}
          <Button
            variant="primary"
            size="sm"
            onClick={isLast ? finish : next}
            className={primary ? "bg-white text-[var(--primary)] hover:bg-white/90" : undefined}
          >
            {isLast ? "Готово" : "Далее"}
          </Button>
        </HStack>
      </HStack>
    </section>
  );
}
