/** Событие переноса карточки — вызывается по завершении перетаскивания */
export type KanbanMoveEvent = {
  cardId: string;
  fromColumnId: string;
  toColumnId: string;
  /** Индекс среди карточек колонки-назначения (без учёта самой перетаскиваемой карточки) */
  toIndex: number;
};
