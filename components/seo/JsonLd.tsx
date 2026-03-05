interface JsonLdProps {
  data: Record<string, unknown>;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Dmitriy Kairgeldin",
    url: "https://kairgeldin.dev",
    jobTitle: "Frontend Engineer",
    worksFor: {
      "@type": "Organization",
      name: "Daribar",
    },
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "Astana IT University",
    },
    sameAs: [
      process.env.NEXT_PUBLIC_GITHUB_URL,
      process.env.NEXT_PUBLIC_LINKEDIN_URL,
      process.env.NEXT_PUBLIC_TELEGRAM_URL,
    ],
  };
}

export function blogPostJsonLd(post: {
  title: string;
  description: string;
  date: string;
  slug: string;
  locale: string;
  image?: string;
  tags?: string[];
  readingTime?: number;
}) {
  const siteUrl = "https://kairgeldin.dev";
  const postUrl = `${siteUrl}/${post.locale}/blog/${post.slug}`;
  const ogImage = post.image
    ? `${siteUrl}${post.image}`
    : `${siteUrl}/og-default.png`;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
    headline: post.title,
    description: post.description,
    image: ogImage,
    author: {
      "@type": "Person",
      name: "Dmitriy Kairgeldin",
      url: siteUrl,
    },
    publisher: {
      "@type": "Person",
      name: "Dmitriy Kairgeldin",
      url: siteUrl,
    },
    datePublished: post.date,
    dateModified: post.date,
    url: postUrl,
    inLanguage: post.locale,
    keywords: post.tags?.join(", "),
    timeRequired: post.readingTime ? `PT${post.readingTime}M` : undefined,
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Dmitriy Kairgeldin Portfolio",
    url: "https://kairgeldin.dev",
    author: {
      "@type": "Person",
      name: "Dmitriy Kairgeldin",
    },
  };
}
