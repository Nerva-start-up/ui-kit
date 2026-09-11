import type { ReactNode } from "react";
import { cn } from "../../../lib/cn";
import { StepContext, type StepStatus, useStepIndicatorContext } from "./context";

export type StepProps = {
  /** Переопределить статус (например `'error'` если шаг провален) */
  status?: Extract<StepStatus, "error">;
  className?: string;
  /** Клик по шагу (навигация) */
  onClick?: () => void;
  children: ReactNode;
  /** @internal — инжектируется StepIndicator */
  _stepIndex?: number;
};

/** Один шаг. Вычисляет статус из `current` и позиции. */
export function Step({
  status: statusOverride,
  className,
  onClick,
  children,
  _stepIndex = 0,
}: StepProps) {
  const { current, orientation } = useStepIndicatorContext();

  const status: StepStatus =
    statusOverride ??
    (_stepIndex < current ? "completed" : _stepIndex === current ? "active" : "upcoming");

  return (
    <StepContext.Provider value={{ index: _stepIndex, status }}>
      {/* biome-ignore lint/a11y/useSemanticElements: listitem in a compound ARIA list widget */}
      <div
        role="listitem"
        aria-current={status === "active" ? "step" : undefined}
        onClick={onClick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") onClick?.();
        }}
        className={cn(
          orientation === "horizontal"
            ? "flex flex-col items-center text-center gap-2 min-w-0"
            : "flex flex-row items-start gap-3",
          className
        )}
      >
        {children}
      </div>
    </StepContext.Provider>
  );
}
