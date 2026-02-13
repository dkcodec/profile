export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  author: string;
  readingTime: number;
  published: boolean;
  locale: string;
  image?: string;
}

export interface BlogPostWithContent extends BlogPost {
  content: string;
}
