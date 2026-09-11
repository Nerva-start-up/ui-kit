import type React from "react";
import { cn } from "../../../lib/cn";
import { useDescriptionsContext } from "./context";

const spanClasses = {
  1: "",
  2: "sm:col-span-2",
  3: "sm:col-span-3",
  4: "sm:col-span-2 lg:col-span-4",
};

export type DescriptionsItemProps = {
  /** Подпись поля */
  label: string;
  /** Сколько колонок сетки `Descriptions` занимает пункт */
  span?: keyof typeof spanClasses;
  className?: string;
  /** Значение поля */
  children: React.ReactNode;
};

/** Один пункт списка — подпись + значение. Наследует `layout`/`bordered`/`size` от `Descriptions`. */
export function DescriptionsItem({ label, span = 1, className, children }: DescriptionsItemProps) {
  const { layout, bordered, size } = useDescriptionsContext();
  const isSm = size === "sm";

  return (
    <div
      className={cn(
        spanClasses[span],
        bordered && ["bg-[var(--surface)]", isSm ? "p-2.5" : "p-3.5"],
        layout === "horizontal" ? "flex items-baseline gap-2" : "flex flex-col gap-1",
        className
      )}
    >
      <span
        className={cn(
          "shrink-0 font-medium text-[var(--text-muted)]",
          isSm ? "text-[12px]" : "text-[13px]",
          layout === "horizontal" && "min-w-[120px]"
        )}
      >
        {label}
      </span>
      <span className={cn("text-[var(--text)]", isSm ? "text-[13px]" : "text-[14px]")}>
        {children}
      </span>
    </div>
  );
}
