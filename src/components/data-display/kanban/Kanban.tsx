import { cn } from "@lib/cn";
import type React from "react";
import { KanbanContext } from "./context";
import type { KanbanMoveEvent } from "./types";
import { useKanbanDrag } from "./useKanbanDrag";

export type KanbanProps = {
  /** Вызывается по завершении перетаскивания карточки — обновите свои данные и переrender детей в новом порядке/колонке */
  onCardMove: (event: KanbanMoveEvent) => void;
  /** Колонки — `KanbanColumn` */
  children?: React.ReactNode;
  className?: string;
};

/** Доска с перетаскиваемыми карточками (Jira-подобный канбан). Composable API: сам не хранит данные — только отслеживает жест перетаскивания и репортит `onCardMove`, порядок/колонки задаются структурой `children` на стороне потребителя. */
export function Kanban({ onCardMove, children, className }: KanbanProps) {
  const { dragState, startDrag, updateDragPointer, endDrag } = useKanbanDrag({ onCardMove });

  return (
    <KanbanContext.Provider value={{ dragState, startDrag, updateDragPointer, endDrag }}>
      <div className={cn("flex gap-4 overflow-x-auto pb-2", className)}>{children}</div>
    </KanbanContext.Provider>
  );
}
