import type { Story } from "@ladle/react";
import { Avatar } from "./Avatar";

export default { title: "Components / Data Display / Avatar" };

export const Initials: Story = () => (
  <div className="flex items-center gap-4">
    <Avatar name="Алишер Навоий" size="sm" />
    <Avatar name="Алишер Навоий" size="md" />
    <Avatar name="Алишер Навоий" size="lg" />
  </div>
);

export const WithImage: Story = () => (
  <div className="flex items-center gap-4">
    <Avatar src="https://i.pravatar.cc/40" name="User" size="sm" />
    <Avatar src="https://i.pravatar.cc/40" name="User" size="md" />
    <Avatar src="https://i.pravatar.cc/40" name="User" size="lg" />
  </div>
);

export const BrokenImage: Story = () => (
  <div className="flex items-center gap-4">
    <Avatar src="broken-url.jpg" name="Фаррух Ташкентов" />
    <Avatar src="broken-url.jpg" name="Камила Юсупова" />
  </div>
);
