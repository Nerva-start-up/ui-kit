import {
  AlertTriangle,
  CheckCircle2,
  Info,
  SearchX,
  ServerCrash,
  ShieldOff,
  XCircle,
} from "lucide-react";
import type React from "react";
import { cn } from "../../../lib/cn";
import { Center } from "../../layout/Center";
import { Flex } from "../../layout/Flex";
import { HStack } from "../../layout/HStack";

export type ResultStatus = "success" | "error" | "warning" | "info" | "403" | "404" | "500";

const statusConfig: Record<
  ResultStatus,
  { icon: React.ElementType; color: string; defaultTitle: string }
> = {
  success: { icon: CheckCircle2, color: "var(--success)", defaultTitle: "Успешно" },
  error: { icon: XCircle, color: "var(--error)", defaultTitle: "Ошибка" },
  warning: { icon: AlertTriangle, color: "#fbbf24", defaultTitle: "Внимание" },
  info: { icon: Info, color: "var(--info)", defaultTitle: "Информация" },
  "403": { icon: ShieldOff, color: "var(--error)", defaultTitle: "Доступ запрещён" },
  "404": { icon: SearchX, color: "var(--text-muted)", defaultTitle: "Страница не найдена" },
  "500": { icon: ServerCrash, color: "var(--error)", defaultTitle: "Ошибка сервера" },
};

export type ResultProps = {
  /** Тип результата — задаёт иконку, цвет и заголовок по умолчанию */
  status?: ResultStatus;
  /** Заголовок (перекрывает заголовок по умолчанию для `status`) */
  title?: string;
  /** Пояснение под заголовком */
  subtitle?: string;
  /** Кастомная иконка вместо стандартной для `status` */
  icon?: React.ElementType;
  /** Кнопки действий под текстом */
  extra?: React.ReactNode;
  className?: string;
};

/** Страница-итог действия (success/error/403/404/500…). В отличие от `EmptyState` ("данных пока нет") — сообщает исход операции. */
export function Result({ status = "info", title, subtitle, icon, extra, className }: ResultProps) {
  const config = statusConfig[status];
  const Icon = icon ?? config.icon;

  return (
    <Flex
      direction="col"
      align="center"
      justify="center"
      className={cn("px-4 py-16 text-center", className)}
    >
      <Center
        className="mb-5 h-16 w-16 rounded-[var(--radius-lg)]"
        style={{ background: `color-mix(in srgb, ${config.color} 12%, transparent)` }}
      >
        <Icon size={30} style={{ color: config.color }} strokeWidth={1.75} />
      </Center>
      <h2 className="text-lg font-semibold text-[var(--text)]">{title ?? config.defaultTitle}</h2>
      {subtitle && <p className="mt-1 max-w-sm text-sm text-[var(--text-muted)]">{subtitle}</p>}
      {extra && (
        <HStack gap={3} className="mt-6">
          {extra}
        </HStack>
      )}
    </Flex>
  );
}
