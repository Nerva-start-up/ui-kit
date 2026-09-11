import { Button } from "@components/actions/button/Button";
import { HStack } from "@components/layout/HStack";
import { Stack } from "@components/layout/Stack";
import { cn } from "@lib/cn";
import { ArrowUp, Square } from "lucide-react";
import type React from "react";
import { useChatInput } from "./useChatInput";

const sizeClasses = {
  sm: "text-sm py-2 px-3",
  md: "text-[15px] py-2.5 px-3.5",
  lg: "text-base py-3 px-4",
};

export type ChatInputProps = {
  /** Controlled текст поля */
  value?: string;
  /** Uncontrolled начальное значение */
  defaultValue?: string;
  /** Вызывается при каждом изменении текста */
  onChange?: (value: string) => void;
  /** Enter без Shift — сабмит непустого (не только из пробелов) текста; Shift+Enter — перенос строки */
  onSubmit?: (value: string) => void;
  /** Клик по кнопке остановки, показывается вместо отправки при `loading` */
  onStop?: () => void;
  /** Плотность контрола */
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  /** Подменяет кнопку отправки на кнопку остановки генерации */
  loading?: boolean;
  /** Максимальная длина текста (нативный `maxLength` textarea) */
  maxLength?: number;
  placeholder?: string;
  /** Слот над textarea — например ряд `AttachmentChip` с вложениями */
  topSlot?: React.ReactNode;
  /** Левая часть нижнего тулбара (кнопка вложений, выбор модели и т.п.) */
  toolbarStart?: React.ReactNode;
  /** Правая часть нижнего тулбара, перед кнопкой отправки/остановки */
  toolbarEnd?: React.ReactNode;
  /** Кастомная иконка кнопки отправки (по умолчанию стрелка вверх) */
  submitIcon?: React.ReactNode;
  /** Кастомная иконка кнопки остановки (по умолчанию залитый квадрат) */
  stopIcon?: React.ReactNode;
  /** aria-label кнопки отправки */
  submitLabel?: string;
  /** aria-label кнопки остановки */
  stopLabel?: string;
  className?: string;
};

/**
 * Композер AI-чата: textarea с auto-grow по контенту, Enter-сабмит (Shift+Enter — перенос
 * строки, ввод через IME не сабмитится по промежуточному Enter), верхний слот для вложений и
 * нижний тулбар со слотами по краям. Presentational-компонент — ничего не знает про
 * AI-провайдера или формат сообщений, только текст и callbacks.
 */
export function ChatInput({
  value,
  defaultValue,
  onChange,
  onSubmit,
  onStop,
  size = "md",
  disabled = false,
  loading = false,
  maxLength,
  placeholder,
  topSlot,
  toolbarStart,
  toolbarEnd,
  submitIcon,
  stopIcon,
  submitLabel = "Отправить",
  stopLabel = "Остановить",
  className,
}: ChatInputProps) {
  const { text, textareaRef, setText, submit, handleKeyDown, canSubmit } = useChatInput({
    value,
    defaultValue,
    onChange,
    onSubmit,
    disabled,
    loading,
  });

  return (
    <Stack
      gap={0}
      className={cn(
        "bg-[var(--surface-2)] border rounded-[var(--radius-lg)]",
        "transition-[border-color,box-shadow] duration-150",
        !disabled && [
          "border-[var(--border)]",
          "focus-within:border-[var(--primary)]",
          "focus-within:shadow-[0_0_0_3px_rgba(249,115,22,0.15)]",
        ],
        disabled && "border-[var(--border)] opacity-50 pointer-events-none",
        className
      )}
    >
      {topSlot && <div className="flex flex-wrap gap-2 px-3.5 pt-3">{topSlot}</div>}

      <textarea
        ref={textareaRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        maxLength={maxLength}
        placeholder={placeholder}
        rows={1}
        className={cn(
          "w-full resize-none bg-transparent outline-none",
          "text-[var(--text)] placeholder:text-[var(--text-muted)]",
          "caret-[var(--primary)] leading-relaxed",
          "max-h-[45vh] overflow-y-auto",
          "disabled:cursor-not-allowed",
          sizeClasses[size]
        )}
      />

      <HStack justify="between" className="px-2.5 pb-2.5 pt-1">
        <HStack gap={1}>{toolbarStart}</HStack>
        <HStack gap={1}>
          {toolbarEnd}
          {loading ? (
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={onStop}
              disabled={disabled}
              aria-label={stopLabel}
            >
              {stopIcon ?? <Square size={13} fill="currentColor" />}
            </Button>
          ) : (
            <Button
              type="button"
              variant="primary"
              size="icon"
              onClick={submit}
              disabled={!canSubmit}
              aria-label={submitLabel}
            >
              {submitIcon ?? <ArrowUp size={16} />}
            </Button>
          )}
        </HStack>
      </HStack>
    </Stack>
  );
}
