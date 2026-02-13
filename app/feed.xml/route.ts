import { getAllPosts } from "@/lib/mdx";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function GET() {
  const posts = getAllPosts("en");

  const items = posts
    .map(
      (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${post.description}]]></description>
      <link>${BASE_URL}/en/blog/${post.slug}</link>
      <guid isPermaLink="true">${BASE_URL}/en/blog/${post.slug}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <author>${process.env.NEXT_PUBLIC_EMAIL} (Dmitriy Kairgeldin)</author>
    </item>`,
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Dmitriy Kairgeldin Blog</title>
    <description>Thoughts on frontend development, performance, and the modern web</description>
    <link>${BASE_URL}</link>
    <atom:link href="${BASE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
