import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock3, Mail, MessageSquareText, ShieldCheck } from "lucide-react";
import { ContactForm } from "./contact-form";
import styles from "./contact.module.css";

export const metadata = {
  title: "Kontakt oss | Clovo",
  description: "Ta kontakt med Clovo om produktet, priser, samarbeid eller andre spørsmål.",
};

export default function ContactPage() {
  return <main className={styles.page}>
    <nav className={styles.nav}>
      <Link href="/" className={styles.logo}><Image src="/clovo-logo.png" alt="" width={38} height={38} priority/><b>Clovo</b></Link>
      <Link href="/" className={styles.back}><ArrowLeft/> Tilbake til forsiden</Link>
    </nav>

    <section className={styles.shell}>
      <aside className={styles.intro}>
        <span className={styles.kicker}><MessageSquareText/> Kontakt Clovo</span>
        <h1>Hva kan vi hjelpe deg med?</h1>
        <p>Fortell oss kort hva henvendelsen gjelder. Jo mer relevant informasjon du legger ved, desto bedre kan vi forberede svaret.</p>

        <div className={styles.infoCards}>
          <article><Mail/><div><b>Riktig person svarer</b><span>Henvendelsen sendes direkte til Clovo-teamet.</span></div></article>
          <article><Clock3/><div><b>Rask oppfølging</b><span>Vi svarer normalt innen 1–2 virkedager.</span></div></article>
          <article><ShieldCheck/><div><b>Trygg behandling</b><span>Opplysningene brukes kun til å følge opp spørsmålet.</span></div></article>
        </div>
      </aside>

      <section className={styles.formCard}>
        <div className={styles.formHeading}><span>Send en henvendelse</span><h2>Fortell oss hva du lurer på</h2><p>Felter merket med * må fylles ut.</p></div>
        <ContactForm/>
      </section>
    </section>
  </main>;
}
