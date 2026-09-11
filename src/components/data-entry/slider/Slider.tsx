import { useId } from "react";
import { cn } from "../../../lib/cn";
import { useSlider } from "./useSlider";
import { valueToPercent } from "./utils";

export type SliderProps = {
  /** Controlled значение — число или `[from, to]` для диапазона */
  value?: number | [number, number];
  /** Uncontrolled начальное значение */
  defaultValue?: number | [number, number];
  /** Callback при каждом изменении (во время перетаскивания) */
  onChange?: (value: number | [number, number]) => void;
  /** Callback по завершении перетаскивания/клика/клавиши */
  onChangeEnd?: (value: number | [number, number]) => void;
  /** Диапазонный режим — два ползунка вместо одного */
  range?: boolean;
  /** Минимальное значение */
  min?: number;
  /** Максимальное значение */
  max?: number;
  /** Шаг изменения */
  step?: number;
  /** Подписанные отметки на треке, например `{ 0: '0%', 50: '50%', 100: '100%' }` */
  marks?: Record<number, string>;
  disabled?: boolean;
  /** Подпись над слайдером */
  label?: string;
  /** Показывать значение во всплывающей подсказке над ползунком при перетаскивании */
  showTooltip?: boolean;
  className?: string;
};

/** Ползунок значения — один или два thumb (range), шаг, отметки, драг мышью/тачем и клавиатура. */
export function Slider({
  value,
  defaultValue,
  onChange,
  onChangeEnd,
  range = false,
  min = 0,
  max = 100,
  step = 1,
  marks,
  disabled = false,
  label,
  showTooltip = true,
  className,
}: SliderProps) {
  const labelId = useId();
  const {
    trackRef,
    thumbs,
    activeThumb,
    onTrackPointerDown,
    onTrackPointerMove,
    onTrackPointerUp,
    onThumbPointerDown,
    onKeyDown,
  } = useSlider({ value, defaultValue, onChange, onChangeEnd, min, max, step, range, disabled });

  const isRangeMode = thumbs.length === 2;
  const [lo, hi] = isRangeMode ? thumbs : [min, thumbs[0]];
  const fillStartPercent = isRangeMode ? valueToPercent(lo, min, max) : 0;
  const fillEndPercent = valueToPercent(hi, min, max);

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {label && (
        <span id={labelId} className="select-none text-[13px] font-medium text-[var(--text-sub)]">
          {label}
        </span>
      )}

      <div className={cn("relative py-3", disabled && "cursor-not-allowed opacity-50")}>
        <div
          ref={trackRef}
          onPointerDown={onTrackPointerDown}
          onPointerMove={onTrackPointerMove}
          onPointerUp={onTrackPointerUp}
          onPointerCancel={onTrackPointerUp}
          className={cn(
            "relative h-1.5 rounded-full bg-[var(--border)]",
            !disabled && "cursor-pointer"
          )}
        >
          <div
            className="absolute h-full rounded-full bg-[var(--primary)]"
            style={{ left: `${fillStartPercent}%`, width: `${fillEndPercent - fillStartPercent}%` }}
          />

          {marks &&
            Object.keys(marks).map((markValue) => (
              <div
                key={markValue}
                className="absolute top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--surface)]"
                style={{ left: `${valueToPercent(Number(markValue), min, max)}%` }}
              />
            ))}

          {thumbs.map((thumbValue, index) => (
            <div
              key={index}
              role="slider"
              aria-labelledby={label ? labelId : undefined}
              aria-valuemin={min}
              aria-valuemax={max}
              aria-valuenow={thumbValue}
              aria-disabled={disabled || undefined}
              tabIndex={disabled ? undefined : 0}
              onPointerDown={(e) => onThumbPointerDown(index, e)}
              onKeyDown={(e) => onKeyDown(index, e)}
              className={cn(
                "absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full",
                "border-2 border-[var(--surface)] bg-[var(--primary)] shadow-md outline-none",
                "transition-transform",
                "focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2",
                "focus-visible:ring-offset-[var(--surface)]",
                !disabled && "cursor-grab hover:scale-110 active:cursor-grabbing",
                activeThumb === index && "scale-110 cursor-grabbing"
              )}
              style={{ left: `${valueToPercent(thumbValue, min, max)}%` }}
            >
              {showTooltip && activeThumb === index && (
                <div
                  className={cn(
                    "absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-[var(--radius-sm)]",
                    "border border-[var(--border)] bg-[var(--surface-2)] px-2 py-0.5",
                    "text-[11px] font-medium text-[var(--text)] shadow-md"
                  )}
                >
                  {thumbValue}
                </div>
              )}
            </div>
          ))}
        </div>

        {marks && (
          <div className="relative mt-2 h-4">
            {Object.entries(marks).map(([markValue, markLabel]) => (
              <span
                key={markValue}
                className="absolute -translate-x-1/2 whitespace-nowrap text-[11px] text-[var(--text-muted)]"
                style={{ left: `${valueToPercent(Number(markValue), min, max)}%` }}
              >
                {markLabel}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
