import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import type React from "react";
import { cn } from "../../../lib/cn";

/* ── Root ──────────────────────────────────────────────── */
export type AccordionSingleProps = React.ComponentPropsWithoutRef<
  typeof AccordionPrimitive.Root
> & {
  /** Режим открытия */
  type: "single";
};

export type AccordionMultipleProps = React.ComponentPropsWithoutRef<
  typeof AccordionPrimitive.Root
> & {
  /** Режим открытия */
  type: "multiple";
};

export type AccordionProps = AccordionSingleProps | AccordionMultipleProps;

/** Корень — устанавливает `type` и общее состояние */
export function Accordion({ className, ...props }: AccordionProps) {
  return (
    <AccordionPrimitive.Root
      className={cn("flex flex-col divide-y divide-[var(--border)]", className)}
      {...props}
    />
  );
}

/* ── Item ──────────────────────────────────────────────── */
export type AccordionItemProps = React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>;

/** Одна секция (требует `value`) */
export function AccordionItem({ className, ...props }: AccordionItemProps) {
  return (
    <AccordionPrimitive.Item
      className={cn(
        "group first:rounded-t-[var(--radius-md)] last:rounded-b-[var(--radius-md)]",
        className
      )}
      {...props}
    />
  );
}

/* ── Trigger ───────────────────────────────────────────── */
export type AccordionTriggerProps = React.ComponentPropsWithoutRef<
  typeof AccordionPrimitive.Trigger
> & {
  /** Иконка 14×14 перед заголовком (оранжевая) */
  icon?: React.ReactNode;
};

/** Кнопка-заголовок с анимированной стрелкой */
export function AccordionTrigger({ className, icon, children, ...props }: AccordionTriggerProps) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        className={cn(
          "flex flex-1 items-center gap-3 py-4 px-1 text-sm font-medium",
          "text-[var(--text-muted)] transition-colors outline-none",
          "hover:text-[var(--text)]",
          "data-[state=open]:text-[var(--text)]",
          "[&[data-state=open]>svg.chevron]:rotate-180",
          className
        )}
        {...props}
      >
        {icon && (
          <span className="flex h-4 w-4 shrink-0 items-center justify-center text-[var(--primary)]">
            {icon}
          </span>
        )}
        <span className="flex-1 text-left">{children}</span>
        <ChevronDown
          size={16}
          className="chevron shrink-0 text-[var(--text-muted)] transition-transform duration-200"
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

/* ── Content ───────────────────────────────────────────── */
export type AccordionContentProps = React.ComponentPropsWithoutRef<
  typeof AccordionPrimitive.Content
>;

/** Содержимое секции */
export function AccordionContent({ className, children, ...props }: AccordionContentProps) {
  return (
    <AccordionPrimitive.Content
      className={cn(
        "overflow-hidden text-sm text-[var(--text-muted)]",
        "data-[state=open]:animate-in data-[state=open]:fade-in-0",
        "data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
        "data-[state=closed]:duration-150 data-[state=open]:duration-200"
      )}
      {...props}
    >
      <div className={cn("pb-4 px-1", className)}>{children}</div>
    </AccordionPrimitive.Content>
  );
}
