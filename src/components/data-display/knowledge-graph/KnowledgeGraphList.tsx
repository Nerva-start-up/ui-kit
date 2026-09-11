import { CheckCircle2, Flame, Lock } from "lucide-react";
import { Progress } from "../../feedback/progress/Progress";
import { HStack } from "../../layout/HStack";
import { Stack } from "../../layout/Stack";
import { Separator } from "../../layout/separator/Separator";
import { Text } from "../../typography/Text";
import { Badge } from "../badge/Badge";
import { Card } from "../card/Card";
import { useKnowledgeGraphContext } from "./context";
import type { TopicNodeData } from "./types";
import { type ModuleGroup, STATUS_CFG, STATUS_LABEL, groupByModule } from "./utils";

export type KnowledgeGraphListProps = {
  className?: string;
};

/** Плоский список тем, сгруппированный по модулям; клик по теме/заголовку модуля открывает Drawer */
export function KnowledgeGraphList({ className }: KnowledgeGraphListProps) {
  const { nodes, selectTopic, selectModule } = useKnowledgeGraphContext();
  const groups = groupByModule(nodes);

  return (
    <Stack gap={3} className={className}>
      {groups.map((group) => (
        <ModuleSection
          key={group.id}
          group={group}
          onTopicClick={selectTopic}
          onModuleClick={selectModule}
        />
      ))}
    </Stack>
  );
}

function ModuleSection({
  group,
  onTopicClick,
  onModuleClick,
}: {
  group: ModuleGroup;
  onTopicClick: (id: string) => void;
  onModuleClick: (id: string) => void;
}) {
  const { header, topics } = group;
  const Icon = header.icon;
  const total = topics.length;
  const mastered = topics.filter((t) => t.data.status === "mastered").length;
  const pct = total > 0 ? Math.round((mastered / total) * 100) : 0;

  return (
    <Card padding="none" className="overflow-hidden">
      <button
        type="button"
        onClick={() => onModuleClick(group.id)}
        style={{ borderTop: `3px solid ${header.accent}` }}
        className="w-full px-4 py-3 bg-[var(--surface-2)] text-left cursor-pointer transition-colors hover:bg-[var(--surface)]"
      >
        <HStack justify="between" align="center">
          <HStack gap={3} align="center">
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                flexShrink: 0,
                background: `${header.accent}22`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon size={15} color={header.accent} />
            </div>
            <Stack gap={0}>
              <Text size="sm" weight="semibold">
                {header.label}
              </Text>
              <Text size="xs" variant="muted">
                {mastered} / {total} тем
              </Text>
            </Stack>
          </HStack>
          <Text size="sm" weight="semibold" style={{ color: header.accent }}>
            {pct}%
          </Text>
        </HStack>
      </button>

      <div className="px-2 py-1">
        {topics.map(({ id, data }, i) => (
          <TopicRow
            key={id}
            id={id}
            data={data}
            isLast={i === topics.length - 1}
            onClick={onTopicClick}
          />
        ))}
      </div>
    </Card>
  );
}

function TopicRow({
  id,
  data,
  isLast,
  onClick,
}: {
  id: string;
  data: TopicNodeData;
  isLast: boolean;
  onClick: (id: string) => void;
}) {
  const cfg = STATUS_CFG[data.status];

  return (
    <>
      <button
        type="button"
        onClick={() => onClick(id)}
        className="flex w-full gap-4 p-3 rounded-[var(--radius-md)] text-left cursor-pointer transition-colors hover:bg-[var(--surface-2)]"
      >
        <div className="flex-shrink-0 mt-0.5">
          {data.status === "mastered" && <CheckCircle2 size={16} color="var(--success)" />}
          {data.status === "in_progress" && <Flame size={16} color="var(--primary)" />}
          {data.status === "not_started" && <Lock size={16} color="var(--text-muted)" />}
        </div>

        <div className="flex-1 min-w-0">
          <HStack justify="between" align="start" gap={3}>
            <Stack gap={1} className="min-w-0 flex-1">
              <HStack gap={2} align="center">
                <Text size="sm" weight="semibold" truncate>
                  {data.label}
                </Text>
                {data.isNext && (
                  <span
                    style={{
                      fontSize: 10,
                      color: "var(--primary)",
                      background: "var(--primary-dim)",
                      padding: "1px 6px",
                      borderRadius: 20,
                      fontWeight: 600,
                      flexShrink: 0,
                    }}
                  >
                    Рекомендуется
                  </span>
                )}
              </HStack>
              {data.description && (
                <Text size="xs" variant="muted" truncate>
                  {data.description}
                </Text>
              )}
            </Stack>

            <div className="flex-shrink-0">
              <Badge variant={cfg.badgeVariant}>{STATUS_LABEL[data.status]}</Badge>
            </div>
          </HStack>

          {data.mastery !== null && (
            <div className="mt-2">
              <Progress
                value={Math.round(data.mastery * 100)}
                color={data.status === "mastered" ? "success" : "primary"}
                showValue
              />
            </div>
          )}
        </div>
      </button>

      {!isLast && <Separator />}
    </>
  );
}
