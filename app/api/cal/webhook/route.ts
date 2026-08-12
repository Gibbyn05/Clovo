import { createHmac, timingSafeEqual } from "crypto";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

type CalPerson = { name?: string; email?: string; timeZone?: string };
type CalPayload = {
  title?: string;
  startTime?: string;
  endTime?: string;
  attendees?: CalPerson[];
  responses?: Record<string, { label?: string; value?: unknown }>;
  bookingUid?: string;
  uid?: string;
  cancellationReason?: string;
};

type CalWebhook = {
  triggerEvent?: string;
  payload?: CalPayload;
};

const notificationEvents: Record<string, string> = {
  BOOKING_CREATED: "Ny Cal.com-booking",
  BOOKING_REQUESTED: "Ny bookingforespørsel",
  BOOKING_RESCHEDULED: "Cal.com-booking flyttet",
  BOOKING_CANCELLED: "Cal.com-booking avbestilt",
  BOOKING_REJECTED: "Cal.com-booking avvist",
};

function escapeHtml(value: unknown) {
  return String(value ?? "").replace(/[&<>'"]/g, character => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;",
  })[character] || character);
}

function validSignature(rawBody: string, signature: string | null, secret: string) {
  if (!signature || !/^[a-f\d]{64}$/i.test(signature)) return false;
  const expected = createHmac("sha256", secret).update(rawBody).digest();
  const received = Buffer.from(signature, "hex");
  return expected.length === received.length && timingSafeEqual(expected, received);
}

function formatDate(value?: string) {
  if (!value) return "Ikke oppgitt";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("nb-NO", {
    dateStyle: "full", timeStyle: "short", timeZone: "Europe/Oslo",
  }).format(date);
}

export async function POST(request: Request) {
  const secret = process.env.CAL_WEBHOOK_SECRET;
  if (!secret) return NextResponse.json({ error: "Webhook er ikke konfigurert." }, { status: 503 });

  const rawBody = await request.text();
  if (!validSignature(rawBody, request.headers.get("x-cal-signature-256"), secret)) {
    return NextResponse.json({ error: "Ugyldig signatur." }, { status: 401 });
  }

  let event: CalWebhook;
  try {
    event = JSON.parse(rawBody) as CalWebhook;
  } catch {
    return NextResponse.json({ error: "Ugyldig payload." }, { status: 400 });
  }

  const eventLabel = event.triggerEvent ? notificationEvents[event.triggerEvent] : undefined;
  if (!eventLabel) return NextResponse.json({ ok: true, ignored: true });

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return NextResponse.json({ error: "E-post er ikke konfigurert." }, { status: 503 });

  const payload = event.payload ?? {};
  const attendee = payload.attendees?.[0];
  const responseFields = Object.values(payload.responses ?? {}).filter(field => field?.value != null);
  const fields: Array<[string, unknown]> = [
    ["Hendelse", eventLabel],
    ["Møte", payload.title || "Demo av Clovo"],
    ["Navn", attendee?.name || "Ikke oppgitt"],
    ["E-post", attendee?.email || "Ikke oppgitt"],
    ["Tidspunkt", formatDate(payload.startTime)],
    ["Slutt", formatDate(payload.endTime)],
    ["Tidssone", attendee?.timeZone || "Ikke oppgitt"],
    ["Booking-ID", payload.bookingUid || payload.uid || "Ikke oppgitt"],
  ];
  if (payload.cancellationReason) fields.push(["Årsak", payload.cancellationReason]);
  responseFields.forEach(field => fields.push([field.label || "Svar", Array.isArray(field.value) ? field.value.join(", ") : field.value]));

  const html = `<div style="font-family:Arial,sans-serif;max-width:680px;margin:auto;color:#1b1b1d">
    <div style="border-bottom:3px solid #ff5b35;padding:24px 0"><h1 style="margin:0">${escapeHtml(eventLabel)}</h1></div>
    ${fields.map(([label, value]) => `<div style="padding:14px 0;border-bottom:1px solid #eee"><strong>${escapeHtml(label)}</strong><div style="margin-top:6px;white-space:pre-wrap">${escapeHtml(value)}</div></div>`).join("")}
  </div>`;

  const recipients = Array.from(new Set([
    process.env.DEMO_TO_EMAIL || "post@reachr.no",
    ...(process.env.CAL_NOTIFICATION_EMAILS || "").split(","),
  ].map(email => email.trim()).filter(Boolean)));

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CLOVO_FROM_EMAIL || "Clovo <onboarding@resend.dev>",
      to: recipients,
      reply_to: attendee?.email,
      subject: `${eventLabel}: ${attendee?.name || payload.title || "Clovo-demo"}`,
      html,
    }),
  });

  if (!response.ok) {
    console.error("Cal webhook email failed", response.status, await response.text());
    return NextResponse.json({ error: "Varsling feilet." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
