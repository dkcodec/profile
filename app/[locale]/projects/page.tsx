import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { PROJECTS } from "@/lib/constants";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "projects" });

  return {
    title: t("title"),
    description: t("meta_description"),
  };
}

export default async function ProjectsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "projects" });
  const tData = await getTranslations({ locale, namespace: "projects_data" });

  const sorted = [...PROJECTS].sort((a, b) => a.order - b.order);

  return (
    <section className="py-12 md:py-24">
      <Container>
        <SectionHeading
          title={t("title")}
          subtitle={t("subtitle")}
          prefix="//"
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sorted.map((project) => (
            <ProjectCard
              key={project.slug}
              slug={project.slug}
              title={project.title}
              tags={[...project.tags]}
              githubUrl={project.githubUrl}
              description={tData(`${project.slug}.description`)}
              role={tData(`${project.slug}.role`)}
              year={tData(`${project.slug}.year`)}
              highlights={tData.raw(`${project.slug}.highlights`) as string[]}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
