import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Bell, ChevronDown, CircleDollarSign, LayoutGrid, Search, Settings2, Sparkles, Users } from "lucide-react";
import styles from "./vekst.module.css";
import { DashboardDemoInteractions } from "@/components/dashboard-demo-interactions";

export const metadata = { title: "Vekst | Clovo dashboardeksempel", description: "Et lyst Clovo-dashboard for SaaS-salg og vekstteam." };

const deals = [
  ["Havgløtt", "Discovery", "48 000", "Mina"], ["Kraftverk", "Demo", "72 000", "Jon"],
  ["Orbit Labs", "Forslag", "126 000", "Sara"], ["Lumen", "Forhandling", "94 000", "Mina"],
];

const views = {
  oversikt: { eyebrow: "MANDAG 17. AUGUST", title: "God morgen, Mina.", subtitle: "Her er det viktigste for vekstteamet denne uken.", metrics: [["Ny MRR","184 500 kr","+18,4% mot forrige måned"],["Åpen pipeline","1,42 mill.","3,2x mål for perioden"],["Konvertering","31,8%","+4,1 prosentpoeng"]] },
  team: { eyebrow: "TEAM · 12 SELGERE", title: "Teamet leverer foran plan.", subtitle: "Se kapasitet, aktivitet og måloppnåelse per selger.", metrics: [["Aktive selgere","12","10 tilgjengelige nå"],["Bookede møter","38","+7 denne uken"],["Måloppnåelse","84%","6 over individuelt mål"]] },
  omsetning: { eyebrow: "OMSETNING · AUGUST", title: "Veksten holder farten.", subtitle: "Følg inntekter, prognoser og verdien i salgsarbeidet.", metrics: [["Fakturert","684 500 kr","+21,2% mot juli"],["Prognose","912 000 kr","94% sannsynlighet"],["Snittavtale","58 400 kr","+8 200 kr"]] },
  innsikt: { eyebrow: "INNSIKT · SISTE 30 DAGER", title: "Tre signaler skiller seg ut.", subtitle: "Demoer konverterer bedre, mens oppfølging bør gå raskere.", metrics: [["Responstid","1t 42m","18 min raskere"],["Vinnrate","31,8%","+4,1 prosentpoeng"],["Salgsfart","19 dager","3 dager raskere"]] },
} as const;

export default function GrowthDashboard({ searchParams }: { searchParams?: { view?: string } }) {
  const viewKey = searchParams?.view && searchParams.view in views ? searchParams.view as keyof typeof views : "oversikt";
  const view = views[viewKey];
  return <main className={styles.page}>
    <aside className={styles.sidebar}>
      <Link href="/" className={styles.mark}>C</Link>
      <nav aria-label="Dashboardmeny"><Link href="/eksempler/vekst?view=oversikt" aria-label="Oversikt" aria-current={viewKey === "oversikt" ? "page" : undefined}><LayoutGrid /></Link><Link href="/eksempler/vekst?view=team" aria-label="Team" aria-current={viewKey === "team" ? "page" : undefined}><Users /></Link><Link href="/eksempler/vekst?view=omsetning" aria-label="Omsetning" aria-current={viewKey === "omsetning" ? "page" : undefined}><CircleDollarSign /></Link><Link href="/eksempler/vekst?view=innsikt" aria-label="Innsikt" aria-current={viewKey === "innsikt" ? "page" : undefined}><Sparkles /></Link></nav>
      <a className={styles.settings} aria-label="Innstillinger" data-demo-action="Skrivebeskyttet: innstillinger kan ikke endres i eksempelvisningen."><Settings2 /></a>
    </aside>

    <section className={styles.workspace}>
      <header><div><Link href="/" className={styles.back}><ArrowLeft /> Clovo</Link><span>Eksempeldata</span></div><button className={styles.search} data-demo-action="Søket er tilgjengelig i kundeløsningen. Eksempeldataene kan ikke endres."><Search /><span>Søk i kunder og avtaler</span><kbd>⌘ K</kbd></button><button aria-label="Varsler" data-demo-action="Ingen nye varsler i eksempelvisningen."><Bell /></button><i>MN</i></header>

      <div className={styles.intro}><div><p>{view.eyebrow}</p><h1>{view.title}</h1><span>{view.subtitle}</span></div><button data-demo-action="Periodevelgeren er åpnet i skrivebeskyttet demomodus.">Uke 34 <ChevronDown /></button></div>

      <section className={styles.metrics}>
        {view.metrics.map(metric => <article key={metric[0]}><span>{metric[0]}</span><strong>{metric[1]}</strong><small>{metric[2]}</small></article>)}
        <article className={styles.goal}><span>Kvartalsmål</span><strong>72%</strong><div><i /></div><small>504 000 av 700 000 kr</small></article>
      </section>

      <section className={styles.mainGrid}>
        <article className={styles.revenue}><div className={styles.cardTitle}><div><span>Omsetningsutvikling</span><small>Faktisk og prognose</small></div><b>+24,7% <ArrowUpRight /></b></div><div className={styles.chart}><div className={styles.chartLabels}><span>240k</span><span>160k</span><span>80k</span><span>0</span></div><svg viewBox="0 0 700 220" preserveAspectRatio="none" aria-label="Stigende omsetningsgraf"><defs><linearGradient id="growthFill" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#5b5df0" stopOpacity=".28"/><stop offset="1" stopColor="#5b5df0" stopOpacity="0"/></linearGradient></defs><path className={styles.area} d="M0 185 C80 168 105 178 155 137 S250 142 305 104 S410 92 465 72 S560 67 700 24 L700 220 L0 220Z"/><path className={styles.line} d="M0 185 C80 168 105 178 155 137 S250 142 305 104 S410 92 465 72 S560 67 700 24"/></svg><div className={styles.months}><span>Mar</span><span>Apr</span><span>Mai</span><span>Jun</span><span>Jul</span><span>Aug</span></div></div></article>

        <article className={styles.funnel}><div className={styles.cardTitle}><div><span>Konvertering</span><small>Siste 30 dager</small></div><button aria-label="Flere valg" data-demo-action="Flere rapportvalg er tilgjengelige, men låst i eksempelvisningen.">•••</button></div>{[["Nye leads",128,"100%"],["Kvalifisert",84,"66%"],["Demo",51,"40%"],["Vunnet",23,"18%"]].map((x,i)=><div className={styles.funnelRow} key={String(x[0])}><span>{x[0]}</span><b>{x[1]}</b><div><i style={{width:x[2]}} data-step={i}/></div><small>{x[2]}</small></div>)}</article>

        <article className={styles.deals}><div className={styles.cardTitle}><div><span>Avtaler i bevegelse</span><small>Oppdatert akkurat nå</small></div><a data-demo-action="Alle avtaler er valgt. Dette er en skrivebeskyttet forhåndsvisning.">Se alle <ArrowUpRight /></a></div><div className={styles.dealHead}><span>Kunde</span><span>Steg</span><span>Verdi</span><span>Eier</span></div>{deals.map((deal,i)=><div className={styles.deal} key={deal[0]}><span><i>{deal[0][0]}</i><b>{deal[0]}</b></span><em data-stage={i}>{deal[1]}</em><strong>{deal[2]} kr</strong><small>{deal[3]}</small></div>)}</article>
      </section>
      <DashboardDemoInteractions theme="growth" />
    </section>
  </main>;
}
