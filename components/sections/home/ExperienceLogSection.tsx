"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/animations/FadeIn";
import {
  StaggerChildren,
  StaggerItem,
} from "@/components/animations/StaggerChildren";
import { EXPERIENCE_IDS, EXPERIENCE_TECH } from "@/lib/constants";

export function ExperienceLogSection() {
  const tHome = useTranslations("experience_home");
  const tExp = useTranslations("experience");

  return (
    <section className="border-t border-border py-12 md:py-24">
      <Container>
        <FadeIn>
          <SectionHeading title={tHome("title")} prefix="//" />
        </FadeIn>

        <StaggerChildren className="space-y-4">
          {EXPERIENCE_IDS.map((id, index) => {
            const highlights = tExp.raw(`${id}.highlights`) as string[];
            const tech = EXPERIENCE_TECH[id] ?? [];

            return (
              <StaggerItem key={id}>
                <div className="rounded-xl border border-border bg-muted p-6 transition-colors hover:border-accent/30">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div className="flex items-center gap-3">
                      {index === 0 ? (
                        <span className="inline-block h-2.5 w-2.5 rounded-full bg-accent animate-pulse" />
                      ) : (
                        <span className="inline-block h-2.5 w-2.5 rounded-full bg-border" />
                      )}
                      <h3 className="text-lg font-semibold">
                        {tExp(`${id}.company`)}
                      </h3>
                      <span className="font-mono text-xs text-muted-foreground">
                        {tExp(`${id}.role`)}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-muted-foreground">
                        {tExp(`${id}.period`)}
                      </span>
                      {index === 0 && (
                        <span className="rounded-md border border-accent/30 bg-accent/10 px-2 py-0.5 font-mono text-xs text-accent">
                          {tExp("current")}
                        </span>
                      )}
                    </div>
                  </div>

                  <ul className="mt-4 space-y-1.5 pl-5">
                    {highlights.slice(0, 2).map((highlight) => (
                      <li
                        key={highlight}
                        className="text-sm text-muted-foreground"
                        style={{
                          listStyleType: "none",
                          textIndent: "-1em",
                          paddingLeft: "1em",
                        }}
                      >
                        <span className="text-accent">&#8250;</span> {highlight}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-md border border-border/50 bg-subtle px-2 py-0.5 font-mono text-xs text-muted-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerChildren>

        <FadeIn delay={0.3}>
          <div className="mt-8 text-center">
            <Link
              href="/experience"
              className="font-mono text-sm text-accent transition-colors hover:text-accent-light"
            >
              {tHome("view_full")} &rarr;
            </Link>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
