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
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    author: {
      "@type": "Person",
      name: "Dmitriy Kairgeldin",
    },
    datePublished: post.date,
    url: `https://kairgeldin.dev/${post.locale}/blog/${post.slug}`,
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
