import type { Story } from "@ladle/react";
import {
  Bell,
  ChevronDown,
  Filter,
  Info,
  MoreHorizontal,
  Settings,
  Shield,
  User,
} from "lucide-react";
import { useState } from "react";
import { Button } from "../../actions/button/Button";
import { Badge } from "../../data-display/badge/Badge";
import { Separator } from "../../layout/separator/Separator";
import { Text } from "../../typography/Text";
import { Popover, PopoverContent, PopoverTrigger } from "./Popover";

export default { title: "Components / Overlay / Popover" };

/* ── Basic ──────────────────────────────────────────────── */
export const Basic: Story = () => (
  <div className="flex items-center justify-center py-20">
    <Popover>
      <PopoverTrigger>
        <Button variant="outline" size="sm">
          Открыть попап
          <ChevronDown size={14} />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="px-3 py-2 text-sm text-[var(--text)]">
          Это базовый Popover. Клик вне — закрывает.
        </div>
      </PopoverContent>
    </Popover>
  </div>
);

/* ── Info Popover ───────────────────────────────────────── */
export const InfoTip: Story = () => (
  <div className="flex items-center justify-center gap-2 py-20">
    <Text as="span" size="sm">
      KSI Score
    </Text>
    <Popover>
      <PopoverTrigger>
        <button
          type="button"
          className="text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
        >
          <Info size={16} />
        </button>
      </PopoverTrigger>
      <PopoverContent className="max-w-[240px] px-4 py-3">
        <Text size="sm" weight="medium" className="mb-2">
          Как считается балл
        </Text>
        <div className="flex flex-col gap-1 text-xs text-[var(--text-muted)]">
          <div className="flex justify-between">
            <Text as="span" size="xs" variant="muted">
              Академика
            </Text>
            <Text as="span" size="xs" variant="primary">
              40%
            </Text>
          </div>
          <div className="flex justify-between">
            <Text as="span" size="xs" variant="muted">
              Активность
            </Text>
            <Text as="span" size="xs" variant="primary">
              25%
            </Text>
          </div>
          <div className="flex justify-between">
            <Text as="span" size="xs" variant="muted">
              Вклад
            </Text>
            <Text as="span" size="xs" variant="primary">
              20%
            </Text>
          </div>
          <div className="flex justify-between">
            <Text as="span" size="xs" variant="muted">
              Взаимодействие
            </Text>
            <Text as="span" size="xs" variant="primary">
              15%
            </Text>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  </div>
);

/* ── User Card ──────────────────────────────────────────── */
export const UserCard: Story = () => (
  <div className="flex items-center justify-center py-20">
    <Popover>
      <PopoverTrigger>
        <button
          type="button"
          className="flex items-center gap-2 px-3 py-1.5 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--surface-2)] transition-colors text-sm text-[var(--text)]"
        >
          <User size={14} />
          Иванов А.
          <ChevronDown size={12} className="text-[var(--text-muted)]" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[220px] px-0 py-1">
        <div className="px-4 py-3">
          <Text size="sm" weight="medium">
            Иванов Алексей
          </Text>
          <Text size="xs" variant="muted">
            student@ksi.uz
          </Text>
          <div className="flex items-center gap-2 mt-2">
            <Badge variant="orange">студент</Badge>
            <Badge variant="info">Группа 2-Б</Badge>
          </div>
        </div>
        <Separator />
        <div className="py-1">
          {[
            { icon: <User size={14} />, label: "Профиль" },
            { icon: <Settings size={14} />, label: "Настройки" },
            { icon: <Shield size={14} />, label: "Безопасность" },
          ].map(({ icon, label }) => (
            <button
              key={label}
              type="button"
              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-2)] transition-colors"
            >
              {icon}
              {label}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  </div>
);

/* ── Notification Bell ──────────────────────────────────── */
export const NotificationBell: Story = () => {
  const [open, setOpen] = useState(false);

  const notifications = [
    { text: "Новое задание: Лаб. работа №3", time: "5 мин назад", unread: true },
    { text: "Нора: вопрос по JWT", time: "1 час назад", unread: true },
    { text: "Рейтинг обновлён — вы на 4 месте", time: "вчера", unread: false },
  ];

  return (
    <div className="flex items-center justify-center py-20">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger>
          <button
            type="button"
            className="relative p-2 text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
          >
            <Bell size={18} />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[var(--primary)]" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] px-0 py-0" align="end">
          <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)]">
            <Text size="sm" weight="medium">
              Уведомления
            </Text>
            <Badge variant="orange">2</Badge>
          </div>
          <div className="flex flex-col">
            {notifications.map((n) => (
              <button
                key={n.text}
                type="button"
                className="flex flex-col gap-0.5 px-4 py-3 text-left hover:bg-[var(--surface-2)] transition-colors border-b border-[var(--border)] last:border-0"
              >
                <div className="flex items-start gap-2">
                  {n.unread && (
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[var(--primary)] shrink-0" />
                  )}
                  <Text as="span" size="xs" variant={n.unread ? "default" : "muted"}>
                    {n.text}
                  </Text>
                </div>
                <Text as="span" variant="muted" className="text-[10px] pl-3.5">
                  {n.time}
                </Text>
              </button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

/* ── Filters ────────────────────────────────────────────── */
export const Filters: Story = () => {
  const [role, setRole] = useState("all");
  const [group, setGroup] = useState("all");

  return (
    <div className="flex items-center justify-center py-20">
      <Popover>
        <PopoverTrigger>
          <Button variant="outline" size="sm">
            <Filter size={14} />
            Фильтры
            {(role !== "all" || group !== "all") && (
              <Badge variant="orange" className="ml-1">
                {[role !== "all", group !== "all"].filter(Boolean).length}
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[220px] px-4 py-3 flex flex-col gap-4">
          <div>
            <Text
              size="xs"
              weight="medium"
              variant="muted"
              className="mb-2 uppercase tracking-wide"
            >
              Роль
            </Text>
            <div className="flex flex-col gap-1">
              {[
                { value: "all", label: "Все" },
                { value: "student", label: "Студенты" },
                { value: "teacher", label: "Преподаватели" },
              ].map((item) => (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => setRole(item.value)}
                  className={`text-left text-sm px-2 py-1 rounded-[var(--radius-sm)] transition-colors ${
                    role === item.value
                      ? "bg-[var(--primary)] text-white"
                      : "text-[var(--text-muted)] hover:bg-[var(--surface-2)]"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
          <Separator />
          <div>
            <Text
              size="xs"
              weight="medium"
              variant="muted"
              className="mb-2 uppercase tracking-wide"
            >
              Группа
            </Text>
            <div className="flex flex-col gap-1">
              {["all", "2-А", "2-Б", "3-А"].map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setGroup(g)}
                  className={`text-left text-sm px-2 py-1 rounded-[var(--radius-sm)] transition-colors ${
                    group === g
                      ? "bg-[var(--primary)] text-white"
                      : "text-[var(--text-muted)] hover:bg-[var(--surface-2)]"
                  }`}
                >
                  {g === "all" ? "Все группы" : g}
                </button>
              ))}
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setRole("all");
              setGroup("all");
            }}
          >
            Сбросить фильтры
          </Button>
        </PopoverContent>
      </Popover>
    </div>
  );
};

/* ── Actions (More button) ──────────────────────────────── */
export const MoreActions: Story = () => (
  <div className="flex items-center justify-center py-20">
    <div className="flex items-center gap-4 px-4 py-3 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)]">
      <Text as="span" size="sm">
        Лаб. работа №3 — RBAC
      </Text>
      <Popover>
        <PopoverTrigger>
          <button
            type="button"
            className="p-1 text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-2)] rounded-[var(--radius-sm)] transition-colors"
          >
            <MoreHorizontal size={16} />
          </button>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-[160px] px-0 py-1">
          {["Просмотр", "Редактировать", "Дублировать"].map((label) => (
            <button
              key={label}
              type="button"
              className="flex w-full px-4 py-2 text-sm text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-2)] transition-colors"
            >
              {label}
            </button>
          ))}
          <Separator className="my-1" />
          <button
            type="button"
            className="flex w-full px-4 py-2 text-sm text-[var(--error)] hover:bg-[var(--surface-2)] transition-colors"
          >
            Удалить
          </button>
        </PopoverContent>
      </Popover>
    </div>
  </div>
);

/* ── Sides ──────────────────────────────────────────────── */
export const Sides: Story = () => (
  <div className="flex items-center justify-center gap-6 py-24">
    {(["top", "right", "bottom", "left"] as const).map((side) => (
      <Popover key={side}>
        <PopoverTrigger>
          <Button variant="outline" size="sm">
            {side}
          </Button>
        </PopoverTrigger>
        <PopoverContent side={side} className="px-3 py-2">
          <Text as="span" size="xs">
            side="{side}"
          </Text>
        </PopoverContent>
      </Popover>
    ))}
  </div>
);
