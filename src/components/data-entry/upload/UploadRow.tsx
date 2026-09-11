import { RotateCw, X } from "lucide-react";
import { cn } from "../../../lib/cn";
import { FileCard } from "../../data-display/file-card/FileCard";
import { FileCardActions } from "../../data-display/file-card/FileCardActions";
import { FileCardIcon } from "../../data-display/file-card/FileCardIcon";
import { FileCardInfo } from "../../data-display/file-card/FileCardInfo";
import { FileCardMeta } from "../../data-display/file-card/FileCardMeta";
import { FileCardName } from "../../data-display/file-card/FileCardName";
import { Progress } from "../../feedback/progress/Progress";
import type { UploadFile } from "./types";
import { formatFileSize } from "./utils";

export type UploadRowProps = {
  entry: UploadFile;
  onRetry: () => void;
  onRemove: () => void;
};

const buttonClass = cn(
  "rounded-[var(--radius-sm)] p-1 text-[var(--text-muted)] transition-colors",
  "hover:bg-[var(--surface-2)] hover:text-[var(--text)]"
);

/** Одна строка очереди `Upload` — иконка, имя, прогресс/ошибка, действия. */
export function UploadRow({ entry, onRetry, onRemove }: UploadRowProps) {
  const extension = entry.file.name.split(".").pop() ?? "";

  return (
    <FileCard fileType={extension}>
      <FileCardIcon />
      <FileCardInfo>
        <FileCardName>{entry.file.name}</FileCardName>
        {entry.status === "error" ? (
          <FileCardMeta className="text-[var(--error)]">
            {entry.error ?? "Ошибка загрузки"}
          </FileCardMeta>
        ) : (
          <Progress
            value={entry.progress}
            size="sm"
            status={
              entry.status === "success"
                ? "success"
                : entry.status === "uploading"
                  ? "active"
                  : "normal"
            }
          />
        )}
      </FileCardInfo>
      <FileCardMeta className="shrink-0">{formatFileSize(entry.file.size)}</FileCardMeta>
      <FileCardActions>
        {entry.status === "error" && (
          <button type="button" onClick={onRetry} aria-label="Повторить" className={buttonClass}>
            <RotateCw size={14} />
          </button>
        )}
        <button
          type="button"
          onClick={onRemove}
          aria-label="Удалить"
          className={cn(buttonClass, "hover:text-[var(--error)]")}
        >
          <X size={14} />
        </button>
      </FileCardActions>
    </FileCard>
  );
}
