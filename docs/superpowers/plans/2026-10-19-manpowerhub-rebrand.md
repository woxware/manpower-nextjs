# ManpowerHub Rebrand Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove every trace of the Craftly AI identity from this front end and land the **ManpowerHub** brand from https://stage-manpower.woxware.io/ — emerald accent + slate neutrals, "ManpowerHub" naming, and a rebuilt mark/wordmark — on a dedicated branch.

**Architecture:** Colour changes flow from one choke point: `styles/tokens.css` (authoritative vars) → `styles/globals.css` (shadcn alias block: `--primary`, `--ring`, `--sidebar-primary`, `--color-*` → `var(--border-focus)` etc.) → every component. Ambient/module colours live in `components/shared/ambient/palette.ts` (single source, test-pinned). Brand art flows through `components/shared/brand-lockup.tsx` (`BrandLockup` / `BrandLockupLink`, used by sidebar, auth shell, onboarding shell, legal pages). The wordmark stops being an image and becomes a text lockup, so no font-dependent SVG is needed.

**Tech Stack:** Next.js 15 App Router, React 19, TypeScript, Tailwind v4 + CSS custom properties, shadcn/ui (Base preset), vitest, Storybook, `@react-pdf/renderer` (opaque hexes only), Playwright (asset rendering + screenshots).

**Spec:**
- Colour fact base: `/private/var/folders/py/8gsjhhtx1lnd40w1x2xbsjz40000gn/T/opencode/manpowerhub-brand-facts.html` (8 sections: target colours, current colours, contrast, proposed mapping, spread, brand facts, files, gotchas). Open it before starting.
- Live reference: https://stage-manpower.woxware.io/ (`:root` block of `/_astro/index@_@astro.CJKpAli8.css`).
- User decisions (locked): scope = **colours + name + logo**; **full slate swap** of neutrals; logo = **rebuild mark + text wordmark**; fonts = **keep Chillax + Inter** (no DM Sans).

## Global Constraints

- Work only on branch `rebrand/manpowerhub`. **Never commit `lib/layout/nav-registry.ts`** (unrelated pending user changes) or `.scratch-worker-form-mockup/`, `.scratch-worker-header-mockup/`.
- Do not change: radii, spacing, motion/easing, layout dimensions, `--success` / `--warning` / `--danger` / `--info` semantics, shadows, overlays.
- Do not change: domains, emails, MCP origin, routes (`/auth/login` stays), mock seed data (`mock-db.json`, `lib/mock/seed.ts`).
- **`config/nav.ts:79` and `components/layout/sidebar.tsx:113` label a sidebar *section* "Manpower" (Workers/Suppliers/Project clients). That is not the brand — leave it.**
- In components, prefer replacing a literal with `var(--token)` over writing a new literal. Where a literal is unavoidable (react-pdf styles, SVG attributes, JS gradient arrays, Storybook args) use the exact hexes from the mapping tables below.
- `@react-pdf/renderer` and `document-sheet.css` print surfaces: **opaque hexes only** — `#RRGGBBAA` alpha hexes are not supported by react-pdf.
- Tests that pin colour/name must be updated in the same task: `components/shared/ambient/palette.test.ts`, `lib/ai-panel/suggestions.test.ts`.
- Every task ends green: `npm test` + `npm run lint` before the commit.

## Canonical colour mapping (all values observed/proposed in the artifact)

**Accent — light (`styles/tokens.css` `[data-theme="light"]`)**

| token | now | new |
|---|---|---|
| `--border-focus` | `#3550E0` | `#10B981` |
| `--accent` | `#3550E0` | `#10B981` |
| `--accent-hover` | `#2D45C8` | `#059669` |
| `--accent-press` | `#2638B0` | `#047857` |
| `--accent-soft` | `#EAEEFC` | `#ECFDF5` |
| `--accent-soft-2` | `#DCE3F9` | `#D1FAE5` |
| `--accent-ring` | `rgba(53,80,224,.22)` | `rgba(16,185,129,.30)` |
| `--chart-1…5` | `#3550E0 #6E83F0 #B0BCF6 #1F8A52 #B36A12` | `#10B981 #6366F1 #0EA5E9 #F59E0B #EF4444` |

**Accent — dark (`[data-theme="dark"]`)**

| token | now | new |
|---|---|---|
| `--border-focus` | `#6E83F0` | `#34D399` |
| `--accent` | `#6E83F0` | `#34D399` |
| `--accent-hover` | `#8194F3` | `#2DD4A7` |
| `--accent-press` | `#5A71EC` | `#10B981` |
| `--accent-soft` | `#1B2244` | `#0B2A21` |
| `--accent-soft-2` | `#232C58` | `#103D2E` |
| `--accent-ring` | `rgba(110,131,240,.30)` | `rgba(52,211,153,.32)` |
| `--chart-1…5` | `#6E83F0 #8FA1F4 #4C5FB8 #3FB87D #E0995E` | `#34D399 #818CF8 #38BDF8 #FBBF24 #F87171` |

**Neutrals — light (full slate swap)**

| token | now | new | solid equivalent (PDF/SVG literals) |
|---|---|---|---|
| `--bg-canvas` / `--panel` | `#FBFBF9` | `#F8FAFC` | `#F8FAFC` |
| `--bg-subtle` | `#F4F4F1` | `#F1F5F9` | `#F1F5F9` |
| `--bg-sunken` | `#EFEFEC` | `#E2E8F0` | `#E2E8F0` |
| `--border` | `#ECECE7` | `#11182714` | `#EBEEF2` |
| `--border-strong` | `#D9D9D2` | `#11182721` | `#DADFE6` |
| `--frame` | `#E9E9E4` | `#E2E8F0` | `#E2E8F0` |
| `--fg` | `#14161A` | `#111827` | `#111827` |
| `--fg-2` | `#54585F` | `#4B5563` | `#4B5563` |
| `--fg-3` | `#898E96` | `#9CA3AF` | `#9CA3AF` |

`--bg-surface #FFFFFF`, `--fg-on-accent #FFFFFF`, shadows, `--bg-overlay`, semantic colours: **unchanged**. Dark-theme surfaces (`#0E0F12`, `#16181C`, …) unchanged — they already match the site's dark ramp.

**Ambient palette (`components/shared/ambient/palette.ts`)**

| key | now | new |
|---|---|---|
| `blue` (rename concept: brand) | `#3550E0` | `#10B981` |
| `violet` | `#7C5CFF` | `#6366F1` (site indigo) |
| `teal` | `#12B5A6` | `#0EA5E9` (site sky) |
| `amber` | `#F5A524` | `#F59E0B` (site amber) |
| `rose` | `#F2557A` | `#EF4444` (site red) |
| `GRADIENT_STOPS` | blue→violet→rose | `#10B981 → #6366F1 → #0EA5E9` |

**Literal sweep (repo-wide, opaque where required)** — `#3550E0→#10B981`, `#2D45C8→#059669`, `#2638B0→#047857`, `#EAEEFC→#ECFDF5`, `#DCE3F9→#D1FAE5`, `#6E83F0→#34D399` (dark/gradient contexts) or `#6366F1` (gradient midpoint), `#8194F3→#2DD4A7`, `#5A71EC→#10B981`, `#B0BCF6→#7DD3FC` (pale sky for the soft timeline bar), `rgba(53,80,224,…)→rgba(16,185,129,…)`; neutrals per the table above; `#F8F8F6→#F8FAFC`.

**Names:** `siteConfig.name` → `ManpowerHub`; visible brand strings → `ManpowerHub`. Out of scope: domains/emails.

**Assets:** `public/images/branding/icon.svg` (new) + `icon.png` (regenerated 561×561 from it) = emerald tile, radius ≈26/100, white cube glyph `M12 2L4 7v10l8 5 8-5V7L12 2z` + `M12 2v20M4 7l8 5 8-5` stroke-width 2 round. Delete Craftly leftovers `typeface-dark.svg`, `typeface-white.svg`, `logo-icon-default.svg`, `logo-icon-white.svg` once nothing references them.

## Review Focus

- Light **and** dark themes: primary buttons, focus rings, selected nav, tabs, charts, badges must all be emerald with no blue surviving (`grep -ri "3550e0\|2d45c8\|2638b0\|6e83f0\|eaeefc\|dce3f9"` → clean outside git history).
- Documents: statement/proposal sheets and generated PDFs must render emerald accents with **no alpha-hex regressions** (react-pdf would fail at runtime).
- Favicon/OG/sidebar mark must no longer show the Craftly "C"; wordmark must read **ManpowerHub** on light *and* dark theme, expanded *and* collapsed sidebar, and inside auth/onboarding/legal shells.
- `grep -ri craftly` → zero matches; `grep -ri "CraftlyAi"` → zero.
- Sidebar section heading still reads **"Manpower"** (must not become "ManpowerHub").

---

### Task 0: Branch

- [x] **Step 1:** `git switch -c rebrand/manpowerhub` from `main`; confirm `git status` still shows only the user's pending `lib/layout/nav-registry.ts` + scratch dirs (never staged, never committed).
- [x] **Step 2:** Record baseline: `npx vitest run` = 200/202 files pass (the 1 failure is `lib/layout/nav-registry.test.ts`, caused by the user's own pending `nav-registry.ts` change — left untouched); `npm run lint` exit 0 with pre-existing warnings only.

### Task 1: Colour tokens (`styles/tokens.css`)

- [x] **Step 1:** Apply the light + dark accent tables and the light neutral table exactly as written above; update the file-header comment ("Muted blue accent" → ManpowerHub emerald).
- [x] **Step 2:** Update `styles/globals.css:402` comment text that names `#3550E0` / `#6E83F0` (comment only — the alias block itself is unchanged and must stay).
- [x] **Step 3:** `npm test` + `npm run lint`, then commit `feat(brand): ManpowerHub colour tokens — emerald accent, slate neutrals`.

### Task 2: Ambient palette + onboarding step colours + tests

- [x] **Step 1:** Apply the ambient table in `components/shared/ambient/palette.ts` (keep exported key names `blue/violet/teal/amber/rose` so imports don't break; update the doc comment).
- [x] **Step 2:** `components/onboarding/onboarding-complete-loader.tsx` — `STEP_COLOR` workspace → `#10B981`, `client` → `#6366F1`, `invoicing` → `#0EA5E9`, `dashboard` → `#F59E0B`, `ready` → `#EF4444`; update the comment "brand blue" → "brand green".
- [x] **Step 3:** Update `components/shared/ambient/palette.test.ts` expected hexes and the gradient-order test; `GRADIENT_STOPS` is now `#10B981 → #6366F1 → #0EA5E9`.
- [x] **Step 4:** `npm test` green → commit `feat(brand): ambient palette + onboarding steps → ManpowerHub greens`.

### Task 3: Sweep accent literals (24 files)

- [x] **Step 1:** `styles/document-sheet.css` — `--sheet-accent` and all `#3550e0` / `#DCE3F9` rules → new values (`--sheet-accent: #10B981`, border `#D1FAE5`).
- [x] **Step 2:** DOM/gradient literals (21 files swept case-insensitively; headline gradients in `gradient-text.tsx` + loader corrected to `#10B981 → #6366F1 → #0EA5E9` to match `GRADIENT_STOPS`; 4-stop bars keep the red ending) → `var(--…)` where a token exists, else new hex: `components/shared/ambient/gradient-text.tsx`, `components/shared/gradient-avatar.tsx`, `components/onboarding/onboarding-complete-loader.tsx` (gradients, `bg-[#10B981]/10`, `text-[#10B981]`, aurora), `components/onboarding/brand-kit-form.tsx` + `.stories.tsx` (default swatch), `components/auth/auth-shell.tsx` gradient, `components/layout/more-sheet.tsx`, `lib/layout/account.ts`, `components/features/documents/**` (`doc-brandmark`, `document-paper`, sheets, fixtures).
- [x] **Step 3:** PDF outputs (opaque hex only): `lib/pdf/document-pdf.tsx`, `lib/pdf/sheet-pdf.tsx`, `lib/pdf/sheet-model.ts`, `lib/pdf/proposal-pdf.tsx` — `#3550E0→#10B981`, `#EAEEFC→#ECFDF5`, `#14161A→#111827`, `#6E83F0→#6366F1`.
- [x] **Step 4:** `grep -ri "3550e0\|2d45c8\|2638b0\|eaeefc\|dce3f9"` → clean (case-insensitive, excluding `.next/`, `node_modules/`, git history).
- [x] **Step 5:** `npm test` + `npm run lint` → commit `refactor(brand): sweep accent-blue literals to ManpowerHub emerald`.

### Task 4: Sweep neutral literals (full slate swap)

- [x] **Step 1:** Apply the solid-equivalent column of the neutral table across `app/ components/ lib/ config/ hooks/` — `#14161A→#111827`, `#54585F→#4B5563`, `#898E96→#9CA3AF`, `#FBFBF9→#F8FAFC`, `#F4F4F1→#F1F5F9`, `#EFEFEC→#E2E8F0`, `#ECECE7→#EBEEF2`, `#D9D9D2→#DADFE6`, `#E9E9E4→#E2E8F0`, `#F8F8F6→#F8FAFC` (PDF/SVG contexts keep solid values; CSS contexts may use `var(--…)`).
- [x] **Step 2:** Audit grep returns 0 (the 8 `rgba(20,22,26,…)` shadow values are intentional per Global Constraints); `grep -ri` "14161a\|54585f\|898e96\|ecece7\|d9d9d2\|fbfbf9\|f4f4f1\|efefec"` → clean outside `.next/` and `node_modules/`.
- [x] **Step 3:** `npm test` + `npm run lint` → commit `refactor(brand): slate neutrals sweep`.

### Task 5: Name → ManpowerHub

- [x] **Step 1:** `config/site.ts` → `name: "ManpowerHub"`, `description` → ManpowerHub-appropriate copy. This rewrites every `<title>` via `appTitleTemplate` (`%s | ManpowerHub`).
- [x] **Step 2:** Visible brand strings (swept 51 files with a `Manpower(?!Hub)` word replace; skipped: the two `Manpower` sidebar *section* labels (`config/nav.ts:79`, `sidebar.tsx:113`), 16 Storybook tenant fixtures (`Manpower Studio`/`FZ-LLC` — demo customer, not the app), `lib/mock/seed.ts`, `supplier.test.ts`. Legal copy brand names updated; **domains/emails left untouched** per scope.) `components/auth/auth-shell.tsx:47` (`Manpower · v1`), `components/auth/auth-shell.tsx:44` + `components/onboarding/onboarding-page-shell.tsx:74` + `components/legal/legal-document-page.tsx:70` (`© {year} Manpower`), `components/layout/app-header.tsx:86` fallback, `components/layout/sidebar.tsx` aria-label/alt (3 places), `components/shared/brand-lockup.tsx` aria-labels, `components/onboarding/brand-kit-form.tsx:740`, `lib/clients/client-name-form-copy.ts:24`, `app/global-error.tsx:13`, `lib/pdf/document-pdf.tsx` `creator="Manpower"` (×3), `app/(marketing)/*/page.tsx` metadata descriptions, `lib/ai-panel/suggestions.ts:24` `pageLabel: "Manpower"` → `"ManpowerHub"`.
- [x] **Step 3:** Tests: `lib/ai-panel/suggestions.test.ts:36` (source + expectation → `ManpowerHub`; `export-data.test.ts` substring assertion still passes; `command-palette.test.ts` negative assertion unaffected). Also refreshed stale "brand blue" comments → "brand green" (4 files). → expect `"ManpowerHub"`; confirm `lib/account/export-data.test.ts:61` still passes (substring match) and `components/layout/command-palette.test.ts:27` still passes. **Do not touch** `config/nav.ts` / `sidebar.tsx:113` section label.
- [x] **Step 4:** `npm test` + `npm run lint` → commit `feat(brand): app name → ManpowerHub`.

### Task 6: Logo assets + text wordmark

- [x] **Step 1:** Create `public/images/branding/icon.svg` — 100×100 emerald (`#10B981`) rounded tile (r=26) with the site's white cube/hex glyph (stroke `#FFFFFF`, width 6, round caps/joins, scaled from the 24-unit viewBox).
- [x] **Step 2:** Regenerate `public/images/branding/icon.png` at 561×561 from that SVG — rendered with `rsvg-convert -w 561 -h 561` (alpha preserved; visually verified: emerald tile, white cube, no Craftly C).
- [x] **Step 3:** `config/branding.ts` — keep `appIcon`/`mark` → `icon.png`; **drop** `wordmarkOnLightBg` / `wordmarkOnDarkBg`.
- [x] **Step 4:** `components/shared/brand-lockup.tsx` — replace the two wordmark `<Image>`s with a text lockup: `<span>` "ManpowerHub", `font-semibold tracking-tight`, colour `var(--fg)` (auto-flips per theme), sized to the current `h-[1.125rem] sm:h-5` box; keep the mark `<Image>`; update `aria-label`/alt. Export a `Wordmark` sub-component for reuse.
- [x] **Step 5:** `components/layout/sidebar.tsx` inline wordmark block (lines ~385–400) → the shared `Wordmark`; keep the collapsed/expanded behaviour and the `dark:hidden` semantics via `var(--fg)`.
- [x] **Step 6:** Deleted `typeface-dark.svg`, `typeface-white.svg`, `logo-icon-default.svg`, `logo-icon-white.svg` — grep confirmed only `config/branding.ts` referenced them, and that file no longer exports the keys.
- [x] **Step 7:** Update Storybook copy that describes image wordmarks: `components/shared/brand-lockup.stories.tsx`, `components/layout/sidebar.stories.tsx:85`.
- [x] **Step 8:** `tsc --noEmit` clean, `npm test` green (only the pre-existing nav-registry failure), lint clean, `npm run build` exit 0 → commit `feat(brand): ManpowerHub mark + text wordmark, drop Craftly assets`.

### Task 7: Docs

- [ ] **Step 1:** `docs/README.md:18` — remove the Craftly provenance line; `README.md`/`docs/README.md` titles and intro → ManpowerHub; `docs/user-guide.md:3` "every screen in Manpower" → ManpowerHub.
- [ ] **Step 2:** `grep -ri craftly` → zero matches repo-wide.
- [ ] **Step 3:** Commit `docs: Craftly → ManpowerHub`.

### Task 8: Verification

- [ ] **Step 1:** `npm test`, `npm run lint`, `npm run build` — all green.
- [ ] **Step 2:** `npm run dev` + screenshots (light + dark): dashboard, sidebar expanded/collapsed, login (`/auth/login`), onboarding loader, a document sheet, a chart-heavy page, favicon in the tab bar. Compare against the artifact's target palette.
- [ ] **Step 3:** Grep audits: `3550e0|2d45c8|2638b0|6e83f0|eaeefc|dce3f9|14161a|898e96|54585f|ecece7` clean; `craftly` clean; sidebar section label still "Manpower".
- [ ] **Step 4:** Confirm `git log` on `rebrand/manpowerhub` contains no `lib/layout/nav-registry.ts` and no `.scratch-*` paths; report summary + screenshots to the user.
