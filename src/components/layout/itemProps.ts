import type React from "react";

const selfClasses = {
  auto: "self-auto",
  start: "self-start",
  center: "self-center",
  end: "self-end",
  stretch: "self-stretch",
  baseline: "self-baseline",
};

const justifySelfClasses = {
  auto: "justify-self-auto",
  start: "justify-self-start",
  center: "justify-self-center",
  end: "justify-self-end",
  stretch: "justify-self-stretch",
};

export type SelfValue = keyof typeof selfClasses;
export type JustifySelfValue = keyof typeof justifySelfClasses;

export type ItemProps = {
  /** align-self — своё выравнивание внутри родительского flex/grid-контейнера */
  self?: SelfValue;
  /** justify-self — своё выравнивание по инлайн-оси внутри родительского grid-контейнера */
  justifySelf?: JustifySelfValue;
  /** `false` → `flex-shrink: 0`, запрещает сжатие элемента в родительском flex-контейнере */
  shrink?: boolean;
  /** flex-basis — число → px, строка → как есть (например `"20%"`) */
  basis?: number | string;
};

/** Резолвит `ItemProps` в className + inline-style. Используется во всех layout-примитивах. */
export function resolveItemProps({ self, justifySelf, shrink, basis }: ItemProps): {
  className?: string;
  style?: React.CSSProperties;
} {
  const classNames = [
    self && selfClasses[self],
    justifySelf && justifySelfClasses[justifySelf],
    shrink === false && "shrink-0",
  ].filter((v): v is string => Boolean(v));

  return {
    className: classNames.length > 0 ? classNames.join(" ") : undefined,
    style:
      basis !== undefined
        ? { flexBasis: typeof basis === "number" ? `${basis}px` : basis }
        : undefined,
  };
}
