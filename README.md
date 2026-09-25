# Bilingual CV editor (EN/PT) with Chromium PDF export

**PT:** Editor HTML bilingue (EN/PT) com export PDF via Playwright/Chromium (não html2canvas como motor principal). Ver também [`LEIA-ME.md`](LEIA-ME.md).

## What it is

A single-file HTML resume editor with EN | PT switching, live edit/preview, and print-stable PDF export through Playwright Chromium (`page.pdf`). html2canvas / html2pdf is not the primary engine (it cropped the left edge and mishandled flex/grid headers).

The site is a **minimal Next.js App Router** app. Unauthenticated visitors only see `/login`. The editor is served after a valid session cookie.

## Requirements

- Node.js 20+ (Next.js app: `npm install` then `npm run dev` / `npm run build`)
- Python 3.10+ (local PDF export only)
- Playwright Chromium: `pip install playwright` then `python -m playwright install chromium`
- Windows: optional helper `editor/Exportar_CV_PDF.bat` (falls back to Microsoft Edge channel when Chromium is missing)

## Auth (required to use the editor)

The editor HTML is not public. `middleware.ts` redirects to `/login` unless the request carries a valid HMAC-SHA256 session cookie.

Set these environment variables in the host (local `.env.local`, or Vercel Project Settings → Environment Variables). **Do not commit values.**

| Name | Purpose |
| --- | --- |
| `AUTH_USER` | Login username |
| `AUTH_PASS` | Login password |
| `AUTH_SECRET` | Long random string used to sign the session cookie |

Cookie flags: HttpOnly, Secure, SameSite=Lax, Path=/, Max-Age 8 hours.

Sign out: `POST` `/api/logout` (GET does not clear the session — avoids logout CSRF via top-level navigation).

Copy [`.env.example`](.env.example) to `.env.local` and fill in values locally. Never put real credentials in git, README, or examples.

## Quick start

1. `npm install`
2. Create `.env.local` with `AUTH_USER`, `AUTH_PASS`, and `AUTH_SECRET` (names only here — set your own values).
3. `npm run dev` and open `http://localhost:3000`. Sign in, then the EN/PT editor loads.
4. Use **EN** / **PT** in the toolbar. **Edit** enables contenteditable fields; **Preview** shows the print layout. **Save** writes to `localStorage`; use Export/Import JSON for backups.
5. After changing `public/editor/cv_editor_caio_bilingual.html` on disk, hard-refresh (**Ctrl+F5**).

PDF export (preferred, **local only** — not run on Vercel):

```bat
cd editor
Exportar_CV_PDF.bat
```

Or:

```bash
cd editor
python export_cv_pdf.py en pt
```

The script reads `public/editor/cv_editor_caio_bilingual.html` from disk (file://), not through the password gate. Outputs land in `%USERPROFILE%\Downloads\` as `CV_Caio_Correia_EN.pdf` and `CV_Caio_Correia_PT.pdf`.

## Export notes

- The script targets the `#resume` node only.
- CSS keep-together: each `.job` uses `break-inside: avoid`; section titles and `.job-header` use `break-after: avoid` so a section/job header is not left alone at the bottom of a page without following bullets.
- Page size is A4.
- The in-editor **Export PDF** button opens the browser print dialog (Save as PDF, headers/footers off). Prefer the `.bat` / `export_cv_pdf.py` path for consistent margins.

## Samples

Reference PDFs after the 2026-09-23 keep-together fix live under [`samples/`](samples/). Regenerate them after content or layout edits.

## Deploy (Vercel)

Framework: **Next.js** (`next build` / `next start`). Set `AUTH_USER`, `AUTH_PASS`, and `AUTH_SECRET` in the Vercel dashboard for Production (and Preview if you use those deploys). This repository does not store those values.

PDF export via Playwright remains **local** (`editor/Exportar_CV_PDF.bat` / `export_cv_pdf.py`). The Vercel deployment does not run Chromium export.

The previous static rewrite `/` → editor HTML was removed so the password gate cannot be bypassed.

Production is linked to this GitHub repo under the project owner's Vercel account.

## Layout / content

Do not invent CV metrics or body text in docs. Resume content lives in `public/editor/cv_editor_caio_bilingual.html`.

## License / content

Resume body content is personal data owned by the author. This repository packages the editor tooling and sample PDFs for layout reference.
