import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, BarChart3, ImageIcon, MessageSquareQuote } from "lucide-react";
import { referenceCases } from "@/content/references";
import styles from "./references.module.css";

export const metadata = {
  title: "Referanser og kundecaser | Clovo",
  description: "Se hvordan salgsteam bruker Clovo, med dashboardbilder, erfaringer og dokumenterte resultater.",
};

export default function ReferencesPage() {
  return (
    <main className={styles.page}>
      <nav className={styles.nav}>
        <Link href="/" className={styles.logo} aria-label="Clovo forside">
          <Image src="/clovo-logo.png" alt="" width={38} height={38} priority />
          <b>Clovo</b>
        </Link>
        <Link href="/" className={styles.back}><ArrowLeft /> Tilbake til forsiden</Link>
      </nav>

      <header className={styles.hero}>
        <span className={styles.kicker}>Referanser og vårt arbeid</span>
        <h1>Bygget for måten<br />salgsteam faktisk jobber.</h1>
        <p>Her samler vi ekte kundecaser med bilder av løsningen, kundens egne erfaringer og resultatene arbeidet har skapt.</p>
      </header>

      {referenceCases.length > 0 ? (
        <section className={styles.cases} aria-label="Kundecaser">
          {referenceCases.map((reference, index) => (
            <article className={styles.case} key={reference.slug}>
              <div className={styles.caseCopy}>
                <div className={styles.caseMeta}><span>{reference.company}</span><i />{reference.industry}</div>
                <h2>{reference.title}</h2>
                <p>{reference.summary}</p>

                {reference.results && reference.results.length > 0 && (
                  <dl className={styles.results}>
                    {reference.results.map(result => <div key={result.label}><dt>{result.value}</dt><dd>{result.label}</dd></div>)}
                  </dl>
                )}

                {reference.quote && (
                  <blockquote>
                    <MessageSquareQuote aria-hidden="true" />
                    <p>“{reference.quote.text}”</p>
                    <footer><b>{reference.quote.name}</b><span>{reference.quote.role}, {reference.company}</span></footer>
                  </blockquote>
                )}
              </div>

              <div className={styles.gallery}>
                {reference.dashboardImages.map((image, imageIndex) => (
                  <figure className={imageIndex === 0 ? styles.primaryImage : styles.secondaryImage} key={image.src}>
                    <Image src={image.src} alt={image.alt} fill sizes={index === 0 ? "(max-width: 800px) 100vw, 55vw" : "(max-width: 800px) 100vw, 45vw"} />
                  </figure>
                ))}
              </div>
            </article>
          ))}
        </section>
      ) : (
        <section className={styles.empty}>
          <div className={styles.emptyVisual} aria-hidden="true">
            <div className={styles.mockWindow}>
              <div className={styles.mockTop}><span /><span /><span /></div>
              <div className={styles.mockBody}>
                <div className={styles.mockSidebar} />
                <div className={styles.mockContent}>
                  <div className={styles.mockStats}><i /><i /><i /></div>
                  <div className={styles.mockChart}><BarChart3 /></div>
                </div>
              </div>
            </div>
            <span className={styles.imageBadge}><ImageIcon /> Dashboardbilder</span>
            <span className={styles.quoteBadge}><MessageSquareQuote /> Kundens erfaring</span>
          </div>

          <div className={styles.emptyCopy}>
            <span>Første kundecase</span>
            <h2>Arbeidet dokumenteres nå.</h2>
            <p>Vi publiserer den første referansen når bilder, kundesitat og resultater er godkjent. Ingen oppdiktede omtaler eller eksempelkunder vises her.</p>
            <Link href="/kontakt">Vil du bli referansekunde? <ArrowRight /></Link>
          </div>
        </section>
      )}

      <section className={styles.cta}>
        <div><span>Et dashboard bygget rundt deres arbeidsflyt</span><h2>La oss lage den neste casen sammen.</h2></div>
        <Link href="/demo">Bestill demo <ArrowRight /></Link>
      </section>
    </main>
  );
}
