import { Panel, useReactFlow } from "@xyflow/react";
import { Lock, Maximize2, Minus, Plus, Unlock } from "lucide-react";
import { Button } from "../../actions/button/Button";
import { Tooltip, TooltipProvider } from "../../overlay/tooltip/Tooltip";

export type KnowledgeGraphControlsProps = {
  locked: boolean;
  onToggleLock: () => void;
};

export function KnowledgeGraphControls({ locked, onToggleLock }: KnowledgeGraphControlsProps) {
  const { zoomIn, zoomOut, fitView } = useReactFlow();

  return (
    <Panel position="bottom-left">
      <TooltipProvider>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <Tooltip content="Приблизить" side="right">
            <Button variant="outline" size="icon" onClick={() => zoomIn()}>
              <Plus size={14} />
            </Button>
          </Tooltip>
          <Tooltip content="Отдалить" side="right">
            <Button variant="outline" size="icon" onClick={() => zoomOut()}>
              <Minus size={14} />
            </Button>
          </Tooltip>
          <Tooltip content="Вписать в экран" side="right">
            <Button variant="outline" size="icon" onClick={() => fitView({ padding: 0.15 })}>
              <Maximize2 size={14} />
            </Button>
          </Tooltip>
          <Tooltip
            content={locked ? "Разблокировать перемещение" : "Заблокировать перемещение"}
            side="right"
          >
            <Button variant="outline" size="icon" onClick={onToggleLock}>
              {locked ? <Unlock size={14} /> : <Lock size={14} />}
            </Button>
          </Tooltip>
        </div>
      </TooltipProvider>
    </Panel>
  );
}
