import type { RefObject } from "react";
import { useEffect, useRef, useState } from "react";
import type { DocxViewerStatus } from "./types";
import { clampDocxPage } from "./utils";

export type UseDocxPagesOptions = {
  /** Контейнер, в который `docx-preview` рендерит содержимое (родитель `.docx-wrapper`) */
  containerRef: RefObject<HTMLDivElement | null>;
  /** Скроллируемый viewport — `root` для `IntersectionObserver` */
  viewportRef: RefObject<HTMLDivElement | null>;
  status: DocxViewerStatus;
  page?: number;
  defaultPage?: number;
  onPageChange?: (page: number) => void;
};

/** Число страниц (секций `.docx`, которые рендерит `docx-preview`) + текущая видимая страница при скролле (по наибольшей `intersectionRatio`), плюс скролл к конкретной странице */
export function useDocxPages({
  containerRef,
  viewportRef,
  status,
  page,
  defaultPage = 1,
  onPageChange,
}: UseDocxPagesOptions) {
  const [totalPages, setTotalPages] = useState(0);
  const [internalPage, setInternalPage] = useState(defaultPage);
  const isControlled = page !== undefined;
  const currentPage = clampDocxPage(isControlled ? page : internalPage, totalPages || 1);

  const pagesRef = useRef<HTMLElement[]>([]);
  const isControlledRef = useRef(isControlled);
  const defaultPageRef = useRef(defaultPage);
  const onPageChangeRef = useRef(onPageChange);
  isControlledRef.current = isControlled;
  defaultPageRef.current = defaultPage;
  onPageChangeRef.current = onPageChange;

  function scrollToPage(next: number) {
    const el = pagesRef.current[next - 1];
    el?.scrollIntoView({ block: "start", behavior: "smooth" });
  }

  function setPage(next: number) {
    const clamped = clampDocxPage(next, totalPages || 1);
    if (!isControlled) setInternalPage(clamped);
    onPageChange?.(clamped);
    scrollToPage(clamped);
  }

  useEffect(() => {
    if (status !== "loaded") return;

    const container = containerRef.current;
    const viewport = viewportRef.current;
    if (!container || !viewport) return;

    const pages = Array.from(container.querySelectorAll<HTMLElement>(".docx-wrapper > .docx"));
    pagesRef.current = pages;
    setTotalPages(pages.length);
    if (pages.length === 0) return;

    if (!isControlledRef.current && defaultPageRef.current > 1) {
      pages[clampDocxPage(defaultPageRef.current, pages.length) - 1]?.scrollIntoView({
        block: "start",
      });
    }

    const ratios = new Map<Element, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) ratios.set(entry.target, entry.intersectionRatio);

        let visiblePage: HTMLElement | null = null;
        let bestRatio = 0;
        for (const el of pages) {
          const ratio = ratios.get(el) ?? 0;
          if (ratio > bestRatio) {
            bestRatio = ratio;
            visiblePage = el;
          }
        }
        if (!visiblePage) return;

        const index = pages.indexOf(visiblePage) + 1;
        if (!isControlledRef.current) setInternalPage(index);
        onPageChangeRef.current?.(index);
      },
      { root: viewport, threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] }
    );

    for (const el of pages) observer.observe(el);
    return () => observer.disconnect();
  }, [status, containerRef, viewportRef]);

  return { currentPage, totalPages, setPage };
}
