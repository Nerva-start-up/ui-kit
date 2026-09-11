import type { Story } from "@ladle/react";
import { Upload } from "./Upload";

export default { title: "Components / Data Entry / Upload" };

function simulateUpload(_file: File, onProgress: (percent: number) => void): Promise<void> {
  return new Promise((resolve) => {
    let percent = 0;
    const timer = setInterval(() => {
      percent = Math.min(100, percent + Math.round(Math.random() * 20 + 10));
      onProgress(percent);
      if (percent >= 100) {
        clearInterval(timer);
        resolve();
      }
    }, 300);
  });
}

function simulateFlakyUpload(file: File, onProgress: (percent: number) => void): Promise<void> {
  return new Promise((resolve, reject) => {
    let percent = 0;
    const timer = setInterval(() => {
      percent = Math.min(100, percent + Math.round(Math.random() * 20 + 10));
      onProgress(percent);
      if (percent >= 60 && file.name.includes("fail")) {
        clearInterval(timer);
        reject(new Error("Сервер недоступен, попробуйте снова"));
        return;
      }
      if (percent >= 100) {
        clearInterval(timer);
        resolve();
      }
    }, 300);
  });
}

/* ── Default ────────────────────────────────────────────── */
export const Default: Story = () => (
  <div className="max-w-md">
    <Upload uploadFn={simulateUpload} label="Загрузите решение задания" hint="PDF, DOCX до 10 МБ" />
  </div>
);

/* ── С ошибкой и повтором ───────────────────────────────── */
export const WithRetry: Story = () => (
  <div className="max-w-md">
    <Upload
      uploadFn={simulateFlakyUpload}
      label="Перетащите файлы (назовите один 'fail.pdf' для демо ошибки)"
    />
  </div>
);

/* ── Ограничения ────────────────────────────────────────── */
export const WithLimits: Story = () => (
  <div className="max-w-md">
    <Upload
      uploadFn={simulateUpload}
      accept=".pdf,.docx"
      maxSizeMB={5}
      maxFiles={3}
      label="До 3 файлов, не более 5 МБ каждый"
      hint="PDF или DOCX"
    />
  </div>
);

/* ── Один файл ──────────────────────────────────────────── */
export const SingleFile: Story = () => (
  <div className="max-w-md">
    <Upload uploadFn={simulateUpload} multiple={false} label="Только один файл" />
  </div>
);

/* ── Disabled ───────────────────────────────────────────── */
export const Disabled: Story = () => (
  <div className="max-w-md">
    <Upload uploadFn={simulateUpload} disabled label="Загрузка недоступна" />
  </div>
);
