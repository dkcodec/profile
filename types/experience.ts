export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  highlights: string[];
  technologies: string[];
  metrics?: {
    label: string;
    before?: string;
    after: string;
    unit?: string;
  }[];
}
