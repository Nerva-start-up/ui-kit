import type { RefObject } from "react";
import { useLayoutEffect, useState } from "react";
import { clampDocxScale } from "./utils";

export type UseDocxZoomOptions = {
  containerRef: RefObject<HTMLDivElement | null>;
  scale?: number;
  defaultScale?: number;
  onScaleChange?: (scale: number) => void;
};

export type DocxNaturalSize = { width: number; height: number };

/** Controlled/uncontrolled масштаб + натуральный (нетрансформированный) размер контента — `scrollWidth`/`scrollHeight` не зависят от `transform`, поэтому именно по ним считается размер скролл-области под зум */
export function useDocxZoom({
  containerRef,
  scale,
  defaultScale = 1,
  onScaleChange,
}: UseDocxZoomOptions) {
  const [internalScale, setInternalScale] = useState(defaultScale);
  const isControlled = scale !== undefined;
  const currentScale = isControlled ? scale : internalScale;

  function setScale(next: number) {
    const clamped = clampDocxScale(next);
    if (!isControlled) setInternalScale(clamped);
    onScaleChange?.(clamped);
  }

  const [naturalSize, setNaturalSize] = useState<DocxNaturalSize | null>(null);

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const update = () => setNaturalSize({ width: el.scrollWidth, height: el.scrollHeight });
    update();

    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, [containerRef]);

  return { scale: currentScale, setScale, naturalSize };
}
