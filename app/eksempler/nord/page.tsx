import Link from "next/link";
import { ArrowLeft, ArrowUpRight, CalendarDays, Circle, Compass, MoreHorizontal, Plus, UserRound } from "lucide-react";
import styles from "./nord.module.css";
import { DashboardDemoInteractions } from "@/components/dashboard-demo-interactions";

export const metadata = { title: "Nord | Clovo dashboardeksempel", description: "Et redaksjonelt Clovo-dashboard for rådgivende salg og nøkkelkunder." };

const views = {
  oversikt: { eyebrow: "RÅDGIVENDE SALG · UKE 34", title: "Porteføljen,", emphasis: "i riktig retning.", value: "4 820 000", valueLabel: "Forventet omsetning" },
  portefolje: { eyebrow: "PORTEFØLJE · 18 NØKKELKUNDER", title: "Verdien ligger,", emphasis: "i relasjonene.", value: "18", valueLabel: "Aktive nøkkelkunder" },
  relasjoner: { eyebrow: "RELASJONER · SISTE 30 DAGER", title: "Dialogen er,", emphasis: "det viktigste signalet.", value: "84 / 100", valueLabel: "Relasjonshelse" },
  rapporter: { eyebrow: "RAPPORTER · Q3 2026", title: "Tallene viser,", emphasis: "hvor vi bør gå.", value: "12,6%", valueLabel: "Over prognose" },
} as const;

function NordSubView({ view }: { view: "portefolje" | "relasjoner" | "rapporter" }) {
  if (view === "portefolje") return <section className={styles.portfolioView}><aside><span>PORTEFØLJEFORDELING</span><div className={styles.portfolioDonut}><b>4,82m</b><small>total verdi</small></div><p><i className={styles.good}/>Strategiske 56%</p><p><i className={styles.watch}/>Vekst 29%</p><p><i className={styles.risk}/>Oppfølging 15%</p></aside><article><div className={styles.sectionTop}><span>NØKKELKUNDER</span><button data-demo-action="Porteføljefilteret er låst i eksempelvisningen.">Verdi, høyest først</button></div>{[["Fjell & Fjord","Strategisk","1,20m","92","Strategimøte"],["Norsk Form","Vekst","860k","86","Styrepresentasjon"],["Edda Gruppen","Strategisk","740k","81","Kontraktsrunde"],["Polar Verk","Oppfølging","520k","64","Ny kontakt"]].map((x,i)=><div className={styles.portfolioRow} key={x[0]}><span>{String(i+1).padStart(2,"0")}</span><b>{x[0]}<small>{x[1]}</small></b><strong>{x[2]}</strong><em>{x[3]} / 100</em><p>{x[4]}</p></div>)}</article></section>;
  if (view === "relasjoner") return <section className={styles.relationView}><article className={styles.relationMap}><span>RELASJONSKART · FJELL & FJORD</span><div className={styles.network}><i className={styles.nodeMain}>FF</i><i className={styles.nodeA}>AL</i><i className={styles.nodeB}>KH</i><i className={styles.nodeC}>MJ</i><i className={styles.nodeD}>IN</i><svg viewBox="0 0 500 260"><path d="M250 130L95 65M250 130L405 55M250 130L430 205M250 130L100 215"/></svg></div><p>Fire aktive beslutningstakere. Økonomidirektøren har ikke vært i dialog på 21 dager.</p></article><article className={styles.touchpoints}><div className={styles.sectionTop}><span>SISTE KONTAKTPUNKTER</span><CalendarDays /></div>{[["I dag","Strategimøte bekreftet","Anna Lund"],["12. aug","Forslag delt","Kristian Holm"],["8. aug","Behovssamtale","Maja Jørgensen"],["29. jul","Introduksjon","Ida Nyborg"]].map(x=><div key={x[1]}><time>{x[0]}</time><p><b>{x[1]}</b><small>{x[2]}</small></p></div>)}</article><article className={styles.relationRisk}><span>RELASJONSRISIKO</span><strong>2</strong><p>kontoer uten planlagt kontakt</p><button data-demo-action="Skrivebeskyttet: oppfølgingsplaner kan ikke opprettes i demoen.">Vis anbefalt oppfølging</button></article></section>;
  return <section className={styles.reportView}><article className={styles.reportLead}><span>KVARTALSPROGNOSE</span><strong>4,82m</strong><small>+12,6% over plan</small><div className={styles.reportLine}><svg viewBox="0 0 700 180" preserveAspectRatio="none"><path d="M0 155 C90 140 115 120 170 130 S270 90 330 102 S440 62 505 71 S610 37 700 18"/></svg></div></article><article className={styles.reportMetrics}>{[["Vektet pipeline","3,14m"],["Vinnrate","38%"],["Snittverdi","412k"],["Salgssyklus","54 dager"]].map(x=><p key={x[0]}><span>{x[0]}</span><strong>{x[1]}</strong></p>)}</article><article className={styles.reportSegments}><div className={styles.sectionTop}><span>RESULTAT PER SEGMENT</span><button data-demo-action="Rapportperioden er låst i eksempelvisningen.">Q3 2026</button></div>{[["Strategiske kunder",78,"2,68m"],["Vekstkunder",54,"1,36m"],["Nye relasjoner",31,"780k"]].map(x=><div key={x[0]}><span>{x[0]}</span><div><i style={{width:`${x[1]}%`}}/></div><b>{x[2]}</b></div>)}</article></section>;
}

export default function NordDashboard({ searchParams }: { searchParams?: { view?: string } }) {
  const viewKey = searchParams?.view && searchParams.view in views ? searchParams.view as keyof typeof views : "oversikt";
  const view = views[viewKey];
  return <main className={styles.page}>
    <header><Link href="/" className={styles.brand}><i>C</i><span>Clovo</span></Link><nav><Link href="/eksempler/nord?view=oversikt" aria-current={viewKey === "oversikt" ? "page" : undefined}>Oversikt</Link><Link href="/eksempler/nord?view=portefolje" aria-current={viewKey === "portefolje" ? "page" : undefined}>Portefølje</Link><Link href="/eksempler/nord?view=relasjoner" aria-current={viewKey === "relasjoner" ? "page" : undefined}>Relasjoner</Link><Link href="/eksempler/nord?view=rapporter" aria-current={viewKey === "rapporter" ? "page" : undefined}>Rapporter</Link></nav><div><span>EKSEMPELDATA</span><i>IH</i></div></header>

    <section className={styles.masthead}><Link href="/" className={styles.back}><ArrowLeft /> Tilbake</Link><div><p>{view.eyebrow}</p><h1>{view.title}<br /><em>{view.emphasis}</em></h1></div><aside><span>{view.valueLabel}</span><strong>{view.value}</strong><small>EKSEMPELDATA · Q3 2026</small><b><ArrowUpRight /> Oppdatert nå</b></aside></section>

    {viewKey === "oversikt" ? <section className={styles.storyGrid}>
      <article className={styles.focus}>
        <div className={styles.number}>01</div><div className={styles.label}>UKENS FOKUS</div>
        <h2>Tre relasjoner kan flytte kvartalet.</h2>
        <p>Nøkkelkundene under har høy verdi, aktiv dialog og et tydelig neste steg denne uken.</p>
        <div className={styles.accounts}>
          {[['Fjell & Fjord','Strategimøte','1,20m','TIR 10:00'],['Norsk Form','Forslag til styret','860k','ONS 13:30'],['Edda Gruppen','Kontraktsrunde','740k','FRE 09:00']].map((a,i)=><div key={a[0]}><span>{String(i+1).padStart(2,'0')}</span><b>{a[0]}</b><em>{a[1]}</em><strong>{a[2]}</strong><small>{a[3]}</small></div>)}
        </div>
      </article>

      <article className={styles.relationships}><div className={styles.sectionTop}><span>RELASJONSHELSE</span><button aria-label="Flere relasjonsvalg" data-demo-action="Flere relasjonsfiltre er tilgjengelige, men låst i eksempelvisningen."><MoreHorizontal /></button></div><div className={styles.ring}><div><strong>84</strong><span>av 100</span></div></div><p>Porteføljen har stabil kontaktfrekvens. To kontoer mangler planlagt oppfølging.</p><div className={styles.legend}><span><i className={styles.good}/>Sterk 12</span><span><i className={styles.watch}/>Følg med 4</span><span><i className={styles.risk}/>Risiko 2</span></div></article>

      <article className={styles.forecast}><div className={styles.sectionTop}><span>PROGNOSE · 6 MÅNEDER</span><button data-demo-action="Prognosefilteret er åpnet i skrivebeskyttet demomodus.">Netto verdi</button></div><div className={styles.bars}>{[42,58,49,76,68,91].map((h,i)=><div key={i}><i style={{height:`${h}%`}} className={i===5?styles.current:""}/><span>{['Mar','Apr','Mai','Jun','Jul','Aug'][i]}</span></div>)}</div><div className={styles.forecastFooter}><p><span>Bekreftet</span><strong>3,14m</strong></p><p><span>Vektet</span><strong>1,68m</strong></p><p><span>Totalt</span><strong>4,82m</strong></p></div></article>

      <article className={styles.agenda}><div className={styles.sectionTop}><span>NESTE 48 TIMER</span><CalendarDays /></div>{[['09:00','Intern status','Team Nord'],['10:30','Behovsmøte','Fjell & Fjord'],['13:00','Tilbudsgjennomgang','Norsk Form'],['15:15','Oppfølging','Edda Gruppen']].map((x,i)=><div className={styles.event} key={x[0]}><time>{x[0]}</time><span><b>{x[1]}</b><small>{x[2]}</small></span><i className={i===1?styles.eventActive:""}><Circle /></i></div>)}<button className={styles.add} data-demo-action="Skrivebeskyttet: aktiviteten blir ikke lagt til i eksempelvisningen."><Plus /> Legg til aktivitet</button></article>
    </section> : <NordSubView view={viewKey} />}

    <DashboardDemoInteractions theme="nord" />

    <footer><span><Compass /> Porteføljevisning</span><p>Designretning: Editorial / nøkkelkunder / rådgivende salg</p><span><UserRound /> Ingrid H.</span></footer>
  </main>;
}
