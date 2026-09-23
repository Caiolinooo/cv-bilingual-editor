# Bilingual CV editor (EN/PT) with Chromium PDF export

**PT:** Editor HTML bilingue (EN/PT) com export PDF via Playwright/Chromium (não html2canvas como motor principal). Ver também [`LEIA-ME.md`](LEIA-ME.md).

## What it is

A single-file HTML resume editor with EN | PT switching, live edit/preview, and print-stable PDF export through Playwright Chromium (`page.pdf`). html2canvas / html2pdf is not the primary engine (it cropped the left edge and mishandled flex/grid headers).

## Requirements

- Python 3.10+
- Playwright Chromium: `pip install playwright` then `python -m playwright install chromium`
- Windows: optional helper `editor/Exportar_CV_PDF.bat` (falls back to Microsoft Edge channel when Chromium is missing)

## Quick start

1. Open `editor/cv_editor_caio_bilingual.html` in Chrome or Edge.
2. Use **EN** / **PT** in the toolbar. **Edit** enables contenteditable fields; **Preview** shows the print layout. **Save** writes to `localStorage`; use Export/Import JSON for backups.
3. After changing the HTML on disk, hard-refresh (**Ctrl+F5**).

PDF export (preferred):

```bat
cd editor
Exportar_CV_PDF.bat
```

Or:

```bash
cd editor
python export_cv_pdf.py en pt
```

Outputs land in `%USERPROFILE%\Downloads\` as `CV_Caio_Correia_EN.pdf` and `CV_Caio_Correia_PT.pdf`.

## Export notes

- The script targets the `#resume` node only.
- CSS keep-together: each `.job` uses `break-inside: avoid`; section titles and `.job-header` use `break-after: avoid` so a section/job header is not left alone at the bottom of a page without following bullets.
- Page size is A4.
- The in-editor **Export PDF** button opens the browser print dialog (Save as PDF, headers/footers off). Prefer the `.bat` / `export_cv_pdf.py` path for consistent margins.

## Samples

Reference PDFs after the 2026-09-23 keep-together fix live under [`samples/`](samples/). Regenerate them after content or layout edits.

## Deploy (Vercel)

Static hosting of the HTML editor. PDF export via Playwright remains **local** (`editor/Exportar_CV_PDF.bat` / `export_cv_pdf.py`); the Vercel deployment does not run Chromium export.

- `vercel.json` rewrites `/` → `/editor/cv_editor_caio_bilingual.html`
- Framework preset: Other / static (no build command)
- Output: repository root (serves `editor/` and `samples/` as static assets)

Production is linked to this GitHub repo under the project owner's Vercel account.

## Layout / content

Do not invent CV metrics or body text in docs. Resume content lives in the HTML editor file.

## License / content

Resume body content is personal data owned by the author. This repository packages the editor tooling and sample PDFs for layout reference.
