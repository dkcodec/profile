"use client";

import { useState, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/animations/FadeIn";

export function HeroSection() {
  const t = useTranslations("hero");
  const locale = useLocale();
  const [HeroModel, setHeroModel] = useState<React.ComponentType | null>(null);

  // Only import Three.js on desktop, after page is idle (doesn't block FCP/LCP)
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    if (!mq.matches) return;

    const load = () => {
      import("@/components/animations/HeroModel").then((m) => {
        setHeroModel(() => m.HeroModel);
      });
    };

    if ("requestIdleCallback" in window) {
      const id = requestIdleCallback(load, { timeout: 3000 });
      return () => cancelIdleCallback(id);
    } else {
      const id = setTimeout(load, 1500);
      return () => clearTimeout(id);
    }
  }, []);

  return (
    <section className="relative flex min-h-[calc(100vh-4rem)] items-center overflow-hidden">
      {/* CSS dot-grid background */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle, var(--accent-glow) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
      </div>

      {/* 3D canvas — desktop only, full hero, behind text */}
      {HeroModel && (
        <div className="absolute inset-0 -z-[5]">
          <HeroModel />
        </div>
      )}

      {/* Text content */}
      <Container className="relative z-10">
        <div className="max-w-xl">
          <FadeIn delay={0.1}>
            <p className="font-mono text-sm text-accent">
              &#10095; {t("prompt")}
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <h1 className="mt-3 text-5xl font-bold tracking-tight md:text-6xl">
              {t("name")}
            </h1>
          </FadeIn>
          <FadeIn delay={0.3}>
            <p className="mt-2 font-mono text-xl text-muted-foreground md:text-2xl">
              {t("comment_role")}
            </p>
          </FadeIn>
          <FadeIn delay={0.4}>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
              {t("description")}
            </p>
          </FadeIn>
          <FadeIn delay={0.5}>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/projects">
                <Button variant="primary" size="lg">
                  {t("cta_work")}
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="secondary" size="lg">
                  {t("cta_contact")}
                </Button>
              </Link>
              <a href={`/kairgeldin_cv_2026_${locale}.pdf`} download>
                <Button variant="ghost" size="lg">
                  &#8595; {t("cta_cv")}
                </Button>
              </a>
            </div>
          </FadeIn>
          <FadeIn delay={0.6}>
            <p className="mt-8 flex items-center gap-2 font-mono text-xs text-muted-foreground">
              <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-accent" />
              {t("status")}
            </p>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
