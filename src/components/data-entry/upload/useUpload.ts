import { useCallback, useState } from "react";
import type { UploadFile } from "./types";
import { genId } from "./utils";

export type UseUploadOptions = {
  uploadFn: (file: File, onProgress: (percent: number) => void) => Promise<void>;
  /** Максимум файлов в очереди — лишние из добавляемых игнорируются */
  maxFiles?: number;
  onFilesAdded?: (files: File[]) => void;
  onFileSuccess?: (file: File) => void;
  onFileError?: (file: File, error: unknown) => void;
};

/** Очередь загрузки: добавление, прогресс на файл, повтор и удаление. */
export function useUpload({
  uploadFn,
  maxFiles,
  onFilesAdded,
  onFileSuccess,
  onFileError,
}: UseUploadOptions) {
  const [queue, setQueue] = useState<UploadFile[]>([]);

  const updateEntry = useCallback((id: string, patch: Partial<UploadFile>) => {
    setQueue((prev) => prev.map((entry) => (entry.id === id ? { ...entry, ...patch } : entry)));
  }, []);

  const runUpload = useCallback(
    (entry: UploadFile) => {
      updateEntry(entry.id, { status: "uploading", progress: 0, error: undefined });
      uploadFn(entry.file, (percent) => updateEntry(entry.id, { progress: percent }))
        .then(() => {
          updateEntry(entry.id, { status: "success", progress: 100 });
          onFileSuccess?.(entry.file);
        })
        .catch((error: unknown) => {
          updateEntry(entry.id, {
            status: "error",
            error: error instanceof Error ? error.message : "Ошибка загрузки",
          });
          onFileError?.(entry.file, error);
        });
    },
    [uploadFn, updateEntry, onFileSuccess, onFileError]
  );

  const addFiles = useCallback(
    (files: File[]) => {
      const room = maxFiles ? Math.max(0, maxFiles - queue.length) : files.length;
      const accepted = files.slice(0, room);
      if (accepted.length === 0) return;

      const entries: UploadFile[] = accepted.map((file) => ({
        id: genId(),
        file,
        status: "queued",
        progress: 0,
      }));
      setQueue((prev) => [...prev, ...entries]);
      onFilesAdded?.(accepted);
      for (const entry of entries) runUpload(entry);
    },
    [queue.length, maxFiles, onFilesAdded, runUpload]
  );

  const retry = useCallback(
    (id: string) => {
      const entry = queue.find((e) => e.id === id);
      if (entry) runUpload(entry);
    },
    [queue, runUpload]
  );

  const remove = useCallback((id: string) => {
    setQueue((prev) => prev.filter((entry) => entry.id !== id));
  }, []);

  return { queue, addFiles, retry, remove };
}
