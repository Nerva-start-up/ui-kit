import { Badge } from "./Badge";

const roleConfig = {
  student: { variant: "info" as const, label: "Студент" },
  teacher: { variant: "orange" as const, label: "Преподаватель" },
  admin: { variant: "error" as const, label: "Администратор" },
};

export type RoleBadgeProps = {
  /** student→info, teacher→orange, admin→error */
  role: keyof typeof roleConfig;
  className?: string;
};

/** Бейдж роли пользователя. Цвет и текст задаются автоматически. */
export function RoleBadge({ role, className }: RoleBadgeProps) {
  const { variant, label } = roleConfig[role];
  return (
    <Badge variant={variant} className={className}>
      {label}
    </Badge>
  );
}
