import type React from "react";
import { cn } from "../../../lib/cn";
import { CopyText } from "../copy-text/CopyText";
import { CopyTextTrigger } from "../copy-text/CopyTextTrigger";
import { CopyTextValue } from "../copy-text/CopyTextValue";

export type TdCopyProps = {
  /** Значение, которое будет скопировано в буфер обмена */
  text: string;
  /** Обрезать длинный текст (см. CopyTextValue) */
  truncate?: boolean;
  /** Маскировать значение точками (см. CopyTextValue) */
  mask?: boolean;
  /** Текст оверлея при копировании */
  copiedText?: string;
  /** Колбэк после успешного копирования */
  onCopied?: () => void;
  /** className для внутреннего <CopyText>, не для <td> */
  copyClassName?: string;
} & React.TdHTMLAttributes<HTMLTableCellElement>;

/** Ячейка `<td>` с копированием значения в буфер обмена (обёртка над CopyText) */
export function TdCopy({
  text,
  truncate,
  mask,
  copiedText,
  onCopied,
  copyClassName,
  className,
  ...props
}: TdCopyProps) {
  return (
    <td className={cn("p-1.5", className)} {...props}>
      <CopyText
        text={text}
        copiedText={copiedText}
        onCopied={onCopied}
        className={cn("w-full max-w-xs border-transparent bg-transparent", copyClassName)}
      >
        <CopyTextValue truncate={truncate} mask={mask} />
        <CopyTextTrigger />
      </CopyText>
    </td>
  );
}
