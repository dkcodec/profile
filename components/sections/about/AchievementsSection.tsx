"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/animations/FadeIn";
import {
  StaggerChildren,
  StaggerItem,
} from "@/components/animations/StaggerChildren";
import { ACHIEVEMENT_IDS } from "@/lib/constants";

export function AchievementsSection() {
  const t = useTranslations("about");
  const tAch = useTranslations("achievements");

  return (
    <section className="py-12 md:py-24">
      <Container>
        <FadeIn>
          <SectionHeading title={t("achievements_title")} />
        </FadeIn>

        <StaggerChildren className="grid gap-6 md:grid-cols-3">
          {ACHIEVEMENT_IDS.map((id) => (
            <StaggerItem key={id}>
              <div className="rounded-xl border border-border bg-background p-6 text-center transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-accent-glow">
                <div className="text-4xl font-bold text-accent">
                  {tAch(`${id}.metric`)}
                </div>
                <div className="mt-2 text-sm font-semibold">
                  {tAch(`${id}.label`)}
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  {tAch(`${id}.description`)}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </Container>
    </section>
  );
}
