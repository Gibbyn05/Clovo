"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useRef, useState } from "react";
import { ChartLineUp, Check, FileText, GitBranch, PaperPlaneTilt, ShieldCheck, SquaresFour, UsersThree, type Icon as PhosphorIcon } from "@phosphor-icons/react";
import workflowIllustration from "@/assets/landing/workflow.png";
import rolesIllustration from "@/assets/landing/roles.png";
import contractsIllustration from "@/assets/landing/contracts.png";
import insightsIllustration from "@/assets/landing/insights.png";
import isolationIllustration from "@/assets/landing/data-isolation.png";
import styles from "./features-8.module.css";

type FeatureIcon = "dashboard" | "pipeline" | "roles" | "contract" | "insight" | "isolation";

function FeatureIcon({ name }: { name: FeatureIcon }) {
  const icons: Record<FeatureIcon, PhosphorIcon> = {
    dashboard: SquaresFour,
    pipeline: GitBranch,
    roles: UsersThree,
    contract: FileText,
    insight: ChartLineUp,
    isolation: ShieldCheck,
  };
  const Icon = icons[name];
  return <Icon weight="regular" aria-hidden={true} />;
}

function ContractVisual() {
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  function simulateSend() {
    if (state !== "idle") return;
    setState("sending");
    timers.current.push(
      setTimeout(() => setState("sent"), 700),
      setTimeout(() => setState("idle"), 3300),
    );
  }

  return (
    <div className={styles.contractVisual} data-state={state}>
      <div><span>Avtale_Nordic.pdf</span><small>{state === "sent" ? "Klar for mottaker" : "Klar for signering"}</small></div>
      <button type="button" onClick={simulateSend} disabled={state !== "idle"} aria-live="polite">
        {state === "idle" && <><span>Send avtale</span><PaperPlaneTilt weight="bold" aria-hidden="true" /></>}
        {state === "sending" && <><i className={styles.sendSpinner} aria-hidden="true" /><span>Sender...</span></>}
        {state === "sent" && <><i className={styles.sendCheck} aria-hidden="true"><Check weight="bold" /></i><span>Mail er sendt!</span></>}
      </button>
    </div>
  );
}

function Illustration({ src, alt, contain = false }: { src: StaticImageData; alt: string; contain?: boolean }) {
  return <div className={`${styles.illustration} ${contain ? styles.illustrationContain : ""}`}><Image src={src} alt={alt} fill sizes="(max-width: 850px) calc(100vw - 72px), 420px" /></div>;
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
  if (kind === "pipeline") return <Illustration src={workflowIllustration} alt="Illustrasjon av salgsflyten fra nytt lead til resultat" contain />;
  if (kind === "roles") return <Illustration src={rolesIllustration} alt="Illustrasjon av ulike arbeidsflater for selger, salgsleder og ledelse" />;
  if (kind === "contract") return <div className={styles.contractComposition}><Illustration src={contractsIllustration} alt="Illustrasjon av kontroll, godkjenning og signering av en salgsavtale" /><ContractVisual /></div>;
  if (kind === "insight") return <Illustration src={insightsIllustration} alt="Illustrasjon av salgssignaler som samles til tydelig innsikt" contain />;
  return <Illustration src={isolationIllustration} alt="Illustrasjon av kundedata i to adskilte og kontrollerte arbeidsområder" contain />;
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
        <h2>Arbeidsflaten følger salget, ikke omvendt.</h2>
        <p>Fra første kontakt til signert avtale ser teamet bare informasjonen som trengs for å ta neste steg.</p>
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
