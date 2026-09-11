import { File, Upload, X } from "lucide-react";
import { useRef, useState } from "react";
import { cn } from "../../../lib/cn";
import { Flex } from "../../layout/Flex";
import { Stack } from "../../layout/Stack";

export type DropzoneProps = {
  onFiles: (files: File[]) => void;
  /** Фильтр типов файлов, например ".pdf,.docx" */
  accept?: string;
  /** Несколько файлов */
  multiple?: boolean;
  /** Лимит размера, показывает ошибку */
  maxSizeMB?: number;
  disabled?: boolean;
  /** Текст в idle-состоянии */
  label?: string;
  /** Подсказка под label */
  hint?: string;
  className?: string;
};

/** Зона drag-and-drop загрузки файлов, вызывает `onFiles` с массивом файлов */
export function Dropzone({
  onFiles,
  accept,
  multiple,
  maxSizeMB,
  disabled,
  label,
  hint,
  className,
}: DropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [selected, setSelected] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);

  const process = (fileList: FileList | null) => {
    if (!fileList?.length) return;
    const files = Array.from(fileList);
    if (maxSizeMB) {
      const over = files.find((f) => f.size > maxSizeMB * 1024 * 1024);
      if (over) {
        setError(`Максимальный размер: ${maxSizeMB} МБ`);
        return;
      }
    }
    setError(null);
    setSelected(files);
    onFiles(files);
  };

  const clear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelected([]);
    setError(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) setDragging(true);
  };
  const onDragLeave = () => setDragging(false);
  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    if (!disabled) process(e.dataTransfer.files);
  };

  return (
    <Stack gap={1.5} className={className}>
      <Flex
        direction="col"
        align="center"
        justify="center"
        gap={3}
        // biome-ignore lint/a11y/useSemanticElements: dropzone contains nested buttons, cannot be a button itself
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled}
        onClick={() => !disabled && !selected.length && inputRef.current?.click()}
        onKeyDown={(e) =>
          e.key === "Enter" && !disabled && !selected.length && inputRef.current?.click()
        }
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={cn(
          "p-8 border-2 border-dashed rounded-[var(--radius-lg)]",
          "transition-colors duration-150 outline-none",
          selected.length
            ? "border-[var(--primary)] bg-[var(--primary-dim)] cursor-default"
            : dragging
              ? "border-[var(--primary)] bg-[var(--primary-dim)] cursor-copy"
              : "border-[var(--border)] bg-[var(--surface-2)] cursor-pointer hover:border-[var(--text-muted)]",
          disabled && "opacity-40 cursor-not-allowed pointer-events-none"
        )}
      >
        {selected.length ? (
          /* Selected state */
          <Stack align="center" gap={2} className="w-full">
            <File size={28} className="text-[var(--primary)] shrink-0" />
            <div className="text-center">
              {selected.map((f) => (
                <p
                  key={f.name}
                  className="text-sm font-medium text-[var(--text)] truncate max-w-[220px]"
                >
                  {f.name}
                </p>
              ))}
              <p className="text-xs text-[var(--text-muted)] mt-0.5">
                {selected.length === 1
                  ? `${(selected[0].size / 1024).toFixed(0)} КБ`
                  : `${selected.length} файлов`}
              </p>
            </div>
            <button
              type="button"
              onClick={clear}
              className="inline-flex items-center gap-1 text-xs text-[var(--text-muted)] hover:text-[var(--error)] transition-colors"
            >
              <X size={12} /> Убрать
            </button>
          </Stack>
        ) : (
          /* Idle / dragging state */
          <>
            <Upload
              size={26}
              className={cn(
                "transition-colors",
                dragging ? "text-[var(--primary)]" : "text-[var(--text-muted)]"
              )}
            />
            <div className="text-center">
              <p className="text-sm text-[var(--text)]">
                {label ?? "Перетащите файл или нажмите для выбора"}
              </p>
              {hint && <p className="text-xs text-[var(--text-muted)] mt-1">{hint}</p>}
            </div>
          </>
        )}
      </Flex>

      {error && <p className="text-[13px] text-[var(--error)]">{error}</p>}

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        className="hidden"
        onChange={(e) => process(e.target.files)}
      />
    </Stack>
  );
}
