import { ChevronRight, Clock, FileText, HelpCircle, Link2, PlayCircle } from "lucide-react";
import { Input } from "../../data-entry/input/Input";
import { NumberInput } from "../../data-entry/number-input/NumberInput";
import { Select } from "../../data-entry/select/Select";
import { Textarea } from "../../data-entry/textarea/Textarea";
import { Progress } from "../../feedback/progress/Progress";
import { HStack } from "../../layout/HStack";
import { Stack } from "../../layout/Stack";
import { Separator } from "../../layout/separator/Separator";
import { Drawer } from "../../overlay/drawer/Drawer";
import { DrawerBody } from "../../overlay/drawer/DrawerBody";
import { DrawerHeader } from "../../overlay/drawer/DrawerHeader";
import { DrawerPanel } from "../../overlay/drawer/DrawerPanel";
import { DrawerTitle } from "../../overlay/drawer/DrawerTitle";
import { Text } from "../../typography/Text";
import { Badge } from "../badge/Badge";
import { Card } from "../card/Card";
import { useKnowledgeGraphContext } from "./context";
import type { TopicResource, TopicStatus } from "./types";
import { STATUS_CFG, STATUS_LABEL, STATUS_OPTIONS } from "./utils";

const RESOURCE_ICON: Record<TopicResource["type"], React.ElementType> = {
  pdf: FileText,
  video: PlayCircle,
  quiz: HelpCircle,
  article: Link2,
};

export type KnowledgeGraphDrawerProps = {
  /** Сторона появления панели — `"right"` для canvas-раскладки, `"bottom"` (bottom-sheet) для List на мобильных */
  side?: "right" | "bottom";
};

/** Drawer с деталями темы; поля становятся editable-инпутами, если задан onNodesChange; null, пока тема не выбрана */
export function KnowledgeGraphDrawer({ side = "right" }: KnowledgeGraphDrawerProps = {}) {
  const { nodes, selectedTopicId, clearSelection, updateTopic, onNodesChange } =
    useKnowledgeGraphContext();

  const topicNode = nodes.find((n) => n.id === selectedTopicId && n.type === "topic");
  const topic = topicNode?.type === "topic" ? topicNode.data : null;

  if (!topic || !topicNode) return null;

  const cfg = STATUS_CFG[topic.status];
  const editable = Boolean(onNodesChange);

  return (
    <Drawer open={topic !== null} onClose={clearSelection}>
      <DrawerPanel side={side} width="360px">
        <DrawerHeader>
          <DrawerTitle>{topic.label}</DrawerTitle>
        </DrawerHeader>

        <DrawerBody>
          <Stack gap={5}>
            <Input
              label="Название"
              value={topic.label}
              disabled={!editable}
              onChange={(e) => updateTopic(topicNode.id, { label: e.target.value })}
            />

            <Card padding="md">
              <Stack gap={3}>
                {editable ? (
                  <Select
                    label="Статус"
                    options={STATUS_OPTIONS}
                    value={topic.status}
                    onValueChange={(v) => updateTopic(topicNode.id, { status: v as TopicStatus })}
                  />
                ) : (
                  <HStack justify="between" align="center">
                    <Text size="sm" variant="muted">
                      Статус
                    </Text>
                    <Badge variant={cfg.badgeVariant}>{STATUS_LABEL[topic.status]}</Badge>
                  </HStack>
                )}

                {topic.mastery !== null && (
                  <>
                    <Separator />
                    <Stack gap={2}>
                      <HStack justify="between">
                        <Text size="sm" variant="muted">
                          Уровень освоения
                        </Text>
                        <Text size="sm" weight="semibold" style={{ color: cfg.color }}>
                          {Math.round(topic.mastery * 100)}%
                        </Text>
                      </HStack>
                      <Progress
                        value={Math.round(topic.mastery * 100)}
                        color={topic.status === "mastered" ? "success" : "primary"}
                      />
                    </Stack>
                  </>
                )}

                {topic.quizBestScore !== undefined && (
                  <>
                    <Separator />
                    <HStack justify="between">
                      <Text size="sm" variant="muted">
                        Лучший результат квиза
                      </Text>
                      <Text size="sm" weight="semibold" style={{ color: "var(--info)" }}>
                        {topic.quizBestScore}%
                      </Text>
                    </HStack>
                  </>
                )}

                <Separator />
                {editable ? (
                  <NumberInput
                    label="Время на изучение, ч."
                    value={topic.estimatedHours ?? 0}
                    onChange={(v) => updateTopic(topicNode.id, { estimatedHours: v || undefined })}
                    min={0}
                  />
                ) : (
                  topic.estimatedHours !== undefined && (
                    <HStack gap={2} align="center">
                      <Clock size={13} color="var(--text-muted)" />
                      <Text size="sm" variant="muted">
                        Время на изучение:{" "}
                        <span style={{ color: "var(--text)", fontWeight: 600 }}>
                          {topic.estimatedHours} ч.
                        </span>
                      </Text>
                    </HStack>
                  )
                )}
              </Stack>
            </Card>

            {editable ? (
              <Textarea
                label="Описание"
                value={topic.description ?? ""}
                onChange={(e) =>
                  updateTopic(topicNode.id, { description: e.target.value || undefined })
                }
                rows={3}
              />
            ) : (
              (topic.fullDescription ?? topic.description) && (
                <Stack gap={2}>
                  <Text
                    size="xs"
                    variant="muted"
                    weight="semibold"
                    style={{ textTransform: "uppercase", letterSpacing: "0.06em" }}
                  >
                    О теме
                  </Text>
                  <Text size="sm" variant="sub" style={{ lineHeight: 1.6 }}>
                    {topic.fullDescription ?? topic.description}
                  </Text>
                </Stack>
              )
            )}

            {topic.prerequisites && topic.prerequisites.length > 0 && (
              <Stack gap={2}>
                <Text
                  size="xs"
                  variant="muted"
                  weight="semibold"
                  style={{ textTransform: "uppercase", letterSpacing: "0.06em" }}
                >
                  Требуется знание
                </Text>
                <Stack gap={1}>
                  {topic.prerequisites.map((p) => (
                    <HStack key={p} gap={2} align="center">
                      <ChevronRight size={12} color="var(--primary)" />
                      <Text size="sm">{p}</Text>
                    </HStack>
                  ))}
                </Stack>
              </Stack>
            )}

            {topic.resources && topic.resources.length > 0 && (
              <Stack gap={2}>
                <Text
                  size="xs"
                  variant="muted"
                  weight="semibold"
                  style={{ textTransform: "uppercase", letterSpacing: "0.06em" }}
                >
                  Материалы
                </Text>
                <Stack gap={2}>
                  {topic.resources.map((r) => {
                    const Icon = RESOURCE_ICON[r.type];
                    return (
                      <Card key={r.title} padding="sm">
                        <HStack gap={3} align="center">
                          <div
                            style={{
                              width: 30,
                              height: 30,
                              borderRadius: 8,
                              flexShrink: 0,
                              background: "var(--surface-2)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Icon size={14} color="var(--primary)" />
                          </div>
                          <Text size="sm" truncate>
                            {r.title}
                          </Text>
                        </HStack>
                      </Card>
                    );
                  })}
                </Stack>
              </Stack>
            )}
          </Stack>
        </DrawerBody>
      </DrawerPanel>
    </Drawer>
  );
}
