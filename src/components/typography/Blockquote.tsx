import type React from "react";
import { cn } from "../../lib/cn";

export type BlockquoteProps = React.BlockquoteHTMLAttributes<HTMLQuoteElement>;

/** Цитата `<blockquote>` с акцентной левой границей. */
export function Blockquote({ className, children, ...props }: BlockquoteProps) {
  return (
    <blockquote
      className={cn(
        "border-l-2 border-[var(--primary)] pl-4 text-[length:var(--font-size-md)] italic leading-[var(--line-height-relaxed)] text-[var(--text-sub)]",
        className
      )}
      {...props}
    >
      {children}
    </blockquote>
  );
}
