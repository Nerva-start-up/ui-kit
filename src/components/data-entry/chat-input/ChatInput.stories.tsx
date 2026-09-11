import { Button } from "@components/actions/button/Button";
import { AttachmentChip } from "@components/data-display/attachment-chip/AttachmentChip";
import { ChatBubble } from "@components/data-display/chat/ChatBubble";
import { ToolCall } from "@components/data-display/tool-call/ToolCall";
import type { Story } from "@ladle/react";
import { Paperclip } from "lucide-react";
import { useState } from "react";
import { ChatInput } from "./ChatInput";

export default { title: "Components / Data Entry / ChatInput" };

/* ── Default — uncontrolled ─────────────────────────────── */
export const Default: Story = () => (
  <div className="max-w-xl">
    <ChatInput placeholder="Спросите Нору о кибербезопасности…" onSubmit={(v) => alert(v)} />
  </div>
);

/* ── Controlled ─────────────────────────────────────────── */
export const Controlled: Story = () => {
  const [value, setValue] = useState("Объясни разницу между XSS и CSRF");

  return (
    <div className="max-w-xl">
      <ChatInput
        value={value}
        onChange={setValue}
        onSubmit={(v) => {
          alert(v);
          setValue("");
        }}
      />
    </div>
  );
};

/* ── Sizes ──────────────────────────────────────────────── */
export const Sizes: Story = () => (
  <div className="max-w-xl flex flex-col gap-4">
    <ChatInput size="sm" placeholder="sm" />
    <ChatInput size="md" placeholder="md" />
    <ChatInput size="lg" placeholder="lg" />
  </div>
);

/* ── States: disabled / loading ────────────────────────── */
export const States: Story = () => (
  <div className="max-w-xl flex flex-col gap-4">
    <ChatInput placeholder="Обычное состояние" />
    <ChatInput disabled placeholder="Заблокировано" defaultValue="Нельзя редактировать" />
    <ChatInput loading defaultValue="Нора генерирует ответ…" onStop={() => alert("stop")} />
  </div>
);

/* ── With toolbar & attachment slots ───────────────────── */
export const WithSlots: Story = () => {
  const [attached, setAttached] = useState(true);

  return (
    <div className="max-w-xl">
      <ChatInput
        placeholder="Опишите вопрос…"
        topSlot={
          attached && (
            <AttachmentChip
              name="screenshot.png"
              type="image/png"
              size={182_000}
              status="done"
              onRemove={() => setAttached(false)}
            />
          )
        }
        toolbarStart={
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Прикрепить файл"
            onClick={() => setAttached(true)}
          >
            <Paperclip size={16} />
          </Button>
        }
      />
    </div>
  );
};

/* ── Реалистичный пример: собранный чат с вложением и tool-call ── */
export const FullComposer: Story = () => {
  const [value, setValue] = useState("");
  const [attachments, setAttachments] = useState([
    { id: "1", name: "network-scan.pcap", size: 412_000, status: "done" as const },
  ]);

  return (
    <div className="max-w-xl flex flex-col gap-3">
      <ChatBubble sender="user" content="Проверь этот .pcap на подозрительный трафик" />

      <ToolCall
        name="analyze_pcap"
        status="success"
        input={{ file: "network-scan.pcap", filters: ["dns", "http"] }}
        output={{ suspicious_hosts: ["185.220.101.7"], anomalies: 3 }}
      />

      <ChatBubble
        sender="ai"
        name="Нора"
        content="Нашла 3 аномалии, один хост похож на выходной узел Tor — 185.220.101.7. Хотите разбор по каждому пакету?"
      />

      <ChatInput
        value={value}
        onChange={setValue}
        onSubmit={(v) => {
          alert(v);
          setValue("");
        }}
        topSlot={attachments.map((a) => (
          <AttachmentChip
            key={a.id}
            name={a.name}
            size={a.size}
            status={a.status}
            onRemove={() => setAttachments((prev) => prev.filter((x) => x.id !== a.id))}
          />
        ))}
        toolbarStart={
          <Button type="button" variant="ghost" size="icon" aria-label="Прикрепить файл">
            <Paperclip size={16} />
          </Button>
        }
        placeholder="Ответьте Норе…"
      />
    </div>
  );
};
