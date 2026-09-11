import type { Story } from "@ladle/react";
import { Award, BookOpen, Star, TrendingUp, Users } from "lucide-react";
import { StatCard } from "./StatCard";

export default { title: "Components / Data Display / StatCard" };

export const Default: Story = () => (
  <div className="max-w-[200px]">
    <StatCard label="KSI Score" value="1 420" />
  </div>
);

export const WithIcon: Story = () => (
  <div className="grid grid-cols-2 gap-4 max-w-md">
    <StatCard label="KSI Score" value="1 420" icon={Star} trend={+12} />
    <StatCard label="Место" value="#3" icon={Award} sub="из 47 студентов" />
    <StatCard label="Посещаемость" value="94%" icon={Users} trend={-2} />
    <StatCard label="Сдано заданий" value="12/15" icon={BookOpen} trend={0} />
  </div>
);

export const Trends: Story = () => (
  <div className="grid grid-cols-3 gap-4 max-w-lg">
    <StatCard label="Рост" value="+420" icon={TrendingUp} trend={+18} sub="за неделю" />
    <StatCard label="Падение" value="−80" icon={TrendingUp} trend={-5} sub="за неделю" />
    <StatCard label="Без изм" value="1 000" icon={TrendingUp} trend={0} sub="за неделю" />
  </div>
);

export const Interactive: Story<{
  label: string;
  value: string;
  sub: string;
  trend: number;
}> = ({ label, value, sub, trend }) => (
  <div className="max-w-[220px]">
    <StatCard
      label={label}
      value={value}
      sub={sub || undefined}
      trend={trend || undefined}
      icon={Star}
    />
  </div>
);
Interactive.args = { label: "KSI Score", value: "1 420", sub: "за месяц", trend: 12 };
Interactive.argTypes = {
  trend: { control: { type: "number", min: -100, max: 100, step: 1 } },
};
