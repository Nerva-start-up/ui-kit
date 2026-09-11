import { cn } from "../../../lib/cn";

export type DrawerHandleProps = { className?: string };

/** Drag-handle (полоска) — рекомендуется для панели с `side="bottom"` */
export function DrawerHandle({ className }: DrawerHandleProps) {
  return (
    <div className={cn("flex justify-center pt-3 pb-1 flex-shrink-0", className)}>
      <div className="w-10 h-1 rounded-full bg-[var(--border)]" />
    </div>
  );
}
