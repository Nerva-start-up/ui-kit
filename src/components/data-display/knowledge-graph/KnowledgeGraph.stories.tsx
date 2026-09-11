import type { Story } from "@ladle/react";
import { Bug, Fingerprint, Globe, Key, Radar, Skull } from "lucide-react";
import { useState } from "react";
import { Text } from "../../typography/Text";
import { KnowledgeGraph } from "./KnowledgeGraph";
import { KnowledgeGraphCanvas } from "./KnowledgeGraphCanvas";
import { KnowledgeGraphDrawer } from "./KnowledgeGraphDrawer";
import { KnowledgeGraphEditor } from "./KnowledgeGraphEditor";
import { KnowledgeGraphList } from "./KnowledgeGraphList";
import { KnowledgeGraphModuleDrawer } from "./KnowledgeGraphModuleDrawer";
import { KnowledgeGraphStats } from "./KnowledgeGraphStats";
import type { KnowledgeGraphEdge, KnowledgeGraphNode } from "./types";
import type { ModuleIconOption } from "./utils";

export default { title: "Components / Data Display / KnowledgeGraph" };

const NODES: KnowledgeGraphNode[] = [
  {
    id: "mod-1",
    type: "moduleHeader",
    position: { x: 0, y: 0 },
    draggable: false,
    data: { label: "Основы сетей", accent: "#60a5fa", icon: Globe },
  },
  {
    id: "osi-model",
    type: "topic",
    position: { x: 10, y: 90 },
    data: {
      moduleId: "mod-1",
      label: "Модель OSI",
      status: "mastered",
      mastery: 0.95,
      description: "7 уровней сетевой модели",
      fullDescription:
        "Модель OSI — концептуальная схема, описывающая семь уровней взаимодействия сетевых компонентов.",
      estimatedHours: 4,
      quizBestScore: 92,
      resources: [
        { title: "Лекция: Модель OSI и её уровни", type: "pdf" },
        { title: "Видеоразбор: Как работают уровни OSI", type: "video" },
      ],
    },
  },
  {
    id: "tcp-ip",
    type: "topic",
    position: { x: 10, y: 190 },
    data: {
      moduleId: "mod-1",
      label: "TCP/IP стек",
      status: "mastered",
      mastery: 0.88,
      description: "Протоколы передачи данных",
      prerequisites: ["Модель OSI"],
      estimatedHours: 5,
      quizBestScore: 85,
      resources: [{ title: "TCP vs UDP: разбор отличий", type: "article" }],
    },
  },
  {
    id: "dns-dhcp",
    type: "topic",
    position: { x: 10, y: 290 },
    data: {
      moduleId: "mod-1",
      label: "DNS и DHCP",
      status: "in_progress",
      mastery: 0.55,
      description: "Разрешение имён и адресация",
      isNext: true,
      prerequisites: ["TCP/IP стек"],
      estimatedHours: 3,
      resources: [{ title: "DNS: от A до AAAA записей", type: "pdf" }],
    },
  },
  {
    id: "mod-2",
    type: "moduleHeader",
    position: { x: 290, y: 0 },
    draggable: false,
    data: { label: "Криптография", accent: "#a78bfa", icon: Key },
  },
  {
    id: "symmetric",
    type: "topic",
    position: { x: 300, y: 90 },
    data: {
      moduleId: "mod-2",
      label: "Симметричное шифрование",
      status: "not_started",
      mastery: null,
      description: "AES, DES, блочные шифры",
      estimatedHours: 6,
    },
  },
  {
    id: "asymmetric",
    type: "topic",
    position: { x: 300, y: 190 },
    data: {
      moduleId: "mod-2",
      label: "Асимметричное шифрование",
      status: "not_started",
      mastery: null,
      description: "RSA, ECC, открытый ключ",
      prerequisites: ["Симметричное шифрование"],
      estimatedHours: 8,
    },
  },
];

const EDGES: KnowledgeGraphEdge[] = [
  { id: "e1", source: "osi-model", target: "tcp-ip", style: { stroke: "#4ade80", strokeWidth: 2 } },
  {
    id: "e2",
    source: "tcp-ip",
    target: "dns-dhcp",
    animated: true,
    style: { stroke: "#f97316", strokeWidth: 2 },
  },
  {
    id: "e3",
    source: "symmetric",
    target: "asymmetric",
    style: { stroke: "#8b9cb0", strokeDasharray: "5 3" },
  },
];

/** Read-only: без onNodesChange/onEdgesChange граф просто просматривается */
export const CanvasView: Story = () => {
  const [topicId, setTopicId] = useState<string | null>(null);
  return (
    <KnowledgeGraph
      nodes={NODES}
      edges={EDGES}
      selectedTopicId={topicId}
      onSelectedTopicIdChange={setTopicId}
    >
      <KnowledgeGraphStats />
      <KnowledgeGraphCanvas />
      <KnowledgeGraphDrawer />
    </KnowledgeGraph>
  );
};

/** В List-раскладке Drawer открывается снизу (bottom-sheet) — так удобнее на мобильных. */
export const ListView: Story = () => (
  <KnowledgeGraph nodes={NODES} edges={EDGES}>
    <KnowledgeGraphStats />
    <KnowledgeGraphList />
    <KnowledgeGraphDrawer side="bottom" />
  </KnowledgeGraph>
);

/**
 * Полностью редактируемый canvas — `onNodesChange`/`onEdgesChange` это единственное,
 * что нужно передать: создание, открытие и удаление живут в контекстном меню (правый клик),
 * перемещение — drag, связи — drag между темами. Левый клик по узлу ничего не открывает.
 */
export const EditableCanvas: Story = () => {
  const [nodes, setNodes] = useState<KnowledgeGraphNode[]>(NODES);
  const [edges, setEdges] = useState<KnowledgeGraphEdge[]>(EDGES);

  return (
    <div className="flex flex-col gap-3">
      <Text size="xs" variant="muted">
        Правый клик по узлу — открыть / добавить / удалить · правый клик по пустому месту — добавить
        модуль · перетащите узел — новая позиция · перетащите связь на пустое место — новая тема с
        подключением
      </Text>
      <KnowledgeGraph nodes={nodes} edges={edges} onNodesChange={setNodes} onEdgesChange={setEdges}>
        <KnowledgeGraphStats />
        <KnowledgeGraphCanvas />
        <KnowledgeGraphDrawer />
        <KnowledgeGraphModuleDrawer />
      </KnowledgeGraph>
    </div>
  );
};

/** List остаётся на форме-редакторе (Drawer с вкладками Тема / Модуль / Связь) вместо canvas-жестов. */
export const EditableList: Story = () => {
  const [nodes, setNodes] = useState<KnowledgeGraphNode[]>(NODES);
  const [edges, setEdges] = useState<KnowledgeGraphEdge[]>(EDGES);

  return (
    <KnowledgeGraph nodes={nodes} edges={edges} onNodesChange={setNodes} onEdgesChange={setEdges}>
      <KnowledgeGraphEditor />
      <KnowledgeGraphStats />
      <KnowledgeGraphList />
      <KnowledgeGraphDrawer side="bottom" />
      <KnowledgeGraphModuleDrawer side="bottom" />
    </KnowledgeGraph>
  );
};

const CUSTOM_MODULE_ICON_OPTIONS: ModuleIconOption[] = [
  { value: "radar", label: "Разведка", icon: Radar },
  { value: "bug", label: "Уязвимости", icon: Bug },
  { value: "skull", label: "Малварь", icon: Skull },
  { value: "fingerprint", label: "Форензика", icon: Fingerprint },
];

/** Свои иконки для модулей через `moduleIconOptions` — без этого пропа используется встроенный набор. */
export const CustomModuleIcons: Story = () => {
  const [nodes, setNodes] = useState<KnowledgeGraphNode[]>(NODES);
  const [edges, setEdges] = useState<KnowledgeGraphEdge[]>(EDGES);

  return (
    <KnowledgeGraph
      nodes={nodes}
      edges={edges}
      onNodesChange={setNodes}
      onEdgesChange={setEdges}
      moduleIconOptions={CUSTOM_MODULE_ICON_OPTIONS}
    >
      <KnowledgeGraphEditor triggerLabel="Добавить (свои иконки)" />
      <KnowledgeGraphStats />
      <KnowledgeGraphList />
      <KnowledgeGraphDrawer />
      <KnowledgeGraphModuleDrawer />
    </KnowledgeGraph>
  );
};
