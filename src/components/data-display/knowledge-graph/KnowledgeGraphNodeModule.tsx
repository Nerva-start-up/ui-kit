import type { Node, NodeProps } from "@xyflow/react";
import { Eye, Plus, Trash2 } from "lucide-react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "../../overlay/context-menu/ContextMenu";
import { useKnowledgeGraphContext } from "./context";
import type { ModuleHeaderData } from "./types";
import { generateNodeId, getModuleStats, getNextTopicPosition } from "./utils";

export function KnowledgeGraphNodeModule({
  id,
  data,
}: NodeProps<Node<ModuleHeaderData, "moduleHeader">>) {
  const { nodes, addNode, selectModule, deleteModule, onNodesChange } = useKnowledgeGraphContext();
  const Icon = data.icon;
  const { total, mastered } = getModuleStats(nodes, id);
  const pct = total > 0 ? Math.round((mastered / total) * 100) : 0;
  const canEdit = Boolean(onNodesChange);

  const handleAddTopic = () => {
    const position = getNextTopicPosition(nodes, id);
    if (!position) return;

    addNode({
      id: generateNodeId("topic"),
      type: "topic",
      position,
      data: { moduleId: id, label: "Новая тема", status: "not_started", mastery: null },
    });
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <div
          style={{
            background: "linear-gradient(135deg, var(--surface-2) 0%, var(--surface) 100%)",
            border: `1.5px solid ${data.accent}33`,
            borderTop: `3px solid ${data.accent}`,
            borderRadius: 12,
            padding: "12px 16px",
            minWidth: 240,
            boxShadow: `0 0 20px ${data.accent}18, 0 4px 12px rgba(0,0,0,0.3)`,
            cursor: "pointer",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
            <div
              style={{
                width: 30,
                height: 30,
                borderRadius: 8,
                background: `${data.accent}22`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Icon size={15} color={data.accent} />
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text)" }}>
                {data.label}
              </div>
              <div style={{ fontSize: 10, color: "var(--text-muted)", marginTop: 1 }}>
                {mastered} / {total} тем
              </div>
            </div>
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
              style={{ height: "100%", width: `${pct}%`, background: data.accent, borderRadius: 2 }}
            />
          </div>
        </div>
      </ContextMenuTrigger>

      <ContextMenuContent>
        <ContextMenuItem icon={<Eye size={14} />} onSelect={() => selectModule(id)}>
          Открыть
        </ContextMenuItem>
        {canEdit && (
          <>
            <ContextMenuSeparator />
            <ContextMenuItem icon={<Plus size={14} />} onSelect={handleAddTopic}>
              Добавить тему
            </ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem
              icon={<Trash2 size={14} />}
              destructive
              onSelect={() => deleteModule(id)}
            >
              Удалить
            </ContextMenuItem>
          </>
        )}
      </ContextMenuContent>
    </ContextMenu>
  );
}
