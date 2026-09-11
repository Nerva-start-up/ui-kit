import { useEscapeKey } from "@hooks/useEscapeKey";
import { defaultTransition, scaleIn } from "@motion/variants";
import { motion } from "motion/react";
import { Children, isValidElement, useLayoutEffect, useMemo, useRef, useState } from "react";
import type { ReactElement, ReactNode } from "react";
import { createPortal } from "react-dom";
import { TourMask } from "./TourMask";
import type { TourStepProps } from "./TourStep";
import { TourContext } from "./context";
import { useTour } from "./useTour";
import { computeTourPosition } from "./utils";

export type TourProps = {
  /** Показывать тур. Полностью controlled — компонент никогда не закрывает себя сам */
  open: boolean;
  /** Callback открытия/закрытия — крестик на карточке или Escape вызывают с `false` */
  onOpenChange?: (open: boolean) => void;
  /** Controlled индекс активного шага */
  current?: number;
  /** Uncontrolled начальный индекс шага */
  defaultCurrent?: number;
  /** Callback смены шага (кнопки Назад/Далее) */
  onChange?: (current: number) => void;
  /** Callback завершения — кнопка "Готово" на последнем шаге */
  onFinish?: () => void;
  /** Затемнять фон вокруг target (default: `true`) */
  mask?: boolean;
  /** Отступ между target и рамкой отверстия/карточкой, px (default: `6`) */
  gap?: number;
  /** Визуальный стиль карточек шагов (default: `'default'`) */
  type?: "default" | "primary";
  /** Опции `scrollIntoView` при переходе на шаг; `false` — не скроллить (default: `{ block: 'center', behavior: 'smooth' }`) */
  scrollIntoViewOptions?: boolean | ScrollIntoViewOptions;
  /** Шаги тура — элементы `TourStep` по порядку */
  children: ReactNode;
};

/** Пошаговый онбординг-тур с подсветкой элементов интерфейса — аналог `Tour` из antd. Composable API в духе shadcn: шаги — дочерние `<TourStep>`, их содержимое собирается из `TourTitle`/`TourDescription`/`TourCover`. Рендерится в портал поверх страницы: маска с вырезом вокруг `target` активного шага + позиционированная у него карточка. */
export function Tour({
  open,
  onOpenChange,
  current,
  defaultCurrent,
  onChange,
  onFinish,
  mask = true,
  gap = 6,
  type = "default",
  scrollIntoViewOptions,
  children,
}: TourProps) {
  const steps = useMemo(
    () => Children.toArray(children).filter(isValidElement) as ReactElement<TourStepProps>[],
    [children]
  );
  const total = steps.length;

  const { step, activeStep, hole, next, prev, isFirst, isLast } = useTour({
    open,
    steps,
    gap,
    current,
    defaultCurrent,
    onChange,
    scrollIntoViewOptions,
  });

  const close = () => onOpenChange?.(false);
  const finish = () => {
    onFinish?.();
    onOpenChange?.(false);
  };

  const placement = activeStep?.props.placement ?? "bottom";
  const showMask = activeStep?.props.mask ?? mask;

  const wrapperRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: -9999, left: -9999 });

  useLayoutEffect(() => {
    if (!open) return;

    function measure() {
      if (!wrapperRef.current) return;
      const { width, height } = wrapperRef.current.getBoundingClientRect();
      setPosition(computeTourPosition(hole, { width, height }, placement, gap));
    }

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [open, hole, placement, gap]);

  useEscapeKey(close, open);

  if (!open || !activeStep) return null;

  return createPortal(
    <TourContext.Provider
      value={{ current: step, total, isFirst, isLast, type, next, prev, close, finish }}
    >
      {showMask && <TourMask hole={hole} />}
      <div
        ref={wrapperRef}
        className="fixed z-[51]"
        style={{ top: position.top, left: position.left }}
      >
        <motion.div key={step} {...scaleIn} transition={defaultTransition}>
          {activeStep}
        </motion.div>
      </div>
    </TourContext.Provider>,
    document.body
  );
}
