import type React from "react";

export type GapValue = number | string;

const GAP_CLASSES: Record<number, string> = {
  0: "gap-0",
  0.5: "gap-0.5",
  1: "gap-1",
  1.5: "gap-1.5",
  2: "gap-2",
  2.5: "gap-2.5",
  3: "gap-3",
  3.5: "gap-3.5",
  4: "gap-4",
  5: "gap-5",
  6: "gap-6",
  7: "gap-7",
  8: "gap-8",
  9: "gap-9",
  10: "gap-10",
  11: "gap-11",
  12: "gap-12",
  14: "gap-14",
  16: "gap-16",
  20: "gap-20",
  24: "gap-24",
};

const COL_GAP_CLASSES: Record<number, string> = {
  0: "gap-x-0",
  0.5: "gap-x-0.5",
  1: "gap-x-1",
  1.5: "gap-x-1.5",
  2: "gap-x-2",
  2.5: "gap-x-2.5",
  3: "gap-x-3",
  3.5: "gap-x-3.5",
  4: "gap-x-4",
  5: "gap-x-5",
  6: "gap-x-6",
  7: "gap-x-7",
  8: "gap-x-8",
  9: "gap-x-9",
  10: "gap-x-10",
  11: "gap-x-11",
  12: "gap-x-12",
  14: "gap-x-14",
  16: "gap-x-16",
  20: "gap-x-20",
  24: "gap-x-24",
};

const ROW_GAP_CLASSES: Record<number, string> = {
  0: "gap-y-0",
  0.5: "gap-y-0.5",
  1: "gap-y-1",
  1.5: "gap-y-1.5",
  2: "gap-y-2",
  2.5: "gap-y-2.5",
  3: "gap-y-3",
  3.5: "gap-y-3.5",
  4: "gap-y-4",
  5: "gap-y-5",
  6: "gap-y-6",
  7: "gap-y-7",
  8: "gap-y-8",
  9: "gap-y-9",
  10: "gap-y-10",
  11: "gap-y-11",
  12: "gap-y-12",
  14: "gap-y-14",
  16: "gap-y-16",
  20: "gap-y-20",
  24: "gap-y-24",
};

type Resolved = { className?: string; style?: React.CSSProperties };

function resolve(
  value: GapValue | undefined,
  classes: Record<number, string>,
  styleProp: "gap" | "columnGap" | "rowGap"
): Resolved {
  if (value === undefined) return {};
  if (typeof value === "number" && value in classes) {
    return { className: classes[value] };
  }
  return { style: { [styleProp]: typeof value === "number" ? `${value}px` : value } };
}

/** `gap` — значение шкалы Tailwind (0.5, 1, 1.5, 2…24) через класс, либо произвольное (число → px, строка → как есть, напр. `"1.5rem"`) через inline-style. */
export function resolveGap(value: GapValue | undefined): Resolved {
  return resolve(value, GAP_CLASSES, "gap");
}

/** То же для `column-gap`. */
export function resolveColGap(value: GapValue | undefined): Resolved {
  return resolve(value, COL_GAP_CLASSES, "columnGap");
}

/** То же для `row-gap`. */
export function resolveRowGap(value: GapValue | undefined): Resolved {
  return resolve(value, ROW_GAP_CLASSES, "rowGap");
}
