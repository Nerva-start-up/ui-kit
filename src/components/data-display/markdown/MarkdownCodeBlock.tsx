import type React from "react";
import type { ExtraProps } from "react-markdown";
import { CodeBlock } from "../code-block/CodeBlock";
import { CodeBlockContent } from "../code-block/CodeBlockContent";
import { CodeBlockHeader } from "../code-block/CodeBlockHeader";
import { getNodeLang, getNodeText, isHastElement } from "./utils";

export type MarkdownCodeBlockProps = React.ComponentPropsWithoutRef<"pre"> & ExtraProps;

/** Рендерит fenced code-блоки (```lang) markdown-документа через `CodeBlock`. */
export function MarkdownCodeBlock({ node }: MarkdownCodeBlockProps) {
  const codeNode = node?.children.find((child) => isHastElement(child) && child.tagName === "code");
  const code = isHastElement(codeNode) ? getNodeText(codeNode).replace(/\n$/, "") : "";
  const lang = isHastElement(codeNode) ? getNodeLang(codeNode) : "text";

  return (
    <CodeBlock code={code} lang={lang} className="my-4">
      <CodeBlockHeader />
      <CodeBlockContent showLineNumbers={code.split("\n").length > 5} />
    </CodeBlock>
  );
}
