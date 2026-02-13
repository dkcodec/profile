import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: "https://kairgeldin.dev/sitemap.xml",
    host: "https://kairgeldin.dev",
  };
}
