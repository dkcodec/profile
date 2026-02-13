"use client";

import { useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  EXPERIENCE_IDS,
  EXPERIENCE_TECH,
  EXPERIENCE_METRICS,
} from "@/lib/constants";

function MetricCard({
  label,
  before,
  after,
}: {
  label: string;
  before?: string;
  after: string;
  unit?: string;
}) {
  return (
    <div className="pop-in metric-card rounded-xl border border-accent/20 bg-accent/5 px-4 py-3">
      <div className="text-xs font-medium uppercase tracking-wider text-accent">
        {label}
      </div>
      <div className="mt-1 flex items-baseline gap-2">
        {before && (
          <>
            <span className="text-lg font-semibold text-muted-foreground line-through">
              {before}
            </span>
            <span className="text-accent">&rarr;</span>
          </>
        )}
        <span className="text-2xl font-bold text-accent">{after}</span>
      </div>
    </div>
  );
}

export function ExperienceSection() {
  const tAbout = useTranslations("about");
  const tExp = useTranslations("experience");
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            el.classList.add("is-visible");
            if (el.dataset.delay) {
              el.style.animationDuration = el.dataset.duration ?? "0.8s";
              el.style.animationDelay = el.dataset.delay;
            }
            observer.unobserve(el);
          }
        });
      },
      { rootMargin: "-50px" },
    );

    const line = section.querySelector(".timeline-line");
    if (line) observer.observe(line);
    section
      .querySelectorAll(".slide-in-left")
      .forEach((el) => observer.observe(el));
    section.querySelectorAll(".pop-in").forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="border-t border-border bg-muted py-12 md:py-24"
    >
      <Container>
        <SectionHeading title={tAbout("experience_title")} prefix="//" />

        <div className="relative">
          <div className="timeline-line absolute left-0 top-0 hidden h-full w-px bg-border md:left-8 md:block" />

          <div className="space-y-16">
            {EXPERIENCE_IDS.map((id, index) => {
              const isFirst = index === 0;
              const company = tExp(`${id}.company`);
              const role = tExp(`${id}.role`);
              const period = tExp(`${id}.period`);
              const location = tExp(`${id}.location`);
              const highlights = tExp.raw(`${id}.highlights`) as string[];
              const technologies = EXPERIENCE_TECH[id] ?? [];
              const metrics = EXPERIENCE_METRICS[id];

              return (
                <div
                  key={id}
                  className="slide-in-left experience-entry relative md:pl-20"
                  data-delay={`${index * 0.1}s`}
                  data-duration="0.8s"
                >
                  <div
                    className={`absolute left-0 top-0 hidden h-4 w-4 rounded-full border-2 md:left-[1.52rem] md:block ${
                      isFirst
                        ? "border-accent bg-accent shadow-[0_0_12px_var(--accent-glow)]"
                        : "border-border bg-subtle"
                    }`}
                  />

                  {isFirst && (
                    <div className="absolute left-0 top-0 hidden h-4 w-4 animate-ping rounded-full bg-accent/30 md:left-[1.52rem] md:block" />
                  )}

                  <div
                    className={`rounded-2xl border p-6 md:p-8 ${
                      isFirst
                        ? "border-accent/20 bg-subtle"
                        : "border-border bg-subtle/50"
                    }`}
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h3
                          className={`text-2xl font-bold ${
                            isFirst ? "text-accent" : "text-foreground"
                          }`}
                        >
                          {company}
                        </h3>
                        <p className="mt-1 text-base font-medium text-foreground/80">
                          {role}
                        </p>
                      </div>
                      <div className="font-mono text-sm text-muted-foreground">
                        <div>{period}</div>
                        <div>{location}</div>
                      </div>
                    </div>

                    {metrics && (
                      <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
                        {metrics.map((metric) => (
                          <MetricCard
                            key={metric.label}
                            label={metric.label}
                            before={metric.before}
                            after={metric.after}
                            unit={metric.unit}
                          />
                        ))}
                      </div>
                    )}

                    <div className="mt-6">
                      <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        {tAbout("highlights")}
                      </h4>
                      <ul className="mt-3 space-y-2">
                        {highlights.map((highlight, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground"
                          >
                            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {technologies.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md border border-border/50 bg-background px-3 py-1 font-mono text-xs text-muted-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
