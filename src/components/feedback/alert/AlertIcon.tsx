import { AlertTriangle, CheckCircle2, Info, XCircle } from "lucide-react";
import type React from "react";
import { cn } from "../../../lib/cn";
import { type AlertVariant, useAlertContext } from "./context";

const ICONS: Record<AlertVariant, React.ElementType> = {
  info: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  error: XCircle,
};

export type AlertIconProps = {
  /** Переопределить иконку. По умолчанию — авто по варианту */
  icon?: React.ElementType;
  /** размер иконки */
  size?: number;
  className?: string;
};

/** Иконка алерта — авто по варианту или кастомная. */
export function AlertIcon({ icon, size = 18, className }: AlertIconProps) {
  const { variant } = useAlertContext();
  const Icon = icon ?? ICONS[variant];

  return <Icon size={size} className={cn("mt-px shrink-0", className)} aria-hidden />;
}
