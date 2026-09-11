import { useRef, useState } from "react";
import type { KanbanDragState } from "./context";
import type { KanbanMoveEvent } from "./types";
import { computeDropIndexFromRects } from "./utils";

export type UseKanbanDragOptions = {
  onCardMove: (event: KanbanMoveEvent) => void;
};

type HoverTarget = { columnId: string; index: number };

function findCardIndex(columnEl: HTMLElement, cardId: string): number {
  return Array.from(columnEl.querySelectorAll<HTMLElement>("[data-kanban-card]")).findIndex(
    (el) => el.dataset.cardId === cardId
  );
}

/** Отслеживание активного перетаскивания карточки между колонками: хит-тест по `document.elementFromPoint` — без ручного кэширования rect'ов, корректно работает даже если колонка скроллится во время перетаскивания */
export function useKanbanDrag({ onCardMove }: UseKanbanDragOptions) {
  const [dragState, setDragState] = useState<KanbanDragState>(null);
  const hoverRef = useRef<HoverTarget | null>(null);

  function startDrag(cardId: string, fromColumnId: string) {
    setDragState({ cardId, fromColumnId });

    const cardEl = document.querySelector<HTMLElement>(
      `[data-kanban-card][data-card-id="${CSS.escape(cardId)}"]`
    );
    const columnEl = cardEl?.closest<HTMLElement>("[data-kanban-column]");
    const index = columnEl ? Math.max(findCardIndex(columnEl, cardId), 0) : 0;
    hoverRef.current = { columnId: fromColumnId, index };
  }

  function updateDragPointer(x: number, y: number) {
    if (!dragState) return;

    const hoveredEl = document.elementFromPoint(x, y);
    const columnEl = (hoveredEl as HTMLElement | null)?.closest<HTMLElement>(
      "[data-kanban-column]"
    );
    const columnId = columnEl?.dataset.columnId;
    if (!columnEl || !columnId) return;

    const rects = Array.from(columnEl.querySelectorAll<HTMLElement>("[data-kanban-card]"))
      .filter((el) => el.dataset.cardId !== dragState.cardId)
      .map((el) => {
        const rect = el.getBoundingClientRect();
        return { id: el.dataset.cardId ?? "", top: rect.top, height: rect.height };
      });

    hoverRef.current = { columnId, index: computeDropIndexFromRects(rects, y) };
  }

  function endDrag() {
    const hover = hoverRef.current;
    if (dragState && hover) {
      onCardMove({
        cardId: dragState.cardId,
        fromColumnId: dragState.fromColumnId,
        toColumnId: hover.columnId,
        toIndex: hover.index,
      });
    }
    setDragState(null);
    hoverRef.current = null;
  }

  return { dragState, startDrag, updateDragPointer, endDrag };
}
