import { AlertTriangle } from "lucide-react";
import type React from "react";
import { cn } from "../../../lib/cn";
import { Button } from "../../actions/button/Button";
import { Flex } from "../../layout/Flex";
import { HStack } from "../../layout/HStack";
import { Stack } from "../../layout/Stack";
import { Popover, PopoverContent, PopoverTrigger } from "../popover/Popover";
import { usePopconfirm } from "./usePopconfirm";

export type PopconfirmProps = {
  /** Элемент-триггер (кнопка, иконка и т.д.) */
  children: React.ReactNode;
  /** Основной вопрос */
  title: string;
  /** Пояснение под вопросом */
  description?: string;
  /** Текст кнопки подтверждения */
  confirmText?: string;
  /** Текст кнопки отмены */
  cancelText?: string;
  /** Красная кнопка подтверждения — для деструктивных действий */
  danger?: boolean;
  /** Подтверждение — может быть async, кнопки блокируются на время ожидания */
  onConfirm: () => void | Promise<void>;
  /** Callback отмены */
  onCancel?: () => void;
  /** Controlled состояние */
  open?: boolean;
  /** Uncontrolled начальное состояние */
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Сторона появления */
  side?: "top" | "right" | "bottom" | "left";
  className?: string;
};

/** Лёгкое инлайн-подтверждение перед действием — альтернатива полноэкранному `AlertDialog` для рутинных операций (удаление строки таблицы и т.п.). */
export function Popconfirm({
  children,
  title,
  description,
  confirmText = "Подтвердить",
  cancelText = "Отмена",
  danger = false,
  onConfirm,
  onCancel,
  open,
  defaultOpen,
  onOpenChange,
  side = "top",
  className,
}: PopconfirmProps) {
  const { isOpen, setOpen, confirming, handleConfirm, handleCancel } = usePopconfirm({
    open,
    defaultOpen,
    onOpenChange,
    onConfirm,
    onCancel,
  });

  return (
    <Popover open={isOpen} onOpenChange={setOpen}>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent side={side} className={cn("w-72 p-4", className)}>
        <Flex gap={2.5}>
          <AlertTriangle
            size={18}
            className={cn("mt-0.5 shrink-0", danger ? "text-[var(--error)]" : "text-[#fbbf24]")}
          />
          <Stack gap={1}>
            <p className="text-sm font-medium text-[var(--text)]">{title}</p>
            {description && <p className="text-xs text-[var(--text-muted)]">{description}</p>}
          </Stack>
        </Flex>

        <HStack justify="end" gap={2} className="mt-3">
          <Button variant="ghost" size="sm" onClick={handleCancel} disabled={confirming}>
            {cancelText}
          </Button>
          <Button
            variant={danger ? "danger" : "primary"}
            size="sm"
            onClick={handleConfirm}
            loading={confirming}
          >
            {confirmText}
          </Button>
        </HStack>
      </PopoverContent>
    </Popover>
  );
}
