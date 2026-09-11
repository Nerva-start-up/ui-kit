import type { Story } from "@ladle/react";
import { useState } from "react";
import { Avatar } from "../../data-display/avatar/Avatar";
import { Separator } from "../../layout/separator/Separator";
import { Text } from "../../typography/Text";
import { Sidebar } from "./Sidebar";
import { SidebarBody } from "./SidebarBody";
import { SidebarFooter } from "./SidebarFooter";
import { SidebarHeader } from "./SidebarHeader";
import { SidebarNav } from "./SidebarNav";
import { SidebarNavItem } from "./SidebarNavItem";
import { SidebarToggle } from "./SidebarToggle";
import { useSidebarContext } from "./context";

/* ── Reusable header: hides logo when collapsed ───────────── */
function SidebarBrand() {
  const { collapsed } = useSidebarContext();
  return (
    <>
      {!collapsed && (
        <Text as="span" size="lg" weight="bold" variant="primary" className="tracking-tight">
          KSI
        </Text>
      )}
      <SidebarToggle className={collapsed ? "" : "ml-auto"} />
    </>
  );
}

export default { title: "Components / Navigation / Sidebar" };

/* ── Icons (inline SVG to avoid icon-lib dep) ─────────────── */
const IconHome = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M1.5 6.5L8 1.5l6.5 5V14a.5.5 0 01-.5.5H10V10H6v4.5H2a.5.5 0 01-.5-.5V6.5z" />
  </svg>
);
const IconChart = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="1.5" y="9.5" width="3" height="5" />
    <rect x="6.5" y="6.5" width="3" height="8" />
    <rect x="11.5" y="3.5" width="3" height="11" />
  </svg>
);
const IconBook = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M3 2h9a1 1 0 011 1v10a1 1 0 01-1 1H3a1 1 0 01-1-1V3a1 1 0 011-1z" />
    <path d="M6 2v12M3 6h3M3 9h3" />
  </svg>
);
const IconTask = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="2.5" y="2.5" width="11" height="11" rx="1.5" />
    <path d="M5.5 8l2 2 3-3" />
  </svg>
);
const IconBot = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="2.5" y="5.5" width="11" height="8" rx="1.5" />
    <circle cx="5.5" cy="9.5" r="1" fill="currentColor" stroke="none" />
    <circle cx="10.5" cy="9.5" r="1" fill="currentColor" stroke="none" />
    <path d="M8 1.5v4M5.5 1.5h5" />
  </svg>
);
const IconSettings = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="8" cy="8" r="2.5" />
    <path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.05 3.05l1.41 1.41M11.54 11.54l1.41 1.41M3.05 12.95l1.41-1.41M11.54 4.46l1.41-1.41" />
  </svg>
);

/* ── Basic ──────────────────────────────────────────────────── */
export const Basic: Story = () => {
  const [active, setActive] = useState("dashboard");

  const items = [
    { id: "dashboard", label: "Дашборд", icon: <IconHome /> },
    { id: "rating", label: "Рейтинг", icon: <IconChart />, badge: 3 },
    { id: "library", label: "Материалы", icon: <IconBook /> },
    { id: "tasks", label: "Задания", icon: <IconTask />, badge: 2 },
    { id: "nora", label: "Нора AI", icon: <IconBot /> },
  ];

  return (
    <div className="flex h-[500px] border border-[var(--border)] rounded-[var(--radius-lg)] overflow-hidden">
      <Sidebar>
        <SidebarHeader>
          <SidebarBrand />
        </SidebarHeader>

        <SidebarBody>
          <SidebarNav label="Навигация">
            {items.map((item) => (
              <SidebarNavItem
                key={item.id}
                icon={item.icon}
                badge={item.badge}
                active={active === item.id}
                onClick={() => setActive(item.id)}
              >
                {item.label}
              </SidebarNavItem>
            ))}
          </SidebarNav>
        </SidebarBody>

        <SidebarFooter>
          <SidebarNavItem icon={<IconSettings />}>Настройки</SidebarNavItem>
        </SidebarFooter>
      </Sidebar>

      <div className="flex-1 p-6 bg-[var(--bg)]">
        <Text size="sm" variant="muted">
          Активный раздел: <strong className="text-[var(--text)]">{active}</strong>
        </Text>
      </div>
    </div>
  );
};

/* ── Collapsed by default ───────────────────────────────────── */
export const CollapsedDefault: Story = () => {
  const [active, setActive] = useState("dashboard");

  const items = [
    { id: "dashboard", label: "Дашборд", icon: <IconHome /> },
    { id: "rating", label: "Рейтинг", icon: <IconChart /> },
    { id: "library", label: "Материалы", icon: <IconBook /> },
    { id: "tasks", label: "Задания", icon: <IconTask />, badge: 5 },
    { id: "nora", label: "Нора AI", icon: <IconBot /> },
  ];

  return (
    <div className="flex h-[500px] border border-[var(--border)] rounded-[var(--radius-lg)] overflow-hidden">
      <Sidebar defaultCollapsed>
        <SidebarHeader>
          <SidebarBrand />
        </SidebarHeader>

        <SidebarBody>
          <SidebarNav>
            {items.map((item) => (
              <SidebarNavItem
                key={item.id}
                icon={item.icon}
                badge={item.badge}
                active={active === item.id}
                onClick={() => setActive(item.id)}
              >
                {item.label}
              </SidebarNavItem>
            ))}
          </SidebarNav>
        </SidebarBody>

        <SidebarFooter>
          <SidebarNavItem icon={<IconSettings />}>Настройки</SidebarNavItem>
        </SidebarFooter>
      </Sidebar>

      <div className="flex-1 p-6 bg-[var(--bg)]">
        <Text size="sm" variant="muted">
          Нажмите на стрелку, чтобы развернуть
        </Text>
      </div>
    </div>
  );
};

/* ── With user footer ───────────────────────────────────────── */
export const WithUserFooter: Story = () => {
  const [active, setActive] = useState("dashboard");

  const items = [
    { id: "dashboard", label: "Дашборд", icon: <IconHome /> },
    { id: "rating", label: "Рейтинг", icon: <IconChart /> },
    { id: "library", label: "Материалы", icon: <IconBook /> },
    { id: "tasks", label: "Задания", icon: <IconTask />, badge: 2 },
    { id: "nora", label: "Нора AI", icon: <IconBot /> },
  ];

  return (
    <div className="flex h-[500px] border border-[var(--border)] rounded-[var(--radius-lg)] overflow-hidden">
      <Sidebar>
        <SidebarHeader>
          <SidebarBrand />
        </SidebarHeader>

        <SidebarBody>
          <SidebarNav label="Главное">
            {items.slice(0, 3).map((item) => (
              <SidebarNavItem
                key={item.id}
                icon={item.icon}
                badge={item.badge}
                active={active === item.id}
                onClick={() => setActive(item.id)}
              >
                {item.label}
              </SidebarNavItem>
            ))}
          </SidebarNav>

          <SidebarNav label="Обучение">
            {items.slice(3).map((item) => (
              <SidebarNavItem
                key={item.id}
                icon={item.icon}
                badge={item.badge}
                active={active === item.id}
                onClick={() => setActive(item.id)}
              >
                {item.label}
              </SidebarNavItem>
            ))}
          </SidebarNav>
        </SidebarBody>

        <SidebarFooter>
          <Separator className="mb-2" />
          <SidebarNavItem icon={<Avatar name="Алишер Навоий" size="sm" />}>
            <span className="flex flex-col items-start leading-tight">
              <Text as="span" size="xs" weight="medium">
                Алишер Навоий
              </Text>
              <Text as="span" variant="muted" className="text-[11px]">
                ИБ-101
              </Text>
            </span>
          </SidebarNavItem>
        </SidebarFooter>
      </Sidebar>

      <div className="flex-1 p-6 bg-[var(--bg)]">
        <Text size="sm" variant="muted">
          Активный раздел: <strong className="text-[var(--text)]">{active}</strong>
        </Text>
      </div>
    </div>
  );
};

/* ── Controlled ─────────────────────────────────────────────── */
export const Controlled: Story = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [active, setActive] = useState("dashboard");

  const items = [
    { id: "dashboard", label: "Дашборд", icon: <IconHome /> },
    { id: "rating", label: "Рейтинг", icon: <IconChart /> },
    { id: "library", label: "Материалы", icon: <IconBook /> },
    { id: "tasks", label: "Задания", icon: <IconTask /> },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2 text-sm text-[var(--text-muted)]">
        Collapsed: <strong className="text-[var(--text)]">{String(collapsed)}</strong>
        <button
          type="button"
          onClick={() => setCollapsed((v) => !v)}
          className="ml-2 px-2 py-0.5 text-xs rounded border border-[var(--border)] hover:bg-[var(--surface-2)] text-[var(--text)]"
        >
          Toggle externally
        </button>
      </div>

      <div className="flex h-[420px] border border-[var(--border)] rounded-[var(--radius-lg)] overflow-hidden">
        <Sidebar collapsed={collapsed} onCollapsedChange={setCollapsed}>
          <SidebarHeader>
            <Text as="span" size="lg" weight="bold" variant="primary" className="tracking-tight">
              KSI
            </Text>
            <div className="ml-auto">
              <SidebarToggle />
            </div>
          </SidebarHeader>

          <SidebarBody>
            <SidebarNav>
              {items.map((item) => (
                <SidebarNavItem
                  key={item.id}
                  icon={item.icon}
                  active={active === item.id}
                  onClick={() => setActive(item.id)}
                >
                  {item.label}
                </SidebarNavItem>
              ))}
            </SidebarNav>
          </SidebarBody>
        </Sidebar>

        <div className="flex-1 p-6 bg-[var(--bg)]">
          <Text size="sm" variant="muted">
            Активный раздел: <strong className="text-[var(--text)]">{active}</strong>
          </Text>
        </div>
      </div>
    </div>
  );
};
