import type React from "react";
import { useCallback, useState } from "react";
import { cn } from "../../../lib/cn";
import { KnowledgeGraphContext } from "./context";
import type {
  KnowledgeGraphEdge,
  KnowledgeGraphNode,
  ModuleHeaderData,
  TopicNodeData,
} from "./types";
import { MODULE_ICON_OPTIONS, type ModuleIconOption, removeModule, removeTopic } from "./utils";

export type KnowledgeGraphProps = {
  nodes: KnowledgeGraphNode[];
  edges: KnowledgeGraphEdge[];
  /** Свои иконки для модулей (селект в форме создания/редактирования + автовыбор при создании через canvas). По умолчанию — встроенный набор `MODULE_ICON_OPTIONS` */
  moduleIconOptions?: ModuleIconOption[];
  selectedTopicId?: string | null;
  defaultSelectedTopicId?: string | null;
  onSelectedTopicIdChange?: (id: string | null) => void;
  selectedModuleId?: string | null;
  defaultSelectedModuleId?: string | null;
  onSelectedModuleIdChange?: (id: string | null) => void;
  /** Основной колбэк: любое изменение узлов (drag, создание, редактирование) отдаёт сюда обновлённый массив */
  onNodesChange?: (nodes: KnowledgeGraphNode[]) => void;
  /** Основной колбэк: создание связи отдаёт сюда обновлённый массив */
  onEdgesChange?: (edges: KnowledgeGraphEdge[]) => void;
  /** Опциональный side-channel хук на создание узла (аналитика, запрос к API и т.п.) — не обязателен, состояние обновляется через onNodesChange */
  onCreateNode?: (node: KnowledgeGraphNode) => void;
  /** Опциональный side-channel хук на создание связи — не обязателен, состояние обновляется через onEdgesChange */
  onCreateEdge?: (edge: KnowledgeGraphEdge) => void;
  /** Опциональный side-channel хук на редактирование темы — не обязателен, состояние обновляется через onNodesChange */
  onUpdateNode?: (id: string, data: Partial<TopicNodeData>) => void;
  /** Опциональный side-channel хук на редактирование модуля — не обязателен, состояние обновляется через onNodesChange */
  onUpdateModule?: (id: string, data: Partial<ModuleHeaderData>) => void;
  className?: string;
  children: React.ReactNode;
};

/** Root: держит данные и состояние выбранной темы/модуля в контексте */
export function KnowledgeGraph({
  nodes,
  edges,
  moduleIconOptions = MODULE_ICON_OPTIONS,
  selectedTopicId: controlledSelectedTopicId,
  defaultSelectedTopicId = null,
  onSelectedTopicIdChange,
  selectedModuleId: controlledSelectedModuleId,
  defaultSelectedModuleId = null,
  onSelectedModuleIdChange,
  onNodesChange,
  onEdgesChange,
  onCreateNode,
  onCreateEdge,
  onUpdateNode,
  onUpdateModule,
  className,
  children,
}: KnowledgeGraphProps) {
  const [internalSelectedTopicId, setInternalSelectedTopicId] = useState(defaultSelectedTopicId);
  const isTopicControlled = controlledSelectedTopicId !== undefined;
  const selectedTopicId = isTopicControlled ? controlledSelectedTopicId : internalSelectedTopicId;

  const selectTopic = useCallback(
    (id: string) => {
      if (!isTopicControlled) setInternalSelectedTopicId(id);
      onSelectedTopicIdChange?.(id);
    },
    [isTopicControlled, onSelectedTopicIdChange]
  );

  const clearSelection = useCallback(() => {
    if (!isTopicControlled) setInternalSelectedTopicId(null);
    onSelectedTopicIdChange?.(null);
  }, [isTopicControlled, onSelectedTopicIdChange]);

  const [internalSelectedModuleId, setInternalSelectedModuleId] = useState(defaultSelectedModuleId);
  const isModuleControlled = controlledSelectedModuleId !== undefined;
  const selectedModuleId = isModuleControlled
    ? controlledSelectedModuleId
    : internalSelectedModuleId;

  const selectModule = useCallback(
    (id: string) => {
      if (!isModuleControlled) setInternalSelectedModuleId(id);
      onSelectedModuleIdChange?.(id);
    },
    [isModuleControlled, onSelectedModuleIdChange]
  );

  const clearModuleSelection = useCallback(() => {
    if (!isModuleControlled) setInternalSelectedModuleId(null);
    onSelectedModuleIdChange?.(null);
  }, [isModuleControlled, onSelectedModuleIdChange]);

  const addNode = useCallback(
    (node: KnowledgeGraphNode) => {
      onNodesChange?.([...nodes, node]);
      onCreateNode?.(node);
    },
    [nodes, onNodesChange, onCreateNode]
  );

  const addEdge = useCallback(
    (edge: KnowledgeGraphEdge) => {
      onEdgesChange?.([...edges, edge]);
      onCreateEdge?.(edge);
    },
    [edges, onEdgesChange, onCreateEdge]
  );

  const updateTopic = useCallback(
    (id: string, patch: Partial<TopicNodeData>) => {
      onNodesChange?.(
        nodes.map((n) =>
          n.id === id && n.type === "topic" ? { ...n, data: { ...n.data, ...patch } } : n
        )
      );
      onUpdateNode?.(id, patch);
    },
    [nodes, onNodesChange, onUpdateNode]
  );

  const updateModule = useCallback(
    (id: string, patch: Partial<ModuleHeaderData>) => {
      onNodesChange?.(
        nodes.map((n) =>
          n.id === id && n.type === "moduleHeader" ? { ...n, data: { ...n.data, ...patch } } : n
        )
      );
      onUpdateModule?.(id, patch);
    },
    [nodes, onNodesChange, onUpdateModule]
  );

  const deleteTopic = useCallback(
    (id: string) => {
      const next = removeTopic(nodes, edges, id);
      onNodesChange?.(next.nodes);
      onEdgesChange?.(next.edges);
    },
    [nodes, edges, onNodesChange, onEdgesChange]
  );

  const deleteModule = useCallback(
    (id: string) => {
      const next = removeModule(nodes, edges, id);
      onNodesChange?.(next.nodes);
      onEdgesChange?.(next.edges);
    },
    [nodes, edges, onNodesChange, onEdgesChange]
  );

  return (
    <KnowledgeGraphContext.Provider
      value={{
        nodes,
        edges,
        moduleIconOptions,
        selectedTopicId,
        selectTopic,
        clearSelection,
        selectedModuleId,
        selectModule,
        clearModuleSelection,
        onNodesChange,
        onEdgesChange,
        addNode,
        addEdge,
        updateTopic,
        updateModule,
        deleteTopic,
        deleteModule,
      }}
    >
      <div className={cn("flex flex-col gap-4", className)}>{children}</div>
    </KnowledgeGraphContext.Provider>
  );
}
