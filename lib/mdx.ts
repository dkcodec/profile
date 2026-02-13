import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { BlogPost, BlogPostWithContent } from "@/types/blog";

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");

function getPostDir(locale: string) {
  return path.join(CONTENT_DIR, locale);
}

export function getPostSlugs(locale: string): string[] {
  const dir = getPostDir(locale);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function getPostBySlug(
  slug: string,
  locale: string,
): BlogPostWithContent | null {
  const filePath = path.join(getPostDir(locale), `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const stats = readingTime(content);

  return {
    slug,
    title: data.title ?? slug,
    description: data.description ?? "",
    date: data.date ?? new Date().toISOString(),
    tags: data.tags ?? [],
    author: data.author ?? "Dmitriy Kairgeldin",
    readingTime: Math.ceil(stats.minutes),
    published: data.published !== false,
    locale,
    image: data.image,
    content,
  };
}

export function getAllPosts(locale: string): BlogPost[] {
  const slugs = getPostSlugs(locale);
  return (
    slugs
      .map((slug) => getPostBySlug(slug, locale))
      .filter(
        (post): post is BlogPostWithContent => post !== null && post.published,
      )
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .map(({ content: _content, ...post }) => post)
  );
}

export function getAllTags(locale: string): string[] {
  const posts = getAllPosts(locale);
  const tags = new Set<string>();
  posts.forEach((post) => post.tags.forEach((tag) => tags.add(tag)));
  return Array.from(tags).sort();
}
