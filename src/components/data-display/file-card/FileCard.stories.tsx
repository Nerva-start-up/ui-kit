import type { Story } from "@ladle/react";
import { Download, Eye, Trash2 } from "lucide-react";
import { Button } from "../../actions/button/Button";
import { FileCard } from "./FileCard";
import { FileCardActions } from "./FileCardActions";
import { FileCardIcon } from "./FileCardIcon";
import { FileCardInfo } from "./FileCardInfo";
import { FileCardMeta } from "./FileCardMeta";
import { FileCardName } from "./FileCardName";
import { FileCardStatus } from "./FileCardStatus";

export default { title: "Components / Data Display / FileCard" };

/* ── Базовый — все статусы ──────────────────────────────── */
export const Statuses: Story = () => (
  <div className="flex flex-col gap-3 max-w-md">
    {(["approved", "pending", "rejected"] as const).map((status) => (
      <FileCard key={status} fileType="pdf" status={status}>
        <FileCardIcon />
        <FileCardInfo>
          <FileCardName>Лекция_01_Основы_ИБ.pdf</FileCardName>
          <FileCardMeta>2.4 MB · 12 июня 2026</FileCardMeta>
        </FileCardInfo>
        <FileCardStatus />
      </FileCard>
    ))}
  </div>
);

/* ── Разные типы файлов ─────────────────────────────────── */
export const FileTypes: Story = () => {
  const files = [
    { name: "Презентация_DAC_MAC.pptx", type: "docx", size: "1.8 MB", status: "approved" as const },
    { name: "Конспект_Криптография.md", type: "md", size: "42 KB", status: "approved" as const },
    { name: "Схема_сети.png", type: "png", size: "560 KB", status: "pending" as const },
    { name: "Код_атаки_XSS.py", type: "py", size: "8 KB", status: "rejected" as const },
    { name: "Видеолекция_TLS.mp4", type: "mp4", size: "128 MB", status: "pending" as const },
    { name: "Данные_эксперимента.txt", type: "txt", size: "14 KB", status: "approved" as const },
  ];
  return (
    <div className="flex flex-col gap-2 max-w-md">
      {files.map((f) => (
        <FileCard key={f.name} fileType={f.type} status={f.status}>
          <FileCardIcon />
          <FileCardInfo>
            <FileCardName>{f.name}</FileCardName>
            <FileCardMeta>{f.size}</FileCardMeta>
          </FileCardInfo>
          <FileCardStatus iconOnly />
        </FileCard>
      ))}
    </div>
  );
};

/* ── С кнопками действий (teacher view) ────────────────── */
export const WithActions: Story = () => (
  <div className="flex flex-col gap-3 max-w-lg">
    <FileCard fileType="pdf" status="pending">
      <FileCardIcon />
      <FileCardInfo>
        <FileCardName>Отчёт_по_практике.pdf</FileCardName>
        <FileCardMeta>3.1 MB · Akhmedov Jamshid · 24 июня 2026</FileCardMeta>
      </FileCardInfo>
      <FileCardStatus />
      <FileCardActions>
        <Button variant="ghost" size="icon">
          <Eye size={14} />
        </Button>
        <Button variant="ghost" size="icon">
          <Download size={14} />
        </Button>
      </FileCardActions>
    </FileCard>

    <FileCard fileType="docx" status="approved">
      <FileCardIcon />
      <FileCardInfo>
        <FileCardName>Конспект_Bell-LaPadula.docx</FileCardName>
        <FileCardMeta>890 KB · Nazarov Timur · 20 июня 2026</FileCardMeta>
      </FileCardInfo>
      <FileCardStatus />
      <FileCardActions>
        <Button variant="ghost" size="icon">
          <Download size={14} />
        </Button>
        <Button variant="ghost" size="icon" className="text-[var(--error)]">
          <Trash2 size={14} />
        </Button>
      </FileCardActions>
    </FileCard>
  </div>
);

/* ── Кликабельная карточка (href) ───────────────────────── */
export const Clickable: Story = () => (
  <div className="flex flex-col gap-2 max-w-md">
    <FileCard fileType="pdf" status="approved" href="#download">
      <FileCardIcon />
      <FileCardInfo>
        <FileCardName>Материал_Модуль_1.pdf</FileCardName>
        <FileCardMeta>1.2 MB · Нажми чтобы скачать</FileCardMeta>
      </FileCardInfo>
      <FileCardStatus />
    </FileCard>
  </div>
);

/* ── Список материалов библиотеки ───────────────────────── */
export const LibraryList: Story = () => {
  const materials = [
    {
      name: "Введение в ИБ",
      type: "pdf",
      size: "2.1 MB",
      author: "teacher@ksi.uz",
      score: 92,
      status: "approved" as const,
    },
    {
      name: "Модели управления доступом",
      type: "md",
      size: "67 KB",
      author: "teacher@ksi.uz",
      score: 88,
      status: "approved" as const,
    },
    {
      name: "Протоколы шифрования",
      type: "pdf",
      size: "4.5 MB",
      author: "student_12",
      score: null,
      status: "pending" as const,
    },
  ];
  return (
    <div className="flex flex-col gap-2 max-w-lg">
      {materials.map((m) => (
        <FileCard key={m.name} fileType={m.type} status={m.status} href="#">
          <FileCardIcon />
          <FileCardInfo>
            <FileCardName>{m.name}</FileCardName>
            <FileCardMeta>
              {m.size} · {m.author}
              {m.score != null ? ` · Оценка Норы: ${m.score}/100` : ""}
            </FileCardMeta>
          </FileCardInfo>
          <FileCardStatus />
        </FileCard>
      ))}
    </div>
  );
};
