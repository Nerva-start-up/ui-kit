import type React from "react";
import { cn } from "../../../lib/cn";
import { Tooltip } from "../../overlay/tooltip/Tooltip";
import { useFloatButtonGroupContext } from "./context";

export type FloatButtonBadge = {
  /** Число в бейдже (обрезается по `max`) */
  count?: number;
  /** Точка вместо числа */
  dot?: boolean;
  /** Порог, после которого показывается `${max}+` */
  max?: number;
};

export type FloatButtonProps = {
  /** Иконка кнопки */
  icon?: React.ElementType;
  /** Подпись под иконкой — видна только при `shape="square"` */
  description?: React.ReactNode;
  /** Текст всплывающей подсказки (требует `TooltipProvider` в корне приложения) */
  tooltip?: React.ReactNode;
  /** Визуальный стиль */
  type?: "default" | "primary";
  /** Форма кнопки — если не задана, наследуется от `FloatButtonGroup` */
  shape?: "circle" | "square";
  /** Рендерит `<a>` вместо `<button>` */
  href?: string;
  /** `target` для `<a>`, работает только вместе с `href` */
  target?: string;
  onClick?: () => void;
  /** Счётчик/точка в углу кнопки */
  badge?: FloatButtonBadge;
  className?: string;
};

/** Плавающая круглая/квадратная кнопка действия, обычно закреплённая в углу экрана. */
export function FloatButton({
  icon: Icon,
  description,
  tooltip,
  type = "default",
  shape,
  href,
  target,
  onClick,
  badge,
  className,
}: FloatButtonProps) {
  const group = useFloatButtonGroupContext();
  const resolvedShape = shape ?? group?.shape ?? "circle";
  const Tag = href ? "a" : "button";

  const button = (
    <Tag
      href={href}
      target={target}
      type={Tag === "button" ? "button" : undefined}
      onClick={onClick}
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center gap-0.5 shadow-lg",
        "cursor-pointer transition-colors duration-150",
        resolvedShape === "circle"
          ? "h-14 w-14 rounded-full"
          : "h-16 w-16 flex-col rounded-[var(--radius-lg)] p-1",
        type === "primary"
          ? "bg-[var(--primary)] text-[#0d1117] hover:bg-[var(--primary-h)]"
          : "bg-[var(--surface)] text-[var(--text)] border border-[var(--border)] hover:bg-[var(--surface-2)]",
        className
      )}
    >
      {Icon && <Icon size={resolvedShape === "square" ? 18 : 20} />}
      {description && resolvedShape === "square" && (
        <span className="text-[10px] leading-none">{description}</span>
      )}
      {badge?.dot && (
        <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-[var(--error)]" />
      )}
      {!badge?.dot && badge?.count !== undefined && badge.count > 0 && (
        <span className="absolute -top-1 -right-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[var(--error)] px-1 text-[10px] font-medium text-white">
          {badge.count > (badge.max ?? 99) ? `${badge.max ?? 99}+` : badge.count}
        </span>
      )}
    </Tag>
  );

  return tooltip ? (
    <Tooltip content={tooltip} side="left">
      {button}
    </Tooltip>
  ) : (
    button
  );
}
