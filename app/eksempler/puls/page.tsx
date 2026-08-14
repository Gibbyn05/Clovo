import Link from "next/link";
import { Activity, ArrowLeft, BellRing, Headphones, PhoneCall, Radio, Settings, Signal, UsersRound, Zap } from "lucide-react";
import styles from "./puls.module.css";
import { DashboardDemoInteractions } from "@/components/dashboard-demo-interactions";

export const metadata = { title: "Puls | Clovo dashboardeksempel", description: "Et mørkt Clovo-dashboard for sanntidsaktivitet og telefonsalg." };

const agents = [
  ["AL", "Amalie L.", "I samtale", "12:48", "18"], ["TM", "Tobias M.", "Etterarbeid", "02:14", "15"],
  ["SK", "Sander K.", "Ledig", "00:36", "21"], ["NE", "Nora E.", "I samtale", "08:05", "17"],
];

const views = {
  live: { eyebrow: "COMMAND CENTER / OSLO / 14:32:08", title: "SALGSPULS", metrics: [["AKTIVE SAMTALER","08","6 innkommende · 2 utgående"],["VENTER I KØ","03","Lengste ventetid 01:24"],["DAGENS SALG","71","88% av dagsmål"]] },
  team: { eyebrow: "TEAM STATUS / 12 PÅLOGGET", title: "TEAMFLOW", metrics: [["I SAMTALE","08","67% av kapasiteten"],["TILGJENGELIGE","03","Neste agent om 00:36"],["MØTER BOOKET","38","+18,7% i dag"]] },
  ko: { eyebrow: "KØOVERSIKT / OPPDATERT NÅ", title: "KØPULS", metrics: [["VENTER NÅ","03","Lengste ventetid 01:24"],["SVARTID","00:42","12 sek foran målet"],["BESVART I DAG","146","94% svargrad"]] },
} as const;

export default function PulseDashboard({ searchParams }: { searchParams?: { view?: string } }) {
  const viewKey = searchParams?.view && searchParams.view in views ? searchParams.view as keyof typeof views : "live";
  const view = views[viewKey];
  return <main className={styles.page}>
    <header><Link href="/" className={styles.logo}><span>C/</span>PULS</Link><nav><Link href="/eksempler/puls?view=live" aria-current={viewKey === "live" ? "page" : undefined}><Activity />LIVE</Link><Link href="/eksempler/puls?view=team" aria-current={viewKey === "team" ? "page" : undefined}><UsersRound />TEAM</Link><Link href="/eksempler/puls?view=ko" aria-current={viewKey === "ko" ? "page" : undefined}><Headphones />KØ</Link></nav><div><i><Radio /> LIVE</i><button aria-label="Varsler" data-demo-action="Tre systemsignaler vises lenger ned på siden."><BellRing /></button><button aria-label="Innstillinger" data-demo-action="Skrivebeskyttet: innstillinger kan ikke endres i eksempelvisningen."><Settings /></button><span>EKSEMPELDATA</span></div></header>

    <section className={styles.command}>
      <div className={styles.title}><Link href="/"><ArrowLeft /> TILBAKE</Link><p>{view.eyebrow}</p><h1>{view.title.slice(0,-4)}<span>{view.title.slice(-4)}</span></h1></div>
      <div className={styles.liveMetric}><span>{view.metrics[0][0]}</span><strong>{view.metrics[0][1]}</strong><small><i /> {view.metrics[0][2]}</small></div>
      <div className={styles.liveMetric}><span>{view.metrics[1][0]}</span><strong>{view.metrics[1][1]}</strong><small>{view.metrics[1][2]}</small></div>
      <div className={styles.liveMetricAccent}><span>{view.metrics[2][0]}</span><strong>{view.metrics[2][1]}</strong><small><Zap /> {view.metrics[2][2]}</small></div>
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
