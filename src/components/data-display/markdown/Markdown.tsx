import type React from "react";
import { useEffect, useMemo, useRef } from "react";
import ReactMarkdown, { type Components, type ExtraProps } from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "../../../lib/cn";
import { MarkdownCodeBlock } from "./MarkdownCodeBlock";
import { MarkdownParagraph } from "./MarkdownParagraph";
import { getNodeText, slugifyHeadingText } from "./utils";

const headingClasses: Record<number, string> = {
  1: "text-3xl font-bold tracking-tight mt-8 mb-4 first:mt-0",
  2: "text-2xl font-bold mt-8 mb-3 first:mt-0",
  3: "text-xl font-semibold mt-6 mb-3 first:mt-0",
  4: "text-lg font-semibold mt-6 mb-2 first:mt-0",
  5: "text-base font-semibold mt-4 mb-2 first:mt-0",
  6: "text-sm font-semibold mt-4 mb-2 first:mt-0 text-[var(--text-muted)]",
};

/** Заголовок документа, извлечённый при рендере: `id` совпадает с якорем реального `<h1-6>` */
export type MarkdownHeading = { id: string; level: number; text: string };

function heading(
  level: 1 | 2 | 3 | 4 | 5 | 6,
  headingsRef: React.RefObject<MarkdownHeading[]>,
  slugCountsRef: React.RefObject<Map<string, number>>
) {
  return function Heading({ children, node }: React.ComponentPropsWithoutRef<"h1"> & ExtraProps) {
    const Tag = `h${level}` as const;
    const text = getNodeText(node);
    const slug = slugifyHeadingText(text);
    const count = slugCountsRef.current.get(slug) ?? 0;
    slugCountsRef.current.set(slug, count + 1);
    const id = count === 0 ? slug : `${slug}-${count}`;
    headingsRef.current.push({ id, level, text });

    return (
      <Tag id={id} className={cn(headingClasses[level], "text-[var(--text)] scroll-mt-4")}>
        {children}
      </Tag>
    );
  };
}

const baseMarkdownComponents: Omit<Components, "h1" | "h2" | "h3" | "h4" | "h5" | "h6"> = {
  p: MarkdownParagraph,
  pre: MarkdownCodeBlock,
  code: ({ children, className }) => (
    <code
      className={cn(
        "rounded-[var(--radius-sm)] bg-[var(--surface-2)] px-1.5 py-0.5",
        "font-mono text-[0.85em] text-[var(--primary)]",
        className
      )}
    >
      {children}
    </code>
  ),
  a: ({ children, href }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-[var(--primary)] underline underline-offset-2 hover:text-[var(--primary-h)]"
    >
      {children}
    </a>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-[var(--text)]">{children}</strong>
  ),
  em: ({ children }) => <em className="italic">{children}</em>,
  del: ({ children }) => <del className="text-[var(--text-muted)]">{children}</del>,
  ul: ({ children }) => (
    <ul className="my-3 ml-5 list-disc space-y-1 marker:text-[var(--text-muted)]">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="my-3 ml-5 list-decimal space-y-1 marker:text-[var(--text-muted)]">{children}</ol>
  ),
  li: ({ children }) => <li className="leading-relaxed text-[var(--text)]">{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="my-3 border-l-2 border-[var(--primary)]/50 pl-4 text-[var(--text-sub)] italic">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="my-6 border-[var(--border)]" />,
  img: ({ src, alt }) => (
    <img
      src={src}
      alt={alt}
      className="my-3 max-w-full rounded-[var(--radius-md)] border border-[var(--border)]"
    />
  ),
  table: ({ children }) => (
    <div className="my-4 overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)]">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">{children}</table>
      </div>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="border-b border-[var(--border)] bg-[var(--surface-2)]">{children}</thead>
  ),
  tbody: ({ children }) => (
    <tbody className="divide-y divide-[var(--border)] bg-[var(--surface)]">{children}</tbody>
  ),
  tr: ({ children }) => <tr>{children}</tr>,
  th: ({ children, style }) => (
    <th style={style} className="px-3 py-2 text-left font-semibold text-[var(--text)]">
      {children}
    </th>
  ),
  td: ({ children, style }) => (
    <td style={style} className="px-3 py-2 text-[var(--text-sub)]">
      {children}
    </td>
  ),
};

export type MarkdownProps = {
  /** Исходный markdown-текст. */
  content: string;
  /** Список заголовков документа (`id` совпадает с якорем `<h1-6>`) — вызывается заново при каждой смене `content` */
  onHeadingsChange?: (headings: MarkdownHeading[]) => void;
  /** классы на внешний div */
  className?: string;
};

/** Рендерит markdown-текст через react-markdown + remark-gfm (таблицы, зачёркивание, чекбоксы). Заголовки получают стабильный `id`-якорь (slug, с дедупликацией повторов) для навигации/оглавления. */
export function Markdown({ content, onHeadingsChange, className }: MarkdownProps) {
  const headingsRef = useRef<MarkdownHeading[]>([]);
  const slugCountsRef = useRef(new Map<string, number>());
  const onHeadingsChangeRef = useRef(onHeadingsChange);
  onHeadingsChangeRef.current = onHeadingsChange;

  // сбрасываем перед каждым рендером — компоненты заголовков ниже наполнят заново по актуальному content
  headingsRef.current = [];
  slugCountsRef.current = new Map();

  const components = useMemo<Components>(
    () => ({
      ...baseMarkdownComponents,
      h1: heading(1, headingsRef, slugCountsRef),
      h2: heading(2, headingsRef, slugCountsRef),
      h3: heading(3, headingsRef, slugCountsRef),
      h4: heading(4, headingsRef, slugCountsRef),
      h5: heading(5, headingsRef, slugCountsRef),
      h6: heading(6, headingsRef, slugCountsRef),
    }),
    []
  );

  // biome-ignore lint/correctness/useExhaustiveDependencies: content не читается в теле, но нужен как триггер — иначе несвязанный ре-рендер зациклит consumer, кладущий результат onHeadingsChange в state
  useEffect(() => {
    onHeadingsChangeRef.current?.(headingsRef.current);
  }, [content]);

  return (
    <div className={cn("max-w-none break-words text-[var(--text)]", className)}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
