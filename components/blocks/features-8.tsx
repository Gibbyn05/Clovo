"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./features-8.module.css";

type FeatureIcon = "dashboard" | "pipeline" | "roles" | "contract" | "insight" | "isolation";

function FeatureIcon({ name }: { name: FeatureIcon }) {
  const paths: Record<FeatureIcon, React.ReactNode> = {
    dashboard: <><rect x="3" y="4" width="18" height="16" rx="3"/><path d="M3 10h18M9 10v10M13 15h4M13 12h5"/></>,
    pipeline: <><circle cx="5" cy="6" r="2.25"/><circle cx="19" cy="12" r="2.25"/><circle cx="8" cy="19" r="2.25"/><path d="M7.25 6h4.25a3.5 3.5 0 0 1 3.5 3.5A2.5 2.5 0 0 0 17.5 12M17.4 14c-1.3 3.2-3.7 5-7.15 5"/></>,
    roles: <><path d="M4 19v-1.5A3.5 3.5 0 0 1 7.5 14h2a3.5 3.5 0 0 1 3.5 3.5V19"/><circle cx="8.5" cy="8" r="3"/><path d="M15.5 5.5h4v4M17.5 7.5l-4 4M16 15h4M18 13v4"/></>,
    contract: <><path d="M6 3h9l4 4v14H6z"/><path d="M15 3v5h4M9 12h7M9 15h5"/><path d="m9 19 1.5 1.5L14 17"/></>,
    insight: <><path d="M4 20V9M10 20V4M16 20v-7M22 20H2"/><path d="m4 7 6-4 6 7 5-5"/></>,
    isolation: <><path d="M12 3 5 6v5.5c0 4.3 2.8 7.2 7 9 4.2-1.8 7-4.7 7-9V6z"/><path d="M9 10.5h6v5H9zM10.5 10.5V9a1.5 1.5 0 0 1 3 0v1.5"/></>,
  };
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.55" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

const features = [
  { icon: "dashboard" as const, title: "Dashboard bygget for dere", copy: "Sider, widgets og nøkkeltall settes sammen rundt teamets faktiske arbeidsdag.", kind: "dashboard" },
  { icon: "pipeline" as const, title: "Deres egen salgsprosess", copy: "Steg, sannsynlighet og neste aktivitet følger måten dere selger på.", kind: "pipeline" },
  { icon: "roles" as const, title: "Riktig oversikt for hver rolle", copy: "Selgere ser sitt arbeid. Ledere ser teamet. Tilgang styres presist.", kind: "roles" },
  { icon: "contract" as const, title: "Kontrakter uten sidespor", copy: "Avtaler, dokumenter og signering ligger sammen med kunden og salget.", kind: "contract" },
  { icon: "insight" as const, title: "Innsikt mens det skjer", copy: "Følg mål, aktivitet og resultater uten manuell rapportering.", kind: "insight" },
  { icon: "isolation" as const, title: "Data isolert per kunde", copy: "Brukere, filer og salgsdata holdes tydelig adskilt mellom organisasjoner.", kind: "isolation" },
];

function Visual({ kind }: { kind: string }) {
  if (kind === "dashboard") return <div className={styles.dashboardVisual}><div className={styles.sideRail}><i/><i/><i/><i/></div><div className={styles.dashboardBody}><div className={styles.metricTiles}><span><small>Pipeline</small><b>925k</b></span><span><small>Mål</small><b>82%</b></span></div><div className={styles.chartBars}>{[42,68,53,86,62,96].map((height,index)=><i key={index} style={{height:`${height}%`}}/>)}</div></div></div>;
  if (kind === "pipeline") return <div className={styles.pipelineVisual}>{["Nytt lead","Møte","Tilbud","Vunnet"].map((step,index)=><span key={step}><i>{index+1}</i><b>{step}</b><em>{[12,8,5,3][index]}</em></span>)}</div>;
  if (kind === "roles") return <div className={styles.rolesVisual}>{[["S","Selger","Egne salg"],["L","Salgsleder","Teamoversikt"],["A","Admin","Full tilgang"]].map(row=><span key={row[1]}><i>{row[0]}</i><b>{row[1]}</b><small>{row[2]}</small></span>)}</div>;
  if (kind === "contract") return <div className={styles.contractVisual}><div><span>Avtale_Nordic.pdf</span><small>Klar for signering</small></div><b>Send avtale →</b></div>;
  if (kind === "insight") return <div className={styles.insightVisual}><svg viewBox="0 0 280 90" preserveAspectRatio="none"><path pathLength="1" d="M0 75 C35 70 45 42 78 53 S120 71 145 34 S190 54 217 25 S255 28 280 8"/></svg><div><span>Vunnet</span><b>284 500 kr</b><em>+18%</em></div></div>;
  return <div className={styles.isolationVisual}><span><i>A</i><b>Organisasjon A</b></span><div/><span><i>B</i><b>Organisasjon B</b></span></div>;
}

export function Features() {
  const root = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!root.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.12 });
    observer.observe(root.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={root} id="funksjoner" className={`${styles.section} ${visible ? styles.visible : ""}`}>
      <div className={styles.intro}>
        <span>Funksjoner</span>
        <h2>Alt salgsarbeidet. Én tilpasset arbeidsflate.</h2>
        <p>Clovo samler verktøyene teamet bruker hver dag, uten å presse arbeidsflyten inn i en standardmal.</p>
      </div>
      <div className={styles.grid}>
        {features.map((feature,index)=><article className={`${styles.card} ${styles[feature.kind]}`} style={{"--delay":`${index*65}ms`} as React.CSSProperties} key={feature.title}>
          <div className={styles.cardHead}><span className={styles.icon}><FeatureIcon name={feature.icon}/></span><div><h3>{feature.title}</h3><p>{feature.copy}</p></div></div>
          <Visual kind={feature.kind}/>
        </article>)}
      </div>
    </section>
  );
}
