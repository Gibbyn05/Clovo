import Link from "next/link";
import { Activity, ArrowLeft, BellRing, Headphones, PhoneCall, Radio, Settings, Signal, UsersRound, Zap } from "lucide-react";
import styles from "./puls.module.css";
import { DashboardDemoInteractions } from "@/components/dashboard-demo-interactions";

export const metadata = { title: "Puls | Clovo dashboardeksempel", description: "Et mørkt Clovo-dashboard for sanntidsaktivitet og telefonsalg." };

const agents = [
  ["AL", "Amalie L.", "I samtale", "12:48", "18"], ["TM", "Tobias M.", "Etterarbeid", "02:14", "15"],
  ["SK", "Sander K.", "Ledig", "00:36", "21"], ["NE", "Nora E.", "I samtale", "08:05", "17"],
];

export default function PulseDashboard() {
  return <main className={styles.page}>
    <header><Link href="/" className={styles.logo}><span>C/</span>PULS</Link><nav><a className={styles.active} aria-pressed="true" data-demo-tab-group="pulse-nav" data-demo-action="LIVE-visningen er valgt. Dataene oppdateres kun visuelt i demoen."><Activity />LIVE</a><a aria-pressed="false" data-demo-tab-group="pulse-nav" data-demo-action="TEAM-visningen er valgt. Eksempeldataene er skrivebeskyttet."><UsersRound />TEAM</a><a aria-pressed="false" data-demo-tab-group="pulse-nav" data-demo-action="KØ-visningen er valgt. Eksempeldataene er skrivebeskyttet."><Headphones />KØ</a></nav><div><i><Radio /> LIVE</i><button aria-label="Varsler" data-demo-action="Tre systemsignaler vises lenger ned på siden."><BellRing /></button><button aria-label="Innstillinger" data-demo-action="Skrivebeskyttet: innstillinger kan ikke endres i eksempelvisningen."><Settings /></button><span>EKSEMPELDATA</span></div></header>

    <section className={styles.command}>
      <div className={styles.title}><Link href="/"><ArrowLeft /> TILBAKE</Link><p>COMMAND CENTER / OSLO / 14:32:08</p><h1>SALGS<span>PULS</span></h1></div>
      <div className={styles.liveMetric}><span>AKTIVE SAMTALER</span><strong>08</strong><small><i /> 6 innkommende · 2 utgående</small></div>
      <div className={styles.liveMetric}><span>VENTER I KØ</span><strong>03</strong><small>Lengste ventetid 01:24</small></div>
      <div className={styles.liveMetricAccent}><span>DAGENS SALG</span><strong>71</strong><small><Zap /> 88% av dagsmål</small></div>
    </section>

    <section className={styles.grid}>
      <article className={styles.wave}>
        <div className={styles.cardTop}><span><Signal /> AKTIVITET / SISTE 60 MIN</span><b>+18.7%</b></div>
        <div className={styles.waveform}>{Array.from({length:48},(_,i)=><i key={i} style={{height:`${18+((i*17)%67)}%`}} className={i>38?styles.hot:""}/>)}</div>
        <div className={styles.timeline}><span>13:30</span><span>13:45</span><span>14:00</span><span>14:15</span><span>NÅ</span></div>
        <div className={styles.waveStats}><span><b>146</b> samtaler</span><span><b>38</b> bookede møter</span><span><b>26%</b> møtegrad</span><span><b>04:18</b> snittid</span></div>
      </article>

      <article className={styles.target}>
        <div className={styles.cardTop}><span>DAGSMÅL</span><b>71 / 80</b></div><div className={styles.dial}><div><strong>88</strong><span>%</span></div></div><p><i /> 9 salg gjenstår</p><small>Estimert måloppnåelse 15:47</small>
      </article>

      <article className={styles.agents}>
        <div className={styles.cardTop}><span>AGENTER / SANNTID</span><b>12 PÅLOGGET</b></div>
        <div className={styles.agentHead}><span>AGENT</span><span>STATUS</span><span>TID</span><span>SALG</span></div>
        {agents.map((agent,i)=><div className={styles.agent} key={agent[0]}><span><i>{agent[0]}</i><b>{agent[1]}</b></span><em data-state={i}>{agent[2]}</em><time>{agent[3]}</time><strong>{agent[4]}</strong></div>)}
      </article>

      <article className={styles.sources}>
        <div className={styles.cardTop}><span>LEADKILDER</span><b>KONVERTERING</b></div>
        {[['INBOUND WEB','42%','38'],['PARTNER','31%','24'],['REAKTIVERING','19%','17'],['KALD LISTE','8%','9']].map((source,i)=><div className={styles.source} key={source[0]}><span>{source[0]}</span><div><i style={{width:source[1]}} data-source={i}/></div><b>{source[1]}</b><small>{source[2]} leads</small></div>)}
      </article>

      <article className={styles.alerts}><div className={styles.cardTop}><span>SYSTEMSIGNALER</span><Activity /></div><div><i className={styles.warn}>!</i><span><b>Køen øker</b><small>3 leads har ventet over 60 sek</small></span><time>14:31</time></div><div><i className={styles.good}>✓</i><span><b>Dagsmål nærmer seg</b><small>Teamet ligger 11% foran plan</small></span><time>14:28</time></div><div><i className={styles.info}>i</i><span><b>Ny toppscore</b><small>Sander har 21 salg i dag</small></span><time>14:22</time></div></article>
    </section>

    <footer><span><i /> SYSTEM ONLINE</span><p>CLV-PULSE / REALTIME SALES OPERATIONS</p><span><PhoneCall /> 8 AKTIVE</span></footer>
    <DashboardDemoInteractions theme="pulse" />
  </main>;
}
