"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { BlogPostCard } from "@/components/ui/BlogPostCard";
import { Tag } from "@/components/ui/Tag";
import type { BlogPost } from "@/types/blog";

interface BlogSearchProps {
  posts: BlogPost[];
  tags: string[];
}

export function BlogSearch({ posts, tags }: BlogSearchProps) {
  const t = useTranslations("blog");
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return posts.filter((post) => {
      const matchesQuery =
        !query ||
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.description.toLowerCase().includes(query.toLowerCase());

      const matchesTag = !activeTag || post.tags.includes(activeTag);

      return matchesQuery && matchesTag;
    });
  }, [posts, query, activeTag]);

  return (
    <>
      <div className="mb-10 space-y-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t("search_placeholder")}
          className="w-full max-w-md rounded-lg border border-border bg-muted px-4 py-2.5 text-sm text-foreground placeholder:text-placeholder focus:border-accent focus:outline-none"
        />

        <div className="flex flex-wrap gap-2">
          <Tag active={activeTag === null} onClick={() => setActiveTag(null)}>
            {t("all_tags")}
          </Tag>
          {tags.map((tag) => (
            <Tag
              key={tag}
              active={activeTag === tag}
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
            >
              {tag}
            </Tag>
          ))}
        </div>
      </div>

      {filtered.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post) => (
            <BlogPostCard
              key={post.slug}
              post={post}
              readMoreLabel={t("read_more")}
              minReadLabel={t("min_read")}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground">{t("no_posts")}</p>
      )}
    </>
  );
}
