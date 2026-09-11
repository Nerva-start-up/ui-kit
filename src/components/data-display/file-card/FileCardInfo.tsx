import type { ReactNode } from "react";
import { cn } from "../../../lib/cn";

export type FileCardInfoProps = {
  className?: string;
  children: ReactNode;
};

/** Flex-колонка для Name + Meta */
export function FileCardInfo({ className, children }: FileCardInfoProps) {
  return <div className={cn("flex-1 min-w-0 flex flex-col gap-0.5", className)}>{children}</div>;
}
