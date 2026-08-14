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

function OverviewView() {
  return <><section className={styles.metrics}><article><span>Ny MRR</span><strong>184 500 kr</strong><small>+18,4% mot forrige måned</small></article><article><span>Åpen pipeline</span><strong>1,42 mill.</strong><small>3,2x mål for perioden</small></article><article><span>Konvertering</span><strong>31,8%</strong><small>+4,1 prosentpoeng</small></article><article className={styles.goal}><span>Kvartalsmål</span><strong>72%</strong><div><i /></div><small>504 000 av 700 000 kr</small></article></section><section className={styles.mainGrid}><article className={styles.revenue}><div className={styles.cardTitle}><div><span>Omsetningsutvikling</span><small>Faktisk og prognose</small></div><b>+24,7% <ArrowUpRight /></b></div><div className={styles.chart}><div className={styles.chartLabels}><span>240k</span><span>160k</span><span>80k</span><span>0</span></div><svg viewBox="0 0 700 220" preserveAspectRatio="none" aria-label="Stigende omsetningsgraf"><defs><linearGradient id="growthFill" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#5b5df0" stopOpacity=".28"/><stop offset="1" stopColor="#5b5df0" stopOpacity="0"/></linearGradient></defs><path className={styles.area} d="M0 185 C80 168 105 178 155 137 S250 142 305 104 S410 92 465 72 S560 67 700 24 L700 220 L0 220Z"/><path className={styles.line} d="M0 185 C80 168 105 178 155 137 S250 142 305 104 S410 92 465 72 S560 67 700 24"/></svg><div className={styles.months}><span>Mar</span><span>Apr</span><span>Mai</span><span>Jun</span><span>Jul</span><span>Aug</span></div></div></article><article className={styles.funnel}><div className={styles.cardTitle}><div><span>Konvertering</span><small>Siste 30 dager</small></div><button aria-label="Flere valg" data-demo-action="Flere rapportvalg er tilgjengelige, men låst i eksempelvisningen.">•••</button></div>{[["Nye leads",128,"100%"],["Kvalifisert",84,"66%"],["Demo",51,"40%"],["Vunnet",23,"18%"]].map((x,i)=><div className={styles.funnelRow} key={String(x[0])}><span>{x[0]}</span><b>{x[1]}</b><div><i style={{width:x[2]}} data-step={i}/></div><small>{x[2]}</small></div>)}</article><Deals /></section></>;
}

function Deals() { return <article className={styles.deals}><div className={styles.cardTitle}><div><span>Avtaler i bevegelse</span><small>Oppdatert akkurat nå</small></div><a data-demo-action="Alle avtaler er valgt. Dette er en skrivebeskyttet forhåndsvisning.">Se alle <ArrowUpRight /></a></div><div className={styles.dealHead}><span>Kunde</span><span>Steg</span><span>Verdi</span><span>Eier</span></div>{deals.map((deal,i)=><div className={styles.deal} key={deal[0]}><span><i>{deal[0][0]}</i><b>{deal[0]}</b></span><em data-stage={i}>{deal[1]}</em><strong>{deal[2]} kr</strong><small>{deal[3]}</small></div>)}</article> }

function TeamView() {
  const sellers = [["Mina N.","Salgssjef","112%","18","Pålogget"],["Sara L.","Senior selger","96%","14","I møte"],["Jon E.","Selger","84%","11","Pålogget"],["Amalie K.","Selger","79%","9","Fokus"]];
  return <section className={styles.teamDashboard}><div className={styles.teamSummary}><article><span>Tilstede nå</span><strong>10 / 12</strong><div className={styles.avatarStack}>{["MN","SL","JE","AK","+6"].map(x=><i key={x}>{x}</i>)}</div></article><article><span>Ukens aktivitet</span><strong>286</strong><small>samtaler og møter</small></article><article><span>Teamets mål</span><strong>84%</strong><div className={styles.teamProgress}><i /></div></article></div><article className={styles.performance}><div className={styles.cardTitle}><div><span>Selgerprestasjon</span><small>Mål, aktivitet og tilgjengelighet</small></div><button data-demo-action="Skrivebeskyttet: teamfilteret kan ikke endres i demoen.">Alle selgere <ChevronDown /></button></div><div className={styles.sellerHead}><span>Selger</span><span>Mål</span><span>Møter</span><span>Status</span></div>{sellers.map((s,i)=><div className={styles.sellerRow} key={s[0]}><span><i>{s[0][0]}</i><b>{s[0]}</b><small>{s[1]}</small></span><strong>{s[2]}<i style={{width:s[2]}} /></strong><b>{s[3]}</b><em data-online={i}>{s[4]}</em></div>)}</article><article className={styles.capacity}><div className={styles.cardTitle}><div><span>Kapasitet denne uken</span><small>Booket tid per dag</small></div></div><div className={styles.capacityBars}>{[62,78,54,91,48].map((x,i)=><div key={i}><i style={{height:`${x}%`}}/><span>{["Man","Tir","Ons","Tor","Fre"][i]}</span></div>)}</div></article><article className={styles.teamNotes}><div className={styles.cardTitle}><div><span>Lederens fokus</span><small>Automatiske signaler</small></div></div><p><b>3 selgere</b> ligger foran månedsmålet.</p><p><b>Jon</b> har høyest møtegrad denne uken.</p><p><b>Fredag</b> har 42% ledig kapasitet.</p></article></section>;
}

function RevenueView() {
  return <section className={styles.revenueDashboard}><div className={styles.revenueHero}><div><span>Gjentakende inntekt</span><strong>684 500 kr</strong><small>+21,2% siden juli</small></div><div className={styles.revenueColumns}>{[42,56,51,69,77,92].map((x,i)=><i key={i} style={{height:`${x}%`}}><span>{["Mar","Apr","Mai","Jun","Jul","Aug"][i]}</span></i>)}</div></div><article className={styles.revenueSplit}><div className={styles.cardTitle}><div><span>Inntektsmiks</span><small>Fordelt på produkt</small></div></div>{[["Plattform","58%","#5b5df0"],["Tilpasning","27%","#8b8cff"],["Rådgivning","15%","#d7d7ff"]].map(x=><div className={styles.mixRow} key={x[0]}><span>{x[0]}</span><div><i style={{width:x[1],background:x[2]}} /></div><b>{x[1]}</b></div>)}</article><article className={styles.forecastCard}><span>Prognose neste 90 dager</span><strong>2,74 mill.</strong><small>94% vektet sannsynlighet</small><div><i /></div></article><article className={styles.invoiceList}><div className={styles.cardTitle}><div><span>Siste innbetalinger</span><small>Oppdatert i dag</small></div></div>{[["Orbit Labs","126 000 kr","Betalt"],["Lumen","94 000 kr","Betalt"],["Havgløtt","48 000 kr","Forfaller 21. aug"]].map(x=><p key={x[0]}><b>{x[0]}</b><span>{x[1]}</span><em>{x[2]}</em></p>)}</article></section>;
}

function InsightsView() {
  return <section className={styles.insightsDashboard}><article className={styles.signalHero}><span>VIKTIGSTE SIGNAL</span><h2>Rask oppfølging etter demo løfter vinnraten med <b>11 prosentpoeng.</b></h2><p>Basert på 84 kvalifiserte avtaler de siste 30 dagene.</p></article><article className={styles.driverList}><div className={styles.cardTitle}><div><span>Hva driver salget?</span><small>Effekt på vunnet avtale</small></div></div>{[["Oppfølging innen 2 timer","+11 pp","positive"],["Mer enn 3 interessenter","+8 pp","positive"],["Ingen avtalt neste aktivitet","−14 pp","negative"]].map(x=><div key={x[0]}><span>{x[0]}</span><b data-impact={x[2]}>{x[1]}</b></div>)}</article><article className={styles.bottleneck}><span>FLASKEHALS</span><strong>Forslag → beslutning</strong><p>7 avtaler har stått stille i mer enn 10 dager.</p><button data-demo-action="Skrivebeskyttet: avtaleutvalget åpnes ikke i demoen.">Se berørte avtaler</button></article><article className={styles.cohort}><div className={styles.cardTitle}><div><span>Konvertering per kilde</span><small>Siste 30 dager</small></div></div>{[["Henvisning",47],["Inbound",36],["Partner",29],["Outbound",18]].map(x=><div key={x[0]}><span>{x[0]}</span><div><i style={{width:`${Number(x[1])*2}%`}} /></div><b>{x[1]}%</b></div>)}</article></section>;
}

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

      {viewKey === "oversikt" ? <OverviewView /> : viewKey === "team" ? <TeamView /> : viewKey === "omsetning" ? <RevenueView /> : <InsightsView />}
      <DashboardDemoInteractions theme="growth" />
    </section>
  </main>;
}
