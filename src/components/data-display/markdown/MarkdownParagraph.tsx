import type React from "react";
import type { ExtraProps } from "react-markdown";
import { cn } from "../../../lib/cn";
import { CopyText } from "../copy-text/CopyText";
import { CopyTextTrigger } from "../copy-text/CopyTextTrigger";
import { CopyTextValue } from "../copy-text/CopyTextValue";
import { getNodeText, isHastElement } from "./utils";

export type MarkdownParagraphProps = React.ComponentPropsWithoutRef<"p"> & ExtraProps;

/**
 * Абзац, состоящий ровно из одного inline-code (`` `значение` `` в отдельной строке),
 * трактуется как копируемое значение (хэш, ключ, команда) и рендерится через `CopyText`.
 * Остальные абзацы — обычный текст.
 */
export function MarkdownParagraph({ node, className, children }: MarkdownParagraphProps) {
  const meaningfulChildren = node?.children.filter(
    (child) => !(child.type === "text" && child.value.trim() === "")
  );
  const onlyChild = meaningfulChildren?.length === 1 ? meaningfulChildren[0] : undefined;

  if (isHastElement(onlyChild) && onlyChild.tagName === "code") {
    const text = getNodeText(onlyChild);
    return (
      <CopyText text={text} className="my-3">
        <CopyTextValue truncate />
        <CopyTextTrigger />
      </CopyText>
    );
  }

  return (
    <p className={cn("my-3 leading-relaxed text-[var(--text)] first:mt-0 last:mb-0", className)}>
      {children}
    </p>
  );
}
