import * as ContextMenuPrimitive from "@radix-ui/react-context-menu";
import { Check, ChevronRight, Circle } from "lucide-react";
import type React from "react";
import { cn } from "../../../lib/cn";

/* ── Re-exports (no styling needed) ──────────────────── */
/** Корневой контейнер */
export const ContextMenu = ContextMenuPrimitive.Root;
/** Оборачиваемый элемент-триггер */
export const ContextMenuTrigger = ContextMenuPrimitive.Trigger;
/** Семантическая группировка */
export const ContextMenuGroup = ContextMenuPrimitive.Group;
/** Подменю-контейнер */
export const ContextMenuSub = ContextMenuPrimitive.Sub;
/** Группа radio-пунктов */
export const ContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup;

/* ── Content ──────────────────────────────────────────── */
export type ContextMenuContentProps = React.ComponentPropsWithoutRef<
  typeof ContextMenuPrimitive.Content
>;

/** Контент (portal) */
export function ContextMenuContent({ className, ...props }: ContextMenuContentProps) {
  return (
    <ContextMenuPrimitive.Portal>
      <ContextMenuPrimitive.Content
        className={cn(
          "z-50 min-w-[180px] overflow-hidden p-1",
          "rounded-[var(--radius-lg)] border border-[var(--border)]",
          "bg-[var(--surface)] shadow-[var(--shadow)]",
          "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
          "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
          className
        )}
        {...props}
      />
    </ContextMenuPrimitive.Portal>
  );
}

/* ── Item ─────────────────────────────────────────────── */
export type ContextMenuItemProps = React.ComponentPropsWithoutRef<
  typeof ContextMenuPrimitive.Item
> & {
  /** Отступ слева (выравнивание без иконки) */
  inset?: boolean;
  /** Иконка 14×14 слева */
  icon?: React.ReactNode;
  /** Красный цвет (удаление) */
  destructive?: boolean;
};

/** Пункт меню */
export function ContextMenuItem({
  className,
  inset,
  icon,
  destructive,
  children,
  ...props
}: ContextMenuItemProps) {
  return (
    <ContextMenuPrimitive.Item
      className={cn(
        "relative flex cursor-pointer select-none items-center gap-2",
        "rounded-[var(--radius-md)] px-2 py-1.5 text-sm outline-none transition-colors",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-40",
        destructive
          ? "text-[var(--error)] focus:bg-[rgba(248,113,113,0.08)] focus:text-[var(--error)]"
          : "text-[var(--text-muted)] focus:bg-[var(--surface-2)] focus:text-[var(--text)]",
        inset && "pl-8",
        className
      )}
      {...props}
    >
      {icon && <span className="flex h-4 w-4 shrink-0 items-center justify-center">{icon}</span>}
      {children}
    </ContextMenuPrimitive.Item>
  );
}

/* ── Label ────────────────────────────────────────────── */
export type ContextMenuLabelProps = React.ComponentPropsWithoutRef<
  typeof ContextMenuPrimitive.Label
> & { inset?: boolean };

/** Нестерактивный заголовок группы */
export function ContextMenuLabel({ className, inset, ...props }: ContextMenuLabelProps) {
  return (
    <ContextMenuPrimitive.Label
      className={cn(
        "px-2 py-1 text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)]",
        inset && "pl-8",
        className
      )}
      {...props}
    />
  );
}

/* ── Separator ────────────────────────────────────────── */
export type ContextMenuSeparatorProps = React.ComponentPropsWithoutRef<
  typeof ContextMenuPrimitive.Separator
>;

/** Разделитель */
export function ContextMenuSeparator({ className, ...props }: ContextMenuSeparatorProps) {
  return (
    <ContextMenuPrimitive.Separator
      className={cn("-mx-1 my-1 h-px bg-[var(--border)]", className)}
      {...props}
    />
  );
}

/* ── Shortcut ─────────────────────────────────────────── */
export type ContextMenuShortcutProps = React.HTMLAttributes<HTMLSpanElement>;

/** Горячая клавиша справа */
export function ContextMenuShortcut({ className, ...props }: ContextMenuShortcutProps) {
  return (
    <span
      className={cn("ml-auto pl-4 text-xs tracking-widest text-[var(--text-muted)]", className)}
      {...props}
    />
  );
}

/* ── Sub trigger ──────────────────────────────────────── */
export type ContextMenuSubTriggerProps = React.ComponentPropsWithoutRef<
  typeof ContextMenuPrimitive.SubTrigger
> & { inset?: boolean };

/** Триггер подменю (со стрелкой) */
export function ContextMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: ContextMenuSubTriggerProps) {
  return (
    <ContextMenuPrimitive.SubTrigger
      className={cn(
        "flex cursor-default select-none items-center gap-2",
        "rounded-[var(--radius-md)] px-2 py-1.5 text-sm outline-none",
        "text-[var(--text-muted)] focus:bg-[var(--surface-2)] focus:text-[var(--text)]",
        "data-[state=open]:bg-[var(--surface-2)] data-[state=open]:text-[var(--text)]",
        inset && "pl-8",
        className
      )}
      {...props}
    >
      {children}
      <ChevronRight size={14} className="ml-auto shrink-0" />
    </ContextMenuPrimitive.SubTrigger>
  );
}

/* ── Sub content ──────────────────────────────────────── */
export type ContextMenuSubContentProps = React.ComponentPropsWithoutRef<
  typeof ContextMenuPrimitive.SubContent
>;

/** Контент подменю */
export function ContextMenuSubContent({ className, ...props }: ContextMenuSubContentProps) {
  return (
    <ContextMenuPrimitive.Portal>
      <ContextMenuPrimitive.SubContent
        className={cn(
          "z-50 min-w-[160px] overflow-hidden p-1",
          "rounded-[var(--radius-lg)] border border-[var(--border)]",
          "bg-[var(--surface)] shadow-[var(--shadow)]",
          "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
          "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
          "data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2",
          className
        )}
        {...props}
      />
    </ContextMenuPrimitive.Portal>
  );
}

/* ── Checkbox item ────────────────────────────────────── */
export type ContextMenuCheckboxItemProps = React.ComponentPropsWithoutRef<
  typeof ContextMenuPrimitive.CheckboxItem
>;

/** Пункт с чекбоксом */
export function ContextMenuCheckboxItem({
  className,
  children,
  checked,
  ...props
}: ContextMenuCheckboxItemProps) {
  return (
    <ContextMenuPrimitive.CheckboxItem
      className={cn(
        "relative flex cursor-pointer select-none items-center",
        "rounded-[var(--radius-md)] py-1.5 pl-8 pr-2 text-sm outline-none transition-colors",
        "text-[var(--text-muted)] focus:bg-[var(--surface-2)] focus:text-[var(--text)]",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-40",
        className
      )}
      checked={checked}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center text-[var(--primary)]">
        <ContextMenuPrimitive.ItemIndicator>
          <Check size={12} />
        </ContextMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </ContextMenuPrimitive.CheckboxItem>
  );
}

/* ── Radio item ───────────────────────────────────────── */
export type ContextMenuRadioItemProps = React.ComponentPropsWithoutRef<
  typeof ContextMenuPrimitive.RadioItem
>;

/** Radio-пункт */
export function ContextMenuRadioItem({ className, children, ...props }: ContextMenuRadioItemProps) {
  return (
    <ContextMenuPrimitive.RadioItem
      className={cn(
        "relative flex cursor-pointer select-none items-center",
        "rounded-[var(--radius-md)] py-1.5 pl-8 pr-2 text-sm outline-none transition-colors",
        "text-[var(--text-muted)] focus:bg-[var(--surface-2)] focus:text-[var(--text)]",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-40",
        className
      )}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center text-[var(--primary)]">
        <ContextMenuPrimitive.ItemIndicator>
          <Circle size={8} fill="currentColor" />
        </ContextMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </ContextMenuPrimitive.RadioItem>
  );
}
