import styles from "./landing.module.css";
import { Features } from "@/components/blocks/features-8";
import { Footer } from "@/components/ui/modem-animated-footer";
import { SlideTabsNavigation } from "@/components/ui/slide-tabs-navigation";
import { SlideUpText } from "@/components/ui/slide-up-text";
import { HeroDashboard } from "@/components/hero-dashboard";
import { AfterBookingProcess, DashboardExamples, LandingFaq, TrustAndComparison } from "@/components/landing-decision-sections";

const DEMO = "/demo";

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

const Button = ({ children = "Bestill demo", pale = false, href = DEMO }: { children?: React.ReactNode; pale?: boolean; href?: string }) => (
  <a href={href} className={pale ? styles.paleButton : styles.button}>{children}<Icon name="arrow" /></a>
);

const plans = [
  {name:'Den enkle',price:'150 kr',suffix:'per lisens (bruker)',copy:'Et ferdiglaget salgsdashboard med fast standardoppsett, uten selvvalgte endringer.',points:['Ferdiglaget salgsdashboard','Standard pipeline og salgssteg','Kunde- og kontaktoversikt','Oppgaver og aktivitetslogg','Grunnleggende salgsrapporter'],badge:undefined},
  {name:'Den fleksible',price:'Tilpasset',suffix:'etter omfang',copy:'Alt fra Den enkle, med mindre tilpasninger som ikke krever nye moduler eller større utvikling.',points:['Alt i Den enkle','Egne farger og enkel profilering','Mindre endringer i tekst og felter','Små justeringer av standardoppsettet'],hot:true,badge:undefined},
  {name:'Den eksklusive',price:'Etter avtale',suffix:'basert på behov og omfang',copy:'En eksklusiv løsning som skreddersys og videreutvikles fortløpende, helt ned til detaljene dere ønsker.',points:['Alt i Den fleksible','Fullt skreddersydd arbeidsflate','Løpende endringer etter behov','Egendefinerte prosesser, roller og visninger','Skreddersydde rapporter, mål og prognoser','Integrasjoner mot deres systemer','Prioritert oppfølging'],badge:'Eksklusiv'},
];

export default function Home() {
  return <main className={styles.page}>
    <SlideTabsNavigation />

    <section className={styles.hero} id="hjem"><div className={styles.heroCopy}><h1><SlideUpText lines={[{ text: "Se hva som må følges opp." }, { text: "Før salget stopper opp.", emphasized: true }]} /></h1><p>Clovo viser hvem som eier salget, hva neste aktivitet er og hva teamet ligger an til å lande. Alt i én arbeidsflate tilpasset måten dere faktisk jobber på.</p><div className={styles.heroButtons}><Button/><a className={styles.learn} href="#eksempler"><span className={styles.playIcon}>↗</span> Se dashboard-eksempler</a></div></div><HeroDashboard /></section>

    <section className={styles.productFlow} aria-label="Salgsflyten i Clovo"><span>Lead</span><Icon name="arrow"/><span>Møte</span><Icon name="arrow"/><span>Tilbud</span><Icon name="arrow"/><span>Signering</span><Icon name="arrow"/><strong>Resultat</strong></section>

    <Features />

    <DashboardExamples />

    <AfterBookingProcess />

    <TrustAndComparison />

    <section className={`${styles.section} ${styles.pricing}`} id="priser"><div className={styles.heading}><h2>Velg riktig nivå</h2><p>Start med standardoppsettet, eller velg en løsning tilpasset teamet.</p></div><div className={styles.plans}>{plans.map(p=><article key={p.name} className={p.hot?styles.hotPlan:""}>{p.hot&&<span className={styles.popular}>Mest valgt</span>}{p.badge&&<span className={styles.exclusive}>{p.badge}</span>}<h3>{p.name}</h3><p>{p.copy}</p><strong>{p.price}</strong><small>{p.suffix}</small><Button pale={!p.hot} href={`/demo?package=${encodeURIComponent(p.name)}`}>{p.badge?'Avtal en prat':'Bestill demo'}</Button><ul>{p.points.map(x=><li key={x}><Icon name="check"/>{x}</li>)}</ul></article>)}</div></section>

    <LandingFaq />

    <Footer />
  </main>;
}
