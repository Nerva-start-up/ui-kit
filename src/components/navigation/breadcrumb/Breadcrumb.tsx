import { ChevronRight, MoreHorizontal } from "lucide-react";
import React from "react";
import { cn } from "../../../lib/cn";

/* ── Breadcrumb ─────────────────────────────────────── */
export type BreadcrumbProps = React.ComponentPropsWithoutRef<"nav">;

/** `<nav aria-label="breadcrumb">` — корневой контейнер */
export function Breadcrumb({ className, ...props }: BreadcrumbProps) {
  return <nav aria-label="breadcrumb" className={cn(className)} {...props} />;
}

/* ── BreadcrumbList ─────────────────────────────────── */
export type BreadcrumbListProps = React.ComponentPropsWithoutRef<"ol">;

/** `<ol>` — список шагов */
export function BreadcrumbList({ className, ...props }: BreadcrumbListProps) {
  return (
    <ol
      className={cn(
        "flex flex-wrap items-center gap-1 text-sm text-[var(--text-muted)]",
        className
      )}
      {...props}
    />
  );
}

/* ── BreadcrumbItem ─────────────────────────────────── */
export type BreadcrumbItemProps = React.ComponentPropsWithoutRef<"li">;

/** `<li>` — один шаг */
export function BreadcrumbItem({ className, ...props }: BreadcrumbItemProps) {
  return <li className={cn("inline-flex items-center gap-1", className)} {...props} />;
}

/* ── BreadcrumbLink ─────────────────────────────────── */
export type BreadcrumbLinkProps = React.ComponentPropsWithoutRef<"a"> & {
  /** Пробрасывает стили в дочерний элемент (для `<Link>` из React Router) */
  asChild?: boolean;
};

/** `<a>` — кликабельная ссылка */
export function BreadcrumbLink({ className, children, asChild, ...props }: BreadcrumbLinkProps) {
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<React.HTMLAttributes<HTMLElement>>, {
      className: cn(
        "transition-colors hover:text-[var(--text)] focus-visible:outline-none focus-visible:text-[var(--text)]",
        (children as React.ReactElement<React.HTMLAttributes<HTMLElement>>).props.className
      ),
    });
  }

  return (
    <a
      className={cn(
        "transition-colors hover:text-[var(--text)]",
        "focus-visible:outline-none focus-visible:text-[var(--text)]",
        className
      )}
      {...props}
    >
      {children}
    </a>
  );
}

/* ── BreadcrumbPage ─────────────────────────────────── */
export type BreadcrumbPageProps = React.ComponentPropsWithoutRef<"span">;

/** `<span aria-current="page">` — текущая страница (не ссылка) */
export function BreadcrumbPage({ className, ...props }: BreadcrumbPageProps) {
  return (
    <span
      aria-current="page"
      className={cn("text-[var(--text)] font-medium", className)}
      {...props}
    />
  );
}

/* ── BreadcrumbSeparator ────────────────────────────── */
export type BreadcrumbSeparatorProps = React.ComponentPropsWithoutRef<"li">;

/** Разделитель (по умолчанию ChevronRight) */
export function BreadcrumbSeparator({ children, className, ...props }: BreadcrumbSeparatorProps) {
  return (
    <li
      role="presentation"
      aria-hidden="true"
      className={cn("flex items-center text-[var(--text-muted)]", className)}
      {...props}
    >
      {children ?? <ChevronRight size={14} />}
    </li>
  );
}

/* ── BreadcrumbEllipsis ─────────────────────────────── */
export type BreadcrumbEllipsisProps = React.ComponentPropsWithoutRef<"span">;

/** ··· для скрытых промежуточных шагов */
export function BreadcrumbEllipsis({ className, ...props }: BreadcrumbEllipsisProps) {
  return (
    <span
      role="presentation"
      aria-hidden="true"
      className={cn("flex h-4 w-4 items-center justify-center", className)}
      {...props}
    >
      <MoreHorizontal size={14} />
    </span>
  );
}
