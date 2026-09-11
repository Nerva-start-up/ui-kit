import { Badge } from "@components/data-display/badge/Badge";
import type { Story } from "@ladle/react";
import { Globe, Search } from "lucide-react";
import { useState } from "react";
import { ToolCall } from "./ToolCall";

export default { title: "Components / Data Display / ToolCall" };

/* ── Default — успешный вызов с input/output ───────────── */
export const Default: Story = () => (
  <div className="max-w-xl">
    <ToolCall
      name="search_cve"
      status="success"
      defaultExpanded
      icon={<Search size={14} />}
      input={{ query: "log4j RCE", year: 2021 }}
      output={{ id: "CVE-2021-44228", severity: "critical", cvss: 10.0 }}
    />
  </div>
);

/* ── Playground: контролируемое раскрытие ──────────────── */
export const Playground: Story = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="max-w-xl flex flex-col gap-3">
      <ToolCall
        name="fetch_url"
        status="success"
        icon={<Globe size={14} />}
        input={{ url: "https://example.com/robots.txt" }}
        output="User-agent: *\nDisallow: /admin"
        expanded={expanded}
        onExpandedChange={setExpanded}
      />
      <button
        type="button"
        className="text-sm underline self-start"
        onClick={() => setExpanded((v) => !v)}
      >
        {expanded ? "Свернуть" : "Раскрыть"} снаружи
      </button>
    </div>
  );
};

/* ── States: все статусы ────────────────────────────────── */
export const States: Story = () => (
  <div className="max-w-xl flex flex-col gap-3">
    <ToolCall name="list_ports" status="pending" input={{ host: "192.168.1.1" }} />
    <ToolCall name="scan_ports" status="running" input={{ host: "192.168.1.1", range: "1-1024" }} />
    <ToolCall
      name="scan_ports"
      status="success"
      defaultExpanded
      input={{ host: "192.168.1.1", range: "1-1024" }}
      output={{ open: [22, 80, 443] }}
    />
    <ToolCall
      name="scan_ports"
      status="error"
      defaultExpanded
      input={{ host: "10.0.0.99" }}
      error="Хост недоступен: превышен таймаут соединения (5000ms)"
    />
  </div>
);

/* ── Кастомный renderOutput вместо JSON ────────────────── */
export const CustomOutput: Story = () => (
  <div className="max-w-xl">
    <ToolCall
      name="check_password_strength"
      status="success"
      defaultExpanded
      input={{ password: "••••••••" }}
      output={{ score: 3, label: "Средний" }}
      renderOutput={(output) => {
        const { score, label } = output as { score: number; label: string };
        return (
          <div className="flex items-center gap-2">
            <Badge variant={score >= 4 ? "success" : score >= 2 ? "warning" : "error"}>
              {label}
            </Badge>
            <span className="text-xs text-[var(--text-muted)]">{score}/5</span>
          </div>
        );
      }}
    />
  </div>
);

/* ── Нечего раскрывать — заголовок статичен, шеврон скрыт ── */
export const NoContent: Story = () => (
  <div className="max-w-xl">
    <ToolCall name="ping_host" status="running" />
  </div>
);
