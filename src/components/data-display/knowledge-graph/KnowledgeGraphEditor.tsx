import type { Node } from "@xyflow/react";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "../../actions/button/Button";
import { Combobox } from "../../data-entry/combobox/Combobox";
import { Input } from "../../data-entry/input/Input";
import { NumberInput } from "../../data-entry/number-input/NumberInput";
import { Select } from "../../data-entry/select/Select";
import { Textarea } from "../../data-entry/textarea/Textarea";
import { Stack } from "../../layout/Stack";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../navigation/tabs/Tabs";
import { Drawer } from "../../overlay/drawer/Drawer";
import { DrawerBody } from "../../overlay/drawer/DrawerBody";
import { DrawerHeader } from "../../overlay/drawer/DrawerHeader";
import { DrawerPanel } from "../../overlay/drawer/DrawerPanel";
import { DrawerTitle } from "../../overlay/drawer/DrawerTitle";
import { Text } from "../../typography/Text";
import { useKnowledgeGraphContext } from "./context";
import type { TopicNodeData, TopicStatus } from "./types";
import {
  MODULE_ACCENT_OPTIONS,
  STATUS_OPTIONS,
  createTopicEdge,
  generateNodeId,
  getNextModulePosition,
  getNextTopicPosition,
  groupByModule,
} from "./utils";

export type KnowledgeGraphEditorProps = {
  triggerLabel?: string;
};

/** Кнопка + Drawer с вкладками «Тема» / «Модуль» / «Связь» для формы создания */
export function KnowledgeGraphEditor({ triggerLabel = "Добавить" }: KnowledgeGraphEditorProps) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <>
      <Button type="button" size="sm" onClick={() => setOpen(true)} className="self-start">
        <Plus size={14} />
        {triggerLabel}
      </Button>

      <Drawer open={open} onClose={close}>
        <DrawerPanel side="right" width="380px">
          <DrawerHeader>
            <DrawerTitle>Добавить в граф</DrawerTitle>
          </DrawerHeader>

          <DrawerBody>
            <Tabs defaultValue="topic">
              <TabsList variant="pills">
                <TabsTrigger value="topic" variant="pills">
                  Тема
                </TabsTrigger>
                <TabsTrigger value="module" variant="pills">
                  Модуль
                </TabsTrigger>
                <TabsTrigger value="connection" variant="pills">
                  Связь
                </TabsTrigger>
              </TabsList>

              <TabsContent value="topic">
                <TopicForm onDone={close} />
              </TabsContent>
              <TabsContent value="module">
                <ModuleForm onDone={close} />
              </TabsContent>
              <TabsContent value="connection">
                <ConnectionForm onDone={close} />
              </TabsContent>
            </Tabs>
          </DrawerBody>
        </DrawerPanel>
      </Drawer>
    </>
  );
}

function TopicForm({ onDone }: { onDone: () => void }) {
  const { nodes, addNode, onNodesChange } = useKnowledgeGraphContext();
  const modules = groupByModule(nodes).map((g) => ({ value: g.id, label: g.header.label }));

  const [moduleId, setModuleId] = useState(modules[0]?.value ?? "");
  const [label, setLabel] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<TopicStatus>("not_started");
  const [hours, setHours] = useState(0);

  const canSubmit = Boolean(onNodesChange) && moduleId !== "" && label.trim() !== "";

  const handleSubmit = () => {
    const position = getNextTopicPosition(nodes, moduleId);
    if (!position) return;

    addNode({
      id: generateNodeId("topic"),
      type: "topic",
      position,
      data: {
        moduleId,
        label: label.trim(),
        status,
        mastery: status === "not_started" ? null : 0,
        description: description.trim() || undefined,
        estimatedHours: hours > 0 ? hours : undefined,
      },
    });

    setLabel("");
    setDescription("");
    setStatus("not_started");
    setHours(0);
    onDone();
  };

  return (
    <Stack gap={4} className="pt-4">
      {modules.length === 0 ? (
        <Text size="sm" variant="muted">
          Сначала создайте модуль — темы привязываются к модулю.
        </Text>
      ) : (
        <Combobox label="Модуль" options={modules} value={moduleId} onValueChange={setModuleId} />
      )}
      <Input label="Название" value={label} onChange={(e) => setLabel(e.target.value)} />
      <Textarea
        label="Описание"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={2}
      />
      <Select
        label="Статус"
        options={STATUS_OPTIONS}
        value={status}
        onValueChange={(v) => setStatus(v as TopicStatus)}
      />
      <NumberInput label="Часы на изучение" value={hours} onChange={setHours} min={0} />
      <Button type="button" onClick={handleSubmit} disabled={!canSubmit}>
        Добавить тему
      </Button>
    </Stack>
  );
}

function ModuleForm({ onDone }: { onDone: () => void }) {
  const { nodes, addNode, onNodesChange, moduleIconOptions } = useKnowledgeGraphContext();
  const [label, setLabel] = useState("");
  const [accent, setAccent] = useState(MODULE_ACCENT_OPTIONS[0].value);
  const [iconValue, setIconValue] = useState(moduleIconOptions[0]?.value ?? "");

  const canSubmit = Boolean(onNodesChange) && label.trim() !== "";

  const handleSubmit = () => {
    const icon =
      moduleIconOptions.find((o) => o.value === iconValue)?.icon ?? moduleIconOptions[0]?.icon;
    if (!icon) return;

    addNode({
      id: generateNodeId("module"),
      type: "moduleHeader",
      position: getNextModulePosition(nodes),
      draggable: false,
      data: { label: label.trim(), accent, icon },
    });

    setLabel("");
    onDone();
  };

  return (
    <Stack gap={4} className="pt-4">
      <Input label="Название модуля" value={label} onChange={(e) => setLabel(e.target.value)} />
      <Select
        label="Иконка"
        options={moduleIconOptions}
        value={iconValue}
        onValueChange={setIconValue}
      />
      <Select
        label="Цвет"
        options={MODULE_ACCENT_OPTIONS}
        value={accent}
        onValueChange={setAccent}
      />
      <Button type="button" onClick={handleSubmit} disabled={!canSubmit}>
        Добавить модуль
      </Button>
    </Stack>
  );
}

function ConnectionForm({ onDone }: { onDone: () => void }) {
  const { nodes, addEdge, onEdgesChange } = useKnowledgeGraphContext();
  const topics = nodes
    .filter((n): n is Node<TopicNodeData, "topic"> => n.type === "topic")
    .map((n) => ({ value: n.id, label: n.data.label }));

  const [source, setSource] = useState("");
  const [target, setTarget] = useState("");

  const canSubmit = Boolean(onEdgesChange) && source !== "" && target !== "" && source !== target;

  const handleSubmit = () => {
    addEdge(createTopicEdge(nodes, source, target));
    setSource("");
    setTarget("");
    onDone();
  };

  return (
    <Stack gap={4} className="pt-4">
      {topics.length < 2 ? (
        <Text size="sm" variant="muted">
          Нужно как минимум две темы, чтобы создать связь.
        </Text>
      ) : (
        <>
          <Combobox label="Из темы" options={topics} value={source} onValueChange={setSource} />
          <Combobox label="В тему" options={topics} value={target} onValueChange={setTarget} />
        </>
      )}
      <Button type="button" onClick={handleSubmit} disabled={!canSubmit}>
        Создать связь
      </Button>
    </Stack>
  );
}
