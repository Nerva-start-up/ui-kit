import type { Story } from "@ladle/react";
import { HelpCircle, MessageCircle, Plus, QrCode, Share2 } from "lucide-react";
import { useRef } from "react";
import { TooltipProvider } from "../../overlay/tooltip/Tooltip";
import { Text } from "../../typography/Text";
import { FloatButton } from "./FloatButton";
import { FloatButtonBackTop } from "./FloatButtonBackTop";
import { FloatButtonGroup } from "./FloatButtonGroup";

export default { title: "Components / Actions / FloatButton" };

function Demo({ children }: { children: React.ReactNode }) {
  return (
    <TooltipProvider>
      <div className="relative h-96 overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--bg)] p-4">
        <Text size="sm" variant="muted">
          Контент страницы...
        </Text>
        {children}
      </div>
    </TooltipProvider>
  );
}

/* ── Базовый пример ─────────────────────────────────────── */
export const Basic: Story = () => (
  <Demo>
    <FloatButton
      icon={MessageCircle}
      tooltip="Написать в поддержку"
      className="absolute right-4 bottom-4"
    />
  </Demo>
);

/* ── Primary + square с описанием ───────────────────────── */
export const Variants: Story = () => (
  <Demo>
    <div className="absolute right-4 bottom-4 flex gap-3">
      <FloatButton icon={HelpCircle} description="FAQ" shape="square" />
      <FloatButton icon={Plus} type="primary" tooltip="Создать" />
    </div>
  </Demo>
);

/* ── С бейджем ───────────────────────────────────────────── */
export const WithBadge: Story = () => (
  <Demo>
    <div className="absolute right-4 bottom-4 flex gap-3">
      <FloatButton icon={MessageCircle} badge={{ dot: true }} />
      <FloatButton icon={Share2} badge={{ count: 128, max: 99 }} />
    </div>
  </Demo>
);

/* ── Группа (клик) ───────────────────────────────────────── */
export const Group: Story = () => (
  <Demo>
    <div className="absolute right-4 bottom-4">
      <FloatButtonGroup icon={Plus} trigger="click">
        <FloatButton icon={QrCode} tooltip="QR-код" />
        <FloatButton icon={Share2} tooltip="Поделиться" />
        <FloatButton icon={MessageCircle} tooltip="Написать" />
      </FloatButtonGroup>
    </div>
  </Demo>
);

/* ── Группа (hover) ──────────────────────────────────────── */
export const GroupHover: Story = () => (
  <Demo>
    <div className="absolute right-4 bottom-4">
      <FloatButtonGroup icon={Plus} trigger="hover" shape="square">
        <FloatButton icon={QrCode} description="QR" shape="square" />
        <FloatButton icon={Share2} description="Share" shape="square" />
      </FloatButtonGroup>
    </div>
  </Demo>
);

/* ── BackTop — появляется после скролла контейнера ─────────── */
export const BackTop: Story = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="relative h-96 overflow-y-auto rounded-[var(--radius-lg)] border border-[var(--border)] p-4"
    >
      {Array.from({ length: 20 }, (_, i) => (
        <Text key={i} size="sm" variant="muted" className="mb-4">
          Строка контента {i + 1}
        </Text>
      ))}
      <div className="sticky bottom-4 flex justify-end pr-1">
        <FloatButtonBackTop
          visibilityHeight={100}
          container={() => containerRef.current ?? window}
        />
      </div>
    </div>
  );
};
