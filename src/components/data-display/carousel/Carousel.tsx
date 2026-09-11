import { ChevronLeft, ChevronRight } from "lucide-react";
import { Children, useState } from "react";
import type React from "react";
import { cn } from "../../../lib/cn";
import { useCarousel } from "./useCarousel";

export type CarouselProps = {
  /** Слайды — прямые потомки, каждый обёрнутый в `CarouselItem` */
  children: React.ReactNode;
  /** Controlled активный индекс */
  activeIndex?: number;
  /** Uncontrolled начальный индекс */
  defaultActiveIndex?: number;
  /** Callback смены активного слайда (свайп, стрелки, точки, автопрокрутка) */
  onChange?: (index: number) => void;
  /** Автопрокрутка */
  autoplay?: boolean;
  /** Интервал автопрокрутки, мс */
  autoplayInterval?: number;
  /** Ставить автопрокрутку на паузу при наведении курсора */
  pauseOnHover?: boolean;
  /** Зацикливать — после последнего слайда снова первый */
  loop?: boolean;
  /** Показывать стрелки навигации */
  showArrows?: boolean;
  /** Показывать точки-индикаторы */
  showDots?: boolean;
  className?: string;
};

/** Карусель на CSS scroll-snap — свайп, стрелки, точки и автопрокрутка без внешних зависимостей. Слайды — `CarouselItem`. */
export function Carousel({
  children,
  activeIndex,
  defaultActiveIndex = 0,
  onChange,
  autoplay = false,
  autoplayInterval = 4000,
  pauseOnHover = true,
  loop = true,
  showArrows = true,
  showDots = true,
  className,
}: CarouselProps) {
  const slides = Children.toArray(children);
  const [paused, setPaused] = useState(false);

  const { trackRef, current, goTo, next, prev } = useCarousel({
    slideCount: slides.length,
    activeIndex,
    defaultActiveIndex,
    onChange,
    loop,
    autoplay,
    autoplayInterval,
    paused,
  });

  const canPrev = loop || current > 0;
  const canNext = loop || current < slides.length - 1;

  return (
    <div
      className={cn("relative", className)}
      onMouseEnter={() => pauseOnHover && setPaused(true)}
      onMouseLeave={() => pauseOnHover && setPaused(false)}
    >
      <div
        ref={trackRef}
        className={cn(
          "flex snap-x snap-mandatory overflow-x-auto scroll-smooth",
          "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        )}
      >
        {children}
      </div>

      {showArrows && slides.length > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            disabled={!canPrev}
            aria-label="Предыдущий слайд"
            className={cn(
              "absolute left-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center",
              "rounded-full border border-[var(--border)] bg-[var(--surface)]/90 text-[var(--text)]",
              "shadow-md transition-colors hover:bg-[var(--surface-2)]",
              "disabled:pointer-events-none disabled:opacity-30"
            )}
          >
            <ChevronLeft size={16} />
          </button>
          <button
            type="button"
            onClick={next}
            disabled={!canNext}
            aria-label="Следующий слайд"
            className={cn(
              "absolute right-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center",
              "rounded-full border border-[var(--border)] bg-[var(--surface)]/90 text-[var(--text)]",
              "shadow-md transition-colors hover:bg-[var(--surface-2)]",
              "disabled:pointer-events-none disabled:opacity-30"
            )}
          >
            <ChevronRight size={16} />
          </button>
        </>
      )}

      {showDots && slides.length > 1 && (
        <div
          className={cn(
            "absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5",
            "rounded-full bg-black/30 px-2.5 py-1.5 backdrop-blur-sm"
          )}
        >
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Слайд ${i + 1}`}
              aria-current={i === current}
              className={cn(
                "h-1.5 rounded-full transition-all",
                i === current ? "w-5 bg-white" : "w-1.5 bg-white/50 hover:bg-white/80"
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
