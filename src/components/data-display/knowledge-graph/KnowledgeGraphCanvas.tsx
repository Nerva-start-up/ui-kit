import {
  Background,
  BackgroundVariant,
  type Connection,
  type FinalConnectionState,
  MiniMap,
  type NodeChange,
  type NodeTypes,
  ReactFlow,
  ReactFlowProvider,
  applyNodeChanges,
  useReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Plus } from "lucide-react";
import { useCallback, useMemo, useRef, useState } from "react";
import { cn } from "../../../lib/cn";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "../../overlay/context-menu/ContextMenu";
import { KnowledgeGraphControls } from "./KnowledgeGraphControls";
import { KnowledgeGraphNodeModule } from "./KnowledgeGraphNodeModule";
import { KnowledgeGraphNodeTopic } from "./KnowledgeGraphNodeTopic";
import { useKnowledgeGraphContext } from "./context";
import type { KnowledgeGraphNode, ModuleHeaderData, TopicNodeData } from "./types";
import {
  MODULE_ACCENT_OPTIONS,
  STATUS_CFG,
  createTopicEdge,
  generateNodeId,
  getEdgeStyle,
  getStyledEdges,
} from "./utils";

const NODE_TYPES: NodeTypes = {
  topic: KnowledgeGraphNodeTopic,
  moduleHeader: KnowledgeGraphNodeModule,
};

export type KnowledgeGraphCanvasProps = {
  height?: number;
  className?: string;
};

/** Интерактивный граф: drag, zoom, minimap, кнопки zoom/fit/lock */
export function KnowledgeGraphCanvas({ height = 540, className }: KnowledgeGraphCanvasProps) {
  return (
    <div
      className={cn(
        "rounded-[var(--radius-lg)] overflow-hidden border border-[var(--border)]",
        className
      )}
      style={{ height }}
    >
      <ReactFlowProvider>
        <KnowledgeGraphCanvasInner />
      </ReactFlowProvider>
    </div>
  );
}

function KnowledgeGraphCanvasInner() {
  const { nodes, edges, addNode, addEdge, onNodesChange, onEdgesChange, moduleIconOptions } =
    useKnowledgeGraphContext();
  const [locked, setLocked] = useState(false);
  const { screenToFlowPosition } = useReactFlow();
  const lastContextMenuPoint = useRef({ x: 0, y: 0 });

  const canEditNodes = Boolean(onNodesChange);
  const canEditEdges = Boolean(onEdgesChange);

  // Стиль связи всегда пересчитывается из текущих статусов её тем, а не из того, что сохранено в edge
  const styledEdges = useMemo(() => getStyledEdges(nodes, edges), [nodes, edges]);

  // Перетаскивание / удаление узла на canvas → сохранить изменения (+ подчистить связанные edges при удалении)
  const handleNodesChange = useCallback(
    (changes: NodeChange<KnowledgeGraphNode>[]) => {
      onNodesChange?.(applyNodeChanges(changes, nodes));

      const removedIds = changes.filter((c) => c.type === "remove").map((c) => c.id);
      if (removedIds.length > 0) {
        const nextEdges = edges.filter(
          (e) => !removedIds.includes(e.source) && !removedIds.includes(e.target)
        );
        if (nextEdges.length !== edges.length) onEdgesChange?.(nextEdges);
      }
    },
    [nodes, edges, onNodesChange, onEdgesChange]
  );

  const handleConnect = useCallback(
    (connection: Connection) => {
      if (!connection.source || !connection.target) return;
      addEdge(createTopicEdge(nodes, connection.source, connection.target));
    },
    [nodes, addEdge]
  );

  // Перетащить связь из темы на пустое место canvas → создать новую тему и подключить её
  const handleConnectEnd = useCallback(
    (event: MouseEvent | TouchEvent, connectionState: FinalConnectionState) => {
      if (connectionState.isValid || !canEditNodes || !canEditEdges) return;

      const sourceNode = connectionState.fromNode;
      if (!sourceNode || sourceNode.type !== "topic") return;

      const point = "changedTouches" in event ? event.changedTouches[0] : event;
      const position = screenToFlowPosition({ x: point.clientX, y: point.clientY });
      const sourceData = sourceNode.data as TopicNodeData;
      const newTopicId = generateNodeId("topic");
      const { stroke, strokeWidth, strokeDasharray, animated } = getEdgeStyle(
        sourceData.status,
        "not_started"
      );

      addNode({
        id: newTopicId,
        type: "topic",
        position,
        data: {
          moduleId: sourceData.moduleId,
          label: "Новая тема",
          status: "not_started",
          mastery: null,
        },
      });
      addEdge({
        id: generateNodeId("edge"),
        source: sourceNode.id,
        target: newTopicId,
        animated,
        style: { stroke, strokeWidth, strokeDasharray },
      });
    },
    [canEditNodes, canEditEdges, addNode, addEdge, screenToFlowPosition]
  );

  const handlePaneContextMenu = useCallback((event: React.MouseEvent) => {
    lastContextMenuPoint.current = { x: event.clientX, y: event.clientY };
  }, []);

  // Правый клик по пустому месту canvas → новый модуль в точке клика
  const handleAddModule = useCallback(() => {
    if (!canEditNodes) return;

    const position = screenToFlowPosition(lastContextMenuPoint.current);
    const moduleCount = nodes.filter((n) => n.type === "moduleHeader").length;
    const accent = MODULE_ACCENT_OPTIONS[moduleCount % MODULE_ACCENT_OPTIONS.length];
    const icon = moduleIconOptions[moduleCount % moduleIconOptions.length] ?? moduleIconOptions[0];
    if (!icon) return;

    addNode({
      id: generateNodeId("module"),
      type: "moduleHeader",
      position,
      data: { label: "Новый модуль", accent: accent.value, icon: icon.icon },
    });
  }, [nodes, canEditNodes, addNode, screenToFlowPosition, moduleIconOptions]);

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <div className="h-full w-full" onContextMenu={handlePaneContextMenu}>
          <ReactFlow
            nodes={nodes}
            edges={styledEdges}
            nodeTypes={NODE_TYPES}
            onNodesChange={handleNodesChange}
            onConnect={handleConnect}
            onConnectEnd={handleConnectEnd}
            nodesDraggable={!locked && canEditNodes}
            nodesConnectable={!locked && canEditEdges}
            fitView
            fitViewOptions={{ padding: 0.15 }}
            minZoom={0.3}
            maxZoom={1.8}
            defaultEdgeOptions={{ style: { stroke: "#8b9cb0", strokeWidth: 1.5 } }}
            proOptions={{ hideAttribution: true }}
          >
            <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="#21262d" />
            <KnowledgeGraphControls locked={locked} onToggleLock={() => setLocked((v) => !v)} />
            <MiniMap
              style={{
                background: "var(--surface-2)",
                border: "1px solid var(--border)",
                borderRadius: 8,
              }}
              nodeColor={(n) => {
                if (n.type === "moduleHeader") return (n.data as ModuleHeaderData).accent;
                return STATUS_CFG[(n.data as TopicNodeData).status]?.color ?? "#8b9cb0";
              }}
              maskColor="rgba(13,17,23,0.7)"
            />
          </ReactFlow>
        </div>
      </ContextMenuTrigger>

      {canEditNodes && (
        <ContextMenuContent>
          <ContextMenuItem icon={<Plus size={14} />} onSelect={handleAddModule}>
            Добавить модуль
          </ContextMenuItem>
        </ContextMenuContent>
      )}
    </ContextMenu>
  );
}
