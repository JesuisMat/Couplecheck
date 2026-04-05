"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";

interface MarkdownContentProps {
  content: string;
  isStreaming?: boolean;
}

const components: Components = {
  p: ({ children }) => (
    <p className="mb-3 last:mb-0 leading-relaxed text-[14px] text-[var(--foreground)]">
      {children}
    </p>
  ),
  ul: ({ children }) => (
    <ul className="mb-3 space-y-1.5 pl-5 list-disc text-[14px]">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-3 space-y-1.5 pl-5 list-decimal text-[14px]">{children}</ol>
  ),
  li: ({ children }) => (
    <li className="leading-relaxed text-[14px] text-[var(--foreground)]">{children}</li>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-[var(--foreground)]">{children}</strong>
  ),
  em: ({ children }) => <em className="italic">{children}</em>,
  h2: ({ children }) => (
    <h2 className="font-display italic text-[18px] font-normal mt-4 mb-2 first:mt-0 text-[var(--foreground)]">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="font-medium text-[15px] mt-3 mb-1.5 text-[var(--foreground)]">
      {children}
    </h3>
  ),
  table: ({ children }) => (
    <div className="overflow-x-auto mb-3">
      <table className="w-full text-[13px] border-collapse">{children}</table>
    </div>
  ),
  th: ({ children }) => (
    <th className="border border-[var(--border)] bg-[var(--muted)] px-3 py-2 text-left font-medium text-[12px] uppercase tracking-wide text-[var(--muted-foreground)]">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border border-[var(--border)] px-3 py-2 text-[13px] text-[var(--foreground)]">
      {children}
    </td>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-2 border-[var(--primary)] pl-4 text-[var(--muted-foreground)] italic mb-3">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="border-[var(--border)] my-4" />,
  // Inline code only (no code blocks in this coaching context)
  code: ({ children }) => (
    <code className="bg-[var(--muted)] rounded px-1 py-0.5 text-[13px] font-mono">
      {children}
    </code>
  ),
};

export function MarkdownContent({ content, isStreaming }: MarkdownContentProps) {
  return (
    <div className="min-w-0">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
      {isStreaming && (
        <span className="inline-block w-0.5 h-[1em] bg-[var(--primary)] animate-pulse ml-0.5 align-middle" />
      )}
    </div>
  );
}
