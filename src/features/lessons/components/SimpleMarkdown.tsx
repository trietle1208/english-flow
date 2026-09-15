import type { ReactNode } from "react";

/**
 * Tiny markdown subset used by seed explanations: paragraphs, **bold**, *italic*.
 * Avoids pulling in a full markdown library for single-paragraph lesson copy.
 */
export function SimpleMarkdown({ markdown }: { markdown: string }) {
  const paragraphs = markdown.split(/\n{2,}/).map((part) => part.trim()).filter(Boolean);

  return (
    <div className="space-y-3 text-sm leading-relaxed text-foreground sm:text-base">
      {paragraphs.map((paragraph, index) => (
        <p key={index}>{renderInline(paragraph)}</p>
      ))}
    </div>
  );
}

function renderInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  // Match **bold** or *italic* (non-greedy). Bold checked first.
  const pattern = /(\*\*[^*]+\*\*|\*[^*]+\*)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }
    const token = match[0];
    if (token.startsWith("**") && token.endsWith("**")) {
      nodes.push(
        <strong key={`b-${match.index}`} className="font-semibold">
          {token.slice(2, -2)}
        </strong>,
      );
    } else {
      nodes.push(
        <em key={`i-${match.index}`} className="italic">
          {token.slice(1, -1)}
        </em>,
      );
    }
    lastIndex = match.index + token.length;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
}
