import { Badge } from "@components/data-display/badge/Badge";
import { CodeBlock } from "@components/data-display/code-block/CodeBlock";
import { CodeBlockContent } from "@components/data-display/code-block/CodeBlockContent";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@components/disclosure/collapsible/Collapsible";
import { Spinner } from "@components/feedback/spinner/Spinner";
import { HStack } from "@components/layout/HStack";
import { Stack } from "@components/layout/Stack";
import { Text } from "@components/typography/Text";
import { cn } from "@lib/cn";
import { Wrench } from "lucide-react";
import type React from "react";
import { toDisplayJson } from "./utils";

export type ToolCallStatus = "pending" | "running" | "success" | "error";

const STATUS_LABEL: Record<ToolCallStatus, string> = {
  pending: "Ожидание",
  running: "Выполняется",
  success: "Готово",
  error: "Ошибка",
};

const STATUS_VARIANT: Record<
  Exclude<ToolCallStatus, "running">,
  "default" | "success" | "error"
> = {
  pending: "default",
  success: "success",
  error: "error",
};

export type ToolCallProps = {
  /** Имя инструмента/функции — рендерится моноширинным шрифтом */
  name: string;
  /** pending — нейтральный бейдж, running — спиннер вместо бейджа, success/error — цветной бейдж */
  status?: ToolCallStatus;
  /** Аргументы вызова — объект/массив форматируется как JSON, строка выводится как есть */
  input?: unknown;
  /** Результат вызова — по умолчанию форматируется как JSON, если не передан `renderOutput` */
  output?: unknown;
  /** Кастомный рендер результата вместо дефолтного JSON-блока (например график, таблица, превью) */
  renderOutput?: (output: unknown) => React.ReactNode;
  /** Текст ошибки — показывается вместо output при `status="error"` */
  error?: string;
  /** Иконка инструмента слева от имени (по умолчанию — гаечный ключ) */
  icon?: React.ReactNode;
  /** Uncontrolled начальное состояние раскрытия тела карточки */
  defaultExpanded?: boolean;
  /** Controlled состояние раскрытия */
  expanded?: boolean;
  /** Вызывается при переключении раскрытия */
  onExpandedChange?: (expanded: boolean) => void;
  className?: string;
};

/**
 * Карточка вызова tool/function-call в сообщении AI. Presentational — принимает уже
 * нормализованные `name/status/input/output`, не привязана к формату конкретного
 * AI SDK/провайдера. Заголовок раскрывается только если есть что показать (input, output
 * или error) — иначе шеврон скрыт и клик не работает.
 */
export function ToolCall({
  name,
  status = "pending",
  input,
  output,
  renderOutput,
  error,
  icon,
  defaultExpanded,
  expanded,
  onExpandedChange,
  className,
}: ToolCallProps) {
  const hasError = status === "error" && Boolean(error);
  const hasOutput = output !== undefined && !hasError;
  const hasInput = input !== undefined;
  const hasContent = hasInput || hasOutput || hasError;

  return (
    <Collapsible
      open={expanded}
      defaultOpen={defaultExpanded}
      onOpenChange={onExpandedChange}
      disabled={!hasContent}
      className={cn(
        "rounded-[var(--radius-lg)] border border-[var(--border)]",
        "bg-[var(--surface)] overflow-hidden",
        className
      )}
    >
      <CollapsibleTrigger
        showChevron={hasContent}
        className="px-3.5 py-2.5 gap-2.5 hover:bg-[var(--surface-2)]"
      >
        <HStack gap={2} className="flex-1 min-w-0">
          <span className="shrink-0 flex items-center text-[var(--text-muted)]">
            {icon ?? <Wrench size={14} />}
          </span>
          <Text as="span" mono size="sm" weight="medium" truncate>
            {name}
          </Text>
        </HStack>

        {status === "running" ? (
          <Spinner size="sm" className="text-[var(--primary)]" />
        ) : (
          <Badge variant={STATUS_VARIANT[status]}>{STATUS_LABEL[status]}</Badge>
        )}
      </CollapsibleTrigger>

      {hasContent && (
        <CollapsibleContent className="px-3.5 pb-3.5 pt-1">
          <Stack gap={2.5}>
            {hasInput && (
              <Stack gap={1}>
                <span className="text-[11px] font-medium uppercase tracking-wide text-[var(--text-muted)]">
                  Input
                </span>
                <CodeBlock code={toDisplayJson(input)} lang="json">
                  <CodeBlockContent />
                </CodeBlock>
              </Stack>
            )}

            {hasError && (
              <Stack gap={1}>
                <span className="text-[11px] font-medium uppercase tracking-wide text-[var(--text-muted)]">
                  Error
                </span>
                <p className="text-[13px] text-[var(--error)] bg-[rgba(248,113,113,0.08)] border border-[rgba(248,113,113,0.25)] rounded-[var(--radius-md)] p-3 whitespace-pre-wrap">
                  {error}
                </p>
              </Stack>
            )}

            {hasOutput && (
              <Stack gap={1}>
                <span className="text-[11px] font-medium uppercase tracking-wide text-[var(--text-muted)]">
                  Output
                </span>
                {renderOutput ? (
                  renderOutput(output)
                ) : (
                  <CodeBlock code={toDisplayJson(output)} lang="json">
                    <CodeBlockContent />
                  </CodeBlock>
                )}
              </Stack>
            )}
          </Stack>
        </CollapsibleContent>
      )}
    </Collapsible>
  );
}
