import React from "react";
import { cn } from "../../lib/cn";
import { type GapValue, resolveColGap, resolveGap, resolveRowGap } from "./gap";
import { type ItemProps, resolveItemProps } from "./itemProps";

const colsClasses: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
  5: "grid-cols-5",
  6: "grid-cols-6",
  7: "grid-cols-7",
  8: "grid-cols-8",
  9: "grid-cols-9",
  10: "grid-cols-10",
  11: "grid-cols-11",
  12: "grid-cols-12",
};

const rowsClasses: Record<number, string> = {
  1: "grid-rows-1",
  2: "grid-rows-2",
  3: "grid-rows-3",
  4: "grid-rows-4",
  5: "grid-rows-5",
  6: "grid-rows-6",
};

function resolveCols(cols: number | string | undefined) {
  if (cols === undefined) return {};
  if (typeof cols === "number" && cols in colsClasses) {
    return { className: colsClasses[cols] };
  }
  const value = typeof cols === "number" ? `repeat(${cols}, minmax(0, 1fr))` : cols;
  return { style: { gridTemplateColumns: value } };
}

function resolveRows(rows: number | string | undefined) {
  if (rows === undefined) return {};
  if (typeof rows === "number" && rows in rowsClasses) {
    return { className: rowsClasses[rows] };
  }
  const value = typeof rows === "number" ? `repeat(${rows}, minmax(0, 1fr))` : rows;
  return { style: { gridTemplateRows: value } };
}

export type GridProps = {
  /** grid-template-columns — 1–12 через класс, либо произвольное (число → `repeat(N, minmax(0, 1fr))`, строка → как есть, напр. `"200px 1fr"`) */
  cols?: number | string;
  /** grid-template-rows — 1–6 через класс, либо произвольное значение */
  rows?: number | string;
  /** gap — шкала Tailwind (0.5, 1, 1.5, 2…24) или произвольное значение */
  gap?: GapValue;
  /** column-gap */
  colGap?: GapValue;
  /** row-gap */
  rowGap?: GapValue;
  /** пробрасывает стили в дочерний элемент вместо рендера `<div>` — для кастомного тега/компонента */
  asChild?: boolean;
} & ItemProps &
  React.HTMLAttributes<HTMLDivElement>;

/** CSS Grid контейнер. */
export function Grid({
  cols,
  rows,
  gap,
  colGap,
  rowGap,
  self,
  justifySelf,
  shrink,
  basis,
  asChild = false,
  className,
  style,
  children,
  ...props
}: GridProps) {
  const colsResolved = resolveCols(cols);
  const rowsResolved = resolveRows(rows);
  const gapResolved = resolveGap(gap);
  const colGapResolved = resolveColGap(colGap);
  const rowGapResolved = resolveRowGap(rowGap);
  const itemResolved = resolveItemProps({ self, justifySelf, shrink, basis });

  const computedClassName = cn(
    "grid",
    colsResolved.className,
    rowsResolved.className,
    gapResolved.className,
    colGapResolved.className,
    rowGapResolved.className,
    itemResolved.className,
    className
  );
  const computedStyle = {
    ...colsResolved.style,
    ...rowsResolved.style,
    ...gapResolved.style,
    ...colGapResolved.style,
    ...rowGapResolved.style,
    ...itemResolved.style,
    ...style,
  };

  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<{
      className?: string;
      style?: React.CSSProperties;
    }>;
    return React.cloneElement(child, {
      className: cn(computedClassName, child.props.className),
      style: { ...computedStyle, ...child.props.style },
    });
  }

  return (
    <div className={computedClassName} style={computedStyle} {...props}>
      {children}
    </div>
  );
}
