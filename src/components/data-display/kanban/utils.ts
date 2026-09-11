export type KanbanCardRect = { id: string; top: number; height: number };

/** Индекс вставки среди `cards` (отсортированных как в DOM) для позиции указателя `pointerY` — вставляет перед первой карточкой, чья вертикальная середина ниже указателя */
export function computeDropIndexFromRects(cards: KanbanCardRect[], pointerY: number): number {
  for (let i = 0; i < cards.length; i++) {
    const midpoint = cards[i].top + cards[i].height / 2;
    if (pointerY < midpoint) return i;
  }
  return cards.length;
}
