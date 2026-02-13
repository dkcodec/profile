"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/animations/FadeIn";
import {
  StaggerChildren,
  StaggerItem,
} from "@/components/animations/StaggerChildren";

interface GitHubStats {
  repos: number;
  followers: number;
  stars: number;
  topLanguages: { name: string; count: number }[];
}

interface CodewarsStats {
  rank: string;
  honor: number;
  challengesCompleted: number;
}

const LANG_COLORS: Record<string, string> = {
  TypeScript: "var(--syntax-blue)",
  JavaScript: "var(--syntax-orange)",
  Vue: "var(--syntax-green)",
  HTML: "var(--syntax-red)",
  CSS: "var(--syntax-purple)",
  SCSS: "var(--syntax-purple)",
  Python: "var(--syntax-blue)",
};

export function CodingStatsSection() {
  const t = useTranslations("stats");
  const [gh, setGh] = useState<GitHubStats | null>(null);
  const [cw, setCw] = useState<CodewarsStats | null>(null);

  useEffect(() => {
    fetch("/api/github-stats")
      .then((r) => (r.ok ? r.json() : null))
      .then(setGh)
      .catch(() => setGh(null));

    fetch("/api/codewars-stats")
      .then((r) => (r.ok ? r.json() : null))
      .then(setCw)
      .catch(() => setCw(null));
  }, []);

  const statCards = [
    { value: gh?.repos ?? "--", label: t("repos") },
    { value: gh?.stars ?? "--", label: t("stars") },
    { value: cw?.rank ?? "--", label: t("cw_rank") },
    { value: cw?.challengesCompleted ?? "--", label: t("challenges") },
  ];

  const totalLangCount =
    gh?.topLanguages.reduce((sum, l) => sum + l.count, 0) ?? 0;

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

        <StaggerChildren className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {statCards.map((stat) => (
            <StaggerItem key={stat.label}>
              <div className="rounded-xl border border-border bg-muted p-5 text-center transition-colors hover:border-accent/30">
                <div className="font-mono text-2xl font-bold text-accent">
                  {stat.value}
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>

        {/* Language breakdown */}
        {gh?.topLanguages && gh.topLanguages.length > 0 && (
          <FadeIn delay={0.3}>
            <div className="mt-8 rounded-xl border border-border bg-muted p-5">
              <h3 className="mb-4 font-mono text-xs text-muted-foreground">
                <span className="text-syntax-comment">{"// "}</span>
                {t("languages")}
              </h3>
              {/* Bar */}
              <div className="flex h-3 overflow-hidden rounded-full">
                {gh.topLanguages.map((lang) => (
                  <div
                    key={lang.name}
                    className="transition-all duration-500"
                    style={{
                      width: `${(lang.count / totalLangCount) * 100}%`,
                      backgroundColor:
                        LANG_COLORS[lang.name] ?? "var(--muted-foreground)",
                    }}
                  />
                ))}
              </div>
              {/* Legend */}
              <div className="mt-3 flex flex-wrap gap-4">
                {gh.topLanguages.map((lang) => (
                  <div key={lang.name} className="flex items-center gap-1.5">
                    <span
                      className="inline-block h-2.5 w-2.5 rounded-full"
                      style={{
                        backgroundColor:
                          LANG_COLORS[lang.name] ?? "var(--muted-foreground)",
                      }}
                    />
                    <span className="font-mono text-xs text-muted-foreground">
                      {lang.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        )}
      </Container>
    </section>
  );
}
