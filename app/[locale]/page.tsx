import { setRequestLocale } from "next-intl/server";
import { HeroSection } from "@/components/sections/home/HeroSection";
import { WhoAmISection } from "@/components/sections/home/WhoAmISection";
import { TechStackSection } from "@/components/sections/home/TechStackSection";
import { ExperienceLogSection } from "@/components/sections/home/ExperienceLogSection";
import { CodingStatsSection } from "@/components/sections/home/CodingStatsSection";
import { FeaturedWorkSection } from "@/components/sections/home/FeaturedWorkSection";
import { LatestPostsSection } from "@/components/sections/home/LatestPostsSection";
import { JsonLd, personJsonLd, websiteJsonLd } from "@/components/seo/JsonLd";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <JsonLd data={personJsonLd()} />
      <JsonLd data={websiteJsonLd()} />
      <HeroSection />
      <WhoAmISection />
      <div className="content-auto">
        <TechStackSection />
      </div>
      <div className="content-auto">
        <ExperienceLogSection />
      </div>
      <div className="content-auto">
        <CodingStatsSection />
      </div>
      <div className="content-auto">
        <FeaturedWorkSection />
      </div>
      <div className="content-auto">
        <LatestPostsSection />
      </div>
    </>
  );
}
