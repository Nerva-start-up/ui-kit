import { cn } from "../../../lib/cn";
import { useFileCardContext } from "./context";
import { getFileIconConfig } from "./fileIcon";

export type FileCardIconProps = {
  className?: string;
};

/** Иконка файла (цвет + фон по расширению) */
export function FileCardIcon({ className }: FileCardIconProps) {
  const { fileType } = useFileCardContext();
  const { icon: Icon, color, bg } = getFileIconConfig(fileType);

  return (
    <div
      className={cn(
        "shrink-0 flex items-center justify-center",
        "h-10 w-10 rounded-[var(--radius)]",
        className
      )}
      style={{ background: bg }}
    >
      <Icon size={20} style={{ color }} strokeWidth={1.75} />
    </div>
  );
}
