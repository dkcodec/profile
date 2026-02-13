"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { FadeIn } from "@/components/animations/FadeIn";
import {
  StaggerChildren,
  StaggerItem,
} from "@/components/animations/StaggerChildren";
import { PROJECTS } from "@/lib/constants";

export function FeaturedWorkSection() {
  const t = useTranslations("projects");
  const tData = useTranslations("projects_data");
  const featured = PROJECTS.filter((p) => p.featured).slice(0, 3);

  return (
    <section className="border-t border-border py-12 md:py-24">
      <Container>
        <FadeIn>
          <SectionHeading
            title={t("title")}
            subtitle={t("subtitle")}
            prefix="//"
          />
        </FadeIn>

        <StaggerChildren className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((project) => (
            <StaggerItem key={project.slug}>
              <ProjectCard
                slug={project.slug}
                title={project.title}
                tags={[...project.tags]}
                githubUrl={project.githubUrl}
                description={tData(`${project.slug}.description`)}
                role={tData(`${project.slug}.role`)}
                year={tData(`${project.slug}.year`)}
                highlights={tData.raw(`${project.slug}.highlights`) as string[]}
              />
            </StaggerItem>
          ))}
        </StaggerChildren>

        <FadeIn delay={0.3}>
          <div className="mt-12 text-center">
            <Link
              href="/projects"
              className="font-mono text-sm text-accent transition-colors hover:text-accent-light"
            >
              {t("view_all")} &rarr;
            </Link>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
