import type { Story } from "@ladle/react";
import { Bell, BookOpen, Home, ShieldCheck, Trophy } from "lucide-react";
import { useState } from "react";
import { Button } from "../../actions/button/Button";
import { Avatar } from "../../data-display/avatar/Avatar";
import { Text } from "../../typography/Text";
import { TopNav } from "./TopNav";
import { TopNavActions } from "./TopNavActions";
import { TopNavBrand } from "./TopNavBrand";
import { TopNavItem } from "./TopNavItem";
import { TopNavList } from "./TopNavList";

export default { title: "Components / Navigation / TopNav" };

export const Default: Story = () => {
  const [active, setActive] = useState("home");
  return (
    <div className="bg-[var(--bg)]">
      <TopNav>
        <TopNavBrand>
          <Text as="span" size="sm" weight="bold">
            KSI
          </Text>
        </TopNavBrand>

        <TopNavList>
          <TopNavItem icon={Home} active={active === "home"} onClick={() => setActive("home")}>
            Главная
          </TopNavItem>
          <TopNavItem
            icon={BookOpen}
            active={active === "tasks"}
            onClick={() => setActive("tasks")}
          >
            Задания
          </TopNavItem>
          <TopNavItem
            icon={Trophy}
            active={active === "rating"}
            onClick={() => setActive("rating")}
          >
            Рейтинг
          </TopNavItem>
        </TopNavList>

        <TopNavActions>
          <Button variant="ghost" size="sm">
            <Bell size={16} />
          </Button>
          <Avatar name="Иван Петров" size="sm" />
        </TopNavActions>
      </TopNav>

      <Text size="sm" variant="muted" className="p-4">
        Активный: {active}
      </Text>
    </div>
  );
};

export const WithLinks: Story = () => (
  <div className="bg-[var(--bg)]">
    <TopNav>
      <TopNavBrand>
        <Text as="span" size="sm" weight="bold">
          KSI
        </Text>
      </TopNavBrand>

      <TopNavList>
        <TopNavItem icon={ShieldCheck} href="/admin" active>
          Админ-панель
        </TopNavItem>
        <TopNavItem icon={BookOpen} href="/tasks">
          Задания
        </TopNavItem>
      </TopNavList>
    </TopNav>
  </div>
);

export const WithoutBrandAndActions: Story = () => {
  const [active, setActive] = useState("home");
  return (
    <div className="bg-[var(--bg)]">
      <TopNav>
        <TopNavList>
          <TopNavItem icon={Home} active={active === "home"} onClick={() => setActive("home")}>
            Главная
          </TopNavItem>
          <TopNavItem
            icon={BookOpen}
            active={active === "tasks"}
            onClick={() => setActive("tasks")}
          >
            Задания
          </TopNavItem>
        </TopNavList>
      </TopNav>
    </div>
  );
};
