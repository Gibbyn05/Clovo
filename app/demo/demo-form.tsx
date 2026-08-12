"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, CheckCircle2, LoaderCircle } from "lucide-react";
import styles from "./demo.module.css";

export function DemoForm({ initialEmail }: { initialEmail: string }) {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setMessage("");

    // Open synchronously from the submit action so browsers do not block the booking tab.
    const bookingWindow = window.open("", "_blank");
    if (bookingWindow) bookingWindow.opener = null;

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      ...Object.fromEntries(formData.entries()),
      roles: formData.getAll("roles").join(", "),
    };

    try {
      const response = await fetch("/api/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Noe gikk galt.");
      setStatus("success");
      form.reset();
      if (bookingWindow) bookingWindow.location.href = "/demo/book";
      else window.open("/demo/book", "_blank", "noopener,noreferrer");
      router.push("/demo/takk");
    } catch (error) {
      bookingWindow?.close();
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Noe gikk galt. Prøv igjen.");
    }
  }

  if (status === "success") {
    return (
      <div className={styles.success} role="status">
        <CheckCircle2 />
        <h3>Takk, henvendelsen er mottatt.</h3>
        <p>Vi går gjennom behovene deres og tar kontakt for å avtale demo.</p>
        <a href="/">Tilbake til forsiden</a>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={submit}>
      <input className={styles.honeypot} name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />

      <div className={styles.twoColumns}>
        <label>Navn *<input name="name" required autoComplete="name" placeholder="Fornavn og etternavn" /></label>
        <label>Jobb-e-post *<input name="email" type="email" required autoComplete="email" defaultValue={initialEmail} placeholder="navn@bedrift.no" /></label>
        <label>Telefon<input name="phone" type="tel" autoComplete="tel" placeholder="+47 000 00 000" /></label>
        <label>Bedrift *<input name="company" required autoComplete="organization" placeholder="Bedrift AS" /></label>
      </div>

      <div className={styles.twoColumns}>
        <label>Antall personer i salgsteamet *
          <select name="teamSize" required defaultValue="">
            <option value="" disabled>Velg størrelse</option>
            <option>1–5</option><option>6–15</option><option>16–30</option><option>31–75</option><option>76+</option>
          </select>
        </label>
        <label>Når ønsker dere å komme i gang? *
          <select name="timeline" required defaultValue="">
            <option value="" disabled>Velg tidsplan</option>
            <option>Så snart som mulig</option><option>Innen 1–3 måneder</option><option>Innen 3–6 måneder</option><option>Utforsker mulighetene</option>
          </select>
        </label>
      </div>

      <fieldset>
        <legend>Hvilke roller trenger oversikt? *</legend>
        <div className={styles.checkGrid}>
          {['Selgere','Salgsleder','Daglig leder','Administrasjon'].map(role => <label key={role}><input type="checkbox" name="roles" value={role} />{role}</label>)}
        </div>
      </fieldset>

      <label>Hva bruker dere i dag?<input name="currentTools" placeholder="For eksempel CRM, regneark eller egne systemer" /></label>
      <label>Beskriv salgsprosessen deres *<textarea name="salesProcess" required rows={4} placeholder="Hvordan kommer leads inn, hvilke steg går et salg gjennom, og når regnes det som vunnet?" /></label>
      <label>Hva skal dashboardet gi bedre oversikt over? *<textarea name="dashboardNeeds" required rows={4} placeholder="For eksempel pipeline, aktivitet per selger, prognoser, kontrakter eller måloppnåelse" /></label>
      <label>Er det noe annet vi bør vite?<textarea name="notes" rows={3} placeholder="Integrasjoner, særskilte roller, rapportering eller andre behov" /></label>

      <label className={styles.consent}>
        <input type="checkbox" name="consent" required />
        <span>Jeg samtykker til at Clovo bruker opplysningene for å følge opp demohenvendelsen. *</span>
      </label>

      {status === "error" && <p className={styles.error} role="alert">{message}</p>}
      <button className={styles.submit} disabled={status === "sending"}>
        {status === "sending" ? <><LoaderCircle className={styles.spinner} /> Sender</> : <>Send demohenvendelse <ArrowRight /></>}
      </button>
      <p className={styles.privacy}>Opplysningene sendes kryptert og deles ikke med andre.</p>
    </form>
  );
}
