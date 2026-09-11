import type { Node } from "@xyflow/react";
import {
  AlertTriangle,
  BookOpen,
  CheckCircle2,
  Cpu,
  Database,
  Flame,
  Globe,
  Key,
  Lock,
  Shield,
} from "lucide-react";
import type {
  KnowledgeGraphEdge,
  KnowledgeGraphNode,
  ModuleHeaderData,
  TopicNodeData,
  TopicStatus,
} from "./types";

export const STATUS_CFG: Record<
  TopicStatus,
  { color: string; border: string; badgeVariant: "success" | "warning" | "default" }
> = {
  mastered: {
    color: "var(--success)",
    border: "rgba(74,222,128,0.4)",
    badgeVariant: "success",
  },
  in_progress: {
    color: "var(--primary)",
    border: "rgba(249,115,22,0.5)",
    badgeVariant: "warning",
  },
  not_started: {
    color: "var(--text-muted)",
    border: "rgba(139,156,176,0.2)",
    badgeVariant: "default",
  },
};

export const STATUS_LABEL: Record<TopicStatus, string> = {
  mastered: "Освоено",
  in_progress: "В процессе",
  not_started: "Не начато",
};

export const STATUS_OPTIONS: { value: TopicStatus; label: string; icon: React.ElementType }[] = [
  { value: "not_started", label: "Не начато", icon: Lock },
  { value: "in_progress", label: "В процессе", icon: Flame },
  { value: "mastered", label: "Освоено", icon: CheckCircle2 },
];

export type ModuleIconOption = { value: string; label: string; icon: React.ElementType };

/** Набор иконок для модулей по умолчанию — используется, если consumer не передал свой через `moduleIconOptions` на `KnowledgeGraph` */
export const MODULE_ICON_OPTIONS: ModuleIconOption[] = [
  { value: "globe", label: "Сети", icon: Globe },
  { value: "key", label: "Криптография", icon: Key },
  { value: "shield", label: "Безопасность", icon: Shield },
  { value: "lock", label: "Доступ", icon: Lock },
  { value: "book-open", label: "Обучение", icon: BookOpen },
  { value: "alert-triangle", label: "Угрозы", icon: AlertTriangle },
  { value: "cpu", label: "Системы", icon: Cpu },
  { value: "database", label: "Данные", icon: Database },
];

export const MODULE_ACCENT_OPTIONS: { value: string; label: string; swatch: string }[] = [
  { value: "#60a5fa", label: "Синий", swatch: "#60a5fa" },
  { value: "#a78bfa", label: "Фиолетовый", swatch: "#a78bfa" },
  { value: "#f97316", label: "Оранжевый", swatch: "#f97316" },
  { value: "#4ade80", label: "Зелёный", swatch: "#4ade80" },
  { value: "#f87171", label: "Красный", swatch: "#f87171" },
  { value: "#22d3ee", label: "Голубой", swatch: "#22d3ee" },
];

export type ModuleGroup = {
  id: string;
  header: ModuleHeaderData;
  topics: Array<{ id: string; data: TopicNodeData }>;
};

export function groupByModule(nodes: KnowledgeGraphNode[]): ModuleGroup[] {
  const moduleNodes = nodes.filter(
    (n): n is Node<ModuleHeaderData, "moduleHeader"> => n.type === "moduleHeader"
  );
  const topicNodes = nodes.filter((n): n is Node<TopicNodeData, "topic"> => n.type === "topic");

  return moduleNodes.map((m) => ({
    id: m.id,
    header: m.data,
    topics: topicNodes
      .filter((t) => t.data.moduleId === m.id)
      .map((t) => ({ id: t.id, data: t.data })),
  }));
}

export type KnowledgeGraphStats = {
  total: number;
  mastered: number;
  inProgress: number;
  notStarted: number;
};

export function computeStats(nodes: KnowledgeGraphNode[]): KnowledgeGraphStats {
  const topicNodes = nodes.filter((n): n is Node<TopicNodeData, "topic"> => n.type === "topic");
  return {
    total: topicNodes.length,
    mastered: topicNodes.filter((n) => n.data.status === "mastered").length,
    inProgress: topicNodes.filter((n) => n.data.status === "in_progress").length,
    notStarted: topicNodes.filter((n) => n.data.status === "not_started").length,
  };
}

export function getModuleStats(
  nodes: KnowledgeGraphNode[],
  moduleId: string
): { total: number; mastered: number } {
  const topics = groupByModule(nodes).find((g) => g.id === moduleId)?.topics ?? [];
  return {
    total: topics.length,
    mastered: topics.filter((t) => t.data.status === "mastered").length,
  };
}

export function getNextModulePosition(nodes: KnowledgeGraphNode[]): { x: number; y: number } {
  const moduleCount = nodes.filter((n) => n.type === "moduleHeader").length;
  return { x: moduleCount * 290, y: 0 };
}

/** Высота карточки темы до того, как React Flow успел её измерить (`node.measured` ещё не заполнен) */
export const DEFAULT_TOPIC_NODE_HEIGHT = 100;

/** Вертикальный зазор между карточками тем внутри одного модуля */
export const TOPIC_NODE_GAP = 14;

/** Y первой темы модуля относительно заголовка модуля */
const MODULE_HEADER_OFFSET = 90;

/**
 * Позиция для новой темы модуля — стек по реальной измеренной высоте (`node.measured.height`)
 * уже существующих тем, а не по фиксированному шагу. React Flow измеряет ноды через
 * ResizeObserver сразу после маунта, так что после первого рендера `measured` уже заполнен;
 * для тем, которые ещё не успели отрендериться, используется `DEFAULT_TOPIC_NODE_HEIGHT`.
 */
export function getNextTopicPosition(
  nodes: KnowledgeGraphNode[],
  moduleId: string
): { x: number; y: number } | null {
  const moduleNode = nodes.find((n) => n.id === moduleId && n.type === "moduleHeader");
  if (!moduleNode) return null;

  const stackedHeight = nodes
    .filter((n): n is Node<TopicNodeData, "topic"> => n.type === "topic")
    .filter((n) => n.data.moduleId === moduleId)
    .reduce(
      (sum, n) => sum + (n.measured?.height ?? DEFAULT_TOPIC_NODE_HEIGHT) + TOPIC_NODE_GAP,
      0
    );

  return { x: moduleNode.position.x + 10, y: MODULE_HEADER_OFFSET + stackedHeight };
}

export function generateNodeId(prefix: string): string {
  return `${prefix}-${crypto.randomUUID()}`;
}

export type NodesAndEdges = { nodes: KnowledgeGraphNode[]; edges: KnowledgeGraphEdge[] };

/** Удаляет тему и все связи, которые на неё ссылаются. */
export function removeTopic(
  nodes: KnowledgeGraphNode[],
  edges: KnowledgeGraphEdge[],
  topicId: string
): NodesAndEdges {
  return {
    nodes: nodes.filter((n) => n.id !== topicId),
    edges: edges.filter((e) => e.source !== topicId && e.target !== topicId),
  };
}

/** Удаляет модуль вместе со всеми его темами и связями, которые на них ссылаются. */
export function removeModule(
  nodes: KnowledgeGraphNode[],
  edges: KnowledgeGraphEdge[],
  moduleId: string
): NodesAndEdges {
  const topicIds =
    groupByModule(nodes)
      .find((g) => g.id === moduleId)
      ?.topics.map((t) => t.id) ?? [];
  const removedIds = new Set([moduleId, ...topicIds]);

  return {
    nodes: nodes.filter((n) => !removedIds.has(n.id)),
    edges: edges.filter((e) => !removedIds.has(e.source) && !removedIds.has(e.target)),
  };
}

export type EdgeVisualStyle = {
  stroke: string;
  strokeWidth: number;
  strokeDasharray?: string;
  animated: boolean;
};

const RANK: Record<TopicStatus, number> = { not_started: 0, in_progress: 1, mastered: 2 };

/**
 * Стиль связи между двумя темами определяется их текущими статусами — у каждой пары
 * (порядок source/target не важен) свой стиль, поэтому «освоено» всегда выделяется,
 * даже если вторая тема ещё не начата.
 */
export function getEdgeStyle(
  sourceStatus: TopicStatus,
  targetStatus: TopicStatus
): EdgeVisualStyle {
  const [lo, hi] =
    RANK[sourceStatus] <= RANK[targetStatus]
      ? [sourceStatus, targetStatus]
      : [targetStatus, sourceStatus];

  if (lo === "mastered" && hi === "mastered") {
    return { stroke: "var(--success)", strokeWidth: 2, animated: false };
  }
  if (lo === "in_progress" && hi === "mastered") {
    return { stroke: "var(--primary)", strokeWidth: 2, animated: true };
  }
  if (lo === "not_started" && hi === "mastered") {
    return { stroke: "var(--info)", strokeWidth: 2, animated: false };
  }
  if (lo === "in_progress" && hi === "in_progress") {
    return { stroke: "var(--primary)", strokeWidth: 2, animated: true };
  }
  if (lo === "not_started" && hi === "in_progress") {
    return {
      stroke: "var(--primary)",
      strokeWidth: 1.5,
      strokeDasharray: "5 3",
      animated: true,
    };
  }
  return {
    stroke: "var(--text-muted)",
    strokeWidth: 1.5,
    strokeDasharray: "5 3",
    animated: false,
  };
}

function getTopicStatus(nodes: KnowledgeGraphNode[], id: string): TopicStatus {
  const topicNode = nodes.find(
    (n): n is Node<TopicNodeData, "topic"> => n.type === "topic" && n.id === id
  );
  return topicNode?.data.status ?? "not_started";
}

/** Создаёт связь между двумя темами со стилем, вычисленным из их текущих статусов. */
export function createTopicEdge(
  nodes: KnowledgeGraphNode[],
  sourceId: string,
  targetId: string
): KnowledgeGraphEdge {
  const { stroke, strokeWidth, strokeDasharray, animated } = getEdgeStyle(
    getTopicStatus(nodes, sourceId),
    getTopicStatus(nodes, targetId)
  );

  return {
    id: generateNodeId("edge"),
    source: sourceId,
    target: targetId,
    animated,
    style: { stroke, strokeWidth, strokeDasharray },
  };
}

/**
 * Пересчитывает стиль каждой связи из ТЕКУЩИХ статусов её тем — так связь всегда выглядит
 * актуально, даже если статус узла поменялся уже после создания связи (или она вообще
 * пришла из статических исходных данных с собственным style).
 */
export function getStyledEdges(
  nodes: KnowledgeGraphNode[],
  edges: KnowledgeGraphEdge[]
): KnowledgeGraphEdge[] {
  return edges.map((edge) => {
    const { stroke, strokeWidth, strokeDasharray, animated } = getEdgeStyle(
      getTopicStatus(nodes, edge.source),
      getTopicStatus(nodes, edge.target)
    );
    return { ...edge, animated, style: { ...edge.style, stroke, strokeWidth, strokeDasharray } };
  });
}
