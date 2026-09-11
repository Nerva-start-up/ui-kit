import { Stack } from "@components/layout/Stack";
import { Text } from "@components/typography/Text";
import type { Story } from "@ladle/react";
import { useState } from "react";
import { DocxViewer } from "./DocxViewer";

export default { title: "Components / Data Display / DocxViewer" };

function FilePicker({ onPick }: { onPick: (file: File) => void }) {
  return (
    <input
      type="file"
      accept=".docx"
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
    <Stack gap={3} className="max-w-2xl">
      <Text size="sm" variant="muted">
        Выберите `.docx`-файл с диска — рендерится через `docx-preview` с сохранением вёрстки Word,
        без загрузки на сервер. Скроллируемая область фиксированной высоты, счётчик страницы
        обновляется при скролле, клик по нему — переход на конкретную страницу, зум справа.
      </Text>
      <FilePicker onPick={setFile} />
      {file && <DocxViewer src={file} />}
    </Stack>
  );
};

/* ── Controlled page: индикатор снаружи следит за скроллом ── */
export const ControlledPage: Story = () => {
  const [file, setFile] = useState<File | null>(null);
  const [page, setPage] = useState(1);

  return (
    <Stack gap={3} className="max-w-2xl">
      <Text size="sm" variant="muted">
        `page`/`onPageChange` — controlled: значение обновляется как при скролле документа, так и
        при кликах в тулбаре.
      </Text>
      <FilePicker onPick={setFile} />
      {file && (
        <>
          <DocxViewer src={file} page={page} onPageChange={setPage} />
          <Text size="xs" variant="muted">
            Текущая видимая страница: {page}
          </Text>
        </>
      )}
    </Stack>
  );
};

/* ── Ошибка: не-DOCX файл ───────────────────────────────── */
export const InvalidFile: Story = () => {
  const file = new File(["это не docx"], "not-a-docx.docx");
  return (
    <Stack gap={3} className="max-w-2xl">
      <Text size="sm" variant="muted">
        Файл с повреждёнными/не-DOCX данными — показывается состояние ошибки вместо падения.
      </Text>
      <DocxViewer src={file} />
    </Stack>
  );
};
