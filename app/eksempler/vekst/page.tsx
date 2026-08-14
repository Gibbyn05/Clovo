import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Bell, ChevronDown, CircleDollarSign, LayoutGrid, Search, Settings2, Sparkles, Users } from "lucide-react";
import styles from "./vekst.module.css";
import { DashboardDemoInteractions } from "@/components/dashboard-demo-interactions";

export const metadata = { title: "Vekst | Clovo dashboardeksempel", description: "Et lyst Clovo-dashboard for SaaS-salg og vekstteam." };

const deals = [
  ["Havgløtt", "Discovery", "48 000", "Mina"], ["Kraftverk", "Demo", "72 000", "Jon"],
  ["Orbit Labs", "Forslag", "126 000", "Sara"], ["Lumen", "Forhandling", "94 000", "Mina"],
];

export default function GrowthDashboard() {
  return <main className={styles.page}>
    <aside className={styles.sidebar}>
      <Link href="/" className={styles.mark}>C</Link>
      <nav aria-label="Dashboardmeny"><a className={styles.active} aria-label="Oversikt" aria-pressed="true" data-demo-tab-group="growth-nav" data-demo-action="Oversikt er valgt. Eksempeldataene er skrivebeskyttet."><LayoutGrid /></a><a aria-label="Team" aria-pressed="false" data-demo-tab-group="growth-nav" data-demo-action="Teamvisningen er valgt. Eksempeldataene er skrivebeskyttet."><Users /></a><a aria-label="Omsetning" aria-pressed="false" data-demo-tab-group="growth-nav" data-demo-action="Omsetningsvisningen er valgt. Eksempeldataene er skrivebeskyttet."><CircleDollarSign /></a><a aria-label="Innsikt" aria-pressed="false" data-demo-tab-group="growth-nav" data-demo-action="Innsiktsvisningen er valgt. Eksempeldataene er skrivebeskyttet."><Sparkles /></a></nav>
      <a className={styles.settings} aria-label="Innstillinger" data-demo-action="Skrivebeskyttet: innstillinger kan ikke endres i eksempelvisningen."><Settings2 /></a>
    </aside>

    <section className={styles.workspace}>
      <header><div><Link href="/" className={styles.back}><ArrowLeft /> Clovo</Link><span>Eksempeldata</span></div><button className={styles.search} data-demo-action="Søket er tilgjengelig i kundeløsningen. Eksempeldataene kan ikke endres."><Search /><span>Søk i kunder og avtaler</span><kbd>⌘ K</kbd></button><button aria-label="Varsler" data-demo-action="Ingen nye varsler i eksempelvisningen."><Bell /></button><i>MN</i></header>

      <div className={styles.intro}><div><p>MANDAG 17. AUGUST</p><h1>God morgen, Mina.</h1><span>Her er det viktigste for vekstteamet denne uken.</span></div><button data-demo-action="Periodevelgeren er åpnet i skrivebeskyttet demomodus.">Uke 34 <ChevronDown /></button></div>

      <section className={styles.metrics}>
        <article><span>Ny MRR</span><strong>184 500 kr</strong><small><b>+18,4%</b> mot forrige måned</small></article>
        <article><span>Åpen pipeline</span><strong>1,42 mill.</strong><small><b>3,2x</b> mål for perioden</small></article>
        <article><span>Konvertering</span><strong>31,8%</strong><small><b>+4,1</b> prosentpoeng</small></article>
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
