import { getFileIconConfig } from "@components/data-display/file-card/fileIcon";
import { formatFileSize } from "@components/data-entry/upload/utils";
import { Spinner } from "@components/feedback/spinner/Spinner";
import { cn } from "@lib/cn";
import { X } from "lucide-react";

export type AttachmentStatus = "idle" | "uploading" | "done" | "error";

export type AttachmentChipProps = {
  /** Имя файла */
  name: string;
  /** Размер в байтах — форматируется автоматически (Б/КБ/МБ) */
  size?: number;
  /** MIME-тип, например `image/png` — определяет, показывать ли превью-картинку */
  type?: string;
  /** URL превью-картинки — используется только если `type` начинается с `image/` */
  previewUrl?: string;
  /** idle/done — обычный вид, uploading — спиннер поверх миниатюры, error — красная обводка */
  status?: AttachmentStatus;
  /** 0..100, показывается вместо размера файла при `status="uploading"` */
  progress?: number;
  /** Текст ошибки, показывается вместо размера файла при `status="error"` */
  error?: string;
  /** Показывает кнопку удаления, если передан */
  onRemove?: () => void;
  /** aria-label кнопки удаления */
  removeLabel?: string;
  className?: string;
};

/**
 * Превью прикреплённого файла/картинки для верхнего слота `ChatInput`. Presentational —
 * не загружает файлы и не хранит очередь сама, только отображает переданное состояние.
 */
export function AttachmentChip({
  name,
  size,
  type,
  previewUrl,
  status = "idle",
  progress,
  error,
  onRemove,
  removeLabel = "Удалить",
  className,
}: AttachmentChipProps) {
  const isImage = Boolean(type?.startsWith("image/") && previewUrl);
  const extension = name.split(".").pop() ?? "";
  const { icon: Icon, color, bg } = getFileIconConfig(extension);

  const metaNode =
    status === "error" ? (
      <span className="text-[11px] text-[var(--error)] truncate">{error ?? "Ошибка загрузки"}</span>
    ) : status === "uploading" ? (
      <span className="text-[11px] text-[var(--text-muted)]">
        {progress != null ? `${Math.round(progress)}%` : "Загрузка…"}
      </span>
    ) : size != null ? (
      <span className="text-[11px] text-[var(--text-muted)]">{formatFileSize(size)}</span>
    ) : null;

  return (
    <div
      className={cn(
        "relative inline-flex items-center gap-2 max-w-[220px] p-1.5 pr-3",
        "bg-[var(--surface)] border rounded-[var(--radius-md)]",
        status === "error" ? "border-[var(--error)]" : "border-[var(--border)]",
        className
      )}
    >
      <div
        className="relative shrink-0 h-9 w-9 rounded-[var(--radius-sm)] overflow-hidden flex items-center justify-center"
        style={isImage ? undefined : { background: bg }}
      >
        {isImage ? (
          <img src={previewUrl} alt={name} className="h-full w-full object-cover" />
        ) : (
          <Icon size={18} style={{ color }} strokeWidth={1.75} />
        )}

        {status === "uploading" && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <Spinner size="sm" className="text-white" />
          </div>
        )}
      </div>

      <div className="min-w-0 flex flex-col gap-0.5">
        <span className="text-[13px] font-medium text-[var(--text)] truncate leading-snug">
          {name}
        </span>
        {metaNode}
      </div>

      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          aria-label={removeLabel}
          className={cn(
            "absolute -top-1.5 -right-1.5 flex h-[18px] w-[18px] items-center justify-center",
            "rounded-full bg-[var(--surface-2)] border border-[var(--border)]",
            "text-[var(--text-muted)] transition-colors",
            "hover:text-[var(--text)] hover:border-[var(--text-muted)]"
          )}
        >
          <X size={10} />
        </button>
      )}
    </div>
  );
}
