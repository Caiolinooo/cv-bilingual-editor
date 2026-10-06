# Changelog

## 2026-10-06

- CV tailored (EN/PT `DEFAULT_CV`) for backend / developer-tools Software Engineer roles (JD keywords: TypeScript, Node.js, APIs, SDKs, CLI, auth, rate limits).
- Headline: "Backend Engineer (TypeScript/Node.js) · APIs & Developer Tools · AI Specialist".
- Summary rewritten to lead with building/maintaining APIs and developer-facing tools: 600+ API routes (EmployeeHub), JWT + 2FA + RLS/ACL authorization, cross-product API contracts (HMAC sync), retry/fallback on rate-limit/503, open-source developer tools.
- ABZ experience: new bullets for the Node.js/TypeScript API layer (600+ REST routes, JWT, 2FA, RLS/ACL, LGPD) and the PontoFlow↔EmployeeHub API contract; VPN bullet merged into CI/CD.
- BRTech3D: REST API bullet now states APIs were designed and maintained, not just "integrated".
- Projects: MCP project retitled "Developer Tools — MCP Servers & SGLang Commander (Open Source)"; CloudSec bullet makes 503/rate-limit retry explicit; PontoFlow stack names the Node.js server runtime.
- Skills (Backend): added API design & contracts, authentication & authorization (JWT, 2FA, RLS, ACL, HMAC), resilience patterns (retries, fallback, rate-limit/503 handling).
- Regenerated sample PDFs (EN/PT) via Chromium export.

## 2026-10-01

- CV data refresh (EN/PT `DEFAULT_CV`): headline "AI Specialist · Data Engineer · Backend Developer"; new summaries focused on LLM training/evaluation (SFT, DPO/RLHF, LoRA/QLoRA, red teaming) + backend/data engineering.
- Removed the "Core Competencies & Experience Matrix" table section (data, resume template, editor panel, CSS, i18n labels). The resume now goes from the summary straight into Professional Experience, matching the ATS-friendly DOCX layout.
- Experience: micro1 AI Specialist contract (Aug–Sep 2026) added with 5 bullets (SFT/DPO, red teaming, code benchmarking, local LLM serving with vLLM/SGLang/llama.cpp, dataset curation); ABZ dates corrected to Mar 2025 – Present with HR metrics (−40% workload, −95% approval time) and Ticket-Manager; BRTech3D condensed; "Laser Master Engineering Services" name fixed.
- Projects: Portal ABZ live URL → portal.groupabz.com; PontoFlow live URL → ponto-flow.vercel.app; Invoice ABZ marked private repo; MCP project repo → sglang-commander (SGLang Commander GUI bullet added).
- Skills reorganized into 6 categories: AI & LLM Engineering / Backend / Frontend / Data & Databases / Cloud & DevOps / Testing & QA.
- Education: UniFatecie B.S. dates → May 2024 – May 2027 (expected).
- Sample PDFs (EN/PT) regenerated with the new data via `editor/export_cv_pdf.py`.
- Note: browsers with a previously saved CV in localStorage keep showing the old copy until "Reset to factory default" is clicked.

## 2026-09-23

- Password gate: Next.js App Router serves the existing EN/PT editor only after an HMAC-SHA256 session cookie (`AUTH_USER` / `AUTH_PASS` / `AUTH_SECRET`). Static `/` rewrite removed so auth cannot be bypassed. Playwright PDF export remains local. Logout is POST-only so a cross-site GET cannot clear the session.

- Vercel static hosting: `vercel.json` rewrite `/` → editor HTML; Deploy section in README (PDF export stays local).

- PDF export: Playwright/Chromium native (`export_cv_pdf.py` + `Exportar_CV_PDF.bat`); html2canvas abandoned as primary engine (left-crop / header alignment fix).
- Print CSS: job blocks `break-inside: avoid`; section/job headers keep-with-next (no orphan EXPERIENCE + title without bullets).
- Editor: bilingual EN/PT console; header title left / meta right (CSS grid).
