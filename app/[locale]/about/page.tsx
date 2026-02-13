import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { BioSection } from "@/components/sections/about/BioSection";
import { TechStackSection } from "@/components/sections/about/TechStackSection";
import { ExperienceSection } from "@/components/sections/about/ExperienceSection";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });

  return {
    title: t("title"),
    description: t("meta_description"),
  };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <BioSection />
      <TechStackSection />
      <ExperienceSection />
    </>
  );
}
