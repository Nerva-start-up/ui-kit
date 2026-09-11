import { CheckCircle2, Flame, Lock } from "lucide-react";
import { Progress } from "../../feedback/progress/Progress";
import { Flex } from "../../layout/Flex";
import { Text } from "../../typography/Text";
import { Card } from "../card/Card";
import { useKnowledgeGraphContext } from "./context";
import { computeStats } from "./utils";

export type KnowledgeGraphStatsProps = {
  className?: string;
};

/** Плашки-счётчики: освоено / в процессе / не начато + общий прогресс */
export function KnowledgeGraphStats({ className }: KnowledgeGraphStatsProps) {
  const { nodes } = useKnowledgeGraphContext();
  const { total, mastered, inProgress, notStarted } = computeStats(nodes);

  return (
    <Flex gap={3} wrap="wrap" className={className}>
      <Card padding="sm" className="flex items-center gap-2 px-4">
        <CheckCircle2 size={14} color="var(--success)" />
        <Text size="sm" weight="semibold" style={{ color: "var(--success)" }}>
          {mastered}
        </Text>
        <Text size="sm" variant="muted">
          Освоено
        </Text>
      </Card>
      <Card padding="sm" className="flex items-center gap-2 px-4">
        <Flame size={14} color="var(--primary)" />
        <Text size="sm" weight="semibold" style={{ color: "var(--primary)" }}>
          {inProgress}
        </Text>
        <Text size="sm" variant="muted">
          В процессе
        </Text>
      </Card>
      <Card padding="sm" className="flex items-center gap-2 px-4">
        <Lock size={14} color="var(--text-muted)" />
        <Text size="sm" weight="semibold" variant="muted">
          {notStarted}
        </Text>
        <Text size="sm" variant="muted">
          Не начато
        </Text>
      </Card>
      <Card padding="sm" className="flex items-center gap-3 px-4 flex-1 min-w-[200px]">
        <Text size="xs" variant="muted" className="whitespace-nowrap">
          Общий прогресс
        </Text>
        <div className="flex-1">
          <Progress value={total > 0 ? Math.round((mastered / total) * 100) : 0} showValue />
        </div>
      </Card>
    </Flex>
  );
}
