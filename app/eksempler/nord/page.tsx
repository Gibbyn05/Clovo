import Link from "next/link";
import { ArrowLeft, ArrowUpRight, CalendarDays, Circle, Compass, MoreHorizontal, Plus, UserRound } from "lucide-react";
import styles from "./nord.module.css";
import { DashboardDemoInteractions } from "@/components/dashboard-demo-interactions";

export const metadata = { title: "Nord | Clovo dashboardeksempel", description: "Et redaksjonelt Clovo-dashboard for rådgivende salg og nøkkelkunder." };

export default function NordDashboard() {
  return <main className={styles.page}>
    <header><Link href="/" className={styles.brand}><i>C</i><span>Clovo</span></Link><nav><a className={styles.active} aria-pressed="true" data-demo-tab-group="nord-nav" data-demo-action="Oversikt er valgt. Eksempeldataene er skrivebeskyttet.">Oversikt</a><a aria-pressed="false" data-demo-tab-group="nord-nav" data-demo-action="Portefølje er valgt. Eksempeldataene er skrivebeskyttet.">Portefølje</a><a aria-pressed="false" data-demo-tab-group="nord-nav" data-demo-action="Relasjoner er valgt. Eksempeldataene er skrivebeskyttet.">Relasjoner</a><a aria-pressed="false" data-demo-tab-group="nord-nav" data-demo-action="Rapporter er valgt. Eksempeldataene er skrivebeskyttet.">Rapporter</a></nav><div><span>EKSEMPELDATA</span><i>IH</i></div></header>

    <section className={styles.masthead}><Link href="/" className={styles.back}><ArrowLeft /> Tilbake</Link><div><p>RÅDGIVENDE SALG · UKE 34</p><h1>Porteføljen,<br /><em>i riktig retning.</em></h1></div><aside><span>Forventet omsetning</span><strong>4 820 000</strong><small>NOK · Q3 2026</small><b><ArrowUpRight /> 12,6% over prognose</b></aside></section>

    <section className={styles.storyGrid}>
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
    </section>

    <DashboardDemoInteractions theme="nord" />

    <footer><span><Compass /> Porteføljevisning</span><p>Designretning: Editorial / nøkkelkunder / rådgivende salg</p><span><UserRound /> Ingrid H.</span></footer>
  </main>;
}
