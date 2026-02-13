"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/animations/FadeIn";
import {
  StaggerChildren,
  StaggerItem,
} from "@/components/animations/StaggerChildren";

export function QuickAboutSection() {
  const t = useTranslations("about");

  const stats = [
    { value: "3+", label: "Years Experience" },
    { value: "90+", label: "Lighthouse Score" },
    { value: "500+", label: "NPM Downloads/wk" },
  ];

  return (
    <section className="bg-muted py-12 md:py-24">
      <Container>
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <FadeIn>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                {t("bio_title")}
              </h2>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                {t("bio")}
              </p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <Link
                href="/about"
                className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-accent-dark"
              >
                Learn more about me &rarr;
              </Link>
            </FadeIn>
          </div>

          <StaggerChildren className="grid grid-cols-3 gap-4">
            {stats.map((stat) => (
              <StaggerItem key={stat.label}>
                <div className="rounded-xl border border-border bg-background p-5 text-center">
                  <div className="text-3xl font-bold text-accent">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </Container>
    </section>
  );
}
