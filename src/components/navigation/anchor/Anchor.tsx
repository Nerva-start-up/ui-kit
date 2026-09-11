import type React from "react";
import { cn } from "../../../lib/cn";
import { AnchorContext } from "./context";
import { useAnchorScrollSpy } from "./useAnchorScrollSpy";
import type { AnchorContainer } from "./utils";

export type AnchorProps = {
  /** Отступ сверху (px), после которого секция считается текущей */
  offsetTop?: number;
  /** Доп. допуск (px) при определении активной секции */
  bounds?: number;
  /** Скролл-контейнер, если не `window`, например `() => scrollAreaRef.current!` */
  container?: AnchorContainer;
  /** Вызывается при смене активной ссылки */
  onChange?: (activeHref: string | null) => void;
  className?: string;
  /** `AnchorLink` — плоские или вложенные (под-разделы) */
  children: React.ReactNode;
};

/**
 * Root — scrollspy-навигация по разделам страницы: подсвечивает `AnchorLink`,
 * соответствующий текущей видимой секции, и плавно скроллит к ней по клику.
 */
export function Anchor({
  offsetTop = 0,
  bounds = 5,
  container,
  onChange,
  className,
  children,
}: AnchorProps) {
  const { activeLink, registerLink, unregisterLink, onLinkClick } = useAnchorScrollSpy({
    offsetTop,
    bounds,
    container,
    onChange,
  });

  return (
    <AnchorContext.Provider value={{ activeLink, registerLink, unregisterLink, onLinkClick }}>
      <nav className={cn("flex flex-col gap-0.5", className)}>{children}</nav>
    </AnchorContext.Provider>
  );
}
