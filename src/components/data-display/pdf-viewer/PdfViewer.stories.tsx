import { Stack } from "@components/layout/Stack";
import { Text } from "@components/typography/Text";
import type { Story } from "@ladle/react";
import { useState } from "react";
import { PdfViewer } from "./PdfViewer";

export default { title: "Components / Data Display / PdfViewer" };

function FilePicker({ onPick }: { onPick: (file: File) => void }) {
  return (
    <input
      type="file"
      accept="application/pdf"
      onChange={(e) => {
        const file = e.target.files?.[0];
        if (file) onPick(file);
      }}
      className="text-sm text-[var(--text-muted)]"
    />
  );
}

/* ── Default: локальный файл через input[type=file] ────── */
export const Default: Story = () => {
  const [file, setFile] = useState<File | null>(null);

  return (
    <Stack gap={3} className="max-w-lg">
      <Text size="sm" variant="muted">
        Выберите PDF-файл с диска — рендерится через `pdf.js` прямо в браузере, без загрузки на
        сервер.
      </Text>
      <FilePicker onPick={setFile} />
      {file && <PdfViewer src={file} className="border border-[var(--border)] p-2" />}
    </Stack>
  );
};

/* ── Без встроенной панели (кастомная навигация снаружи) ── */
export const WithoutToolbar: Story = () => {
  const [file, setFile] = useState<File | null>(null);
  const [page, setPage] = useState(1);

  return (
    <Stack gap={3} className="max-w-lg">
      <FilePicker onPick={setFile} />
      {file && (
        <>
          <PdfViewer
            src={file}
            toolbar={false}
            page={page}
            onPageChange={setPage}
            className="border border-[var(--border)] p-2"
          />
          <Text size="xs" variant="muted">
            Текущая страница управляется извне: {page}
          </Text>
        </>
      )}
    </Stack>
  );
};

/* ── Ошибка: не-PDF файл ────────────────────────────────── */
export const InvalidFile: Story = () => {
  const file = new File(["это не PDF"], "not-a-pdf.pdf", { type: "application/pdf" });
  return (
    <Stack gap={3} className="max-w-lg">
      <Text size="sm" variant="muted">
        Файл с повреждёнными/не-PDF данными — показывается состояние ошибки вместо падения.
      </Text>
      <PdfViewer src={file} className="border border-[var(--border)] p-2" />
    </Stack>
  );
};
