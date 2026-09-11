import { ChevronDown } from "lucide-react";
import React from "react";
import { cn } from "../../../lib/cn";

/* ── Context ─────────────────────────────────────────────── */
type CollapsibleContextValue = {
  open: boolean;
  toggle: () => void;
  disabled: boolean;
  triggerId: string;
  contentId: string;
};

const CollapsibleContext = React.createContext<CollapsibleContextValue>({
  open: false,
  toggle: () => {},
  disabled: false,
  triggerId: "",
  contentId: "",
});

/* ── Collapsible ──────────────────────────────────────── */
export type CollapsibleProps = {
  /** Controlled состояние */
  open?: boolean;
  /** Uncontrolled начальное состояние */
  defaultOpen?: boolean;
  /** Callback изменения */
  onOpenChange?: (open: boolean) => void;
  /** Блокирует триггер */
  disabled?: boolean;
  /** Базовый id для aria-связей (по умолчанию useId()) */
  id?: string;
  className?: string;
  children: React.ReactNode;
};

/** Одиночный сворачиваемый блок: контекст состояния, controlled / uncontrolled, без Radix */
export function Collapsible({
  open,
  defaultOpen = false,
  onOpenChange,
  disabled = false,
  id,
  className,
  children,
}: CollapsibleProps) {
  const [internal, setInternal] = React.useState(defaultOpen);
  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : internal;

  const uid = React.useId();
  const baseId = id ?? uid;

  const toggle = () => {
    if (disabled) return;
    const next = !isOpen;
    if (!isControlled) setInternal(next);
    onOpenChange?.(next);
  };

  return (
    <CollapsibleContext.Provider
      value={{
        open: isOpen,
        toggle,
        disabled,
        triggerId: `${baseId}-trigger`,
        contentId: `${baseId}-content`,
      }}
    >
      <div data-state={isOpen ? "open" : "closed"} className={cn("flex flex-col", className)}>
        {children}
      </div>
    </CollapsibleContext.Provider>
  );
}

/* ── CollapsibleTrigger ───────────────────────────────── */
export type CollapsibleTriggerProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Показывает вращающийся шеврон справа */
  showChevron?: boolean;
};

/** <button> — переключает открытие, проставляет aria-expanded и aria-controls */
export function CollapsibleTrigger({
  className,
  children,
  showChevron = false,
  onClick,
  ...props
}: CollapsibleTriggerProps) {
  const { open, toggle, disabled, triggerId, contentId } = React.useContext(CollapsibleContext);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    toggle();
    onClick?.(e);
  };

  return (
    <button
      type="button"
      id={triggerId}
      aria-expanded={open}
      aria-controls={contentId}
      disabled={disabled}
      onClick={handleClick}
      className={cn(
        "flex w-full items-center justify-between gap-2",
        "text-left select-none transition-colors",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      {children}
      {showChevron && (
        <ChevronDown
          size={16}
          className={cn(
            "shrink-0 text-[var(--text-muted)] transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      )}
    </button>
  );
}

/* ── CollapsibleContent ───────────────────────────────── */
export type CollapsibleContentProps = {
  className?: string;
  children: React.ReactNode;
};

/** Анимированная секция; aria-labelledby ссылается на триггер */
export function CollapsibleContent({ className, children }: CollapsibleContentProps) {
  const { open, contentId, triggerId } = React.useContext(CollapsibleContext);

  return (
    <section
      id={contentId}
      aria-labelledby={triggerId}
      data-state={open ? "open" : "closed"}
      className={cn(
        "grid transition-[grid-template-rows] duration-200 ease-out",
        open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
      )}
    >
      <div className={cn("overflow-hidden", className)}>{children}</div>
    </section>
  );
}
