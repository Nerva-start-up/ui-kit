import type { TourPlacement, TourRect, TourTarget } from "./types";

const VIEWPORT_MARGIN = 12;

/** Резолвит `target` шага независимо от того, передан `ref` или геттер-функция */
export function resolveTourTarget(target: TourTarget | undefined): HTMLElement | null {
  if (!target) return null;
  return typeof target === "function" ? target() : target.current;
}

/** Прямоугольник `target`, расширенный на `gap` — зона отверстия в маске и точка отсчёта для позиционирования карточки */
export function getHoleRect(targetRect: DOMRect, gap: number): TourRect {
  return {
    top: targetRect.top - gap,
    left: targetRect.left - gap,
    width: targetRect.width + gap * 2,
    height: targetRect.height + gap * 2,
  };
}

/** Позиция карточки шага (`position: fixed`) относительно отверстия, с учётом `placement` и зажатием в границы viewport */
export function computeTourPosition(
  hole: TourRect | null,
  panel: { width: number; height: number },
  placement: TourPlacement,
  gap: number
): { top: number; left: number } {
  if (!hole) {
    return {
      top: (window.innerHeight - panel.height) / 2,
      left: (window.innerWidth - panel.width) / 2,
    };
  }

  const holeRight = hole.left + hole.width;
  const holeBottom = hole.top + hole.height;
  const centerX = hole.left + hole.width / 2 - panel.width / 2;
  const centerY = hole.top + hole.height / 2 - panel.height / 2;

  let top: number;
  let left: number;

  switch (placement) {
    case "top":
      top = hole.top - gap - panel.height;
      left = centerX;
      break;
    case "topLeft":
      top = hole.top - gap - panel.height;
      left = hole.left;
      break;
    case "topRight":
      top = hole.top - gap - panel.height;
      left = holeRight - panel.width;
      break;
    case "bottomLeft":
      top = holeBottom + gap;
      left = hole.left;
      break;
    case "bottomRight":
      top = holeBottom + gap;
      left = holeRight - panel.width;
      break;
    case "left":
      top = centerY;
      left = hole.left - gap - panel.width;
      break;
    case "leftTop":
      top = hole.top;
      left = hole.left - gap - panel.width;
      break;
    case "leftBottom":
      top = holeBottom - panel.height;
      left = hole.left - gap - panel.width;
      break;
    case "right":
      top = centerY;
      left = holeRight + gap;
      break;
    case "rightTop":
      top = hole.top;
      left = holeRight + gap;
      break;
    case "rightBottom":
      top = holeBottom - panel.height;
      left = holeRight + gap;
      break;
    default:
      top = holeBottom + gap;
      left = centerX;
  }

  return {
    top: clamp(top, VIEWPORT_MARGIN, window.innerHeight - panel.height - VIEWPORT_MARGIN),
    left: clamp(left, VIEWPORT_MARGIN, window.innerWidth - panel.width - VIEWPORT_MARGIN),
  };
}

/** Сторона стрелки-указателя на панели, противоположная стороне появления */
export function getArrowSide(placement: TourPlacement): "top" | "bottom" | "left" | "right" {
  if (placement.startsWith("top")) return "bottom";
  if (placement.startsWith("bottom")) return "top";
  if (placement.startsWith("left")) return "right";
  if (placement.startsWith("right")) return "left";
  return "top";
}

function clamp(value: number, min: number, max: number): number {
  if (max < min) return min;
  return Math.min(Math.max(value, min), max);
}
