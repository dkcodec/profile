import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import { cn } from "@/lib/utils";

function Callout({
  children,
  type = "info",
}: {
  children: React.ReactNode;
  type?: "info" | "warning" | "tip";
}) {
  const styles = {
    info: "border-blue-500/30 bg-blue-500/5 text-blue-700",
    warning: "border-yellow-500/30 bg-yellow-500/5 text-yellow-700",
    tip: "border-accent/30 bg-accent/5 text-accent-dark",
  };

  const icons = {
    info: "i",
    warning: "!",
    tip: "*",
  };

  return (
    <div
      className={cn(
        "my-6 rounded-lg border-l-4 p-4",
        styles[type]
      )}
    >
      <div className="flex items-start gap-3">
        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-current/10 text-xs font-bold">
          {icons[type]}
        </span>
        <div className="text-sm leading-relaxed">{children}</div>
      </div>
    </div>
  );
}

export const mdxComponents: MDXComponents = {
  h1: ({ children, id, ...props }) => (
    <h1 id={id} className="mt-12 mb-4 text-3xl font-bold tracking-tight" {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, id, ...props }) => (
    <h2 id={id} className="mt-10 mb-4 text-2xl font-bold tracking-tight" {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, id, ...props }) => (
    <h3 id={id} className="mt-8 mb-3 text-xl font-semibold" {...props}>
      {children}
    </h3>
  ),
  p: ({ children, ...props }) => (
    <p className="mb-4 leading-relaxed text-muted-foreground" {...props}>
      {children}
    </p>
  ),
  a: ({ href, children, ...props }) => (
    <a
      href={href}
      className="text-accent underline decoration-accent/30 underline-offset-4 transition-colors hover:decoration-accent"
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      {...props}
    >
      {children}
    </a>
  ),
  ul: ({ children, ...props }) => (
    <ul className="mb-4 list-disc space-y-1 pl-6 text-muted-foreground" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol className="mb-4 list-decimal space-y-1 pl-6 text-muted-foreground" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li className="leading-relaxed" {...props}>
      {children}
    </li>
  ),
  blockquote: ({ children, ...props }) => (
    <blockquote
      className="my-6 border-l-4 border-accent/40 pl-4 italic text-muted-foreground"
      {...props}
    >
      {children}
    </blockquote>
  ),
  hr: (props) => <hr className="my-8 border-border" {...props} />,
  code: ({ children, ...props }) => (
    <code
      className="rounded bg-subtle px-1.5 py-0.5 text-sm font-mono text-accent-dark"
      {...props}
    >
      {children}
    </code>
  ),
  pre: ({ children, ...props }) => (
    <pre
      className="my-6 overflow-x-auto rounded-lg border border-border bg-dark-bg p-4 text-sm"
      {...props}
    >
      {children}
    </pre>
  ),
  img: ({ src, alt, ...props }) =>
    src ? (
      <Image
        src={src}
        alt={alt || ""}
        width={800}
        height={450}
        className="my-6 rounded-lg border border-border"
        {...(props as Record<string, unknown>)}
      />
    ) : null,
  table: ({ children, ...props }) => (
    <div className="my-6 overflow-x-auto">
      <table className="w-full text-sm" {...props}>
        {children}
      </table>
    </div>
  ),
  th: ({ children, ...props }) => (
    <th className="border-b border-border px-4 py-2 text-left font-semibold" {...props}>
      {children}
    </th>
  ),
  td: ({ children, ...props }) => (
    <td className="border-b border-border px-4 py-2 text-muted-foreground" {...props}>
      {children}
    </td>
  ),
  Callout,
};
