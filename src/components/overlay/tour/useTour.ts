import { useEffect, useState } from "react";
import type { ReactElement } from "react";
import type { TourStepProps } from "./TourStep";
import type { TourRect } from "./types";
import { getHoleRect, resolveTourTarget } from "./utils";

const DEFAULT_SCROLL_OPTIONS: ScrollIntoViewOptions = { block: "center", behavior: "smooth" };

export type UseTourOptions = {
  open: boolean;
  /** Дочерние `<TourStep>` по порядку */
  steps: ReactElement<TourStepProps>[];
  gap: number;
  current?: number;
  defaultCurrent?: number;
  onChange?: (current: number) => void;
  scrollIntoViewOptions?: boolean | ScrollIntoViewOptions;
};

/** Controlled/uncontrolled индекс активного шага + отслеживание прямоугольника его `target` (скролл, ресайз, resize самого элемента) */
export function useTour({
  open,
  steps,
  gap,
  current,
  defaultCurrent = 0,
  onChange,
  scrollIntoViewOptions = DEFAULT_SCROLL_OPTIONS,
}: UseTourOptions) {
  const total = steps.length;
  const [internalStep, setInternalStep] = useState(defaultCurrent);
  const rawStep = current ?? internalStep;
  const step = Math.min(rawStep, Math.max(total - 1, 0));
  const isControlled = current !== undefined;

  function setStep(next: number) {
    if (!isControlled) setInternalStep(next);
    onChange?.(next);
  }

  function next() {
    if (step < total - 1) setStep(step + 1);
  }

  function prev() {
    if (step > 0) setStep(step - 1);
  }

  const activeStep = steps[step];
  const target = activeStep?.props.target;

  const [hole, setHole] = useState<TourRect | null>(null);

  useEffect(() => {
    if (!open) {
      setHole(null);
      return;
    }

    const el = resolveTourTarget(target);
    if (!el) {
      setHole(null);
      return;
    }

    const update = () => setHole(getHoleRect(el.getBoundingClientRect(), gap));
    update();

    if (scrollIntoViewOptions !== false) {
      el.scrollIntoView(
        scrollIntoViewOptions === true ? DEFAULT_SCROLL_OPTIONS : scrollIntoViewOptions
      );
    }

    const observer = new ResizeObserver(update);
    observer.observe(el);
    window.addEventListener("scroll", update, true);
    window.addEventListener("resize", update);
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", update, true);
      window.removeEventListener("resize", update);
    };
  }, [open, target, gap, scrollIntoViewOptions]);

  return {
    step,
    activeStep,
    hole,
    next,
    prev,
    isFirst: step === 0,
    isLast: step === total - 1,
  };
}
