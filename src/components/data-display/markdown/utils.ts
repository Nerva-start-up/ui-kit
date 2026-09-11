import type { ExtraProps } from "react-markdown";

export type HastNode = NonNullable<ExtraProps["node"]>;
export type HastChild = HastNode["children"][number];
export type HastElement = Extract<HastChild, { type: "element" }>;

export function isHastElement(node: HastChild | undefined): node is HastElement {
  return node?.type === "element";
}

export function getNodeText(node: HastNode | HastChild | undefined): string {
  if (!node) return "";
  if (node.type === "text") return node.value;
  if ("children" in node) return node.children.map(getNodeText).join("");
  return "";
}

export function getNodeLang(codeNode: HastElement | undefined): string {
  const classNames = (codeNode?.properties?.className as string[] | undefined) ?? [];
  const langClass = classNames.find((c) => c.startsWith("language-"));
  return langClass ? langClass.slice("language-".length) : "text";
}

/** GitHub-подобный slug: сохраняет буквы (включая кириллицу) и цифры, пробелы → дефис */
export function slugifyHeadingText(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}\-_\s]/gu, "")
    .replace(/\s+/g, "-");
}
