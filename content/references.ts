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
  quote?: {
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
export const referenceCases: ReferenceCase[] = [
  {
    slug: "media-norge",
    company: "Media-Norge AS",
    industry: "Salgsdashboard",
    title: "Et samlet salgsdashboard for Media-Norge AS.",
    summary: "Dashboardet samler sanntidsaktivitet, oppgaver, samtaler og aktive avtaler i én oversiktlig arbeidsflate.",
    dashboardImages: [
      {
        src: "/references/media-norge-dashboard.png",
        alt: "Dashboard utviklet for Media-Norge AS med salgsaktivitet, oppgaver, samtaler og aktive avtaler.",
      },
    ],
  },
];
