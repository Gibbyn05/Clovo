import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, BarChart3, Check, LockKeyhole } from "lucide-react";
import { DemoForm } from "./demo-form";
import styles from "./demo.module.css";

export const metadata = {
  title: "Bestill demo | Clovo",
  description: "Fortell oss om salgsteamet deres og bestill en tilpasset demo av Clovo.",
};

export default function DemoPage({
  searchParams,
}: {
  searchParams?: { email?: string; package?: string };
}) {
  return (
    <main className={styles.page}>
      <nav className={styles.nav}>
        <Link href="/" className={styles.logo}><Image src="/clovo-logo.png" alt="" width={38} height={38} priority /><b>Clovo</b></Link>
        <Link href="/" className={styles.back}><ArrowLeft /> Tilbake til forsiden</Link>
      </nav>

      <div className={styles.shell}>
        <aside className={styles.intro}>
          <span className={styles.kicker}>Tilpasset demonstrasjon</span>
          <h1>Vis oss hvordan teamet selger.</h1>
          <p>Vi bruker svarene til å forberede en demo med relevante salgssteg, roller og nøkkeltall.</p>

          <div className={styles.preview} aria-hidden="true">
            <div className={styles.previewTop}><span><BarChart3 /> Demooppsett</span><b>Clovo</b></div>
            {[
              ["Pipeline og salgssteg", "Tilpasses"],
              ["Roller og tilganger", "Kartlegges"],
              ["Rapporter og nøkkeltall", "Velges"],
            ].map(([label, value], index) => (
              <div className={styles.previewRow} key={label}>
                <i>{index + 1}</i><span>{label}</span><em>{value}</em>
              </div>
            ))}
          </div>

          <ul className={styles.points}>
            <li><Check /> Ingen binding</li>
            <li><Check /> Tilpasset deres salgsprosess</li>
            <li><LockKeyhole /> Opplysningene brukes kun til henvendelsen</li>
          </ul>
        </aside>

        <section className={styles.formCard}>
          <div className={styles.formHeading}>
            <span>Tar omtrent 3 minutter</span>
            <h2>Fortell oss om salgsteamet</h2>
            <p>Felter merket med * må fylles ut.</p>
          </div>
          <DemoForm initialEmail={searchParams?.email ?? ""} initialPackage={searchParams?.package ?? ""} />
        </section>
      </div>
    </main>
  );
}
