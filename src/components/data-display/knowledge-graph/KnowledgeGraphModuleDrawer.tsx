import { Input } from "../../data-entry/input/Input";
import { Select } from "../../data-entry/select/Select";
import { HStack } from "../../layout/HStack";
import { Stack } from "../../layout/Stack";
import { Drawer } from "../../overlay/drawer/Drawer";
import { DrawerBody } from "../../overlay/drawer/DrawerBody";
import { DrawerHeader } from "../../overlay/drawer/DrawerHeader";
import { DrawerPanel } from "../../overlay/drawer/DrawerPanel";
import { DrawerTitle } from "../../overlay/drawer/DrawerTitle";
import { Text } from "../../typography/Text";
import { Card } from "../card/Card";
import { useKnowledgeGraphContext } from "./context";
import { MODULE_ACCENT_OPTIONS, getModuleStats } from "./utils";

export type KnowledgeGraphModuleDrawerProps = {
  /** Сторона появления панели — `"right"` для canvas-раскладки, `"bottom"` (bottom-sheet) для List на мобильных */
  side?: "right" | "bottom";
};

/** Drawer с деталями модуля (название, иконка, цвет); editable, если задан onNodesChange; null, пока модуль не выбран */
export function KnowledgeGraphModuleDrawer({
  side = "right",
}: KnowledgeGraphModuleDrawerProps = {}) {
  const {
    nodes,
    selectedModuleId,
    clearModuleSelection,
    updateModule,
    onNodesChange,
    moduleIconOptions,
  } = useKnowledgeGraphContext();

  const moduleNode = nodes.find((n) => n.id === selectedModuleId && n.type === "moduleHeader");
  const module = moduleNode?.type === "moduleHeader" ? moduleNode.data : null;

  if (!module || !moduleNode) return null;

  const editable = Boolean(onNodesChange);
  const { total, mastered } = getModuleStats(nodes, moduleNode.id);
  const iconValue = moduleIconOptions.find((o) => o.icon === module.icon)?.value ?? "";

  return (
    <Drawer open={module !== null} onClose={clearModuleSelection}>
      <DrawerPanel side={side} width="360px">
        <DrawerHeader>
          <DrawerTitle>{module.label}</DrawerTitle>
        </DrawerHeader>

        <DrawerBody>
          <Stack gap={5}>
            <Card padding="md">
              <HStack justify="between" align="center">
                <Text size="sm" variant="muted">
                  Освоено тем
                </Text>
                <Text size="sm" weight="semibold" style={{ color: module.accent }}>
                  {mastered} / {total}
                </Text>
              </HStack>
            </Card>

            <Input
              label="Название модуля"
              value={module.label}
              disabled={!editable}
              onChange={(e) => updateModule(moduleNode.id, { label: e.target.value })}
            />

            <Select
              label="Иконка"
              options={moduleIconOptions}
              value={iconValue}
              disabled={!editable}
              onValueChange={(v) => {
                const icon = moduleIconOptions.find((o) => o.value === v)?.icon;
                if (icon) updateModule(moduleNode.id, { icon });
              }}
            />

            <Select
              label="Цвет"
              options={MODULE_ACCENT_OPTIONS}
              value={module.accent}
              disabled={!editable}
              onValueChange={(accent) => updateModule(moduleNode.id, { accent })}
            />
          </Stack>
        </DrawerBody>
      </DrawerPanel>
    </Drawer>
  );
}
