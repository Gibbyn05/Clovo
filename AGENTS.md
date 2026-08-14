# Repository Guidelines

## Project Structure & Module Organization

Clovo is a Next.js 14 App Router project written in TypeScript. Route-level UI lives in `app/`; each page keeps its CSS Module beside the relevant `page.tsx`. API handlers are under `app/api/`, including contact, demo, and Cal.com webhook endpoints. Reusable React components live in `components/`, with generic primitives in `components/ui/` and larger landing-page sections in `components/blocks/`. Static assets belong in `public/`; customer reference images are grouped in `public/references/`.

Use the `@/` alias for imports from the repository root. Keep route-specific code close to its route and extract a component only when it is reused or materially simplifies the page.

## Build, Test, and Development Commands

- `npm install`: install dependencies from `package-lock.json`.
- `npm run dev`: start the local Next.js server at `http://localhost:3000`.
- `npm run build`: run the production build, TypeScript checks, and route generation. This is the required pre-commit verification.
- `npm run start`: serve an already-built production bundle.
- `npm run lint`: run the configured Next.js lint command.

## Coding Style & Naming Conventions

Use strict TypeScript and React function components. Follow the existing two-space indentation in formatted files. Name components in PascalCase, functions and variables in camelCase, and route folders in lowercase Norwegian slugs, for example `app/referanser/`. Use kebab-case filenames for shared components, such as `hero-dashboard.tsx`, and pair them with `*.module.css`.

Prefer semantic HTML, accessible labels, keyboard-operable controls, and responsive layouts without horizontal scrolling. Keep customer-facing copy in Norwegian unless a route explicitly targets another language. Never place secrets or API keys in source files.

### Icons

Use Phosphor Icons through `@phosphor-icons/react` for all new icons and whenever an existing interface is updated. Import icons individually and choose a consistent weight within each surface, normally `regular` or `bold`. Give decorative icons `aria-hidden="true"`; provide an accessible label when an icon is the only content of an interactive control. Do not introduce new Lucide icons, custom SVG icon sets, or text symbols as icon substitutes. Migrate nearby legacy icons to Phosphor when practical so a component does not mix visual icon styles.

### Landing Page Assets

Store generated landing-page illustrations in `assets/landing/` using descriptive kebab-case filenames. Use `next/image` with explicit dimensions or a stable aspect ratio, responsive `sizes`, and meaningful Norwegian alternative text. Keep all illustrations within the established Clovo palette and visual system. Generated assets must not contain embedded text, logos, watermarks, fake interface labels, or generic stock-photo compositions. Prefer transparent or warm neutral backgrounds. Do not replace useful product UI or interactive demonstrations with decorative imagery.

## Testing Guidelines

No automated test framework is currently configured. For every change, run `npm run build` and manually verify affected routes at desktop and mobile widths. Test form validation, navigation, API error states, and read-only dashboard interactions. If tests are introduced, colocate them as `*.test.ts` or `*.test.tsx` near the code they cover.

## Commit & Pull Request Guidelines

Recent history uses short, imperative commit subjects, for example `Improve dashboard example card contrast`. Keep each commit focused on one coherent change. Pull requests should include a concise summary, verification steps, linked issue when applicable, and before/after screenshots for visual changes. Call out new environment variables, API behavior, or deployment considerations explicitly.
