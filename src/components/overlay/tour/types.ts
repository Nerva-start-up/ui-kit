import type { RefObject } from "react";

/** DOM-элемент для подсветки: готовый `ref` или ленивый геттер (полезен, когда элемент ещё не существует на момент монтирования `Tour`, либо резолвится динамически, например через `document.querySelector`) */
export type TourTarget = RefObject<HTMLElement | null> | (() => HTMLElement | null);

/** Сторона и выравнивание карточки шага относительно `target`. `'center'` — без target, по центру экрана */
export type TourPlacement =
  | "top"
  | "topLeft"
  | "topRight"
  | "bottom"
  | "bottomLeft"
  | "bottomRight"
  | "left"
  | "leftTop"
  | "leftBottom"
  | "right"
  | "rightTop"
  | "rightBottom"
  | "center";

export type TourRect = {
  top: number;
  left: number;
  width: number;
  height: number;
};
