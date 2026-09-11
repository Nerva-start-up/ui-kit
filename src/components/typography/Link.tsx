import { ArrowUpRight } from "lucide-react";
import React from "react";
import { cn } from "../../lib/cn";

const variantClasses = {
  default: "text-[var(--text)] hover:text-[var(--primary)]",
  primary: "text-[var(--primary)] hover:text-[var(--primary-h)]",
  muted: "text-[var(--text-muted)] hover:text-[var(--text-sub)]",
};

const underlineClasses = {
  always: "underline",
  hover: "no-underline hover:underline",
  none: "no-underline",
};

export type LinkProps = {
  /** цвет */
  variant?: keyof typeof variantClasses;
  /** когда показывать подчёркивание */
  underline?: keyof typeof underlineClasses;
  /** открывает в новой вкладке, добавляет `rel="noopener noreferrer"` и иконку (игнорируется при `asChild`) */
  external?: boolean;
  /** пробрасывает стили в дочерний элемент вместо рендера `<a>` — так подключаются `<Link>` из React Router (`to="..."`) или Next.js (`href="..."`) */
  asChild?: boolean;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

/** Стилизованная ссылка на токенах шрифта и цвета. С `asChild` рендерится как переданный роутер-компонент вместо `<a>`. */
export function Link({
  variant = "default",
  underline = "hover",
  external = false,
  asChild = false,
  className,
  children,
  target,
  rel,
  ...props
}: LinkProps) {
  const linkClassName = cn(
    "inline-flex items-center gap-0.5 text-[length:var(--font-size-md)] font-[number:var(--font-weight-normal)] underline-offset-2 transition-colors",
    variantClasses[variant],
    underlineClasses[underline],
    className
  );

  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<{ className?: string }>;
    return React.cloneElement(child, {
      className: cn(linkClassName, child.props.className),
    });
  }

  return (
    <a
      className={linkClassName}
      target={external ? "_blank" : target}
      rel={external ? "noopener noreferrer" : rel}
      {...props}
    >
      {children}
      {external && <ArrowUpRight size={14} className="shrink-0" />}
    </a>
  );
}
