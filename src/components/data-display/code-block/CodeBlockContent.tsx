import { Highlight, themes } from "prism-react-renderer";
import { cn } from "../../../lib/cn";
import { useCodeBlockContext } from "./context";

export type CodeBlockContentProps = {
  /** показывать номера строк */
  showLineNumbers?: boolean;
  className?: string;
};

/** Подсвеченный код (Highlight из prism-react-renderer). */
export function CodeBlockContent({ showLineNumbers = false, className }: CodeBlockContentProps) {
  const { code, lang } = useCodeBlockContext();

  return (
    <Highlight theme={themes.oneDark} code={code.trimEnd()} language={lang}>
      {({ tokens, getLineProps, getTokenProps }) => (
        <pre
          className={cn(
            "overflow-x-auto p-4 leading-6 font-mono text-[13px]",
            "bg-transparent",
            className
          )}
          style={{ margin: 0 }}
        >
          {tokens.map((line, lineIndex) => (
            <div key={lineIndex} {...getLineProps({ line })} className="table-row">
              {showLineNumbers && (
                <span
                  className="table-cell pr-4 text-right select-none text-[var(--text-muted)] opacity-50 min-w-[2rem]"
                  aria-hidden
                >
                  {lineIndex + 1}
                </span>
              )}
              <span className="table-cell">
                {line.map((token, tokenIndex) => (
                  <span key={tokenIndex} {...getTokenProps({ token })} />
                ))}
              </span>
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
}
