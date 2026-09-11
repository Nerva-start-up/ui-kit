import type React from "react";
import { cn } from "../../../lib/cn";
import { Grid } from "../../layout/Grid";
import { HStack } from "../../layout/HStack";
import { Stack } from "../../layout/Stack";
import { DescriptionsContext, type DescriptionsLayout, type DescriptionsSize } from "./context";

const columnClasses = {
  1: "grid-cols-1",
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
};

export type DescriptionsProps = {
  /** Заголовок над списком полей */
  title?: string;
  /** Контент справа от заголовка (например, кнопки действий) */
  extra?: React.ReactNode;
  /** Количество колонок сетки */
  column?: keyof typeof columnClasses;
  /** Расположение label относительно значения внутри пункта */
  layout?: DescriptionsLayout;
  /** Рамка и разделители между пунктами (табличный вид) */
  bordered?: boolean;
  /** Плотность отступов и размер шрифта */
  size?: DescriptionsSize;
  className?: string;
  /** `DescriptionsItem` */
  children: React.ReactNode;
};

/** Список подписанных полей (label + значение) в сетке — для страниц просмотра сущности. */
export function Descriptions({
  title,
  extra,
  column = 2,
  layout = "horizontal",
  bordered = false,
  size = "md",
  className,
  children,
}: DescriptionsProps) {
  return (
    <DescriptionsContext.Provider value={{ layout, bordered, size }}>
      <Stack gap={3} className={className}>
        {(title || extra) && (
          <HStack justify="between" gap={3}>
            {title && <h3 className="text-[15px] font-semibold text-[var(--text)]">{title}</h3>}
            {extra && <div className="shrink-0">{extra}</div>}
          </HStack>
        )}
        <Grid
          className={cn(
            columnClasses[column],
            bordered
              ? "gap-px overflow-hidden rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--border)]"
              : "gap-4"
          )}
        >
          {children}
        </Grid>
      </Stack>
    </DescriptionsContext.Provider>
  );
}
