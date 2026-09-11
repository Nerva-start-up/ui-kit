import type { ReactNode } from "react";
import { cn } from "../../../lib/cn";
import { FileCardContext } from "./context";
import type { FileStatus } from "./types";

export type FileCardProps = {
  /** Расширение файла (pdf, docx, png…) — используется для иконки */
  fileType: string;
  /** Статус модерации */
  status?: FileStatus;
  /** Сделать карточку кликабельной (ссылка на скачивание / просмотр) */
  href?: string;
  /** Обработчик клика */
  onClick?: () => void;
  className?: string;
  children: ReactNode;
};

/** Корень. Хранит `status` и `fileType` в контексте. */
export function FileCard({
  fileType,
  status = "pending",
  href,
  onClick,
  className,
  children,
}: FileCardProps) {
  const isInteractive = !!(href || onClick);

  const inner = (
    <div
      className={cn(
        "group flex items-center gap-3 p-3",
        "bg-[var(--surface)] border border-[var(--border)]",
        "rounded-[var(--radius-lg)] transition-all duration-200",
        isInteractive &&
          "cursor-pointer hover:border-[var(--border-hover)] hover:bg-[var(--surface-2)]",
        className
      )}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onClick?.();
      }}
    >
      {children}
    </div>
  );

  return (
    <FileCardContext.Provider value={{ status, fileType }}>
      {href ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className="block">
          {inner}
        </a>
      ) : (
        inner
      )}
    </FileCardContext.Provider>
  );
}
