import { Button } from "@components/actions/button/Button";
import { Badge } from "@components/data-display/badge/Badge";
import { Card } from "@components/data-display/card/Card";
import { HStack } from "@components/layout/HStack";
import { Stack } from "@components/layout/Stack";
import type { Story } from "@ladle/react";
import { Bell, Settings, User } from "lucide-react";
import { useRef, useState } from "react";
import { Tour } from "./Tour";
import { TourCover } from "./TourCover";
import { TourDescription } from "./TourDescription";
import { TourStep } from "./TourStep";
import { TourTitle } from "./TourTitle";

export default { title: "Components / Overlay / Tour" };

/* ── Демо-панель, вокруг которой строится тур ──────────── */
function DemoToolbar({
  profileRef,
  bellRef,
  settingsRef,
}: {
  profileRef: React.RefObject<HTMLButtonElement | null>;
  bellRef: React.RefObject<HTMLButtonElement | null>;
  settingsRef: React.RefObject<HTMLButtonElement | null>;
}) {
  return (
    <HStack
      justify="between"
      className="w-[420px] rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-3"
    >
      <Badge>KSI Platform</Badge>
      <HStack gap={1}>
        <button
          ref={bellRef}
          type="button"
          className="rounded-[var(--radius-sm)] p-2 text-[var(--text-muted)] hover:bg-[var(--surface-2)]"
        >
          <Bell size={16} />
        </button>
        <button
          ref={settingsRef}
          type="button"
          className="rounded-[var(--radius-sm)] p-2 text-[var(--text-muted)] hover:bg-[var(--surface-2)]"
        >
          <Settings size={16} />
        </button>
        <button
          ref={profileRef}
          type="button"
          className="rounded-[var(--radius-sm)] p-2 text-[var(--text-muted)] hover:bg-[var(--surface-2)]"
        >
          <User size={16} />
        </button>
      </HStack>
    </HStack>
  );
}

/* ── Default ────────────────────────────────────────────── */
export const Default: Story = () => {
  const [open, setOpen] = useState(false);
  const bellRef = useRef<HTMLButtonElement>(null);
  const settingsRef = useRef<HTMLButtonElement>(null);
  const profileRef = useRef<HTMLButtonElement>(null);

  return (
    <Stack gap={4} align="center">
      <Button onClick={() => setOpen(true)}>Начать тур</Button>
      <DemoToolbar bellRef={bellRef} settingsRef={settingsRef} profileRef={profileRef} />

      <Tour open={open} onOpenChange={setOpen}>
        <TourStep target={bellRef} placement="bottom">
          <TourTitle>Уведомления</TourTitle>
          <TourDescription>
            Здесь появляются напоминания о дедлайнах и новых оценках.
          </TourDescription>
        </TourStep>
        <TourStep target={settingsRef} placement="bottom">
          <TourTitle>Настройки</TourTitle>
          <TourDescription>Тема оформления, уведомления и параметры аккаунта.</TourDescription>
        </TourStep>
        <TourStep target={profileRef} placement="bottomRight">
          <TourTitle>Профиль</TourTitle>
          <TourDescription>Личные данные, группа и история успеваемости.</TourDescription>
        </TourStep>
      </Tour>
    </Stack>
  );
};

/* ── Primary type + обложка на первом шаге ─────────────── */
export const PrimaryType: Story = () => {
  const [open, setOpen] = useState(true);
  const bellRef = useRef<HTMLButtonElement>(null);
  const settingsRef = useRef<HTMLButtonElement>(null);
  const profileRef = useRef<HTMLButtonElement>(null);

  return (
    <Stack gap={4} align="center">
      <Button onClick={() => setOpen(true)}>Начать тур</Button>
      <DemoToolbar bellRef={bellRef} settingsRef={settingsRef} profileRef={profileRef} />

      <Tour open={open} onOpenChange={setOpen} type="primary">
        <TourStep target={bellRef} placement="bottom">
          <TourCover>
            <div className="flex h-24 items-center justify-center rounded-[var(--radius-md)] bg-white/15 text-white">
              <Bell size={32} />
            </div>
          </TourCover>
          <TourTitle>Новое: центр уведомлений</TourTitle>
          <TourDescription>Теперь все уведомления собраны в одном месте.</TourDescription>
        </TourStep>
        <TourStep target={settingsRef} placement="bottom">
          <TourTitle>Настройки</TourTitle>
          <TourDescription>Тема оформления, уведомления и параметры аккаунта.</TourDescription>
        </TourStep>
      </Tour>
    </Stack>
  );
};

/* ── Без target — приветственный шаг по центру ─────────── */
export const CenteredWelcomeStep: Story = () => {
  const [open, setOpen] = useState(true);
  const profileRef = useRef<HTMLButtonElement>(null);

  return (
    <Stack gap={4} align="center">
      <Button onClick={() => setOpen(true)}>Начать тур</Button>
      <Card className="flex h-10 w-10 items-center justify-center">
        <button ref={profileRef} type="button" aria-label="Профиль">
          <User size={18} />
        </button>
      </Card>

      <Tour open={open} onOpenChange={setOpen}>
        <TourStep>
          <TourTitle>Добро пожаловать в KSI!</TourTitle>
          <TourDescription>Короткий тур покажет основные разделы платформы.</TourDescription>
        </TourStep>
        <TourStep target={profileRef} placement="right">
          <TourTitle>Профиль</TourTitle>
          <TourDescription>Личные данные и история успеваемости.</TourDescription>
        </TourStep>
      </Tour>
    </Stack>
  );
};

/* ── Без маски ──────────────────────────────────────────── */
export const NoMask: Story = () => {
  const [open, setOpen] = useState(true);
  const profileRef = useRef<HTMLButtonElement>(null);

  return (
    <Stack gap={4} align="center">
      <Button onClick={() => setOpen(true)}>Начать тур</Button>
      <button
        ref={profileRef}
        type="button"
        className="rounded-[var(--radius-sm)] border border-[var(--border)] p-2"
      >
        <User size={18} />
      </button>

      <Tour open={open} onOpenChange={setOpen} mask={false}>
        {/* target также принимает геттер-функцию вместо ref — полезно для document.querySelector и подобного */}
        <TourStep target={() => profileRef.current} placement="right">
          <TourTitle>Без затемнения фона</TourTitle>
          <TourDescription>
            Полезно, когда подсветка не нужна — например, для ненавязчивых подсказок.
          </TourDescription>
        </TourStep>
      </Tour>
    </Stack>
  );
};
