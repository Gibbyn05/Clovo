import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Mail, Phone } from "lucide-react";
import styles from "./takk.module.css";

export const metadata = {
  title: "Takk for henvendelsen | Clovo",
  description: "Vi har mottatt demohenvendelsen din.",
};

export default function DemoThankYouPage() {
  return (
    <main className={styles.page}>
      <nav className={styles.nav}>
        <Link href="/" className={styles.logo} aria-label="Clovo forside">
          <Image src="/clovo-logo.png" alt="" width={40} height={40} priority />
          <b>Clovo</b>
        </Link>
      </nav>

      <section className={styles.card}>
        <div className={styles.icon}><CheckCircle2 /></div>
        <span className={styles.kicker}>Henvendelsen er mottatt</span>
        <h1>Takk for henvendelsen.</h1>
        <p className={styles.lead}>Vi har mottatt informasjonen og bruker den til å forberede en relevant demo for salgsteamet deres.</p>

        <div className={styles.details}>
          <div><Mail /><span><b>Informasjonen er sendt</b><small>Henvendelsen er registrert hos Clovo.</small></span></div>
          <div><Phone /><span><b>Vi følger opp</b><small>Har du ikke booket tidspunkt ennå, kan vi kontakte deg direkte.</small></span></div>
        </div>

        <Link href="/" className={styles.button}>Tilbake til forsiden <ArrowRight /></Link>
      </section>
    </main>
  );
}
