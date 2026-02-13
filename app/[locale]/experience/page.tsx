import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { ExperienceSection } from "@/components/sections/about/ExperienceSection";
import { EducationSection } from "@/components/sections/about/EducationSection";
import { AchievementsSection } from "@/components/sections/about/AchievementsSection";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "experience_page" });

  return {
    title: t("title"),
    description: t("meta_description"),
  };
}

export default async function ExperiencePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <ExperienceSection />
      <EducationSection />
      <AchievementsSection />
    </>
  );
}
