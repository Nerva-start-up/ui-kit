import type { RefObject } from "react";
import { useEffect, useState } from "react";

/** Доля прокрученного содержимого `viewportRef` (0..1) — пересчитывается на скролл и на изменение размера контента */
export function useReadingProgress(viewportRef: RefObject<HTMLDivElement | null>): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    function update() {
      if (!el) return;
      const max = el.scrollHeight - el.clientHeight;
      setProgress(max <= 0 ? 0 : Math.min(1, el.scrollTop / max));
    }

    update();
    el.addEventListener("scroll", update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => {
      el.removeEventListener("scroll", update);
      observer.disconnect();
    };
  }, [viewportRef]);

  return progress;
}
