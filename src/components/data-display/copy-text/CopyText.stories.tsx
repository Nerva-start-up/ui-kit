import type { Story } from "@ladle/react";
import { useState } from "react";
import { Text } from "../../typography/Text";
import { CopyText } from "./CopyText";
import { CopyTextTrigger } from "./CopyTextTrigger";
import { CopyTextValue } from "./CopyTextValue";

export default { title: "Components / Data Display / CopyText" };

/* ── Примеры использования ──────────────────────────────── */
export const Examples: Story = () => (
  <div className="flex flex-col gap-4 max-w-md">
    {/* URL */}
    <div className="flex flex-col gap-1">
      <Text as="span" size="xs" variant="muted">
        URL
      </Text>
      <CopyText text="https://ksi-production.up.railway.app/api/v1">
        <CopyTextValue truncate />
        <CopyTextTrigger />
      </CopyText>
    </div>

    {/* Короткий ID */}
    <div className="flex flex-col gap-1">
      <Text as="span" size="xs" variant="muted">
        User ID
      </Text>
      <CopyText text="usr_8f3a92bc1d4e">
        <CopyTextValue />
        <CopyTextTrigger />
      </CopyText>
    </div>

    {/* API-ключ — маскированный */}
    <div className="flex flex-col gap-1">
      <Text as="span" size="xs" variant="muted">
        API Key
      </Text>
      <CopyText text="sk-ksi-prod-a1b2c3d4e5f6g7h8i9j0">
        <CopyTextValue mask />
        <CopyTextTrigger />
      </CopyText>
    </div>

    {/* JWT токен — маскированный + truncate */}
    <div className="flex flex-col gap-1">
      <Text as="span" size="xs" variant="muted">
        JWT Token
      </Text>
      <CopyText text="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwicm9sZSI6InN0dWRlbnQifQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c">
        <CopyTextValue mask truncate />
        <CopyTextTrigger />
      </CopyText>
    </div>

    {/* npm-команда */}
    <div className="flex flex-col gap-1">
      <Text as="span" size="xs" variant="muted">
        Install
      </Text>
      <CopyText text="bun add @nerva-start-up/ui">
        <CopyTextValue />
        <CopyTextTrigger />
      </CopyText>
    </div>
  </div>
);

/* ── С колбэком onCopied ────────────────────────────────── */
export const WithCallback: Story = () => {
  const [log, setLog] = useState<string[]>([]);

  return (
    <div className="flex flex-col gap-4 max-w-md">
      <CopyText
        text="ksi-ed.uz"
        onCopied={() =>
          setLog((prev) =>
            [`${new Date().toLocaleTimeString()} — скопировано`, ...prev].slice(0, 5)
          )
        }
      >
        <CopyTextValue />
        <CopyTextTrigger />
      </CopyText>

      <div className="flex flex-col gap-1">
        {log.length === 0 ? (
          <Text as="span" size="xs" variant="muted">
            Скопируй — здесь появится лог
          </Text>
        ) : (
          log.map((entry, i) => (
            <Text as="span" key={i} size="xs" variant="muted">
              {entry}
            </Text>
          ))
        )}
      </div>
    </div>
  );
};

/* ── В форме — поле с кнопкой ───────────────────────────── */
export const InForm: Story = () => (
  <div className="flex flex-col gap-3 max-w-md p-4 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)]">
    <Text size="sm" weight="semibold">
      Приглашение в группу
    </Text>
    <Text size="xs" variant="muted">
      Отправь эту ссылку студентам для регистрации в группе ИБ-101
    </Text>
    <CopyText text="https://ksi-ed.uz/join?group=ib-101&token=abc123" className="w-full">
      <CopyTextValue truncate />
      <CopyTextTrigger />
    </CopyText>
  </div>
);
