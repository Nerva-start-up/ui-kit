import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { Check, ChevronRight, Circle } from "lucide-react";
import type React from "react";
import { cn } from "../../../lib/cn";

/* ── Re-exports ────────────────────────────────────────── */
/** Корневой контейнер */
export const DropdownMenu = DropdownMenuPrimitive.Root;
/** Триггер (оборачивает asChild) */
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
/** Семантическая группировка пунктов */
export const DropdownMenuGroup = DropdownMenuPrimitive.Group;
/** Подменю-контейнер */
export const DropdownMenuSub = DropdownMenuPrimitive.Sub;
/** Группа radio-пунктов */
export const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

/* ── Content ───────────────────────────────────────────── */
export type DropdownMenuContentProps = React.ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.Content
>;

/** Контент меню */
export function DropdownMenuContent({
  className,
  side = "bottom",
  sideOffset = 6,
  ...props
}: DropdownMenuContentProps) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        side={side}
        sideOffset={sideOffset}
        className={cn(
          "z-50 min-w-[180px] overflow-hidden p-1",
          "rounded-[var(--radius-lg)] border border-[var(--border)]",
          "bg-[var(--surface)] shadow-[var(--shadow)]",
          "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
          "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
          "data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2",
          "data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2",
          className
        )}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  );
}

/* ── Item ──────────────────────────────────────────────── */
export type DropdownMenuItemProps = React.ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.Item
> & {
  /** Отступ слева (для выравнивания без иконки) */
  inset?: boolean;
  /** Иконка 14×14 слева */
  icon?: React.ReactNode;
  /** Красный цвет (удаление) */
  destructive?: boolean;
};

/** Пункт меню */
export function DropdownMenuItem({
  className,
  inset,
  icon,
  destructive,
  children,
  ...props
}: DropdownMenuItemProps) {
  return (
    <DropdownMenuPrimitive.Item
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
    </DropdownMenuPrimitive.Item>
  );
}

/* ── Label ─────────────────────────────────────────────── */
export type DropdownMenuLabelProps = React.ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.Label
> & { inset?: boolean };

/** Нестерактивный заголовок группы */
export function DropdownMenuLabel({ className, inset, ...props }: DropdownMenuLabelProps) {
  return (
    <DropdownMenuPrimitive.Label
      className={cn(
        "px-2 py-1 text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)]",
        inset && "pl-8",
        className
      )}
      {...props}
    />
  );
}

/* ── Separator ─────────────────────────────────────────── */
export type DropdownMenuSeparatorProps = React.ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.Separator
>;

/** Разделитель */
export function DropdownMenuSeparator({ className, ...props }: DropdownMenuSeparatorProps) {
  return (
    <DropdownMenuPrimitive.Separator
      className={cn("-mx-1 my-1 h-px bg-[var(--border)]", className)}
      {...props}
    />
  );
}

/* ── Shortcut ──────────────────────────────────────────── */
export type DropdownMenuShortcutProps = React.HTMLAttributes<HTMLSpanElement>;

/** Горячая клавиша справа */
export function DropdownMenuShortcut({ className, ...props }: DropdownMenuShortcutProps) {
  return (
    <span
      className={cn("ml-auto pl-4 text-xs tracking-widest text-[var(--text-muted)]", className)}
      {...props}
    />
  );
}

/* ── Sub trigger ───────────────────────────────────────── */
export type DropdownMenuSubTriggerProps = React.ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.SubTrigger
> & { inset?: boolean };

/** Триггер подменю (со стрелкой) */
export function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: DropdownMenuSubTriggerProps) {
  return (
    <DropdownMenuPrimitive.SubTrigger
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
    </DropdownMenuPrimitive.SubTrigger>
  );
}

/* ── Sub content ───────────────────────────────────────── */
export type DropdownMenuSubContentProps = React.ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.SubContent
>;

/** Контент подменю */
export function DropdownMenuSubContent({ className, ...props }: DropdownMenuSubContentProps) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.SubContent
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
    </DropdownMenuPrimitive.Portal>
  );
}

/* ── Checkbox item ─────────────────────────────────────── */
export type DropdownMenuCheckboxItemProps = React.ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.CheckboxItem
>;

/** Пункт с чекбоксом */
export function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  ...props
}: DropdownMenuCheckboxItemProps) {
  return (
    <DropdownMenuPrimitive.CheckboxItem
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
        <DropdownMenuPrimitive.ItemIndicator>
          <Check size={12} />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  );
}

/* ── Radio item ────────────────────────────────────────── */
export type DropdownMenuRadioItemProps = React.ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.RadioItem
>;

/** Radio-пункт */
export function DropdownMenuRadioItem({
  className,
  children,
  ...props
}: DropdownMenuRadioItemProps) {
  return (
    <DropdownMenuPrimitive.RadioItem
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
        <DropdownMenuPrimitive.ItemIndicator>
          <Circle size={8} fill="currentColor" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.RadioItem>
  );
}
