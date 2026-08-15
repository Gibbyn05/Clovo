"use client";

import { useRef, useState } from "react";
import { ChartBar, UsersThree } from "@phosphor-icons/react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import landingStyles from "@/app/landing.module.css";
import styles from "./hero-dashboard.module.css";

type DashboardTab = "pipeline" | "customers" | "analysis";

const tabs: { id: DashboardTab; label: string }[] = [
  { id: "pipeline", label: "Pipeline" },
  { id: "customers", label: "Kunder" },
  { id: "analysis", label: "Analyse" },
];

const pipelineRows = [
  ["Nordic Labs", "Tilbud", "84 000"],
  ["Fjord Digital", "Møte", "42 500"],
  ["Aker Studio", "Vunnet", "128 000"],
  ["Oslo Tech", "Lead", "31 200"],
];

const customerRows = [
  ["Nordic Labs", "Kim Larsen", "Aktiv"],
  ["Fjord Digital", "Maria Solberg", "Oppfølging"],
  ["Aker Studio", "Jonas Vik", "Ny kunde"],
  ["Oslo Tech", "Ingrid Moen", "Aktiv"],
];

function PipelinePanel() {
  return <>
    <div className={landingStyles.heroMetrics}><div><small>Aktiv pipeline</small><b>925 400 kr</b><span>+12% denne måneden</span></div><div><small>Måloppnåelse</small><b>82%</b><span>6% over forrige måned</span></div><div><small>Åpne avtaler</small><b>18</b><span>5 klare for oppfølging</span></div></div>
    <div className={landingStyles.miniTable}><div className={landingStyles.tableHead}><b>Pipeline</b><span>Se alle</span></div>{pipelineRows.map((row,index)=><div className={landingStyles.tableRow} key={row[0]}><i className={landingStyles.dot}>{row[0][0]}</i><b>{row[0]}</b><em className={index===2?landingStyles.won:""}>{row[1]}</em><span>{row[2]}</span></div>)}</div>
  </>;
}

function CustomersPanel() {
  return <>
    <div className={landingStyles.heroMetrics}><div><small>Aktive kunder</small><b>46</b><span>+7 denne måneden</span></div><div><small>Nye kontakter</small><b>18</b><span>12 er kvalifisert</span></div><div><small>Oppfølging i dag</small><b>9</b><span>3 med høy prioritet</span></div></div>
    <div className={`${landingStyles.miniTable} ${styles.customerTable}`}><div className={landingStyles.tableHead}><b>Kundeoversikt</b><span>Alle kunder</span></div>{customerRows.map((row,index)=><div className={styles.customerRow} key={row[0]}><i className={landingStyles.dot}>{row[0][0]}</i><b>{row[0]}</b><span>{row[1]}</span><em data-active={index===0||index===3}>{row[2]}</em></div>)}</div>
  </>;
}

function AnalysisPanel() {
  const bars = [38,52,44,68,61,82,76,96];
  return <>
    <div className={landingStyles.heroMetrics}><div><small>Vunnet denne måneden</small><b>284 500 kr</b><span>+18% mot forrige</span></div><div><small>Konverteringsrate</small><b>31%</b><span>+4 prosentpoeng</span></div><div><small>Snittverdi</small><b>67 200 kr</b><span>Stabil utvikling</span></div></div>
    <div className={styles.analysisCard}><div className={styles.analysisHead}><div><ChartBar/><span><b>Salgsutvikling</b><small>Siste 8 uker</small></span></div><em>+18,4%</em></div><div className={styles.analysisBars}>{bars.map((height,index)=><i key={index} style={{height:`${height}%`,"--bar-index":index} as React.CSSProperties}/>)}</div><div className={styles.analysisAxis}><span>Uke 1</span><span>Uke 4</span><span>Uke 8</span></div></div>
  </>;
}

export function HeroDashboard() {
  const [activeTab, setActiveTab] = useState<DashboardTab>("pipeline");
  const panelRef = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    if (!panelRef.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.from(panelRef.current, { autoAlpha: 0, y: 8, duration: 0.28, ease: "power1.out" });
  }, { dependencies: [activeTab] });
  const activeLabel = tabs.find(tab => tab.id === activeTab)?.label ?? "Pipeline";

  return <div className={landingStyles.heroVisual} data-hero-dashboard>
    <div className={landingStyles.visualTopbar}><div><span className={landingStyles.visualLogo}>C</span><b>Clovo</b></div><div className={styles.tabs} role="tablist" aria-label="Dashboardvisning">{tabs.map(tab=><button key={tab.id} type="button" role="tab" aria-selected={activeTab===tab.id} aria-controls={`hero-panel-${tab.id}`} className={activeTab===tab.id?styles.active:""} onClick={()=>setActiveTab(tab.id)}>{tab.label}</button>)}</div><em>Live oversikt</em></div>
    <div className={landingStyles.visualIntro}><div><small>God morgen</small><h2>{activeLabel}</h2></div><span>{activeTab === "pipeline" ? "Oppdatert nå" : activeTab === "customers" ? <><UsersThree/> 46 kunder</> : "Siste 8 uker"}</span></div>
    <div ref={panelRef} key={activeTab} id={`hero-panel-${activeTab}`} role="tabpanel" className={styles.panel}>{activeTab === "pipeline" ? <PipelinePanel/> : activeTab === "customers" ? <CustomersPanel/> : <AnalysisPanel/>}</div>
    <div className={landingStyles.floating}><small>{activeTab === "pipeline" ? "Prognose denne måneden" : activeTab === "customers" ? "Kunder med aktivitet" : "Utvikling mot mål"}</small><b>{activeTab === "pipeline" ? "1 240 000 kr" : activeTab === "customers" ? "38 av 46" : "+18,4%"}</b><div><span>{activeTab === "pipeline" ? "Basert på pipeline" : activeTab === "customers" ? "Siste 30 dager" : "Sammenlignet med sist"}</span><span className={landingStyles.orange}>{activeTab === "customers" ? "83%" : "+18%"}</span></div></div>
  </div>;
}
