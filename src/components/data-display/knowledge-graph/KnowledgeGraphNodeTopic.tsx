import type { Node, NodeProps } from "@xyflow/react";
import { Handle, Position } from "@xyflow/react";
import { CheckCircle2, Eye, Flame, Lock, Trash2 } from "lucide-react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "../../overlay/context-menu/ContextMenu";
import { useKnowledgeGraphContext } from "./context";
import type { TopicNodeData } from "./types";
import { STATUS_CFG, STATUS_OPTIONS } from "./utils";

export function KnowledgeGraphNodeTopic({
  id,
  data,
  selected,
}: NodeProps<Node<TopicNodeData, "topic">>) {
  const { selectTopic, updateTopic, deleteTopic, onNodesChange } = useKnowledgeGraphContext();
  const cfg = STATUS_CFG[data.status];
  const canEdit = Boolean(onNodesChange);
  const CurrentStatusIcon = STATUS_OPTIONS.find((o) => o.value === data.status)?.icon;

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <div
          style={{
            background: "var(--surface)",
            border: `1.5px solid ${selected ? "var(--primary)" : cfg.border}`,
            borderRadius: 10,
            padding: "10px 14px",
            minWidth: 220,
            maxWidth: 250,
            boxShadow: data.isNext
              ? "0 0 0 2px rgba(249,115,22,0.35), 0 4px 12px rgba(0,0,0,0.4)"
              : "0 2px 8px rgba(0,0,0,0.3)",
            cursor: "pointer",
          }}
        >
          <Handle
            type="target"
            position={Position.Left}
            style={{
              background: cfg.color,
              width: 8,
              height: 8,
              border: "2px solid var(--surface)",
            }}
          />
          <Handle
            type="source"
            position={Position.Right}
            style={{
              background: cfg.color,
              width: 8,
              height: 8,
              border: "2px solid var(--surface)",
            }}
          />

          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: 8,
              }}
            >
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "var(--text)",
                  lineHeight: 1.3,
                  flex: 1,
                }}
              >
                {data.label}
              </span>
              <span style={{ flexShrink: 0 }}>
                {data.status === "mastered" && <CheckCircle2 size={14} color="var(--success)" />}
                {data.status === "in_progress" && <Flame size={14} color="var(--primary)" />}
                {data.status === "not_started" && <Lock size={14} color="var(--text-muted)" />}
              </span>
            </div>

            {data.description && (
              <span style={{ fontSize: 11, color: "var(--text-muted)", lineHeight: 1.4 }}>
                {data.description}
              </span>
            )}

            {data.mastery !== null && (
              <div style={{ marginTop: 2 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                  <span style={{ fontSize: 10, color: "var(--text-muted)" }}>Прогресс</span>
                  <span style={{ fontSize: 10, color: cfg.color, fontWeight: 600 }}>
                    {Math.round(data.mastery * 100)}%
                  </span>
                </div>
                <div
                  style={{
                    height: 3,
                    borderRadius: 2,
                    background: "var(--border)",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${data.mastery * 100}%`,
                      background: cfg.color,
                      borderRadius: 2,
                    }}
                  />
                </div>
              </div>
            )}

            {data.isNext && (
              <span
                style={{
                  marginTop: 2,
                  alignSelf: "flex-start",
                  fontSize: 10,
                  color: "var(--primary)",
                  background: "var(--primary-dim)",
                  padding: "2px 7px",
                  borderRadius: 20,
                  fontWeight: 600,
                }}
              >
                Рекомендуется
              </span>
            )}
          </div>
        </div>
      </ContextMenuTrigger>

      <ContextMenuContent>
        <ContextMenuItem icon={<Eye size={14} />} onSelect={() => selectTopic(id)}>
          Открыть
        </ContextMenuItem>
        {canEdit && (
          <>
            <ContextMenuSeparator />
            <ContextMenuSub>
              <ContextMenuSubTrigger>
                {CurrentStatusIcon && <CurrentStatusIcon size={14} />}
                Статус
              </ContextMenuSubTrigger>
              <ContextMenuSubContent>
                {STATUS_OPTIONS.map((opt) => {
                  const StatusIcon = opt.icon;
                  return (
                    <ContextMenuItem
                      key={opt.value}
                      icon={<StatusIcon size={14} />}
                      onSelect={() => updateTopic(id, { status: opt.value })}
                    >
                      {opt.label}
                    </ContextMenuItem>
                  );
                })}
              </ContextMenuSubContent>
            </ContextMenuSub>
            <ContextMenuSeparator />
            <ContextMenuItem
              icon={<Trash2 size={14} />}
              destructive
              onSelect={() => deleteTopic(id)}
            >
              Удалить
            </ContextMenuItem>
          </>
        )}
      </ContextMenuContent>
    </ContextMenu>
  );
}
