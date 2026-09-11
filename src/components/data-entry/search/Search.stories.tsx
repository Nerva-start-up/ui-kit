import type { Story } from "@ladle/react";
import { BookOpen, FileText, GraduationCap, Shield, Users } from "lucide-react";
import { useState } from "react";
import { Kbd } from "../../data-display/kbd/Kbd";
import { KbdKey } from "../../data-display/kbd/KbdKey";
import { Text } from "../../typography/Text";
import { Search } from "./Search";
import { SearchContent } from "./SearchContent";
import { SearchEmpty } from "./SearchEmpty";
import { SearchFooter } from "./SearchFooter";
import { SearchGroup } from "./SearchGroup";
import { SearchInput } from "./SearchInput";
import { SearchList } from "./SearchList";
import type { SearchItem } from "./types";

export default { title: "Components / Data Entry / Search" };

/* ─── Данные ────────────────────────────────────────────── */
const LESSONS: SearchItem[] = [
  {
    id: "l1",
    group: "lesson",
    label: "Введение в информационную безопасность",
    description: "Основные понятия, CIA-триада, угрозы",
    icon: BookOpen,
    meta: "Модуль 1",
    tags: ["теория"],
  },
  {
    id: "l2",
    group: "lesson",
    label: "Модель управления доступом: DAC и MAC",
    description: "Дискреционный и мандатный контроль",
    icon: Shield,
    meta: "Модуль 1",
    tags: ["теория"],
  },
  {
    id: "l3",
    group: "lesson",
    label: "Bell-LaPadula и Biba",
    description: "Формальные модели безопасности",
    icon: Shield,
    meta: "Модуль 1",
    tags: ["теория"],
  },
  {
    id: "l4",
    group: "lesson",
    label: "Криптография: симметричное шифрование",
    description: "AES, DES, режимы работы",
    icon: BookOpen,
    meta: "Модуль 2",
    tags: ["практика"],
  },
  {
    id: "l5",
    group: "lesson",
    label: "RSA и асимметричное шифрование",
    description: "Публичный ключ, ЭЦП, PKI",
    icon: BookOpen,
    meta: "Модуль 2",
    tags: ["практика"],
  },
  {
    id: "l6",
    group: "lesson",
    label: "SQL-инъекции",
    description: "Виды, эксплуатация, защита",
    icon: FileText,
    meta: "Модуль 3",
    tags: ["практика", "атаки"],
  },
  {
    id: "l7",
    group: "lesson",
    label: "XSS-атаки",
    description: "Reflected, Stored, DOM-based",
    icon: FileText,
    meta: "Модуль 3",
    tags: ["практика", "атаки"],
  },
  {
    id: "l8",
    group: "lesson",
    label: "CSRF и защита от него",
    description: "SameSite cookie, CSRF-токены",
    icon: FileText,
    meta: "Модуль 3",
    tags: ["практика"],
  },
  {
    id: "l9",
    group: "lesson",
    label: "Сетевые протоколы и VPN",
    description: "TCP/IP, DNS, TLS, OpenVPN",
    icon: BookOpen,
    meta: "Модуль 4",
    tags: ["сети"],
  },
];

const GROUPS: SearchItem[] = [
  {
    id: "g1",
    group: "group",
    label: "ИБ-101",
    description: "Первый курс, осенний поток",
    icon: Users,
    meta: "24 студ.",
  },
  {
    id: "g2",
    group: "group",
    label: "ИБ-102",
    description: "Первый курс, весенний поток",
    icon: Users,
    meta: "21 студ.",
  },
  {
    id: "g3",
    group: "group",
    label: "ИБ-201",
    description: "Второй курс",
    icon: Users,
    meta: "18 студ.",
  },
  {
    id: "g4",
    group: "group",
    label: "ИБ-301",
    description: "Третий курс, продвинутый",
    icon: Users,
    meta: "15 студ.",
  },
];

const STUDENTS: SearchItem[] = [
  {
    id: "s1",
    group: "student",
    label: "Алишер Навоий",
    description: "alisher@ksi.uz",
    avatar: "https://i.pravatar.cc/32?img=1",
    meta: "ИБ-101 · #3",
  },
  {
    id: "s2",
    group: "student",
    label: "Камола Юсупова",
    description: "kamola@ksi.uz",
    avatar: "https://i.pravatar.cc/32?img=5",
    meta: "ИБ-101 · #1",
  },
  {
    id: "s3",
    group: "student",
    label: "Бобур Рахимов",
    description: "bobur@ksi.uz",
    avatar: "https://i.pravatar.cc/32?img=8",
    meta: "ИБ-102 · #7",
  },
  {
    id: "s4",
    group: "student",
    label: "Нилуфар Ахмедова",
    description: "nilufar@ksi.uz",
    avatar: "https://i.pravatar.cc/32?img=9",
    meta: "ИБ-201 · #2",
  },
  {
    id: "s5",
    group: "student",
    label: "Санжар Каримов",
    description: "sanjor@ksi.uz",
    icon: GraduationCap,
    meta: "ИБ-301 · #5",
  },
];

const ALL_ITEMS = [...LESSONS, ...GROUPS, ...STUDENTS];

/* ── Уроки ──────────────────────────────────────────────── */
export const Lessons: Story = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-3">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex items-center justify-between gap-3 px-4 py-2.5 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface-2)] text-sm text-[var(--text-muted)] hover:text-[var(--text)] transition-colors w-72"
      >
        <Text as="span" size="sm" variant="muted">
          Найти урок...
        </Text>
        <Kbd size="sm">
          <KbdKey>Ctrl</KbdKey>
          <KbdKey>F</KbdKey>
        </Kbd>
      </button>

      <Search
        items={LESSONS}
        open={open}
        onOpenChange={setOpen}
        onSelect={(item) => alert(`Выбрано: ${item.label}`)}
      >
        <SearchContent>
          <SearchInput placeholder="Поиск уроков..." />
          <SearchList>
            <SearchGroup heading="Уроки" filter="lesson" />
            <SearchEmpty />
          </SearchList>
          <SearchFooter />
        </SearchContent>
      </Search>
    </div>
  );
};

/* ── Группы ─────────────────────────────────────────────── */
export const Groups: Story = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-3">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex items-center justify-between gap-3 px-4 py-2.5 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface-2)] text-sm text-[var(--text-muted)] hover:text-[var(--text)] transition-colors w-64"
      >
        <Text as="span" size="sm" variant="muted">
          {selected ?? "Выбрать группу..."}
        </Text>
        <Users size={14} />
      </button>

      {selected && (
        <Text size="xs" variant="muted">
          Выбрана группа:{" "}
          <Text as="span" size="xs" weight="medium">
            {selected}
          </Text>
        </Text>
      )}

      <Search
        items={GROUPS}
        open={open}
        onOpenChange={setOpen}
        onSelect={(item) => setSelected(item.label)}
      >
        <SearchContent>
          <SearchInput placeholder="Поиск группы..." />
          <SearchList>
            <SearchGroup heading="Группы" filter="group" />
            <SearchEmpty />
          </SearchList>
          <SearchFooter />
        </SearchContent>
      </Search>
    </div>
  );
};

/* ── Студенты (с аватарами) ─────────────────────────────── */
export const Students: Story = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-3">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex items-center justify-between gap-3 px-4 py-2.5 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface-2)] text-sm text-[var(--text-muted)] hover:text-[var(--text)] transition-colors w-64"
      >
        <Text as="span" size="sm" variant="muted">
          Найти студента...
        </Text>
        <GraduationCap size={14} />
      </button>

      <Search items={STUDENTS} open={open} onOpenChange={setOpen}>
        <SearchContent>
          <SearchInput placeholder="Имя или email..." />
          <SearchList>
            <SearchGroup heading="Студенты" filter="student" />
            <SearchEmpty />
          </SearchList>
          <SearchFooter />
        </SearchContent>
      </Search>
    </div>
  );
};

/* ── Все сущности (смешанный поиск) ────────────────────── */
export const Mixed: Story = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-3">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex items-center justify-between gap-3 px-4 py-2.5 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface-2)] text-sm text-[var(--text-muted)] hover:text-[var(--text)] transition-colors w-80"
      >
        <Text as="span" size="sm" variant="muted">
          Поиск по платформе...
        </Text>
        <Kbd size="sm">
          <KbdKey>⌘</KbdKey>
          <KbdKey>F</KbdKey>
        </Kbd>
      </button>

      <Search items={ALL_ITEMS} open={open} onOpenChange={setOpen}>
        <SearchContent>
          <SearchInput placeholder="Урок, группа или студент..." />
          <SearchList>
            <SearchGroup heading="Уроки" filter="lesson" />
            <SearchGroup heading="Группы" filter="group" />
            <SearchGroup heading="Студенты" filter="student" />
            <SearchEmpty />
          </SearchList>
          <SearchFooter
            hint={
              <Text as="span" variant="muted" className="text-[10px] opacity-50">
                уроки · группы · студенты
              </Text>
            }
          />
        </SearchContent>
      </Search>
    </div>
  );
};

/* ── Кастомная фильтрация (по тегам) ───────────────────── */
export const CustomFilter: Story = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-3">
      <Text size="xs" variant="muted">
        Поиск только по тегу «атаки»
      </Text>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="px-4 py-2 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface-2)] text-sm text-[var(--text-muted)] w-fit"
      >
        Открыть
      </button>

      <Search
        items={LESSONS}
        open={open}
        onOpenChange={setOpen}
        filterFn={(item, q) =>
          (item.tags?.some((t) => t.includes("атаки")) ?? false) &&
          item.label.toLowerCase().includes(q.toLowerCase())
        }
      >
        <SearchContent>
          <SearchInput placeholder="Поиск атак..." />
          <SearchList>
            <SearchGroup heading="Атаки" filter={() => true} />
            <SearchEmpty />
          </SearchList>
          <SearchFooter />
        </SearchContent>
      </Search>
    </div>
  );
};
