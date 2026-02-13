"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/animations/FadeIn";
import {
  StaggerChildren,
  StaggerItem,
} from "@/components/animations/StaggerChildren";
import { TECH_STACK } from "@/lib/constants";

const categoryLabels: Record<string, string> = {
  core: "Core",
  styling: "Styling & UI",
  state: "State Management",
  tools: "Tools & DevOps",
  backend: "Backend",
};

const categorySizes: Record<string, string> = {
  core: "md:col-span-2 md:row-span-2",
  styling: "md:col-span-1 md:row-span-2",
  state: "md:col-span-1 md:row-span-1",
  tools: "md:col-span-1 md:row-span-1",
  backend: "md:col-span-1 md:row-span-1",
};

export function TechStackSection() {
  const t = useTranslations("about");

  return (
    <section className="py-12 md:py-24">
      <Container>
        <FadeIn>
          <SectionHeading title={t("tech_title")} prefix="//" />
        </FadeIn>

        <StaggerChildren className="grid gap-4 md:grid-cols-3">
          {Object.entries(TECH_STACK).map(([category, items]) => (
            <StaggerItem
              key={category}
              className={categorySizes[category] || ""}
            >
              <div className="h-full rounded-xl border border-border bg-muted p-6 transition-all duration-200 hover:border-accent/30">
                <h3 className="font-mono text-xs text-muted-foreground">
                  <span className="text-syntax-comment">{"// "}</span>
                  {categoryLabels[category] || category}
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {items.map((item) => (
                    <span
                      key={item.name}
                      className="rounded-md border border-border/50 bg-subtle px-2.5 py-1 font-mono text-xs text-foreground transition-colors hover:border-accent/50 hover:text-accent"
                    >
                      {item.name}
                    </span>
                  ))}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </Container>
    </section>
  );
}
