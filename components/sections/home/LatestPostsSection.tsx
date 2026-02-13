import { getTranslations, getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BlogPostCard } from "@/components/ui/BlogPostCard";
import { getAllPosts } from "@/lib/mdx";

export async function LatestPostsSection() {
  const locale = await getLocale();
  const t = await getTranslations("blog");
  const posts = getAllPosts(locale).slice(0, 3);

  if (posts.length === 0) return null;

  return (
    <section className="border-t border-border py-12 md:py-24">
      <Container>
        <SectionHeading
          title={t("title")}
          subtitle={t("subtitle")}
          prefix="//"
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogPostCard
              key={post.slug}
              post={post}
              readMoreLabel={t("read_more")}
              minReadLabel={t("min_read")}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/blog"
            className="font-mono text-sm text-accent transition-colors hover:text-accent-light"
          >
            {t("view_all_posts")} &rarr;
          </Link>
        </div>
      </Container>
    </section>
  );
}
