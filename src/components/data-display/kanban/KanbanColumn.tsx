import { Stack } from "@components/layout/Stack";
import { ScrollArea } from "@components/layout/scroll-area/ScrollArea";
import { cn } from "@lib/cn";
import { defaultTransition } from "@motion/variants";
import { motion } from "motion/react";
import type React from "react";
import { KanbanColumnIdContext } from "./context";

export type KanbanColumnProps = {
  /** Уникальный id колонки — используется в `KanbanMoveEvent` */
  id: string;
  /** Заголовок колонки (текст, счётчик и т.п.) */
  title?: React.ReactNode;
  /** Карточки — `KanbanCard` */
  children?: React.ReactNode;
  className?: string;
};

/** Колонка доски `Kanban` — заголовок + скроллируемый список карточек. Должна быть внутри `Kanban`. `layout` плавно анимирует изменение высоты колонки по мере добавления/удаления карточек (до потолка `maxHeight` у `ScrollArea`, дальше — внутренний скролл). */
export function KanbanColumn({ id, title, children, className }: KanbanColumnProps) {
  return (
    <motion.div
      layout
      transition={defaultTransition}
      data-kanban-column=""
      data-column-id={id}
      className={cn(
        "flex w-72 shrink-0 flex-col rounded-[var(--radius-lg)] bg-[var(--surface-2)] p-3",
        className
      )}
    >
      {title && <div className="mb-3 px-1 text-sm font-semibold text-[var(--text)]">{title}</div>}
      <ScrollArea maxHeight="70vh">
        <KanbanColumnIdContext.Provider value={id}>
          <Stack gap={2}>{children}</Stack>
        </KanbanColumnIdContext.Provider>
      </ScrollArea>
    </motion.div>
  );
}
