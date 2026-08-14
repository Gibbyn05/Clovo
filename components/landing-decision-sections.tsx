import Link from "next/link";
import { ArrowRight, Check, ClipboardCheck, Database, FileCheck2, LockKeyhole, MessagesSquare, Rocket, ShieldCheck } from "lucide-react";
import styles from "./landing-decision-sections.module.css";

const comparisonRows = [
  ["Oppsett", "Et generelt system som teamet må tilpasse seg", "En arbeidsflate bygget rundt teamets salgsprosess"],
  ["Oversikt", "Mange felt, menyer og separate rapporter", "Pipeline, oppgaver og resultater samlet"],
  ["Tilpasning", "Omfattende konfigurering før systemet passer", "Velg standardoppsett eller ønsket nivå av tilpasning"],
  ["Fokus", "Registrering av mest mulig informasjon", "Informasjonen teamet trenger for å følge opp salget"],
];

const faqs = [
  ["Hva skjer etter at vi bestiller demo?", "Dere fyller ut behovsskjemaet og velger et møtetidspunkt. I møtet kartlegger vi team, roller, salgsprosess og ønsket nivå før dere får et tydelig forslag til videre oppsett."],
  ["Hvor lang tid tar det å komme i gang?", "Tidsplanen avhenger av valgt pakke, datagrunnlag og behovet for tilpasninger. Omfang og forventet levering avklares før arbeidet starter."],
  ["Kan vi tilpasse dashboardet?", "Ja. Den enkle har et fast standardoppsett. Den fleksible åpner for mindre endringer, mens Den eksklusive kan skreddersys og videreutvikles fortløpende."],
  ["Kan eksisterende kundedata flyttes inn?", "Muligheten vurderes ut fra filformat, datakvalitet og valgt pakke. Vi avklarer hva som kan importeres før oppstart, slik at det ikke gis løfter uten å ha sett datagrunnlaget."],
  ["Hvordan behandles informasjonen vi sender inn?", "Opplysninger fra kontaktskjema og demobestilling brukes til å behandle henvendelsen og forberede oppfølgingen. Databehov, tilganger og eventuelle avtaler avklares før en kundeløsning settes opp."],
  ["Hva koster Clovo?", "Den enkle koster 150 kr per bruker. Den fleksible prises etter omfang, og Den eksklusive avtales ut fra behov og videreutvikling."],
];

export function AfterBookingProcess() {
  const steps = [
    { icon: ClipboardCheck, number: "01", title: "Send inn behovet", text: "Velg pakke og fortell oss om teamet, dagens arbeidsflyt og hva dere ønsker bedre oversikt over." },
    { icon: MessagesSquare, number: "02", title: "Behovsmøte", text: "Dere velger et møtetidspunkt. Sammen avklarer vi mål, roller, data og hvilke deler av Clovo som er relevante." },
    { icon: FileCheck2, number: "03", title: "Avklart oppsett", text: "Dere får et konkret omfang og en tidsplan før arbeidet starter. Ingen uklare leveranser eller skjulte antakelser." },
    { icon: Rocket, number: "04", title: "Lansering", text: "Arbeidsflaten settes opp, kontrolleres og gjøres klar for teamet. Videre oppfølging følger valgt nivå." },
  ];

  return <section className={styles.process} id="oppsett">
    <div className={styles.heading}><span>Fra henvendelse til arbeidsflate</span><h2>Dette skjer etter at du bestiller demo.</h2><p>En tydelig prosess før dere bestemmer dere, med avklarte behov og forventninger.</p></div>
    <div className={styles.processGrid}>{steps.map(step => { const StepIcon = step.icon; return <article key={step.number}><div className={styles.stepTop}><i><StepIcon /></i><span>{step.number}</span></div><h3>{step.title}</h3><p>{step.text}</p></article>; })}</div>
    <div className={styles.inlineActions}><Link href="/demo" className={styles.primary}>Bestill demo <ArrowRight /></Link><Link href="/kontakt" className={styles.secondary}>Still et spørsmål</Link></div>
  </section>;
}

export function TrustAndComparison() {
  return <>
    <section className={styles.comparison}>
      <div className={styles.comparisonIntro}><span>Hvorfor Clovo</span><h2>Mindre system.<br />Mer salgsflyt.</h2><p>Clovo er laget for team som vil ha en relevant arbeidsflate, ikke et omfattende standardsystem som må formes på egen hånd.</p><Link href="/referanser">Se vårt arbeid <ArrowRight /></Link></div>
      <div className={styles.comparisonTable} role="table" aria-label="Forskjellen mellom et standard CRM og Clovo">
        <div className={styles.tableHeader} role="row"><span role="columnheader">Område</span><b role="columnheader">Typisk standard-CRM</b><b role="columnheader">Clovo</b></div>
        {comparisonRows.map(row => <div className={styles.comparisonRow} role="row" key={row[0]}><span role="cell">{row[0]}</span><p role="cell">{row[1]}</p><p role="cell"><Check />{row[2]}</p></div>)}
      </div>
    </section>

    <section className={styles.security}>
      <div className={styles.securityTitle}><span><ShieldCheck /> Sikkerhet og databehandling</span><h2>Tydelige rammer før data flyttes.</h2><p>Vi beskriver bare sikkerhetstiltak som gjelder for nettsiden nå. Krav til selve kundeløsningen avklares ut fra data, integrasjoner og valgt oppsett.</p></div>
      <div className={styles.securityGrid}>
        <article><i><LockKeyhole /></i><div><h3>Kryptert forbindelse</h3><p>Produksjonssiden bruker HTTPS, slik at informasjon i skjemaer sendes over en kryptert forbindelse.</p></div></article>
        <article><i><Database /></i><div><h3>Begrenset formål</h3><p>Opplysninger fra skjemaene brukes til å behandle henvendelsen og forberede videre oppfølging.</p></div></article>
        <article><i><FileCheck2 /></i><div><h3>Avklares før oppstart</h3><p>Databehov, tilganger, import og nødvendige avtaler avklares før en kundeløsning settes opp.</p></div></article>
        <article><i><ShieldCheck /></i><div><h3>Ingen kortdata</h3><p>Nettsiden ber ikke om eller lagrer betalingskortinformasjon i kontakt- eller demoflyten.</p></div></article>
      </div>
    </section>
  </>;
}

export function LandingFaq() {
  return <section className={styles.faq}>
    <div className={styles.faqIntro}><span>Ofte stilte spørsmål</span><h2>Det viktigste før dere går videre.</h2><p>Konkrete svar om oppsett, tilpasning, pris og hva som skjer etter henvendelsen.</p><Link href="/kontakt">Har du et annet spørsmål? <ArrowRight /></Link></div>
    <div className={styles.questions}>{faqs.map(([question, answer], index) => <details key={question} open={index === 0}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div>
  </section>;
}

export function FinalDecisionCta() {
  return <section className={styles.finalCta}><div><span>Neste steg</span><h2>Se om Clovo passer salgsprosessen deres.</h2><p>Fortell oss hvordan teamet jobber i dag. Dere får en konkret gjennomgang, ikke en generell salgspresentasjon.</p></div><div className={styles.ctaActions}><Link href="/demo" className={styles.primary}>Bestill demo <ArrowRight /></Link><Link href="/referanser" className={styles.light}>Se kundecase</Link></div></section>;
}
