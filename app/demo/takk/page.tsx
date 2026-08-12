import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarCheck, Mail, Video } from "lucide-react";
import styles from "./takk.module.css";

export const metadata = {
  title: "Møtet er booket | Clovo",
  description: "Takk for at du booket en demo av Clovo.",
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
        <div className={styles.icon}><CalendarCheck /></div>
        <span className={styles.kicker}>Møtet er booket</span>
        <h1>Takk for henvendelsen.</h1>
        <p className={styles.lead}>Vi har mottatt bookingen og gleder oss til å vise hvordan Clovo kan passe salgsteamet deres.</p>

        <div className={styles.details}>
          <div><Mail /><span><b>Bekreftelsen er sendt</b><small>Du mottar møtedetaljene på e-post.</small></span></div>
          <div><Video /><span><b>Møtelenken følger med</b><small>Bruk lenken i kalenderinvitasjonen når møtet starter.</small></span></div>
        </div>

        <Link href="/" className={styles.button}>Tilbake til forsiden <ArrowRight /></Link>
      </section>
    </main>
  );
}
