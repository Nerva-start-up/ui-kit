import { Card } from "@components/data-display/card/Card";
import { cn } from "@lib/cn";
import { defaultTransition } from "@motion/variants";
import { motion } from "motion/react";
import type React from "react";
import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useKanbanColumnId, useKanbanContext } from "./context";

export type KanbanCardProps = {
  /** Уникальный id карточки — используется в `KanbanMoveEvent` */
  id: string;
  /** Запрещает перетаскивание конкретной карточки (default: `false`) */
  disabled?: boolean;
  /** Содержимое карточки — произвольный JSX (`Text`, `Badge`, `Avatar` и т.п.) */
  children?: React.ReactNode;
  className?: string;
};

type GhostPosition = { x: number; y: number; width: number };

/** Минимальное перемещение указателя (px), после которого нажатие считается перетаскиванием, а не кликом */
const DRAG_THRESHOLD = 4;

/**
 * Перетаскиваемая карточка `Kanban` — тонкая draggable-обёртка над `Card`. Должна быть внутри `KanbanColumn`.
 *
 * Жест реализован на голых Pointer Events, а не на `drag`-фиче `framer-motion`: та физически
 * завязана на общий layout-проекционный движок (это прямо написано в её типах — "dragging uses
 * the layout project engine"), и любая попытка совместить её с видимостью/ограничением
 * перемещения оригинала (нужными, чтобы не обрезаться `overflow: hidden` в `ScrollArea`
 * колонки) раз за разом ломала то сам жест, то саму видимость по непредсказуемым причинам.
 * Здесь оригинал во время драга просто становится невидимым (`opacity: 0`, геометрия и позиция
 * не меняются вообще — драга на нём физически нет), а видимая копия, которая реально следует за
 * курсором, рендерится через портал в `document.body` — не зависит от родительских
 * `overflow: hidden`.
 * `layout` остаётся — он отвечает только за плавный доезд карточки на новое место после дропа
 * и никак не связан с самим жестом перетаскивания.
 *
 * `opacity` в `style` задаётся явным числом всегда (а не пропадает из объекта style при
 * `isDragging === false`) — у `motion.div` свой рендер-пайплайн поверх style-пропа, и он не
 * обязательно сбрасывает раньше применённое инлайн-значение, если ключ на следующем рендере
 * просто отсутствует в объекте, а не выставлен явно (воспроизведено автотестом в headless
 * Chromium: карточка навсегда застревала с `opacity: 0` после драга).
 */
export function KanbanCard({ id, disabled = false, children, className }: KanbanCardProps) {
  const columnId = useKanbanColumnId();
  const { dragState, startDrag, updateDragPointer, endDrag } = useKanbanContext();
  const isDragging = dragState?.cardId === id;

  const nodeRef = useRef<HTMLDivElement>(null);
  const pointerIdRef = useRef<number | null>(null);
  const startPointRef = useRef({ x: 0, y: 0 });
  const pointerOffsetRef = useRef({ x: 0, y: 0 });
  const draggingRef = useRef(false);
  const [ghost, setGhost] = useState<GhostPosition | null>(null);

  function handlePointerDown(event: React.PointerEvent<HTMLDivElement>) {
    if (disabled || event.button !== 0) return;
    pointerIdRef.current = event.pointerId;
    startPointRef.current = { x: event.clientX, y: event.clientY };
    draggingRef.current = false;
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (pointerIdRef.current !== event.pointerId) return;

    if (!draggingRef.current) {
      const dx = event.clientX - startPointRef.current.x;
      const dy = event.clientY - startPointRef.current.y;
      if (Math.hypot(dx, dy) < DRAG_THRESHOLD) return;

      draggingRef.current = true;
      const rect = nodeRef.current?.getBoundingClientRect();
      if (rect) {
        pointerOffsetRef.current = { x: event.clientX - rect.left, y: event.clientY - rect.top };
        setGhost({ x: rect.left, y: rect.top, width: rect.width });
      }
      startDrag(id, columnId);
    }

    updateDragPointer(event.clientX, event.clientY);
    setGhost((prev) =>
      prev
        ? {
            ...prev,
            x: event.clientX - pointerOffsetRef.current.x,
            y: event.clientY - pointerOffsetRef.current.y,
          }
        : prev
    );
  }

  function handlePointerUp(event: React.PointerEvent<HTMLDivElement>) {
    if (pointerIdRef.current !== event.pointerId) return;
    event.currentTarget.releasePointerCapture(event.pointerId);
    pointerIdRef.current = null;

    if (draggingRef.current) {
      draggingRef.current = false;
      endDrag();
      setGhost(null);
    }
  }

  return (
    <>
      <motion.div
        ref={nodeRef}
        layout
        transition={defaultTransition}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        data-kanban-card=""
        data-card-id={id}
        style={{ opacity: isDragging ? 0 : 1 }}
        className={cn(!disabled && (isDragging ? "cursor-grabbing" : "cursor-grab"))}
      >
        <Card padding="sm" className={cn("shadow-sm", className)}>
          {children}
        </Card>
      </motion.div>

      {ghost &&
        createPortal(
          <div
            style={{
              position: "fixed",
              top: ghost.y,
              left: ghost.x,
              width: ghost.width,
              zIndex: 9999,
              pointerEvents: "none",
            }}
          >
            <Card padding="sm" className={cn("scale-[1.03] shadow-xl", className)}>
              {children}
            </Card>
          </div>,
          document.body
        )}
    </>
  );
}
