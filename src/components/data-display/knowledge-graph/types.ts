import type { Edge, Node } from "@xyflow/react";

export type TopicStatus = "not_started" | "in_progress" | "mastered";

export type TopicResource = {
  title: string;
  type: "pdf" | "video" | "quiz" | "article";
};

export type TopicNodeData = {
  /** id узла модуля (`type: "moduleHeader"`), к которому относится тема */
  moduleId: string;
  label: string;
  status: TopicStatus;
  mastery: number | null;
  description?: string;
  /** Показывает акцентный бейдж «рекомендуется» на узле и в списке */
  isNext?: boolean;
  fullDescription?: string;
  prerequisites?: string[];
  estimatedHours?: number;
  resources?: TopicResource[];
  quizBestScore?: number;
};

export type ModuleHeaderData = {
  label: string;
  accent: string;
  icon: React.ElementType;
};

export type KnowledgeGraphNode =
  | Node<TopicNodeData, "topic">
  | Node<ModuleHeaderData, "moduleHeader">;
export type KnowledgeGraphEdge = Edge;
