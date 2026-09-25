# Changelog

## 2026-09-23

- Password gate: Next.js App Router serves the existing EN/PT editor only after an HMAC-SHA256 session cookie (`AUTH_USER` / `AUTH_PASS` / `AUTH_SECRET`). Static `/` rewrite removed so auth cannot be bypassed. Playwright PDF export remains local. Logout is POST-only so a cross-site GET cannot clear the session.

- Vercel static hosting: `vercel.json` rewrite `/` → editor HTML; Deploy section in README (PDF export stays local).

- PDF export: Playwright/Chromium native (`export_cv_pdf.py` + `Exportar_CV_PDF.bat`); html2canvas abandoned as primary engine (left-crop / header alignment fix).
- Print CSS: job blocks `break-inside: avoid`; section/job headers keep-with-next (no orphan EXPERIENCE + title without bullets).
- Editor: bilingual EN/PT console; header title left / meta right (CSS grid).
