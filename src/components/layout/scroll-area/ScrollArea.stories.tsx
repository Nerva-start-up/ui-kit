import type { Story } from "@ladle/react";
import { Text } from "../../typography/Text";
import { ScrollArea } from "./ScrollArea";

export default { title: "Components / Layout / ScrollArea" };

const items = Array.from({ length: 20 }, (_, i) => `Элемент списка ${i + 1} — тема занятия`);

export const Default: Story = () => (
  <div className="max-w-xs">
    <ScrollArea maxHeight="200px">
      <div className="flex flex-col">
        {items.map((item, i) => (
          <div
            key={i}
            className="px-3 py-2 text-sm text-[var(--text)] border-b border-[var(--border)] last:border-0"
          >
            {item}
          </div>
        ))}
      </div>
    </ScrollArea>
  </div>
);

export const ChatHistory: Story = () => (
  <div className="max-w-sm bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-lg)] overflow-hidden">
    <div className="px-4 py-3 border-b border-[var(--border)]">
      <Text size="sm" weight="semibold">
        История чата с Норой
      </Text>
    </div>
    <ScrollArea maxHeight="240px">
      <div className="p-4 flex flex-col gap-3">
        {[
          "XSS-атаки",
          "SQL-инъекции",
          "CSRF",
          "JWT токены",
          "Bell-LaPadula",
          "RSA шифрование",
          "DDoS защита",
        ].map((topic) => (
          <div key={topic} className="text-sm">
            <Text variant="muted" size="xs" className="mb-0.5">
              Вы
            </Text>
            <Text size="sm">Объясни тему: {topic}</Text>
          </div>
        ))}
      </div>
    </ScrollArea>
  </div>
);
