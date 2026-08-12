import Link from "next/link";
import styles from "./landing.module.css";
import { AnimatedAreaChart } from "@/components/animated-area-chart";

const LOGIN_URL = "/login";
const DEMO = "mailto:post@reachr.no?subject=Jeg ønsker en demo av Clovo";

const Icon = ({ name }: { name: string }) => {
  const paths: Record<string, React.ReactNode> = {
    chart: <><path d="M4 19V9m6 10V5m6 14v-7m4 7H2" /></>,
    bulb: <><path d="M9 18h6M10 22h4M8.5 14.5C7.6 13.6 7 12 7 10.5a5 5 0 0 1 10 0c0 1.5-.6 3.1-1.5 4-.8.8-1.2 1.5-1.3 2.5h-4.4c-.1-1-.5-1.7-1.3-2.5Z" /></>,
    users: <><circle cx="9" cy="8" r="3"/><path d="M3 20v-1a5 5 0 0 1 10 0v1M16 4.5a3 3 0 0 1 0 5.8M18 14a5 5 0 0 1 3 4.6V20"/></>,
    briefcase: <><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V4h6v3M3 12h18"/></>,
    check: <path d="m5 12 4 4L19 6"/>,
    arrow: <path d="M5 12h13m-4-4 4 4-4 4"/>,
  };
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
};

const Button = ({ children = "Bestill demo", pale = false }: { children?: React.ReactNode; pale?: boolean }) => (
  <a href={DEMO} className={pale ? styles.paleButton : styles.button}>{children}<Icon name="arrow" /></a>
);

const MiniTable = ({ compact = false }: { compact?: boolean }) => (
  <div className={`${styles.miniTable} ${compact ? styles.compact : ""}`}>
    <div className={styles.tableHead}><b>Pipeline</b><span>Se alle</span></div>
    {[['Nordic Labs','Tilbud','84 000'],['Fjord Digital','Møte','42 500'],['Aker Studio','Vunnet','128 000'],['Oslo Tech','Lead','31 200']].slice(0, compact ? 3 : 4).map((r,i)=><div className={styles.tableRow} key={r[0]}><i className={styles.dot}>{r[0][0]}</i><b>{r[0]}</b><em className={i===2?styles.won:""}>{r[1]}</em><span>{r[2]}</span></div>)}
  </div>
);

const Dashboard = () => (
  <div className={styles.dashboard}>
    <aside><div className={styles.dashLogo}>C</div>{['Oversikt','Pipeline','Kunder','Kontrakter','Analyse'].map((x,i)=><span className={i===0?styles.active:""} key={x}>{x}</span>)}</aside>
    <div className={styles.dashMain}><p>Hei, teamet 👋</p><div className={styles.stats}><div><span>Pipeline</span><b>925 400 kr</b></div><div><span>Vunnet i år</span><b>18 avtaler</b></div></div><div className={styles.dashBody}><div className={styles.bars}>{[34,58,46,73,52,88,66].map((h,i)=><i key={i} style={{height:`${h}%`}} />)}</div><div className={styles.ring}>72<small>%</small></div></div><MiniTable compact /></div>
  </div>
);

const features = [
  ['chart','Full oversikt','Se pipeline, aktivitet og resultater samlet i sanntid.'],
  ['bulb','Bygget for dere','Dashboard, sider og arbeidsflyt tilpasses salgsprosessen.'],
  ['users','Samarbeid enklere','Selgere og ledere jobber i samme system med riktige roller.'],
  ['briefcase','Alt organisert','Kunder, kontrakter, oppgaver og filer er samlet på ett sted.'],
];

const plans = [
  {name:'Team',price:'Tilpasset',copy:'For mindre salgsteam som vil ha struktur fra start.',points:['Custom dashboard','Pipeline og salgssteg','Selger- og lederroller','Eget isolert område']},
  {name:'Vekst',price:'Tilpasset',copy:'For team i vekst som trenger mer av arbeidsflaten.',points:['Alt i Team','Kontrakter og signering','Analyse per selger','Flere roller og moduler'],hot:true},
  {name:'Skala',price:'Tilpasset',copy:'For flere avdelinger eller organisasjoner.',points:['Alt i Vekst','Flere organisasjoner','Isolerte kundedata','Tilpasset onboarding']},
];

export default function Home() {
  return <main className={styles.page}>
    <header className={styles.header}><nav><Link href="/" className={styles.logo}><i>C</i><b>Clovo</b></Link><div className={styles.links}><a href="#hjem">Hjem</a><a href="#funksjoner">Funksjoner⌄</a><a href="#oppsett">Oppsett</a><a href="#priser">Priser</a><a href="#kontakt">Kontakt</a></div><div className={styles.navActions}><a href={LOGIN_URL}>Logg inn</a><Button /></div></nav></header>

    <section className={styles.hero} id="hjem"><div className={styles.heroCopy}><div className={styles.eyebrow}><span>Nytt</span> Dashboard bygget rundt teamet <b>›</b></div><h1>Få kontroll på<br/><strong>hele salgsarbeidet</strong></h1><p>Samle pipeline, kunder, kontrakter og resultater i ett dashboard, bygget rundt teamet, prosessen og målene deres.</p><div className={styles.heroButtons}><Button/><a className={styles.learn} href="#funksjoner">Se hvordan</a></div></div><div className={styles.heroVisual}><div className={styles.courseTop}><b>Pipeline</b><span>Se alle</span></div><MiniTable/><div className={styles.floating}><small>Aktiv pipeline</small><b>925 400 kr</b><div><span>18 avtaler</span><span className={styles.orange}>+12%</span></div></div></div></section>

    <section className={styles.trusted}><p>Alt teamet trenger, samlet på ett sted</p><div><b>Pipeline</b><b>Kontrakter</b><b>Kundeoversikt</b><b>Analyse</b><b>Sanntidsdata</b></div></section>

    <section className={styles.section} id="funksjoner"><div className={styles.heading}><h2>Et salgsdashboard som faktisk passer</h2><p>Slutt å tilpasse teamet til systemet. Clovo tilpasses måten dere jobber på.</p></div><div className={styles.experience}><div className={styles.dashboardFrame}><Dashboard/><button aria-label="Spill av demo">▶</button></div><div className={styles.featureGrid}>{features.map(([icon,title,copy],i)=><article key={title} className={i===0?styles.tint:""}><span><Icon name={icon}/></span><h3>{title}</h3><p>{copy}</p></article>)}</div></div></section>

    <section className={styles.section}><div className={styles.heading}><h2>Smarte funksjoner. Bedre salg.</h2><p>Følg aktivitet, fremdrift og resultater uten å miste oversikten.</p></div><div className={styles.smartGrid}><article className={styles.performance}><h3>Resultater i sanntid</h3><p>Se utvikling, måloppnåelse og nøkkeltall per selger.</p><div className={styles.metricRow}><div><small>Vunnet denne måneden</small><b>284 500 kr</b></div><div><small>Måloppnåelse</small><b>82%</b></div></div><div className={styles.lineChart}><AnimatedAreaChart /></div></article><article className={styles.community}><h3>Teamets arbeidsflate</h3><p>Roller og tilgang gir alle akkurat den oversikten de trenger.</p>{['Selger','Salgsleder','Daglig leder'].map((x,i)=><div className={styles.person} key={x}><i>{x[0]}</i><span><b>{x}</b><small>{i===0?'Egne kunder og salg':i===1?'Hele teamets pipeline':'Overordnet innsikt'}</small></span><em>•••</em></div>)}</article><article><h3>Pipeline-fremdrift</h3><p>Følg hvert salg fra første kontakt til signert avtale.</p><MiniTable compact/></article><article><h3>Kontrakter og signering</h3><p>Hold avtaler, dokumenter og neste steg samlet.</p><div className={styles.contract}><span>Avtale_NordicLabs.pdf</span><b>Klar for signering</b><button>Send avtale</button></div></article><article><h3>Innsikt som kan brukes</h3><p>Se hva som driver salget og hvor prosessen stopper opp.</p><div className={styles.kpis}><b>15<small>aktive salg</small></b><b>20<small>oppgaver</small></b><b>82%<small>måloppnåelse</small></b></div></article></div><div className={styles.center}><Button/></div></section>

    <section className={styles.section} id="oppsett"><div className={styles.heading}><h2>Enkelt å komme i gang</h2><p>Fra kartlegging til ferdig arbeidsflate i tre tydelige steg.</p></div><div className={styles.steps}><article><div className={styles.formMock}><small>Bedrift</small><span>Bedrift AS</span><small>Jobb-e-post</small><span>navn@bedrift.no</span><button>Bestill demo</button></div><i>Steg 1</i><h3>Kartlegg behovet</h3><p>Vi går gjennom roller, mål, salgsflyt og hvilke sider teamet trenger.</p></article><article><MiniTable compact/><i>Steg 2</i><h3>Vi bygger oppsettet</h3><p>Dashboard, pipeline, moduler og visninger settes opp rundt dere.</p></article><article><div className={styles.roleMock}>{['Selger','Salgsleder','Administrator'].map((x,i)=><span key={x}><i>{x[0]}</i><b>{x}</b><em>{i===0?'Egne data':'Full oversikt'}</em></span>)}</div><i>Steg 3</i><h3>Teamet tar det i bruk</h3><p>Dere får en ferdig arbeidsflate som kan justeres når behovene endres.</p></article></div><div className={styles.center}><Button/></div></section>

    <section className={styles.blueBand}><div><b>Én</b><span>samlet arbeidsflate</span></div><div><b>100%</b><span>tilpasset oppsett</span></div><div><b>24/7</b><span>tilgang til ferske data</span></div><div><b>Alle</b><span>roller i samme system</span></div></section>

    <section className={`${styles.section} ${styles.pricing}`} id="priser"><div className={styles.heading}><h2>Velg riktig nivå</h2><p>Omfang og pris avklares ut fra team, roller og moduler.</p></div><div className={styles.plans}>{plans.map(p=><article key={p.name} className={p.hot?styles.hotPlan:""}>{p.hot&&<span className={styles.popular}>Mest valgt</span>}<h3>{p.name}</h3><p>{p.copy}</p><strong>{p.price}</strong><small>etter omfang</small><Button pale={!p.hot}>Bestill demo</Button><ul>{p.points.map(x=><li key={x}><Icon name="check"/>{x}</li>)}</ul></article>)}</div></section>

    <section className={styles.subscribe} id="kontakt"><div><h2>Klar for bedre salgsflyt?</h2><p>Fortell oss om teamet, så viser vi hvordan Clovo kan bygges for dere.</p></div><form action={DEMO}><input type="email" placeholder="Skriv inn jobb-e-post" aria-label="Jobb-e-post"/><button>Bestill demo</button></form></section>

    <footer className={styles.footer}><div className={styles.footerBrand}><Link href="/" className={styles.logo}><i>C</i><b>Clovo</b></Link><p>Salgsdashboard bygget rundt teamet, prosessen og målene deres.</p></div><div><b>Utforsk</b><a href="#hjem">Hjem</a><a href="#funksjoner">Funksjoner</a><a href="#priser">Priser</a><a href="#kontakt">Kontakt</a></div><div><b>Selskap</b><a href={DEMO}>Bestill demo</a><a href={LOGIN_URL}>Logg inn</a><a href="#">Personvern</a></div><div className={styles.social}>● ◉ ◌</div><small>© {new Date().getFullYear()} Clovo. Alle rettigheter reservert.</small></footer>
  </main>;
}
