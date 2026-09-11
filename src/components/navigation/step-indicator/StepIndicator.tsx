import React, { type ReactNode } from "react";
import { cn } from "../../../lib/cn";
import { Step } from "./Step";
import { StepConnector } from "./StepConnector";
import { StepIndicatorContext, type StepOrientation, type StepSize } from "./context";

export type StepIndicatorProps = {
  /** Текущий шаг (0-based, обязателен) */
  current: number;
  /** Ориентация */
  orientation?: StepOrientation;
  /** Размер иконок */
  size?: StepSize;
  className?: string;
  children: ReactNode;
};

/** Корень. Хранит `current`, `orientation`, `size` в контексте. */
export function StepIndicator({
  current,
  orientation = "horizontal",
  size = "md",
  className,
  children,
}: StepIndicatorProps) {
  // Собираем только Step-дети и инжектируем _stepIndex + коннекторы
  const steps = React.Children.toArray(children).filter(
    (child) => React.isValidElement(child) && child.type === Step
  ) as React.ReactElement[];

  const rendered = steps
    .flatMap((step, i) => [
      React.cloneElement(step, { key: `step-${i}`, _stepIndex: i } as Record<string, unknown>),
      i < steps.length - 1 ? <StepConnector key={`conn-${i}`} _connectorIndex={i} /> : null,
    ])
    .filter(Boolean);

  return (
    <StepIndicatorContext.Provider value={{ current, total: steps.length, orientation, size }}>
      {/* biome-ignore lint/a11y/useSemanticElements: compound widget with injected cloneElement children */}
      <div
        role="list"
        aria-label="Шаги"
        className={cn(
          orientation === "horizontal" ? "flex items-start" : "flex flex-col",
          className
        )}
      >
        {rendered}
      </div>
    </StepIndicatorContext.Provider>
  );
}
