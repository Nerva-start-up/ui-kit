import { defaultTransition, overlayBg } from "@motion/variants";
import { motion } from "motion/react";
import type { TourRect } from "./types";

export type TourMaskProps = {
  /** Отверстие маски (уже расширенное на `gap`) — `null` рисует сплошную заливку без отверстия */
  hole: TourRect | null;
};

/** Затемнение экрана с прямоугольным вырезом вокруг подсвечиваемого элемента. Вырез собран из 4 полос вместо `clip-path`/SVG-маски — клики сквозь него проходят гарантированно, без завязки на поддержку hit-testing масок браузером. */
export function TourMask({ hole }: TourMaskProps) {
  return (
    <motion.div
      className="fixed inset-0 z-50 pointer-events-none"
      {...overlayBg}
      transition={defaultTransition}
    >
      {!hole ? (
        <div className="absolute inset-0 bg-black/55 backdrop-blur-sm pointer-events-auto" />
      ) : (
        <>
          <div
            className="absolute left-0 right-0 top-0 bg-black/55 backdrop-blur-sm pointer-events-auto"
            style={{ height: Math.max(0, hole.top) }}
          />
          <div
            className="absolute left-0 right-0 bottom-0 bg-black/55 backdrop-blur-sm pointer-events-auto"
            style={{ top: Math.max(0, hole.top + hole.height) }}
          />
          <div
            className="absolute left-0 bg-black/55 backdrop-blur-sm pointer-events-auto"
            style={{
              top: Math.max(0, hole.top),
              height: hole.height,
              width: Math.max(0, hole.left),
            }}
          />
          <div
            className="absolute right-0 bg-black/55 backdrop-blur-sm pointer-events-auto"
            style={{
              top: Math.max(0, hole.top),
              height: hole.height,
              left: hole.left + hole.width,
            }}
          />
          <div
            className="absolute rounded-[var(--radius-sm)] ring-2 ring-[var(--primary)]"
            style={{ top: hole.top, left: hole.left, width: hole.width, height: hole.height }}
          />
        </>
      )}
    </motion.div>
  );
}
