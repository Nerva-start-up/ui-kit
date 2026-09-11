import type React from "react";
import { cn } from "../../../lib/cn";

/** Таблица данных — обёртка над `<table>` с рамкой и скруглением */
export function Table({ className, children, ...props }: React.HTMLAttributes<HTMLTableElement>) {
  return (
    <div className="overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)]">
      <div className="overflow-x-auto">
        <table className={cn("w-full text-sm border-collapse", className)} {...props}>
          {children}
        </table>
      </div>
    </div>
  );
}

/** Обёртка над `<thead>` */
export function Thead({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <thead
      className={cn("bg-[var(--surface-2)] border-b border-[var(--border)]", className)}
      {...props}
    >
      {children}
    </thead>
  );
}

/** Обёртка над `<tbody>` */
export function Tbody({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <tbody
      className={cn("bg-[var(--surface)] divide-y divide-[var(--border)]", className)}
      {...props}
    >
      {children}
    </tbody>
  );
}

export type TrProps = {
  hoverable?: boolean;
  /** Визуально выделяет строку (row selection) */
  selected?: boolean;
} & React.HTMLAttributes<HTMLTableRowElement>;

/** Обёртка над `<tr>` с hover-подсветкой и поддержкой выделения выбранной строки */
export function Tr({ hoverable = true, selected = false, className, children, ...props }: TrProps) {
  return (
    <tr
      data-selected={selected || undefined}
      className={cn(
        "transition-colors duration-100",
        hoverable && !selected && "hover:bg-[var(--surface-2)]",
        selected && "bg-[var(--primary)]/10 hover:bg-[var(--primary)]/15",
        className
      )}
      {...props}
    >
      {children}
    </tr>
  );
}

/** Обёртка над `<th>`, текст uppercase и приглушённого цвета */
export function Th({
  className,
  children,
  ...props
}: React.ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      className={cn(
        "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider",
        "text-[var(--text-muted)]",
        className
      )}
      {...props}
    >
      {children}
    </th>
  );
}

/** Обёртка над `<td>` */
export function Td({
  className,
  children,
  ...props
}: React.TdHTMLAttributes<HTMLTableCellElement>) {
  return (
    <td className={cn("px-4 py-3 text-[var(--text)]", className)} {...props}>
      {children}
    </td>
  );
}
