import type React from "react";
import { useEffect } from "react";
import { cn } from "../../../lib/cn";
import { Stack } from "../../layout/Stack";
import { useAnchorContext } from "./context";

export type AnchorLinkProps = {
  /** Целевой якорь секции, например `#install` */
  href: string;
  /** Подпись ссылки */
  label: React.ReactNode;
  /** Вложенные `AnchorLink` — рендерятся с отступом как под-разделы */
  children?: React.ReactNode;
  className?: string;
};

/** Ссылка на раздел страницы, подсвечивается пока соответствующая секция видима. */
export function AnchorLink({ href, label, children, className }: AnchorLinkProps) {
  const { activeLink, registerLink, unregisterLink, onLinkClick } = useAnchorContext();

  useEffect(() => {
    registerLink(href);
    return () => unregisterLink(href);
  }, [href, registerLink, unregisterLink]);

  const active = activeLink === href;

  return (
    <Stack gap={0}>
      <a
        href={href}
        onClick={(e) => onLinkClick(href, e)}
        className={cn(
          "border-l-2 py-1 pl-3 text-sm transition-colors duration-150",
          active
            ? "border-[var(--primary)] text-[var(--primary)] font-medium"
            : "border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)]",
          className
        )}
      >
        {label}
      </a>
      {children && (
        <Stack gap={0} className="ml-3 border-l border-[var(--border)] pl-3">
          {children}
        </Stack>
      )}
    </Stack>
  );
}
