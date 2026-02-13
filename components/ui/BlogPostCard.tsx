import { Link } from "@/i18n/navigation";
import { Tag } from "./Tag";
import { formatDate } from "@/lib/utils";
import type { BlogPost } from "@/types/blog";

interface BlogPostCardProps {
  post: BlogPost;
  readMoreLabel: string;
  minReadLabel: string;
}

export function BlogPostCard({
  post,
  readMoreLabel,
  minReadLabel,
}: BlogPostCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block rounded-xl border border-border bg-muted p-6 transition-all duration-200 hover:border-accent/30 hover:shadow-lg hover:shadow-accent-glow"
    >
      <div className="flex items-center gap-3 font-mono text-xs text-placeholder">
        <time dateTime={post.date}>{formatDate(post.date, post.locale)}</time>
        <span aria-hidden="true">&middot;</span>
        <span>
          {post.readingTime} {minReadLabel}
        </span>
      </div>

      <h3 className="mt-3 text-lg font-semibold tracking-tight transition-colors group-hover:text-accent">
        {post.title}
      </h3>

      <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
        {post.description}
      </p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {post.tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>

      <span className="mt-4 inline-block font-mono text-sm text-accent">
        {readMoreLabel} &rarr;
      </span>
    </Link>
  );
}
