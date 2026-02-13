export interface Project {
  slug: string;
  title: string;
  tags: string[];
  image: string;
  githubUrl?: string;
  featured: boolean;
  order: number;
  link?: string;
}
