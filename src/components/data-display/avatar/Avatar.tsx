import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cn } from "../../../lib/cn";

const sizeClasses = { sm: "w-7 h-7 text-xs", md: "w-9 h-9 text-sm", lg: "w-12 h-12 text-base" };

function getInitials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

export type AvatarProps = {
  /** URL изображения */
  src?: string;
  /** для инициалов и alt */
  name: string;
  /** sm=28px, md=36px, lg=48px */
  size?: keyof typeof sizeClasses;
  className?: string;
};

/** Аватар пользователя с fallback на инициалы. */
export function Avatar({ src, name, size = "md", className }: AvatarProps) {
  return (
    <AvatarPrimitive.Root
      className={cn(
        "inline-flex items-center justify-center rounded-full shrink-0 select-none overflow-hidden",
        "bg-[var(--surface-2)] border border-[var(--border)]",
        sizeClasses[size],
        className
      )}
    >
      <AvatarPrimitive.Image src={src} alt={name} className="w-full h-full object-cover" />
      <AvatarPrimitive.Fallback className="font-semibold text-[var(--text-muted)]" delayMs={300}>
        {getInitials(name)}
      </AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
  );
}
