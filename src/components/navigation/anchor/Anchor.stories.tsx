import type { Story } from "@ladle/react";
import { useRef } from "react";
import { Heading } from "../../typography/Heading";
import { Text } from "../../typography/Text";
import { Anchor } from "./Anchor";
import { AnchorLink } from "./AnchorLink";

const SECTIONS = [
  { id: "intro", title: "Введение" },
  { id: "install", title: "Установка" },
  { id: "usage", title: "Использование" },
  { id: "props", title: "Props" },
  { id: "faq", title: "FAQ" },
];

function DemoSection({ id, title }: { id: string; title: string }) {
  return (
    <section id={id} className="h-72 border-b border-[var(--border)] p-4">
      <Heading as="h3" level={4}>
        {title}
      </Heading>
      <Text size="sm" variant="muted" className="mt-2">
        Секция «{title}» — заполнитель контента, скролль вниз, чтобы увидеть смену активной ссылки.
      </Text>
    </section>
  );
}

export default { title: "Components / Navigation / Anchor" };

/* ── Базовый пример ─────────────────────────────────────── */
export const Basic: Story = () => (
  <div className="flex h-96 gap-8">
    <Anchor className="w-48 shrink-0" offsetTop={16}>
      {SECTIONS.map((s) => (
        <AnchorLink key={s.id} href={`#${s.id}`} label={s.title} />
      ))}
    </Anchor>

    <div className="flex-1 overflow-y-auto">
      {SECTIONS.map((s) => (
        <DemoSection key={s.id} {...s} />
      ))}
    </div>
  </div>
);

/* ── Вложенные ссылки ────────────────────────────────────── */
export const Nested: Story = () => (
  <div className="flex h-96 gap-8">
    <Anchor className="w-56 shrink-0" offsetTop={16}>
      <AnchorLink href="#intro" label="Введение" />
      <AnchorLink href="#usage" label="Использование">
        <AnchorLink href="#usage-basic" label="Базовый пример" />
        <AnchorLink href="#usage-advanced" label="Продвинутый пример" />
      </AnchorLink>
      <AnchorLink href="#faq" label="FAQ" />
    </Anchor>

    <div className="flex-1 overflow-y-auto">
      <section id="intro" className="h-72 border-b border-[var(--border)] p-4">
        <Heading as="h3" level={4}>
          Введение
        </Heading>
      </section>
      <section id="usage" className="border-b border-[var(--border)] p-4">
        <Heading as="h3" level={4}>
          Использование
        </Heading>
        <div id="usage-basic" className="h-72 pt-4">
          <Text as="h4" weight="medium">
            Базовый пример
          </Text>
        </div>
        <div id="usage-advanced" className="h-72 pt-4">
          <Text as="h4" weight="medium">
            Продвинутый пример
          </Text>
        </div>
      </section>
      <section id="faq" className="h-72 p-4">
        <Heading as="h3" level={4}>
          FAQ
        </Heading>
      </section>
    </div>
  </div>
);

/* ── Свой скролл-контейнер (ScrollArea вместо window) ───── */
export const CustomContainer: Story = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex h-96 gap-8">
      <Anchor
        className="w-48 shrink-0"
        offsetTop={8}
        container={() => containerRef.current ?? window}
      >
        {SECTIONS.map((s) => (
          <AnchorLink key={s.id} href={`#custom-${s.id}`} label={s.title} />
        ))}
      </Anchor>

      <div ref={containerRef} className="flex-1 overflow-y-auto">
        {SECTIONS.map((s) => (
          <section
            key={s.id}
            id={`custom-${s.id}`}
            className="h-72 border-b border-[var(--border)] p-4"
          >
            <Heading as="h3" level={4}>
              {s.title}
            </Heading>
          </section>
        ))}
      </div>
    </div>
  );
};
