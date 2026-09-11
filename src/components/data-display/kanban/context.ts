import { createContext, useContext } from "react";

export type KanbanDragState = { cardId: string; fromColumnId: string } | null;

export type KanbanContextValue = {
  dragState: KanbanDragState;
  startDrag: (cardId: string, fromColumnId: string) => void;
  updateDragPointer: (x: number, y: number) => void;
  endDrag: () => void;
};

export const KanbanContext = createContext<KanbanContextValue | null>(null);

export function useKanbanContext(): KanbanContextValue {
  const ctx = useContext(KanbanContext);
  if (!ctx) throw new Error("KanbanColumn и KanbanCard должны быть внутри <Kanban>");
  return ctx;
}

/** Id колонки, в которой отрендерена карточка — предоставляется `KanbanColumn` */
export const KanbanColumnIdContext = createContext<string | null>(null);

export function useKanbanColumnId(): string {
  const id = useContext(KanbanColumnIdContext);
  if (!id) throw new Error("KanbanCard должен быть внутри <KanbanColumn>");
  return id;
}
