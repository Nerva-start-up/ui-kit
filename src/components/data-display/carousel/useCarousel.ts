import { useCallback, useEffect, useRef, useState } from "react";

export type UseCarouselOptions = {
  slideCount: number;
  activeIndex?: number;
  defaultActiveIndex?: number;
  onChange?: (index: number) => void;
  loop: boolean;
  autoplay: boolean;
  autoplayInterval: number;
  paused: boolean;
};

/** Controlled/uncontrolled активный индекс + scroll-snap навигация + автопрокрутка. */
export function useCarousel({
  slideCount,
  activeIndex,
  defaultActiveIndex = 0,
  onChange,
  loop,
  autoplay,
  autoplayInterval,
  paused,
}: UseCarouselOptions) {
  const trackRef = useRef<HTMLDivElement>(null);
  const currentRef = useRef(defaultActiveIndex);
  const [internalIndex, setInternalIndex] = useState(defaultActiveIndex);
  const isControlled = activeIndex !== undefined;
  const current = isControlled ? activeIndex : internalIndex;

  useEffect(() => {
    currentRef.current = current;
  }, [current]);

  const goTo = useCallback(
    (index: number) => {
      if (slideCount === 0) return;
      const clamped = loop
        ? ((index % slideCount) + slideCount) % slideCount
        : Math.max(0, Math.min(slideCount - 1, index));
      if (!isControlled) setInternalIndex(clamped);
      onChange?.(clamped);
      const slide = trackRef.current?.children[clamped] as HTMLElement | undefined;
      slide?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
    },
    [isControlled, loop, slideCount, onChange]
  );

  const next = useCallback(() => goTo(currentRef.current + 1), [goTo]);
  const prev = useCallback(() => goTo(currentRef.current - 1), [goTo]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let raf = 0;
    function handleScroll() {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (!track || track.clientWidth === 0) return;
        const index = Math.round(track.scrollLeft / track.clientWidth);
        const clamped = Math.max(0, Math.min(slideCount - 1, index));
        if (clamped !== currentRef.current) {
          if (!isControlled) setInternalIndex(clamped);
          onChange?.(clamped);
        }
      });
    }

    track.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(raf);
    };
  }, [slideCount, isControlled, onChange]);

  useEffect(() => {
    if (!autoplay || paused || slideCount <= 1) return;
    const timer = setInterval(next, autoplayInterval);
    return () => clearInterval(timer);
  }, [autoplay, paused, autoplayInterval, next, slideCount]);

  return { trackRef, current, goTo, next, prev };
}
