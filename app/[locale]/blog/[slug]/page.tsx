import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Tag } from "@/components/ui/Tag";
import { MDXContent } from "@/components/mdx/MDXContent";
import { Link } from "@/i18n/navigation";
import { getPostBySlug, getPostSlugs, getAllPosts } from "@/lib/mdx";
import { formatDate } from "@/lib/utils";
import { routing } from "@/i18n/routing";
import { JsonLd, blogPostJsonLd } from "@/components/seo/JsonLd";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getPostSlugs(locale).map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPostBySlug(slug, locale);

  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "blog" });

  const post = getPostBySlug(slug, locale);
  if (!post) notFound();

  // Get all posts to find prev/next
  const allPosts = getAllPosts(locale);
  const currentIndex = allPosts.findIndex((p) => p.slug === slug);
  const prevPost =
    currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;

  return (
    <>
      <JsonLd
        data={blogPostJsonLd({
          title: post.title,
          description: post.description,
          date: post.date,
          slug: post.slug,
          locale,
        })}
      />
      <section className="py-12 md:py-24">
        <Container>
          <div className="mx-auto max-w-3xl">
            <Link
              href="/blog"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              &larr; {t("back_to_blog")}
            </Link>

            <header className="mt-8">
              <div className="flex items-center gap-3 text-sm text-placeholder">
                <time dateTime={post.date}>
                  {formatDate(post.date, locale)}
                </time>
                <span aria-hidden="true">&middot;</span>
                <span>
                  {post.readingTime} {t("min_read")}
                </span>
              </div>

              <h1 className="mt-4 text-3xl lg:text-4xl font-bold tracking-tight md:text-5xl">
                {post.title}
              </h1>

              <p className="mt-4 text-lg text-muted-foreground">
                {post.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>
            </header>

            <hr className="my-10 border-border" />

            <article>
              <MDXContent source={post.content} />
            </article>

            <hr className="my-10 border-border" />

            {/* Prev / Next navigation */}
            <nav className="flex items-stretch gap-4">
              {prevPost ? (
                <Link
                  href={`/blog/${prevPost.slug}`}
                  className="flex-1 rounded-xl border border-border p-4 transition-colors hover:border-accent/40"
                >
                  <div className="text-xs text-placeholder">
                    &larr; Previous
                  </div>
                  <div className="mt-1 text-sm font-medium">
                    {prevPost.title}
                  </div>
                </Link>
              ) : (
                <div className="flex-1" />
              )}
              {nextPost ? (
                <Link
                  href={`/blog/${nextPost.slug}`}
                  className="flex-1 rounded-xl border border-border p-4 text-right transition-colors hover:border-accent/40"
                >
                  <div className="text-xs text-placeholder">Next &rarr;</div>
                  <div className="mt-1 text-sm font-medium">
                    {nextPost.title}
                  </div>
                </Link>
              ) : (
                <div className="flex-1" />
              )}
            </nav>
          </div>
        </Container>
      </section>
    </>
  );
}
