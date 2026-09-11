import type { Story } from "@ladle/react";
import { BookOpen, Home, MessageCircle, Trophy, User } from "lucide-react";
import { useState } from "react";
import { Text } from "../../typography/Text";
import { BottomNav } from "./BottomNav";
import { BottomNavItem } from "./BottomNavItem";

export default { title: "Components / Navigation / BottomNav" };

export const Default: Story = () => {
  const [active, setActive] = useState("home");
  return (
    <div className="relative h-32 bg-[var(--bg)]">
      <Text size="sm" variant="muted" className="p-4">
        Активный: {active}
      </Text>
      <BottomNav>
        <BottomNavItem icon={Home} active={active === "home"} onClick={() => setActive("home")}>
          Главная
        </BottomNavItem>
        <BottomNavItem
          icon={Trophy}
          active={active === "rating"}
          onClick={() => setActive("rating")}
        >
          Рейтинг
        </BottomNavItem>
        <BottomNavItem
          icon={BookOpen}
          badge={3}
          active={active === "tasks"}
          onClick={() => setActive("tasks")}
        >
          Задания
        </BottomNavItem>
        <BottomNavItem
          icon={MessageCircle}
          active={active === "nora"}
          onClick={() => setActive("nora")}
        >
          Нора
        </BottomNavItem>
        <BottomNavItem
          icon={User}
          active={active === "profile"}
          onClick={() => setActive("profile")}
        >
          Профиль
        </BottomNavItem>
      </BottomNav>
    </div>
  );
};

export const WithBadges: Story = () => {
  const [active, setActive] = useState("tasks");
  return (
    <div className="relative h-32 bg-[var(--bg)]">
      <BottomNav>
        <BottomNavItem icon={Home} active={active === "home"} onClick={() => setActive("home")}>
          Главная
        </BottomNavItem>
        <BottomNavItem
          icon={BookOpen}
          badge={5}
          active={active === "tasks"}
          onClick={() => setActive("tasks")}
        >
          Задания
        </BottomNavItem>
        <BottomNavItem
          icon={MessageCircle}
          badge={12}
          active={active === "nora"}
          onClick={() => setActive("nora")}
        >
          Нора
        </BottomNavItem>
        <BottomNavItem
          icon={User}
          active={active === "profile"}
          onClick={() => setActive("profile")}
        >
          Профиль
        </BottomNavItem>
      </BottomNav>
    </div>
  );
};
