import { createContext, useContext } from "react";
import type {
  KnowledgeGraphEdge,
  KnowledgeGraphNode,
  ModuleHeaderData,
  TopicNodeData,
} from "./types";
import type { ModuleIconOption } from "./utils";

export type KnowledgeGraphContextValue = {
  nodes: KnowledgeGraphNode[];
  edges: KnowledgeGraphEdge[];
  /** Набор иконок для модулей — свои через `moduleIconOptions` на `KnowledgeGraph` или дефолтный список */
  moduleIconOptions: ModuleIconOption[];
  selectedTopicId: string | null;
  selectTopic: (id: string) => void;
  clearSelection: () => void;
  selectedModuleId: string | null;
  selectModule: (id: string) => void;
  clearModuleSelection: () => void;
  /** Прямой доступ к колбэку Root — используется для гейтинга UI (draggable, меню и т.д.) и cleanup-логики */
  onNodesChange?: (nodes: KnowledgeGraphNode[]) => void;
  /** Прямой доступ к колбэку Root — используется для гейтинга UI (connectable и т.д.) */
  onEdgesChange?: (edges: KnowledgeGraphEdge[]) => void;
  /** Добавляет узел: сам считает следующий массив и вызывает onNodesChange + опциональный onCreateNode */
  addNode: (node: KnowledgeGraphNode) => void;
  /** Добавляет связь: сам считает следующий массив и вызывает onEdgesChange + опциональный onCreateEdge */
  addEdge: (edge: KnowledgeGraphEdge) => void;
  /** Патчит данные темы по id: сам считает следующий массив и вызывает onNodesChange + опциональный onUpdateNode */
  updateTopic: (id: string, patch: Partial<TopicNodeData>) => void;
  /** Патчит данные модуля по id: сам считает следующий массив и вызывает onNodesChange + опциональный onUpdateModule */
  updateModule: (id: string, patch: Partial<ModuleHeaderData>) => void;
  /** Удаляет тему и связи, которые на неё ссылаются */
  deleteTopic: (id: string) => void;
  /** Удаляет модуль вместе со всеми его темами и связями, которые на них ссылаются */
  deleteModule: (id: string) => void;
};

export const KnowledgeGraphContext = createContext<KnowledgeGraphContextValue | null>(null);

export function useKnowledgeGraphContext(): KnowledgeGraphContextValue {
  const ctx = useContext(KnowledgeGraphContext);
  if (!ctx) {
    throw new Error("KnowledgeGraph sub-components must be used inside <KnowledgeGraph>");
  }
  return ctx;
}
