import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BlogSearch } from "@/components/sections/blog/BlogSearch";
import { getAllPosts, getAllTags } from "@/lib/mdx";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });

  return {
    title: t("title"),
    description: t("meta_description"),
  };
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "blog" });

  const posts = getAllPosts(locale);
  const tags = getAllTags(locale);

  return (
    <section className="py-12 md:py-24">
      <Container>
        <SectionHeading
          title={t("title")}
          subtitle={t("subtitle")}
          prefix="//"
        />
        <BlogSearch posts={posts} tags={tags} />
      </Container>
    </section>
  );
}
