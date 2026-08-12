import Link from "next/link";
import styles from "./landing.module.css";

// Landingssiden er en frittstående markedsside. Appen (CRM-en) kjøres på egne
// kunde-domener, så «Logg inn» peker ut av dette prosjektet. Sett denne til
// riktig innloggings-URL når den er bestemt, f.eks.
// "https://app.dittdomene.no/login".
const LOGIN_URL = "/login";
const DEMO_MAILTO = "mailto:post@reachr.no?subject=Jeg ønsker en demo av plattformen";

const DemoButton = ({ compact = false }: { compact?: boolean }) => (
  <a className={compact ? styles.navCta : styles.primaryCta} href={DEMO_MAILTO}>
    Bestill demo <span aria-hidden="true">↗</span>
  </a>
);

type IconName =
  | "layout"
  | "wand"
  | "shield"
  | "chart"
  | "pipeline"
  | "users"
  | "lock"
  | "search"
  | "upload"
  | "rocket"
  | "check"
  | "arrow";

const Icon = ({ name }: { name: IconName }) => {
  const paths: Record<IconName, React.ReactNode> = {
    layout: (
      <>
        <path d="M4 5h16v14H4z" />
        <path d="M4 10h16M10 10v9" />
      </>
    ),
    wand: (
      <>
        <path d="m15 4 1.5 3L20 8.5l-3.5 1.4L15 13l-1.5-3.1L10 8.5 13.5 7z" />
        <path d="M4 20 13 11" />
      </>
    ),
    shield: (
      <>
        <path d="M12 3 5 6v5.5c0 4.4 2.8 7.3 7 9 4.2-1.7 7-4.6 7-9V6z" />
        <path d="m9.2 12 1.8 1.8 4-4" />
      </>
    ),
    chart: <path d="M4 20V8M10 20V4M16 20v-7M22 20H2" />,
    pipeline: (
      <>
        <circle cx="5" cy="6" r="2" />
        <circle cx="19" cy="12" r="2" />
        <circle cx="8" cy="19" r="2" />
        <path d="M7 6h5a3 3 0 0 1 3 3 3 3 0 0 0 3 3M17.5 14c-1.1 3-3.5 5-7.5 5" />
      </>
    ),
    users: (
      <>
        <path d="M16 20v-1.5a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4V20" />
        <circle cx="9.5" cy="7.5" r="3.5" />
        <path d="M21 20v-1a3.5 3.5 0 0 0-2.8-3.4M16.5 4.3a3.4 3.4 0 0 1 0 6.4" />
      </>
    ),
    lock: (
      <>
        <rect x="5" y="10" width="14" height="10" rx="2" />
        <path d="M8 10V7a4 4 0 0 1 8 0v3" />
      </>
    ),
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
      </>
    ),
    upload: (
      <>
        <path d="M12 16V4m0 0-4 4m4-4 4 4" />
        <path d="M4 20h16" />
      </>
    ),
    rocket: (
      <>
        <path d="M5 15c-1 1-1.5 4-1.5 4s3-.5 4-1.5a2.1 2.1 0 0 0-2.5-2.5z" />
        <path d="M9 12c1.5-4 4-7 9-8 .3 4.5-1.5 8-6 9.5z" />
        <path d="m9 12 3 3" />
      </>
    ),
    check: <path d="m5 12 4.5 4.5L19 7" />,
    arrow: <path d="M5 12h14m0 0-6-6m6 6-6 6" />,
  };

  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name]}
    </svg>
  );
};

// --- Data ---------------------------------------------------------------

const trustPoints = [
  "Ferdig oppsett fra dag én",
  "Tilpasses underveis",
  "Eget isolert område per kunde",
];

const features = [
  {
    icon: "layout" as const,
    title: "Custom dashboard",
    copy: "Vi setter opp dashboardet slik teamet faktisk skal bruke det – ikke en standardmal alle må presse seg inn i.",
  },
  {
    icon: "pipeline" as const,
    title: "Egen salgsprosess",
    copy: "Pipeline, kundereise og salgsflyt bygges rundt produktene og måten teamet selger på.",
  },
  {
    icon: "users" as const,
    title: "Team og roller",
    copy: "Selgere ser sin egen arbeidsflate, ledere ser hele teamet. Tilgang styres per rolle.",
  },
  {
    icon: "wand" as const,
    title: "Endres underveis",
    copy: "Flytt widgets, skjul sider, endre farger og rekkefølge, og tilpass arbeidsflyten etter hvert.",
  },
  {
    icon: "chart" as const,
    title: "Analyse og innsikt",
    copy: "Resultater per selger, periode og steg samlet – slik at ledelsen ser hva som faktisk driver salget.",
  },
  {
    icon: "shield" as const,
    title: "Adskilt per kunde",
    copy: "Hver organisasjon får isolerte brukere, filer, kunder, salg, kontrakter og sanntidsdata.",
  },
];

const setupSteps = [
  { icon: "search" as const, title: "Kartlegg", copy: "Vi går gjennom roller, mål, salgsflyt og hvilke sider teamet faktisk trenger." },
  { icon: "layout" as const, title: "Bygg", copy: "Vi setter opp dashboard, widgets, pipeline, roller, moduler og kundevisninger." },
  { icon: "rocket" as const, title: "Lever", copy: "Teamet får en ferdig arbeidsflate med riktig struktur fra dag én." },
  { icon: "wand" as const, title: "Juster", copy: "Oppsettet kan endres senere uten at dere må starte på nytt." },
];

// Ekte, anonymiserte behov vi bygger rundt – ikke oppdiktede kunder.
const needs = [
  { role: "Selger", quote: "Jeg vil se min egen arbeidsflate med mine kunder og mine tall, ikke et generisk system." },
  { role: "Salgsleder", quote: "Jeg må kunne følge hele teamet, pipeline og aktivitet på ett sted – i sanntid." },
  { role: "Daglig leder", quote: "Vi trenger et oppsett som kan endres når salgsprosessen og produktene endrer seg." },
  { role: "Operations", quote: "Dashboard, kontrakter, pipeline og aktivitet må henge sammen, ikke leve i hver sin fane." },
];

const plans = [
  {
    name: "Team",
    tagline: "For mindre salgsteam som vil ha struktur fra start.",
    points: ["Custom dashboard", "Pipeline og salgssteg", "Roller for selger og leder", "Eget isolert område"],
  },
  {
    name: "Vekst",
    tagline: "For team i vekst som trenger mer av arbeidsflaten.",
    points: ["Alt i Team", "Kontrakter og signering", "Analyse per selger og periode", "Flere roller og moduler"],
    featured: true,
  },
  {
    name: "Skala",
    tagline: "For flere avdelinger eller flere kunder i samme oppsett.",
    points: ["Alt i Vekst", "Flere organisasjoner", "Isolerte data per kunde", "Tilpasset onboarding"],
  },
];

// --- Hero-mockup (blå dashboard-klynge) ---------------------------------

function HeroCluster() {
  return (
    <div className={styles.cluster} aria-label="Eksempel på et Clovo-dashboard">
      <article className={`${styles.clusterCard} ${styles.cardStat}`}>
        <span>Totalt i pipeline</span>
        <strong>284k</strong>
        <em className={styles.trendUp}>▲ 18% denne måneden</em>
      </article>

      <article className={`${styles.clusterCard} ${styles.cardChart}`}>
        <header>
          <b>Statistikk</b>
          <span className={styles.chartLegend}>
            <i>Inn</i>
            <i className={styles.legendMuted}>Ut</i>
          </span>
        </header>
        <div className={styles.chartBars}>
          {[46, 62, 40, 78, 55, 90, 68].map((h, i) => (
            <span key={i}>
              <i style={{ height: `${h}%` }} className={i === 5 ? styles.barHot : ""} />
              <i style={{ height: `${Math.max(18, h - 28)}%` }} className={styles.barGhost} />
            </span>
          ))}
        </div>
      </article>

      <article className={`${styles.clusterCard} ${styles.cardAccount}`}>
        <div className={styles.accountAvatar} aria-hidden="true">AA</div>
        <div>
          <b>Primærkonto</b>
          <span>Aktiv · 12 åpne salg</span>
        </div>
      </article>

      <article className={`${styles.clusterCard} ${styles.cardPipeline}`}>
        <header>
          <b>Pipeline</b>
          <span>Denne uken</span>
        </header>
        <ul>
          {[["Nytt lead", true], ["Tilbud sendt", true], ["Forhandling", false], ["Vunnet", false]].map(([label, done]) => (
            <li key={label as string} className={done ? styles.stageDone : ""}>
              <span className={styles.stageDot}>{done ? <Icon name="check" /> : null}</span>
              {label}
            </li>
          ))}
        </ul>
      </article>
    </div>
  );
}

// Liten dashboard-visual gjenbrukt inne i funksjonskortene.
function FeatureVisual({ icon }: { icon: IconName }) {
  return (
    <div className={styles.featureVisual} aria-hidden="true">
      <Icon name={icon} />
    </div>
  );
}

export default function Home() {
  return (
    <main className={styles.page}>
      <header className={styles.navWrap}>
        <nav className={styles.nav} aria-label="Hovedmeny">
          <Link href="/" className={styles.logo} aria-label="Clovo forside">
            <span>+</span> CLOVO
          </Link>
          <div className={styles.navLinks}>
            <a href="#funksjoner">Funksjoner</a>
            <a href="#oppsett">Oppsett</a>
            <a href="#priser">Priser</a>
            <a href="#demo">Kontakt</a>
          </div>
          <div className={styles.navActions}>
            <a href={LOGIN_URL}>Logg inn</a>
            <DemoButton compact />
          </div>
        </nav>
      </header>

      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroGlow} />
        <div className={styles.gridMark} />
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <p className={styles.newsPill}>
              <span>Nytt</span> Bygget rundt teamet deres – ikke en mal
            </p>
            <h1>
              Alt salgsarbeidet samlet i <span>ett dashboard</span>
            </h1>
            <p className={styles.heroLede}>
              Et salgsdashboard laget rundt teamet, prosessen og målene deres. Vi setter opp første versjon, og dere kan endre sider, widgets, farger, roller og arbeidsflyt når dere vil.
            </p>
            <div className={styles.heroActions}>
              <DemoButton />
              <a href="#oppsett" className={styles.ghostCta}>
                Se oppsettet <Icon name="arrow" />
              </a>
            </div>
            <div className={styles.heroBadges}>
              {trustPoints.map((point) => (
                <span key={point}>
                  <Icon name="check" /> {point}
                </span>
              ))}
            </div>
          </div>
          <HeroCluster />
        </div>
      </section>

      {/* TRUST */}
      <section className={styles.trust} aria-label="Slik leveres plattformen">
        <p>Bygget for norske salgsteam som vil ha et system som passer måten de faktisk jobber på</p>
        <div className={styles.trustRow}>
          {trustPoints.map((point) => (
            <span key={point}>{point}</span>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section id="funksjoner" className={styles.features}>
        <div className={styles.sectionIntro}>
          <p>// FUNKSJONER</p>
          <h2>Alt teamet trenger i ett dashboard</h2>
          <p className={styles.sectionLede}>
            Samme system, forskjellig oppsett for hvert team. Her er byggeklossene vi setter sammen rundt kunden.
          </p>
        </div>
        <div className={styles.featureGrid}>
          {features.map((feature) => (
            <article key={feature.title}>
              <FeatureVisual icon={feature.icon} />
              <h3>{feature.title}</h3>
              <p>{feature.copy}</p>
            </article>
          ))}
        </div>
      </section>

      {/* SETUP + DEMO-SKJEMA */}
      <section id="oppsett" className={styles.setup}>
        <div className={styles.setupSteps}>
          <div className={styles.sectionIntro}>
            <p>// OPPSETT</p>
            <h2>Enkelt oppsett. Kraftige resultater.</h2>
          </div>
          <ol>
            {setupSteps.map((step, index) => (
              <li key={step.title}>
                <span className={styles.stepIcon}>
                  <Icon name={step.icon} />
                </span>
                <div>
                  <b>
                    {String(index + 1).padStart(2, "0")} · {step.title}
                  </b>
                  <p>{step.copy}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <form className={styles.demoForm} action={DEMO_MAILTO} method="post" encType="text/plain">
          <h3>Bestill en demo</h3>
          <p>Fortell kort om teamet, så viser vi hvordan dashboardet kan bygges for dere.</p>
          <label>
            Navn
            <input type="text" name="Navn" placeholder="Ola Nordmann" autoComplete="name" />
          </label>
          <label>
            Jobb-e-post
            <input type="email" name="E-post" placeholder="ola@bedrift.no" autoComplete="email" />
          </label>
          <label>
            Bedrift
            <input type="text" name="Bedrift" placeholder="Bedrift AS" autoComplete="organization" />
          </label>
          <button type="submit">Bestill demo</button>
          <small>Åpner e-post til post@reachr.no. Ingen forpliktelser.</small>
        </form>
      </section>

      {/* NEEDS / «TESTIMONIALS» */}
      <section className={styles.needs}>
        <div className={styles.sectionIntro}>
          <p>// KUNDEBEHOV</p>
          <h2>Det teamene faktisk ber om</h2>
          <p className={styles.sectionLede}>
            Typiske krav vi hører fra selgere, ledere og drift – og som vi bygger dashboardet rundt.
          </p>
        </div>
        <div className={styles.needsGrid}>
          {needs.map((need) => (
            <article key={need.quote} className={styles.needCard}>
              <p>“{need.quote}”</p>
              <span>{need.role}</span>
            </article>
          ))}
          <article className={styles.needHighlight}>
            <p>Ett system</p>
            <span>Dashboard, pipeline, kontrakter og sanntid henger sammen – ikke fire løsrevne verktøy.</span>
          </article>
        </div>
      </section>

      {/* PRICING */}
      <section id="priser" className={styles.pricing}>
        <div className={styles.sectionIntro}>
          <p>// PRISER</p>
          <h2>Fleksibelt for hvert team</h2>
          <p className={styles.sectionLede}>
            Prisen settes etter omfanget – roller, moduler og hvor mange organisasjoner dere trenger. Vi avklarer alt i demoen.
          </p>
        </div>
        <div className={styles.priceGrid}>
          {plans.map((plan) => (
            <article key={plan.name} className={plan.featured ? styles.priceFeatured : ""}>
              {plan.featured ? <span className={styles.priceTag}>Mest valgt</span> : null}
              <h3>{plan.name}</h3>
              <p className={styles.priceTagline}>{plan.tagline}</p>
              <div className={styles.priceAmount}>
                <strong>Tilpasset</strong>
                <span>etter omfang</span>
              </div>
              <ul>
                {plan.points.map((point) => (
                  <li key={point}>
                    <Icon name="check" /> {point}
                  </li>
                ))}
              </ul>
              <a href={DEMO_MAILTO} className={plan.featured ? styles.primaryCta : styles.ghostCta}>
                Bestill demo
              </a>
            </article>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section id="demo" className={styles.finalCta}>
        <div className={styles.gridMark} />
        <p>// DEMO</p>
        <h2>Se hvordan dashboardet kan bygges for deres team</h2>
        <div className={styles.finalActions}>
          <DemoButton />
          <a href={LOGIN_URL} className={styles.ghostCta}>
            Allerede kunde? Logg inn
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className={styles.footer}>
        <div className={styles.footerTop}>
          <div className={styles.footerBrand}>
            <Link href="/" className={styles.logo}>
              <span>+</span> CLOVO
            </Link>
            <p>Custom salgsdashboard bygget rundt kundens team, prosess og mål.</p>
          </div>
          <div className={styles.footerCols}>
            <div>
              <h4>Produkt</h4>
              <a href="#funksjoner">Funksjoner</a>
              <a href="#oppsett">Oppsett</a>
              <a href="#priser">Priser</a>
            </div>
            <div>
              <h4>Selskap</h4>
              <a href="#demo">Kontakt</a>
              <a href={DEMO_MAILTO}>Bestill demo</a>
              <a href={LOGIN_URL}>Logg inn</a>
            </div>
            <div>
              <h4>Juridisk</h4>
              <a href="#">Personvern</a>
              <a href="#">Vilkår</a>
            </div>
          </div>
        </div>
        <div className={styles.footerWordmark} aria-hidden="true">
          CLOVO
        </div>
        <div className={styles.footerBase}>
          <small>© {new Date().getFullYear()} Clovo. Alle rettigheter reservert.</small>
          <small>Bygget med Next.js</small>
        </div>
      </footer>
    </main>
  );
}
