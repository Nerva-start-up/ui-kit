import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { cn } from "../../../lib/cn";

export type SeparatorProps = {
  orientation?: "horizontal" | "vertical";
  className?: string;
};

/** Горизонтальный или вертикальный разделитель. */
export function Separator({ orientation = "horizontal", className }: SeparatorProps) {
  return (
    <SeparatorPrimitive.Root
      orientation={orientation}
      className={cn(
        "bg-[var(--border)] shrink-0",
        orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
        className
      )}
    />
  );
}
