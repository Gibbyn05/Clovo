"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, CheckCircle2, LoaderCircle } from "lucide-react";
import styles from "./contact.module.css";

export function ContactForm() {
  const [status,setStatus] = useState<"idle"|"sending"|"success"|"error">("idle");
  const [message,setMessage] = useState("");

  async function submit(event:FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setMessage("");
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch("/api/contact",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(payload)});
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Henvendelsen kunne ikke sendes.");
      form.reset();
      setStatus("success");
    } catch(error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Noe gikk galt. Prøv igjen.");
    }
  }

  if (status === "success") return <div className={styles.success} role="status"><i><CheckCircle2/></i><h3>Takk for henvendelsen</h3><p>Spørsmålet er sendt til Clovo-teamet. Vi svarer så snart vi kan.</p><button type="button" onClick={()=>setStatus("idle")}>Send en ny henvendelse</button></div>;

  return <form className={styles.form} onSubmit={submit}>
    <input className={styles.honeypot} name="website" tabIndex={-1} autoComplete="off" aria-hidden="true"/>

    <div className={styles.twoColumns}>
      <label>Navn *<input name="name" required autoComplete="name" placeholder="Fornavn og etternavn"/></label>
      <label>E-post *<input name="email" type="email" required autoComplete="email" placeholder="navn@bedrift.no"/></label>
      <label>Telefon<input name="phone" type="tel" autoComplete="tel" placeholder="+47 000 00 000"/></label>
      <label>Bedrift<input name="company" autoComplete="organization" placeholder="Bedrift AS"/></label>
    </div>

    <label>Hva gjelder henvendelsen? *<select name="category" required defaultValue=""><option value="" disabled>Velg kategori</option><option>Produkt og funksjoner</option><option>Priser og pakker</option><option>Eksisterende henvendelse</option><option>Samarbeid</option><option>Teknisk spørsmål</option><option>Annet</option></select></label>
    <label>Emne *<input name="subject" required maxLength={140} placeholder="Kort oppsummering av spørsmålet"/></label>
    <label>Melding *<textarea name="message" required rows={7} maxLength={5000} placeholder="Beskriv spørsmålet og ta med informasjon som er relevant for at vi skal kunne hjelpe deg."/></label>

    <label className={styles.consent}><input type="checkbox" name="consent" required/><span>Jeg samtykker til at Clovo bruker opplysningene for å følge opp henvendelsen. *</span></label>
    {status === "error" && <p className={styles.error} role="alert">{message}</p>}
    <button className={styles.submit} disabled={status === "sending"}>{status === "sending" ? <><LoaderCircle className={styles.spinner}/> Sender...</> : <>Send henvendelse <ArrowRight/></>}</button>
    <p className={styles.privacy}>Opplysningene sendes kryptert og deles ikke med andre.</p>
  </form>;
}
