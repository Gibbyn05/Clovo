import { NextResponse } from "next/server";

const requiredFields = ["name", "email", "company", "teamSize", "timeline", "package", "roles", "salesProcess", "dashboardNeeds", "consent"] as const;

function text(value: unknown, max = 3000) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, character => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;",
  })[character] || character);
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Ugyldig innsending." }, { status: 400 });
  }

  if (text(body.website)) return NextResponse.json({ ok: true });

  const data = Object.fromEntries(Object.entries(body).map(([key, value]) => [key, text(value)]));
  if (requiredFields.some(field => !data[field])) {
    return NextResponse.json({ error: "Fyll ut alle obligatoriske felt." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return NextResponse.json({ error: "Skriv inn en gyldig e-postadresse." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "E-posttjenesten er ikke aktivert ennå. Prøv igjen senere." },
      { status: 503 },
    );
  }

  const fields = [
    ["Navn", data.name], ["E-post", data.email], ["Telefon", data.phone || "Ikke oppgitt"],
    ["Bedrift", data.company], ["Teamstørrelse", data.teamSize], ["Ønsket pakke", data.package], ["Tidsplan", data.timeline],
    ["Roller", data.roles || "Ikke oppgitt"], ["Dagens verktøy", data.currentTools || "Ikke oppgitt"],
    ["Salgsprosess", data.salesProcess], ["Behov i dashboardet", data.dashboardNeeds],
    ["Annet", data.notes || "Ikke oppgitt"],
  ];
  const html = `
    <div style="font-family:Arial,sans-serif;max-width:680px;margin:auto;color:#1b1b1d">
      <div style="border-bottom:3px solid #ff5b35;padding:24px 0"><h1 style="margin:0">Ny demohenvendelse fra Clovo</h1></div>
      ${fields.map(([label, value]) => `<div style="padding:16px 0;border-bottom:1px solid #eee"><strong>${escapeHtml(label)}</strong><div style="margin-top:6px;white-space:pre-wrap">${escapeHtml(value)}</div></div>`).join("")}
    </div>`;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CLOVO_FROM_EMAIL || "Clovo <onboarding@resend.dev>",
      to: [process.env.DEMO_TO_EMAIL || "post@reachr.no"],
      reply_to: data.email,
      subject: `Ny Clovo-demo: ${data.company}`,
      html,
    }),
  });

  if (!response.ok) {
    console.error("Resend failed", response.status, await response.text());
    return NextResponse.json({ error: "Henvendelsen kunne ikke sendes. Prøv igjen." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
