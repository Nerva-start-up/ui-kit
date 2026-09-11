import * as PopoverPrimitive from "@radix-ui/react-popover";
import type React from "react";
import { cn } from "../../../lib/cn";

export type PopoverProps = {
  /** Controlled состояние */
  open?: boolean;
  /** Uncontrolled начальное состояние */
  defaultOpen?: boolean;
  /** Callback изменения состояния */
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
};

export type PopoverContentProps = {
  children: React.ReactNode;
  /** Сторона появления */
  side?: "top" | "right" | "bottom" | "left";
  /** Выравнивание относительно триггера */
  align?: "start" | "center" | "end";
  /** Отступ от триггера (px) */
  sideOffset?: number;
  className?: string;
};

/** Всплывающий интерактивный контейнер привязанный к триггеру: dropdown-меню, фильтры, карточки пользователя */
export function Popover({ open, defaultOpen, onOpenChange, children }: PopoverProps) {
  return (
    <PopoverPrimitive.Root open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      {children}
    </PopoverPrimitive.Root>
  );
}

/** Элемент-триггер (оборачивает asChild) */
export function PopoverTrigger({ children }: { children: React.ReactNode }) {
  return <PopoverPrimitive.Trigger asChild>{children}</PopoverPrimitive.Trigger>;
}

/** Всплывающий контент */
export function PopoverContent({
  children,
  side = "bottom",
  align = "start",
  sideOffset = 6,
  className,
}: PopoverContentProps) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        side={side}
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "z-50 min-w-[200px] rounded-[var(--radius-md)]",
          "bg-[var(--surface)] border border-[var(--border)]",
          "p-1 shadow-xl",
          "animate-in fade-in-0 zoom-in-95",
          "data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2",
          "data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2",
          "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
          className
        )}
      >
        {children}
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Portal>
  );
}

/** Кнопка закрытия внутри контента */
export function PopoverClose({ children }: { children: React.ReactNode }) {
  return <PopoverPrimitive.Close asChild>{children}</PopoverPrimitive.Close>;
}
