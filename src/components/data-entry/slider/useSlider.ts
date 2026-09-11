import type React from "react";
import { useCallback, useRef, useState } from "react";

export type UseSliderOptions = {
  value?: number | [number, number];
  defaultValue?: number | [number, number];
  onChange?: (value: number | [number, number]) => void;
  onChangeEnd?: (value: number | [number, number]) => void;
  min: number;
  max: number;
  step: number;
  range: boolean;
  disabled: boolean;
};

function toThumbs(v: number | [number, number], range: boolean): number[] {
  if (Array.isArray(v)) return [v[0], v[1]];
  return range ? [v, v] : [v];
}

function fromThumbs(thumbs: number[]): number | [number, number] {
  return thumbs.length === 2 ? [thumbs[0], thumbs[1]] : thumbs[0];
}

/** Controlled/uncontrolled значение(я) + pointer/keyboard-драг одного или двух thumb. */
export function useSlider({
  value,
  defaultValue,
  onChange,
  onChangeEnd,
  min,
  max,
  step,
  range,
  disabled,
}: UseSliderOptions) {
  const fallback = defaultValue ?? (range ? [min, max] : min);
  const [internal, setInternal] = useState<number[]>(() => toThumbs(fallback, range));
  const isControlled = value !== undefined;
  const thumbs = isControlled ? toThumbs(value, range) : internal;

  const [activeThumb, setActiveThumb] = useState<number | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const clamp = useCallback(
    (raw: number) => {
      const stepped = Math.round((raw - min) / step) * step + min;
      return Math.min(max, Math.max(min, stepped));
    },
    [min, max, step]
  );

  const commit = useCallback(
    (next: number[], isFinal: boolean) => {
      if (!isControlled) setInternal(next);
      const out = fromThumbs(next);
      onChange?.(out);
      if (isFinal) onChangeEnd?.(out);
    },
    [isControlled, onChange, onChangeEnd]
  );

  const setThumbValue = useCallback(
    (index: number, raw: number, isFinal: boolean) => {
      if (disabled) return;
      const clamped = clamp(raw);
      const next = [...thumbs];
      if (range) {
        if (index === 0) next[0] = Math.min(clamped, next[1]);
        else next[1] = Math.max(clamped, next[0]);
      } else {
        next[0] = clamped;
      }
      commit(next, isFinal);
    },
    [disabled, clamp, thumbs, range, commit]
  );

  const valueFromPointer = useCallback(
    (clientX: number) => {
      const track = trackRef.current;
      if (!track) return min;
      const rect = track.getBoundingClientRect();
      const ratio = rect.width === 0 ? 0 : (clientX - rect.left) / rect.width;
      return min + ratio * (max - min);
    },
    [min, max]
  );

  const nearestThumbIndex = useCallback(
    (raw: number) =>
      thumbs.length === 2 && Math.abs(raw - thumbs[1]) < Math.abs(raw - thumbs[0]) ? 1 : 0,
    [thumbs]
  );

  const onTrackPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (disabled) return;
      const raw = valueFromPointer(e.clientX);
      const index = nearestThumbIndex(raw);
      trackRef.current?.setPointerCapture(e.pointerId);
      setActiveThumb(index);
      setThumbValue(index, raw, false);
    },
    [disabled, valueFromPointer, nearestThumbIndex, setThumbValue]
  );

  const onTrackPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (activeThumb === null) return;
      setThumbValue(activeThumb, valueFromPointer(e.clientX), false);
    },
    [activeThumb, setThumbValue, valueFromPointer]
  );

  const onTrackPointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (activeThumb === null) return;
      setThumbValue(activeThumb, valueFromPointer(e.clientX), true);
      trackRef.current?.releasePointerCapture(e.pointerId);
      setActiveThumb(null);
    },
    [activeThumb, setThumbValue, valueFromPointer]
  );

  const onThumbPointerDown = useCallback(
    (index: number, e: React.PointerEvent) => {
      if (disabled) return;
      e.stopPropagation();
      trackRef.current?.setPointerCapture(e.pointerId);
      setActiveThumb(index);
    },
    [disabled]
  );

  const onKeyDown = useCallback(
    (index: number, e: React.KeyboardEvent) => {
      if (disabled) return;
      let delta = 0;
      if (e.key === "ArrowRight" || e.key === "ArrowUp") delta = step;
      else if (e.key === "ArrowLeft" || e.key === "ArrowDown") delta = -step;
      else if (e.key === "PageUp") delta = step * 10;
      else if (e.key === "PageDown") delta = -step * 10;
      else if (e.key === "Home") {
        e.preventDefault();
        setThumbValue(index, min, true);
        return;
      } else if (e.key === "End") {
        e.preventDefault();
        setThumbValue(index, max, true);
        return;
      } else {
        return;
      }
      e.preventDefault();
      setThumbValue(index, thumbs[index] + delta, true);
    },
    [disabled, step, min, max, thumbs, setThumbValue]
  );

  return {
    trackRef,
    thumbs,
    activeThumb,
    onTrackPointerDown,
    onTrackPointerMove,
    onTrackPointerUp,
    onThumbPointerDown,
    onKeyDown,
  };
}
