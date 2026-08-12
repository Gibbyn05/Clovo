# Reachr – landingsside

Frittstående markedsside for Reachr-plattformen (custom salgsdashboard), bygget
med Next.js 14 (App Router). Selve CRM-appen kjøres i et eget prosjekt på egne
kunde-domener – dette repoet inneholder **kun** den offentlige landingssiden.

## Kom i gang

```bash
npm install
npm run dev
```

Åpne http://localhost:3000

## Bygg for produksjon

```bash
npm run build
npm start
```

## Struktur

- `app/page.tsx` – hele landingssiden
- `app/landing.module.css` – all styling (CSS-modul, mørkt tema)
- `app/layout.tsx` – rot-layout, laster Inter-fonten
- `app/globals.css` – minimal reset

## Konfigurasjon

«Logg inn»-lenkene styres av konstanten `LOGIN_URL` øverst i `app/page.tsx`.
Sett den til appens innloggings-URL når den er bestemt, f.eks.
`https://app.dittdomene.no/login`. «Bestill demo» åpner en e-post til
`post@reachr.no`.

## Deploy

Klar for Vercel: importer repoet, ingen miljøvariabler kreves.
