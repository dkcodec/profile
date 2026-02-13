import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Tag } from "@/components/ui/Tag";
import { PROJECTS } from "@/lib/constants";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);

  if (!project) return {};

  const tData = await getTranslations({ locale, namespace: "projects_data" });

  return {
    title: project.title,
    description: tData(`${slug}.description`),
  };
}

export default async function ProjectPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "projects" });
  const tData = await getTranslations({ locale, namespace: "projects_data" });

  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) return notFound();

  const highlights = tData.raw(`${slug}.highlights`) as string[];

  return (
    <section className="py-12 md:py-24">
      <Container>
        {/* Hero */}
        <div className="relative aspect-[21/9] overflow-hidden rounded-2xl border border-border bg-muted">
          {project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1200px) 100vw, 1200px"
            />
          ) : (
            <div className="flex h-full items-center justify-center font-mono text-6xl font-bold text-placeholder">
              {project.title[0]}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_300px]">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold tracking-tight md:text-5xl">
              {project.title}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              {tData(`${slug}.long_description`)}
            </p>

            <div className="mt-10">
              <h2 className="text-xl font-bold">
                <span className="font-mono text-muted-foreground">{"// "}</span>
                {t("highlights")}
              </h2>
              <ul className="mt-4 space-y-3">
                {highlights.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-muted-foreground"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="rounded-xl border border-border bg-muted p-6">
              <h3 className="font-mono text-xs text-muted-foreground">
                {t("role")}
              </h3>
              <p className="mt-1 font-medium">{tData(`${slug}.role`)}</p>
            </div>

            <div className="rounded-xl border border-border bg-muted p-6">
              <h3 className="font-mono text-xs text-muted-foreground">
                {t("year")}
              </h3>
              <p className="mt-1 font-mono font-medium">
                {tData(`${slug}.year`)}
              </p>
            </div>

            <div className="rounded-xl border border-border bg-muted p-6">
              <h3 className="font-mono text-xs text-muted-foreground">
                {t("tech_stack")}
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>
            </div>

            {(project.link || project.githubUrl) && (
              <div className="space-y-3">
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center rounded-lg bg-accent px-4 py-2.5 font-mono text-sm font-medium text-background transition-colors hover:bg-accent-dark"
                  >
                    {t("live_site")} &rarr;
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center rounded-lg border border-border px-4 py-2.5 font-mono text-sm font-medium transition-colors hover:border-accent/50 hover:text-accent"
                  >
                    {t("source_code")}
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
