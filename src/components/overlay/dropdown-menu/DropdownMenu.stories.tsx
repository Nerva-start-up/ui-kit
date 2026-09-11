import type { Story } from "@ladle/react";
import {
  Archive,
  Bell,
  Check,
  ChevronDown,
  Copy,
  Download,
  Edit2,
  ExternalLink,
  Eye,
  FileText,
  LayoutGrid,
  List,
  LogOut,
  MoreHorizontal,
  Settings,
  Share2,
  Shield,
  Star,
  Trash2,
  User,
} from "lucide-react";
import { useState } from "react";
import { Button } from "../../actions/button/Button";
import { Badge } from "../../data-display/badge/Badge";
import { Text } from "../../typography/Text";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./DropdownMenu";

export default { title: "Components / Overlay / DropdownMenu" };

/* ── Basic ──────────────────────────────────────────────── */
export const Basic: Story = () => (
  <div className="flex items-center justify-center py-20">
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          Меню
          <ChevronDown size={14} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem icon={<Edit2 size={14} />}>
          Редактировать
          <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem icon={<Copy size={14} />}>
          Дублировать
          <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem icon={<Archive size={14} />}>Архивировать</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem icon={<Trash2 size={14} />} destructive>
          Удалить
          <DropdownMenuShortcut>⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
);

/* ── User menu ──────────────────────────────────────────── */
export const UserMenu: Story = () => (
  <div className="flex items-center justify-center py-20">
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="flex items-center gap-2 px-3 py-1.5 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--surface-2)] transition-colors text-sm text-[var(--text)]"
        >
          <div className="w-6 h-6 rounded-full bg-[var(--primary)] flex items-center justify-center text-white text-[10px] font-bold">
            ИА
          </div>
          Иванов А.
          <ChevronDown size={12} className="text-[var(--text-muted)]" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[200px]">
        <DropdownMenuLabel>freyzan@ksi.uz</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem icon={<User size={14} />}>Профиль</DropdownMenuItem>
          <DropdownMenuItem icon={<Settings size={14} />}>
            Настройки
            <DropdownMenuShortcut>⌘,</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem icon={<Bell size={14} />}>
            Уведомления
            <Badge variant="orange" className="ml-auto">
              3
            </Badge>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem icon={<Shield size={14} />}>Безопасность</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem icon={<LogOut size={14} />} destructive>
          Выйти
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
);

/* ── File actions ───────────────────────────────────────── */
export const FileActions: Story = () => (
  <div className="flex flex-col gap-2 p-4 max-w-sm">
    {["Лекция_01_Основы_ИБ.pdf", "Лаб_02_XSS.docx", "Конспект_JWT.md"].map((name) => (
      <div
        key={name}
        className="flex items-center gap-3 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] px-4 py-3"
      >
        <FileText size={16} className="text-[var(--primary)] shrink-0" />
        <Text as="span" size="sm" truncate className="flex-1">
          {name}
        </Text>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="p-1 text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-2)] rounded-[var(--radius-sm)] transition-colors"
            >
              <MoreHorizontal size={15} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem icon={<Eye size={14} />}>Просмотр</DropdownMenuItem>
            <DropdownMenuItem icon={<Download size={14} />}>Скачать</DropdownMenuItem>
            <DropdownMenuItem icon={<ExternalLink size={14} />}>
              Открыть в новой вкладке
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem icon={<Trash2 size={14} />} destructive>
              Удалить
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    ))}
  </div>
);

/* ── With sub-menu ──────────────────────────────────────── */
export const WithSubMenu: Story = () => (
  <div className="flex items-center justify-center py-20">
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          Действия
          <ChevronDown size={14} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem icon={<Eye size={14} />}>Просмотр</DropdownMenuItem>
        <DropdownMenuItem icon={<Edit2 size={14} />}>Редактировать</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Share2 size={14} />
            Поделиться
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem>Telegram</DropdownMenuItem>
            <DropdownMenuItem>Скопировать ссылку</DropdownMenuItem>
            <DropdownMenuItem>Отправить на email</DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem icon={<Trash2 size={14} />} destructive>
          Удалить
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
);

/* ── Checkbox & Radio ───────────────────────────────────── */
export const CheckboxAndRadio: Story = () => {
  const [starred, setStarred] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [view, setView] = useState("list");

  return (
    <div className="flex items-center justify-center py-20">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            <Settings size={14} />
            Настройки вида
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[200px]">
          <DropdownMenuLabel>Отображение</DropdownMenuLabel>
          <DropdownMenuRadioGroup value={view} onValueChange={setView}>
            <DropdownMenuRadioItem value="list">
              <List size={14} className="mr-2" />
              Список
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="grid">
              <LayoutGrid size={14} className="mr-2" />
              Сетка
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
          <DropdownMenuSeparator />
          <DropdownMenuLabel>Опции</DropdownMenuLabel>
          <DropdownMenuCheckboxItem
            checked={starred}
            onCheckedChange={(v) => setStarred(v === true)}
          >
            <Star size={14} className="mr-2" />
            Только избранные
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={notifications}
            onCheckedChange={(v) => setNotifications(v === true)}
          >
            <Bell size={14} className="mr-2" />
            Уведомления
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

/* ── Controlled ─────────────────────────────────────────── */
export const Controlled: Story = () => {
  const [open, setOpen] = useState(false);
  const [last, setLast] = useState<string | null>(null);

  const pick = (label: string) => {
    setLast(label);
    setOpen(false);
  };

  return (
    <div className="flex flex-col items-center gap-4 py-20">
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            Выбрать действие
            <ChevronDown size={14} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {["Принять", "Отклонить", "На проверку"].map((label) => (
            <DropdownMenuItem key={label} icon={<Check size={14} />} onSelect={() => pick(label)}>
              {label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      {last && (
        <Text size="xs" variant="muted">
          Выбрано: <Badge variant="orange">{last}</Badge>
        </Text>
      )}
    </div>
  );
};

/* ── Sides ──────────────────────────────────────────────── */
export const Sides: Story = () => (
  <div className="flex items-center justify-center gap-6 py-24">
    {(["top", "right", "bottom", "left"] as const).map((side) => (
      <DropdownMenu key={side}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            {side}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side={side}>
          <DropdownMenuItem>Пункт 1</DropdownMenuItem>
          <DropdownMenuItem>Пункт 2</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem destructive>Удалить</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ))}
  </div>
);
