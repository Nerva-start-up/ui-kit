import type { Story } from "@ladle/react";
import { Avatar } from "../../data-display/avatar/Avatar";
import { Badge } from "../../data-display/badge/Badge";
import { Text } from "../../typography/Text";
import { HoverCard } from "./HoverCard";
import { HoverCardContent } from "./HoverCardContent";
import { HoverCardTrigger } from "./HoverCardTrigger";

export default { title: "Components / Overlay / HoverCard" };

/* ── Profile preview ────────────────────────────────────── */
export const ProfilePreview: Story = () => (
  <div className="flex items-center justify-center py-24">
    <HoverCard>
      <HoverCardTrigger>
        <Text
          as="span"
          weight="medium"
          variant="primary"
          className="cursor-default underline decoration-dotted underline-offset-4"
        >
          Иванов Иван
        </Text>
      </HoverCardTrigger>
      <HoverCardContent>
        <div className="flex items-start gap-3">
          <Avatar name="Иванов Иван" size="lg" />
          <div className="flex flex-col gap-1">
            <Text as="span" size="sm" weight="semibold">
              Иванов Иван
            </Text>
            <Text as="span" size="xs" variant="muted">
              Группа ИБ-101
            </Text>
            <div className="mt-1 flex gap-1.5">
              <Badge variant="orange">KSI Score: 1420</Badge>
              <Badge variant="success">Активен</Badge>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  </div>
);

/* ── Side top ───────────────────────────────────────────── */
export const SideTop: Story = () => (
  <div className="flex items-center justify-center py-24">
    <HoverCard>
      <HoverCardTrigger>
        <button type="button" className="text-sm text-[var(--text)] underline">
          Наведи на меня (карточка сверху)
        </button>
      </HoverCardTrigger>
      <HoverCardContent side="top">
        <Text size="sm">Карточка появляется над триггером.</Text>
      </HoverCardContent>
    </HoverCard>
  </div>
);

/* ── Custom delays ──────────────────────────────────────── */
export const CustomDelays: Story = () => (
  <div className="flex items-center justify-center gap-8 py-24">
    <HoverCard openDelay={0} closeDelay={0}>
      <HoverCardTrigger>
        <Text as="span" size="sm" className="underline">
          Мгновенно
        </Text>
      </HoverCardTrigger>
      <HoverCardContent>
        <Text size="sm">openDelay=0, closeDelay=0</Text>
      </HoverCardContent>
    </HoverCard>

    <HoverCard openDelay={700} closeDelay={500}>
      <HoverCardTrigger>
        <Text as="span" size="sm" className="underline">
          С задержкой
        </Text>
      </HoverCardTrigger>
      <HoverCardContent>
        <Text size="sm">openDelay=700, closeDelay=500</Text>
      </HoverCardContent>
    </HoverCard>
  </div>
);

/* ── Course preview ─────────────────────────────────────── */
export const CoursePreview: Story = () => (
  <div className="flex items-center justify-center py-24">
    <HoverCard>
      <HoverCardTrigger>
        <Text
          as="span"
          weight="medium"
          variant="primary"
          className="cursor-default underline decoration-dotted underline-offset-4"
        >
          Основы информационной безопасности
        </Text>
      </HoverCardTrigger>
      <HoverCardContent>
        <div className="flex flex-col gap-2">
          <Text as="span" size="sm" weight="semibold">
            Основы информационной безопасности
          </Text>
          <Text size="xs" variant="muted">
            Курс охватывает основы криптографии, сетевую безопасность и практики безопасной
            разработки.
          </Text>
          <div className="flex gap-1.5">
            <Badge>6 кредитов</Badge>
            <Badge variant="info">Осень 2026</Badge>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  </div>
);
