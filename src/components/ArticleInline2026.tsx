import { Fragment, type ReactNode } from "react";
import { Link } from "react-router-dom";

/** Restricted Markdown inline renderer. Never injects raw HTML. */
export function articlePlainText2026(value: string): string {
  return value.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/\*\*([^*]+)\*\*/g, "$1").replace(/\*([^*]+)\*/g, "$1");
}
function safeHref(value: string): string | null {
  if (/^\/(?!\/)/.test(value) && !/[\\\u0000-\u001f]/.test(value)) return value;
  try { const u = new URL(value); return u.protocol === "https:" || u.protocol === "http:" ? u.href : null; }
  catch { return null; }
}
function inline(value: string, depth = 0): ReactNode[] {
  if (depth > 3) return [value];
  const token = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|\*([^*]+)\*/g;
  const parts: ReactNode[] = []; let cursor = 0; let match: RegExpExecArray | null;
  while ((match = token.exec(value)) !== null) {
    if (match.index > cursor) parts.push(value.slice(cursor, match.index));
    const key = `${depth}-${match.index}`;
    if (match[1] !== undefined) {
      const href = safeHref(match[2]); const label = inline(match[1], depth + 1);
      parts.push(!href ? <Fragment key={key}>{label}</Fragment> : href.startsWith("/")
        ? <Link key={key} to={href} className="text-accent underline underline-offset-4">{label}</Link>
        : <a key={key} href={href} target="_blank" rel="noopener noreferrer" className="text-accent underline underline-offset-4">{label}</a>);
    } else if (match[3] !== undefined) parts.push(<strong key={key}>{inline(match[3], depth + 1)}</strong>);
    else parts.push(<em key={key}>{inline(match[4], depth + 1)}</em>);
    cursor = token.lastIndex;
  }
  if (cursor < value.length) parts.push(value.slice(cursor));
  return parts;
}
export default function ArticleInline2026({ text }: { text: string }) { return <>{inline(text)}</>; }
