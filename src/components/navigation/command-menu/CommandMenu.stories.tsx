import type { Story } from "@ladle/react";
import {
  Bell,
  BookOpen,
  Bot,
  ClipboardList,
  Home,
  LogOut,
  Moon,
  RefreshCw,
  Settings,
  Shield,
  Sun,
  Trophy,
  User,
} from "lucide-react";
import { useState } from "react";
import { Kbd } from "../../data-display/kbd/Kbd";
import { KbdKey } from "../../data-display/kbd/KbdKey";
import { Code } from "../../typography/Code";
import { Text } from "../../typography/Text";
import { CommandMenu } from "./CommandMenu";
import { CommandMenuContent } from "./CommandMenuContent";
import { CommandMenuEmpty } from "./CommandMenuEmpty";
import { CommandMenuFooter } from "./CommandMenuFooter";
import { CommandMenuGroup } from "./CommandMenuGroup";
import { CommandMenuInput } from "./CommandMenuInput";
import { CommandMenuList } from "./CommandMenuList";
import type { CommandItem } from "./types";

export default { title: "Components / Navigation / CommandMenu" };

const COMMANDS: CommandItem[] = [
  {
    id: "toggle-theme",
    type: "command",
    trigger: "/toggleTheme",
    label: "Переключить тему",
    icon: Moon,
    onSelect: () => alert("toggleTheme"),
  },
  {
    id: "refresh",
    type: "command",
    trigger: "/refresh",
    label: "Обновить страницу",
    icon: RefreshCw,
    onSelect: () => location.reload(),
  },
  {
    id: "notifications",
    type: "command",
    trigger: "/notifications",
    label: "Уведомления",
    icon: Bell,
    description: "Открыть центр уведомлений",
    onSelect: () => alert("notifications"),
  },
  {
    id: "profile",
    type: "command",
    trigger: "/profile",
    label: "Мой профиль",
    icon: User,
    onSelect: () => alert("profile"),
  },
  {
    id: "logout",
    type: "command",
    trigger: "/logout",
    label: "Выйти",
    icon: LogOut,
    onSelect: () => alert("logout"),
  },
];

const LINKS: CommandItem[] = [
  {
    id: "dashboard",
    type: "link",
    alias: "@dashboard",
    label: "Дашборд",
    icon: Home,
    href: "/dashboard",
    description: "Главная страница",
  },
  {
    id: "leaderboard",
    type: "link",
    alias: "@leaderboard",
    label: "Рейтинг",
    icon: Trophy,
    href: "/leaderboard",
    description: "Таблица лидеров KSI",
  },
  {
    id: "assignments",
    type: "link",
    alias: "@assignments",
    label: "Задания",
    icon: ClipboardList,
    href: "/assignments",
    description: "Список заданий и дедлайны",
  },
  {
    id: "library",
    type: "link",
    alias: "@library",
    label: "Материалы",
    icon: BookOpen,
    href: "/library",
    description: "База знаний по ИБ",
  },
  {
    id: "nora",
    type: "link",
    alias: "@nora",
    label: "Нора AI",
    icon: Bot,
    href: "/ai",
    description: "AI-тьютор по кибербезопасности",
  },
  {
    id: "settings",
    type: "link",
    alias: "@settings",
    label: "Настройки",
    icon: Settings,
    href: "/settings",
  },
  {
    id: "admin",
    type: "link",
    alias: "@admin",
    label: "Админ-панель",
    icon: Shield,
    href: "/admin",
    description: "Только для администраторов",
  },
];

const ALL_ITEMS = [...COMMANDS, ...LINKS];

/* ── Основной ───────────────────────────────────────────── */
export const Default: Story = () => {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  const items: CommandItem[] = [
    ...LINKS,
    {
      ...COMMANDS[0],
      icon: theme === "dark" ? Moon : Sun,
      label: theme === "dark" ? "Переключить на светлую тему" : "Переключить на тёмную тему",
      onSelect: () => setTheme((t) => (t === "dark" ? "light" : "dark")),
    },
    ...COMMANDS.slice(1),
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface-2)] text-sm text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
        >
          <Text as="span" size="sm" variant="muted">
            Поиск команд...
          </Text>
          <Kbd size="sm">
            <KbdKey>⌘</KbdKey>
            <KbdKey>K</KbdKey>
          </Kbd>
        </button>
      </div>

      <Text size="xs" variant="muted">
        Подсказки: <Code>/</Code> — команды · <Code>@</Code> — страницы
      </Text>

      <CommandMenu items={items} open={open} onOpenChange={setOpen}>
        <CommandMenuContent>
          <CommandMenuInput />
          <CommandMenuList>
            <CommandMenuGroup heading="Команды" filter="command" />
            <CommandMenuGroup heading="Навигация" filter="link" />
            <CommandMenuEmpty />
          </CommandMenuList>
          <CommandMenuFooter />
        </CommandMenuContent>
      </CommandMenu>
    </div>
  );
};

/* ── Сразу открытый (для демонстрации) ─────────────────── */
export const AlwaysOpen: Story = () => {
  const [open, setOpen] = useState(true);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="px-4 py-2 text-sm rounded-[var(--radius-md)] border border-[var(--border)] text-[var(--text-muted)]"
      >
        Открыть снова
      </button>
      <CommandMenu items={ALL_ITEMS} open={open} onOpenChange={setOpen}>
        <CommandMenuContent>
          <CommandMenuInput />
          <CommandMenuList>
            <CommandMenuGroup heading="Команды" filter="command" />
            <CommandMenuGroup heading="Навигация" filter="link" />
            <CommandMenuEmpty />
          </CommandMenuList>
          <CommandMenuFooter />
        </CommandMenuContent>
      </CommandMenu>
    </>
  );
};
