export type ReferenceCase = {
  slug: string;
  company: string;
  industry: string;
  title: string;
  summary: string;
  dashboardImages: Array<{
    src: string;
    alt: string;
  }>;
  quote: {
    text: string;
    name: string;
    role: string;
  };
  results?: Array<{
    value: string;
    label: string;
  }>;
};

/*
 * Legg kun inn publiserbare kundecaser her. Bildene legges i /public/references.
 * Siden viser en tomtilstand frem til den første ekte referansen er klar.
 */
export const referenceCases: ReferenceCase[] = [];
