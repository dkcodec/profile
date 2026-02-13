import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getPostSlugs } from "@/lib/mdx";
import { PROJECTS } from "@/lib/constants";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/about", "/experience", "/projects", "/blog", "/contact"];

  const staticPages = routing.locales.flatMap((locale) =>
    pages.map((page) => ({
      url: `${BASE_URL}/${locale}${page}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: page === "" ? 1 : 0.8,
    })),
  );

  const blogPages = routing.locales.flatMap((locale) =>
    getPostSlugs(locale).map((slug) => ({
      url: `${BASE_URL}/${locale}/blog/${slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
  );

  const projectPages = routing.locales.flatMap((locale) =>
    PROJECTS.map((project) => ({
      url: `${BASE_URL}/${locale}/projects/${project.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  );

  return [...staticPages, ...blogPages, ...projectPages];
}
