"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/animations/FadeIn";
import { SOCIAL_LINKS } from "@/lib/constants";
import Image from "next/image";

export function BioSection() {
  const t = useTranslations("about");

  return (
    <section className="py-12 md:py-24">
      <Container>
        <div className="grid items-start gap-12 md:grid-cols-[1fr_2fr]">
          <FadeIn direction="left">
            <div className="relative mx-auto aspect-square w-full max-w-xs overflow-hidden rounded-2xl border border-border bg-muted md:mx-0">
              <Image
                src="/images/profile.jpg"
                alt="Profile Picture"
                fill
                className="object-cover"
                priority
              />
            </div>
          </FadeIn>

          <div>
            <FadeIn delay={0.1}>
              <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
                <span className="font-mono text-muted-foreground">{"// "}</span>
                {t("bio_title")}
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                {t("bio")}
              </p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                {t("bio_extended")}
              </p>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="mt-8 flex items-center gap-4">
                <a
                  href={SOCIAL_LINKS.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 font-mono text-sm text-muted-foreground transition-colors hover:border-accent/50 hover:text-accent"
                >
                  GitHub
                </a>
                <a
                  href={SOCIAL_LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 font-mono text-sm text-muted-foreground transition-colors hover:border-accent/50 hover:text-accent"
                >
                  LinkedIn
                </a>
                <a
                  href={SOCIAL_LINKS.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 font-mono text-sm text-muted-foreground transition-colors hover:border-accent/50 hover:text-accent"
                >
                  Telegram
                </a>
              </div>
            </FadeIn>
          </div>
        </div>
      </Container>
    </section>
  );
}
