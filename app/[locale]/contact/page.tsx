import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/sections/contact/ContactForm";
import { SOCIAL_LINKS } from "@/lib/constants";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });

  return {
    title: t("title"),
    description: t("meta_description"),
  };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "contact" });

  return (
    <section className="py-12 md:py-24">
      <Container>
        <SectionHeading
          title={t("title")}
          subtitle={t("subtitle")}
          prefix="//"
        />

        <div className="grid gap-12 lg:grid-cols-[1fr_380px]">
          <ContactForm />

          <div className="space-y-6">
            <div className="rounded-xl border border-border bg-muted p-6">
              <h3 className="font-mono text-xs text-muted-foreground">
                <span className="text-syntax-comment">{"// "}</span>
                {t("info_title")}
              </h3>

              <div className="mt-4 space-y-4">
                <div>
                  <div className="font-mono text-xs text-placeholder">
                    Email
                  </div>
                  <a
                    href={`mailto:${process.env.NEXT_PUBLIC_EMAIL}`}
                    className="text-sm font-medium transition-colors hover:text-accent"
                  >
                    {process.env.NEXT_PUBLIC_EMAIL}
                  </a>
                </div>

                <div>
                  <div className="font-mono text-xs text-placeholder">
                    Telegram
                  </div>
                  <a
                    href={process.env.NEXT_PUBLIC_TELEGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium transition-colors hover:text-accent"
                  >
                    {`@${process.env.NEXT_PUBLIC_TELEGRAM_URL?.split('/').slice(-1).join()}`}
                  </a>
                </div>

                <div>
                  <div className="font-mono text-xs text-placeholder">
                    Location
                  </div>
                  <p className="text-sm font-medium">{t("location")}</p>
                </div>
                <div>
                  <div className="font-mono text-xs text-placeholder">
                    Status
                  </div>
                  <div className="mt-1 inline-flex items-center gap-2 rounded-md border border-accent/30 bg-accent/10 px-3 py-1 font-mono text-xs text-accent">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                    {t("availability")}
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-muted p-6">
              <h3 className="font-mono text-xs text-muted-foreground">
                <span className="text-syntax-comment">{"// "}</span>
                Social
              </h3>
              <div className="mt-4 space-y-3">
                <a
                  href={SOCIAL_LINKS.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block font-mono text-sm text-muted-foreground transition-colors hover:text-accent"
                >
                  GitHub
                </a>
                <a
                  href={SOCIAL_LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block font-mono text-sm text-muted-foreground transition-colors hover:text-accent"
                >
                  LinkedIn
                </a>
                <a
                  href={SOCIAL_LINKS.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block font-mono text-sm text-muted-foreground transition-colors hover:text-accent"
                >
                  Telegram
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
