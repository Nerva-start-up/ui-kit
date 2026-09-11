import { Upload as UploadIcon } from "lucide-react";
import type React from "react";
import { useId, useState } from "react";
import { cn } from "../../../lib/cn";
import { Flex } from "../../layout/Flex";
import { Stack } from "../../layout/Stack";
import { UploadRow } from "./UploadRow";
import { useUpload } from "./useUpload";

export type UploadProps = {
  /** Загружает один файл — вызывает `onProgress(0..100)` по ходу, резолвится по завершении */
  uploadFn: (file: File, onProgress: (percent: number) => void) => Promise<void>;
  /** Фильтр типов файлов, например ".pdf,.docx" */
  accept?: string;
  /** Несколько файлов за раз */
  multiple?: boolean;
  /** Лимит размера одного файла, МБ */
  maxSizeMB?: number;
  /** Максимум файлов в очереди */
  maxFiles?: number;
  disabled?: boolean;
  /** Текст в зоне загрузки */
  label?: string;
  /** Подсказка под label */
  hint?: string;
  /** Файлы добавлены в очередь (до начала загрузки) */
  onFilesAdded?: (files: File[]) => void;
  /** Файл успешно загружен */
  onFileSuccess?: (file: File) => void;
  /** Ошибка загрузки файла */
  onFileError?: (file: File, error: unknown) => void;
  className?: string;
};

/** Загрузка файлов с очередью, прогресс-баром на файл и повтором при ошибке. */
export function Upload({
  uploadFn,
  accept,
  multiple = true,
  maxSizeMB,
  maxFiles,
  disabled = false,
  label,
  hint,
  onFilesAdded,
  onFileSuccess,
  onFileError,
  className,
}: UploadProps) {
  const inputId = useId();
  const [dragging, setDragging] = useState(false);
  const [sizeError, setSizeError] = useState<string | null>(null);
  const { queue, addFiles, retry, remove } = useUpload({
    uploadFn,
    maxFiles,
    onFilesAdded,
    onFileSuccess,
    onFileError,
  });

  function process(fileList: FileList | null) {
    if (!fileList?.length) return;
    const files = Array.from(fileList);
    if (maxSizeMB) {
      const over = files.find((f) => f.size > maxSizeMB * 1024 * 1024);
      if (over) {
        setSizeError(`Максимальный размер: ${maxSizeMB} МБ`);
        return;
      }
    }
    setSizeError(null);
    addFiles(files);
  }

  function onDragOver(e: React.DragEvent) {
    e.preventDefault();
    if (!disabled) setDragging(true);
  }
  function onDragLeave() {
    setDragging(false);
  }
  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
    if (!disabled) process(e.dataTransfer.files);
  }

  return (
    <Stack gap={3} className={className}>
      <Flex asChild direction="col" align="center" justify="center" gap={2}>
        <label
          htmlFor={inputId}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          className={cn(
            "p-6 rounded-[var(--radius-lg)] border-2 border-dashed",
            "transition-colors duration-150",
            dragging
              ? "cursor-copy border-[var(--primary)] bg-[var(--primary-dim)]"
              : "cursor-pointer border-[var(--border)] bg-[var(--surface-2)] hover:border-[var(--text-muted)]",
            disabled && "pointer-events-none cursor-not-allowed opacity-40"
          )}
        >
          <UploadIcon
            size={22}
            className={dragging ? "text-[var(--primary)]" : "text-[var(--text-muted)]"}
          />
          <p className="text-sm text-[var(--text)]">
            {label ?? "Перетащите файлы или нажмите для выбора"}
          </p>
          {hint && <p className="text-xs text-[var(--text-muted)]">{hint}</p>}

          <input
            id={inputId}
            type="file"
            accept={accept}
            multiple={multiple}
            disabled={disabled}
            className="sr-only"
            onChange={(e) => {
              process(e.target.files);
              e.target.value = "";
            }}
          />
        </label>
      </Flex>

      {sizeError && <p className="text-[13px] text-[var(--error)]">{sizeError}</p>}

      {queue.length > 0 && (
        <Stack gap={2}>
          {queue.map((entry) => (
            <UploadRow
              key={entry.id}
              entry={entry}
              onRetry={() => retry(entry.id)}
              onRemove={() => remove(entry.id)}
            />
          ))}
        </Stack>
      )}
    </Stack>
  );
}
