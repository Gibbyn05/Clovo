import styles from "./landing.module.css";
import { Features } from "@/components/blocks/features-8";
import { Footer } from "@/components/ui/modem-animated-footer";
import { SlideTabsNavigation } from "@/components/ui/slide-tabs-navigation";
import { SlideUpText } from "@/components/ui/slide-up-text";
import { HeroDashboard } from "@/components/hero-dashboard";
import { AfterBookingProcess, DashboardExamples, LandingFaq, TrustAndComparison } from "@/components/landing-decision-sections";
import { LandingMotion } from "@/components/landing-motion";
import { ArrowRight, Check } from "@phosphor-icons/react/dist/ssr";

const DEMO = "/demo";

const Button = ({ children = "Bestill demo", pale = false, href = DEMO }: { children?: React.ReactNode; pale?: boolean; href?: string }) => (
  <a href={href} className={pale ? styles.paleButton : styles.button}>{children}<ArrowRight weight="bold" aria-hidden="true" /></a>
);

const plans = [
  {name:'Den enkle',price:'150 kr',suffix:'per lisens (bruker)',copy:'Et ferdiglaget salgsdashboard med fast standardoppsett, uten selvvalgte endringer.',points:['Ferdiglaget salgsdashboard','Standard pipeline og salgssteg','Kunde- og kontaktoversikt','Oppgaver og aktivitetslogg','Grunnleggende salgsrapporter'],badge:undefined},
  {name:'Den fleksible',price:'Tilpasset',suffix:'etter omfang',copy:'Alt fra Den enkle, med mindre tilpasninger som ikke krever nye moduler eller større utvikling.',points:['Alt i Den enkle','Egne farger og enkel profilering','Mindre endringer i tekst og felter','Små justeringer av standardoppsettet'],hot:true,badge:undefined},
  {name:'Den eksklusive',price:'Etter avtale',suffix:'basert på behov og omfang',copy:'En eksklusiv løsning som skreddersys og videreutvikles fortløpende, helt ned til detaljene dere ønsker.',points:['Alt i Den fleksible','Fullt skreddersydd arbeidsflate','Løpende endringer etter behov','Egendefinerte prosesser, roller og visninger','Skreddersydde rapporter, mål og prognoser','Integrasjoner mot deres systemer','Prioritert oppfølging'],badge:'Eksklusiv'},
];

export default function Home() {
  return <main className={styles.page}>
    <LandingMotion />
    <SlideTabsNavigation />

    <section className={styles.hero} id="hjem"><div className={styles.heroCopy}><h1><SlideUpText lines={[{ text: "Se hva som må følges opp." }, { text: "Før salget stopper opp.", emphasized: true }]} /></h1><div data-hero-copy><p>Clovo viser hvem som eier salget, hva neste aktivitet er og hva teamet ligger an til å lande. Alt i én arbeidsflate tilpasset måten dere faktisk jobber på.</p><div className={styles.heroButtons}><Button/><a className={styles.learn} href="#eksempler"><span className={styles.playIcon}><ArrowRight weight="bold" aria-hidden="true" /></span> Se dashboard-eksempler</a></div></div></div><HeroDashboard /></section>

    <section className={styles.productFlow} aria-label="Salgsflyten i Clovo" data-reveal><span>Lead</span><ArrowRight/><span>Møte</span><ArrowRight/><span>Tilbud</span><ArrowRight/><span>Signering</span><ArrowRight/><strong>Resultat</strong></section>

    <Features />

    <DashboardExamples />

    <AfterBookingProcess />

    <TrustAndComparison />

    <section className={`${styles.section} ${styles.pricing}`} id="priser" data-reveal><div className={styles.heading}><h2>Velg riktig nivå</h2><p>Start med standardoppsettet, eller velg en løsning tilpasset teamet.</p></div><div className={styles.plans}>{plans.map(p=><article key={p.name} className={p.hot?styles.hotPlan:""}>{p.hot&&<span className={styles.popular}>Mest valgt</span>}{p.badge&&<span className={styles.exclusive}>{p.badge}</span>}<h3>{p.name}</h3><p>{p.copy}</p><strong>{p.price}</strong><small>{p.suffix}</small><Button pale={!p.hot} href={`/demo?package=${encodeURIComponent(p.name)}`}>{p.badge?'Avtal en prat':'Bestill demo'}</Button><ul>{p.points.map(x=><li key={x}><Check weight="bold" aria-hidden="true" />{x}</li>)}</ul></article>)}</div></section>

    <LandingFaq />

    <Footer />
  </main>;
}
