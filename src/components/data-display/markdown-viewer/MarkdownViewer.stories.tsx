import { Stack } from "@components/layout/Stack";
import { Text } from "@components/typography/Text";
import type { Story } from "@ladle/react";
import { useState } from "react";
import { MarkdownViewer } from "./MarkdownViewer";

export default { title: "Components / Data Display / MarkdownViewer" };

function FilePicker({ onPick }: { onPick: (file: File) => void }) {
  return (
    <input
      type="file"
      accept=".md,text/markdown"
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
        Выберите `.md`-файл с диска — содержимое загружается и рендерится через `Markdown` внутри
        скроллируемой области фиксированной высоты.
      </Text>
      <FilePicker onPick={setFile} />
      {file && <MarkdownViewer src={file} />}
    </Stack>
  );
};

/* ── По ссылке (уже загруженный на сервер файл) ────────── */
export const FromInlineSource: Story = () => {
  const blob = new Blob(
    [
      [
        "# Отчёт по практике",
        "",
        "Обнаружена **уязвимость** в модуле авторизации.",
        "",
        "- Пункт первый",
        "- Пункт второй",
        "",
        "```ts",
        "const ok = true;",
        "```",
      ].join("\n"),
    ],
    { type: "text/markdown" }
  );

  return (
    <Stack gap={3} className="max-w-2xl">
      <Text size="sm" variant="muted">
        Тот же путь загрузки, что и для ссылки на сервере — здесь просто локальный `Blob` вместо
        реального URL.
      </Text>
      <MarkdownViewer src={blob} />
    </Stack>
  );
};

/* ── Длинный документ: оглавление, прогресс чтения, зум ─── */
export const LongDocumentWithToc: Story = () => {
  const sections = [
    "Введение",
    "Установка",
    "Настройка окружения",
    "Базовое использование",
    "Продвинутые сценарии",
    "Часто задаваемые вопросы",
  ];

  const blob = new Blob(
    [
      sections
        .map(
          (title, i) =>
            `# ${title}\n\nЭто раздел документа под номером ${i + 1}. ${"Текст раздела для заполнения пространства и проверки скролла. ".repeat(6)}\n\n## Подраздел\n\nЕщё немного текста в подразделе.`
        )
        .join("\n\n"),
    ],
    { type: "text/markdown" }
  );

  return (
    <Stack gap={3} className="max-w-2xl">
      <Text size="sm" variant="muted">
        Длинный документ с несколькими заголовками: кнопка «Оглавление» открывает список заголовков
        для быстрой навигации, тонкая полоса вверху показывает прогресс чтения, A-/A+ регулируют
        размер текста.
      </Text>
      <MarkdownViewer src={blob} />
    </Stack>
  );
};

/* ── Ошибка: недоступный источник ───────────────────────── */
export const LoadError: Story = () => (
  <Stack gap={3} className="max-w-2xl">
    <Text size="sm" variant="muted">
      Заведомо нерезолвящийся домен (`.invalid`, зарезервирован RFC 2606) — `fetch` падает на DNS,
      показывается состояние ошибки вместо падения. Относительный путь здесь не подходит: dev-сервер
      отдал бы на него свой index.html с кодом 200 (SPA-fallback), а не 404.
    </Text>
    <MarkdownViewer src="https://example.invalid/missing.md" />
  </Stack>
);
