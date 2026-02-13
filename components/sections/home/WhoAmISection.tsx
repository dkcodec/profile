"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/animations/FadeIn";
import {
  StaggerChildren,
  StaggerItem,
} from "@/components/animations/StaggerChildren";

export function WhoAmISection() {
  const t = useTranslations("who_am_i");

  const stats = [
    { value: "3+", label: t("stat_years") },
    { value: "90+", label: t("stat_lighthouse") },
    { value: "500+", label: t("stat_npm") },
  ];

  return (
    <section className="border-t border-border py-12 md:py-24">
      <Container>
        <div className="grid items-start gap-12 lg:grid-cols-2">
          {/* Code block */}
          <FadeIn>
            <div className="overflow-hidden rounded-xl border border-border bg-muted">
              {/* Title bar */}
              <div className="flex items-center gap-2 border-b border-border px-4 py-3">
                <span className="h-3 w-3 rounded-full bg-syntax-red/60" />
                <span className="h-3 w-3 rounded-full bg-syntax-orange/60" />
                <span className="h-3 w-3 rounded-full bg-syntax-green/60" />
                <span className="ml-2 font-mono text-xs text-muted-foreground">
                  profile.ts
                </span>
              </div>
              {/* Code content */}
              <div className="p-5 font-mono text-sm leading-relaxed">
                <p className="text-syntax-comment">{"// about me"}</p>
                <p className="mt-2">
                  <span className="text-syntax-purple">const</span>{" "}
                  <span className="text-foreground">developer</span>{" "}
                  <span className="text-syntax-red">=</span>{" "}
                  <span className="text-syntax-orange">{"{"}</span>
                </p>
                <p className="pl-4">
                  <span className="text-syntax-blue">name</span>
                  <span className="text-syntax-red">:</span>{" "}
                  <span className="text-syntax-green">
                    {'"Dmitriy Kairgeldin"'}
                  </span>
                  <span className="text-muted-foreground">,</span>
                </p>
                <p className="pl-4">
                  <span className="text-syntax-blue">role</span>
                  <span className="text-syntax-red">:</span>{" "}
                  <span className="text-syntax-green">
                    {'"Frontend Engineer"'}
                  </span>
                  <span className="text-muted-foreground">,</span>
                </p>
                <p className="pl-4">
                  <span className="text-syntax-blue">location</span>
                  <span className="text-syntax-red">:</span>{" "}
                  <span className="text-syntax-green">{'"Astana, KZ"'}</span>
                  <span className="text-muted-foreground">,</span>
                </p>
                <p className="pl-4">
                  <span className="text-syntax-blue">experience</span>
                  <span className="text-syntax-red">:</span>{" "}
                  <span className="text-syntax-orange">3</span>
                  <span className="text-muted-foreground">,</span>{" "}
                  <span className="text-syntax-comment">{"// years"}</span>
                </p>
                <p className="pl-4">
                  <span className="text-syntax-blue">openToWork</span>
                  <span className="text-syntax-red">:</span>{" "}
                  <span className="text-syntax-purple">true</span>
                  <span className="text-muted-foreground">,</span>
                </p>
                <p>
                  <span className="text-syntax-orange">{"}"}</span>
                  <span className="text-muted-foreground">;</span>
                </p>
              </div>
            </div>
          </FadeIn>

          {/* Bio + Stats */}
          <div>
            <FadeIn delay={0.1}>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                <span className="font-mono text-muted-foreground">{"// "}</span>
                {t("title")}
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                {t("bio")}
              </p>
            </FadeIn>

            <StaggerChildren className="mt-8 grid grid-cols-3 gap-4">
              {stats.map((stat) => (
                <StaggerItem key={stat.label}>
                  <div className="rounded-xl border border-border bg-muted p-4 text-center">
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
          </div>
        </div>
      </Container>
    </section>
  );
}
