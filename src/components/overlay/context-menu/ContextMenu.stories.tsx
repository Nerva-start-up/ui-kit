import type { Story } from "@ladle/react";
import {
  Copy,
  Download,
  Edit2,
  ExternalLink,
  Eye,
  FileText,
  Link,
  MoreHorizontal,
  Share2,
  Star,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "./ContextMenu";

export default { title: "Components / Overlay / ContextMenu" };

/* ── Basic ──────────────────────────────────────────────── */
export const Basic: Story = () => (
  <div className="flex h-64 items-center justify-center">
    <ContextMenu>
      <ContextMenuTrigger>
        <div className="flex h-32 w-64 cursor-context-menu items-center justify-center rounded-[var(--radius-lg)] border-2 border-dashed border-[var(--border)] text-sm text-[var(--text-muted)]">
          Правый клик сюда
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem icon={<Edit2 size={14} />}>
          Редактировать
          <ContextMenuShortcut>⌘E</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem icon={<Copy size={14} />}>
          Копировать
          <ContextMenuShortcut>⌘C</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem icon={<Share2 size={14} />}>Поделиться</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem icon={<Trash2 size={14} />} destructive>
          Удалить
          <ContextMenuShortcut>⌫</ContextMenuShortcut>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  </div>
);

/* ── File card ──────────────────────────────────────────── */
export const FileCard: Story = () => (
  <div className="flex flex-col gap-2 p-4">
    {["Лекция_01_Основы_ИБ.pdf", "Лаб_02_XSS.docx", "Конспект_JWT.md"].map((name) => (
      <ContextMenu key={name}>
        <ContextMenuTrigger asChild>
          <div className="flex cursor-context-menu items-center gap-3 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm text-[var(--text)] hover:bg-[var(--surface-2)] transition-colors select-none">
            <FileText size={16} className="text-[var(--primary)] shrink-0" />
            <span className="flex-1">{name}</span>
            <MoreHorizontal size={14} className="text-[var(--text-muted)]" />
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuLabel>Действия с файлом</ContextMenuLabel>
          <ContextMenuItem icon={<Eye size={14} />}>Просмотр</ContextMenuItem>
          <ContextMenuItem icon={<Download size={14} />}>Скачать</ContextMenuItem>
          <ContextMenuItem icon={<Link size={14} />}>
            Копировать ссылку
            <ContextMenuShortcut>⌘L</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem icon={<ExternalLink size={14} />}>
            Открыть в новой вкладке
          </ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem icon={<Trash2 size={14} />} destructive>
            Удалить файл
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    ))}
  </div>
);

/* ── With sub-menu ──────────────────────────────────────── */
export const WithSubMenu: Story = () => (
  <div className="flex h-64 items-center justify-center">
    <ContextMenu>
      <ContextMenuTrigger>
        <div className="flex h-32 w-64 cursor-context-menu items-center justify-center rounded-[var(--radius-lg)] border-2 border-dashed border-[var(--border)] text-sm text-[var(--text-muted)]">
          Правый клик → подменю
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem icon={<Eye size={14} />}>Просмотр</ContextMenuItem>
        <ContextMenuItem icon={<Edit2 size={14} />}>Редактировать</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuSub>
          <ContextMenuSubTrigger>
            <Share2 size={14} />
            Поделиться
          </ContextMenuSubTrigger>
          <ContextMenuSubContent>
            <ContextMenuItem>Telegram</ContextMenuItem>
            <ContextMenuItem>Скопировать ссылку</ContextMenuItem>
            <ContextMenuItem>Отправить на email</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSeparator />
        <ContextMenuItem icon={<Trash2 size={14} />} destructive>
          Удалить
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  </div>
);

/* ── Checkbox & Radio ───────────────────────────────────── */
export const CheckboxAndRadio: Story = () => {
  const [starred, setStarred] = useState(false);
  const [pinned, setPinned] = useState(false);
  const [view, setView] = useState("grid");

  return (
    <div className="flex h-64 items-center justify-center">
      <ContextMenu>
        <ContextMenuTrigger>
          <div className="flex h-32 w-64 cursor-context-menu items-center justify-center rounded-[var(--radius-lg)] border-2 border-dashed border-[var(--border)] text-sm text-[var(--text-muted)]">
            Правый клик → настройки
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuLabel>Отображение</ContextMenuLabel>
          <ContextMenuRadioGroup value={view} onValueChange={setView}>
            <ContextMenuRadioItem value="grid">Сетка</ContextMenuRadioItem>
            <ContextMenuRadioItem value="list">Список</ContextMenuRadioItem>
            <ContextMenuRadioItem value="compact">Компактный</ContextMenuRadioItem>
          </ContextMenuRadioGroup>
          <ContextMenuSeparator />
          <ContextMenuLabel>Опции</ContextMenuLabel>
          <ContextMenuCheckboxItem
            checked={starred}
            onCheckedChange={(v: boolean | "indeterminate") => setStarred(v === true)}
          >
            <Star size={14} className="mr-2" />
            Добавить в избранное
          </ContextMenuCheckboxItem>
          <ContextMenuCheckboxItem
            checked={pinned}
            onCheckedChange={(v: boolean | "indeterminate") => setPinned(v === true)}
          >
            Закрепить
          </ContextMenuCheckboxItem>
        </ContextMenuContent>
      </ContextMenu>
    </div>
  );
};

/* ── Groups ─────────────────────────────────────────────── */
export const WithGroups: Story = () => (
  <div className="flex h-64 items-center justify-center">
    <ContextMenu>
      <ContextMenuTrigger>
        <div className="flex h-32 w-64 cursor-context-menu items-center justify-center rounded-[var(--radius-lg)] border-2 border-dashed border-[var(--border)] text-sm text-[var(--text-muted)]">
          Правый клик → группы
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuGroup>
          <ContextMenuLabel>Просмотр</ContextMenuLabel>
          <ContextMenuItem icon={<Eye size={14} />}>Открыть</ContextMenuItem>
          <ContextMenuItem icon={<ExternalLink size={14} />}>
            Открыть в новой вкладке
          </ContextMenuItem>
        </ContextMenuGroup>
        <ContextMenuSeparator />
        <ContextMenuGroup>
          <ContextMenuLabel>Изменить</ContextMenuLabel>
          <ContextMenuItem icon={<Edit2 size={14} />}>
            Редактировать
            <ContextMenuShortcut>⌘E</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem icon={<Copy size={14} />}>
            Дублировать
            <ContextMenuShortcut>⌘D</ContextMenuShortcut>
          </ContextMenuItem>
        </ContextMenuGroup>
        <ContextMenuSeparator />
        <ContextMenuItem icon={<Trash2 size={14} />} destructive>
          Удалить
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  </div>
);
