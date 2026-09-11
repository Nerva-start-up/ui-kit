import { useCallback, useEffect, useRef, useState } from "react";
import type React from "react";
import {
  type AnchorContainer,
  getElementTop,
  getScrollContainer,
  getScrollTop,
  scrollTo,
} from "./utils";

export type UseAnchorScrollSpyOptions = {
  offsetTop: number;
  bounds: number;
  container?: AnchorContainer;
  onChange?: (activeHref: string | null) => void;
};

export type UseAnchorScrollSpyResult = {
  activeLink: string | null;
  registerLink: (href: string) => void;
  unregisterLink: (href: string) => void;
  onLinkClick: (href: string, e: React.MouseEvent<HTMLAnchorElement>) => void;
};

/**
 * Слушает скролл `container` (по умолчанию `window`) и определяет, какая из
 * зарегистрированных `AnchorLink`-ссылок соответствует текущей видимой секции —
 * секция считается активной, когда её верх пересёк `offsetTop` (± `bounds`).
 */
export function useAnchorScrollSpy({
  offsetTop,
  bounds,
  container,
  onChange,
}: UseAnchorScrollSpyOptions): UseAnchorScrollSpyResult {
  const links = useRef<Set<string>>(new Set());
  const [activeLink, setActiveLink] = useState<string | null>(null);

  const registerLink = useCallback((href: string) => {
    links.current.add(href);
  }, []);

  const unregisterLink = useCallback((href: string) => {
    links.current.delete(href);
  }, []);

  useEffect(() => {
    const target = getScrollContainer(container);

    function handleScroll() {
      const threshold = getScrollTop(target) + offsetTop + bounds;
      let next: string | null = null;
      let nextTop = Number.NEGATIVE_INFINITY;

      for (const href of links.current) {
        const el = document.getElementById(href.replace(/^#/, ""));
        if (!el) continue;

        const top = getElementTop(el, target);
        if (top <= threshold && top > nextTop) {
          nextTop = top;
          next = href;
        }
      }

      setActiveLink((prev) => {
        if (prev === next) return prev;
        onChange?.(next);
        return next;
      });
    }

    handleScroll();
    target.addEventListener("scroll", handleScroll, { passive: true });
    return () => target.removeEventListener("scroll", handleScroll);
  }, [bounds, container, offsetTop, onChange]);

  const onLinkClick = useCallback(
    (href: string, e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();

      const el = document.getElementById(href.replace(/^#/, ""));
      if (!el) return;

      const target = getScrollContainer(container);
      scrollTo(target, getElementTop(el, target) - offsetTop);
      window.history.pushState(null, "", href);
    },
    [container, offsetTop]
  );

  return { activeLink, registerLink, unregisterLink, onLinkClick };
}
