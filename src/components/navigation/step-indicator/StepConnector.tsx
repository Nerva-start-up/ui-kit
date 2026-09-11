import { cn } from "../../../lib/cn";
import { useStepIndicatorContext } from "./context";

export type StepConnectorProps = {
  className?: string;
  /** @internal — инжектируется StepIndicator */
  _connectorIndex?: number;
};

/** Линия между шагами. Инжектируется автоматически, не нужна явно. */
export function StepConnector({ className, _connectorIndex = 0 }: StepConnectorProps) {
  const { current, orientation, size } = useStepIndicatorContext();
  const completed = current > _connectorIndex;

  // Горизонтальный: flex-1 тянется между шагами; отступ mt выравнивает по центру иконки
  const iconHalf = size === "sm" ? "mt-3" : size === "md" ? "mt-4" : "mt-5";

  if (orientation === "horizontal") {
    return (
      <div
        className={cn(
          "flex-1 h-px mx-2 transition-colors duration-300",
          iconHalf,
          completed ? "bg-[var(--primary)]" : "bg-[var(--border)]",
          className
        )}
      />
    );
  }

  // Вертикальный: отступ слева = половина иконки - 1px (граница)
  const ml = size === "sm" ? "ml-[11px]" : size === "md" ? "ml-[15px]" : "ml-[19px]";

  return (
    <div
      className={cn(
        "w-px min-h-[1.5rem] my-1 transition-colors duration-300",
        ml,
        completed ? "bg-[var(--primary)]" : "bg-[var(--border)]",
        className
      )}
    />
  );
}
