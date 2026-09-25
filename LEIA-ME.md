# Editor de CV bilingue (EN/PT) — PDF via Chromium

Espelho curto do [README.md](README.md) (inglês é o documento principal).

## O que é

Editor HTML em um arquivo, com troca EN | PT, edição/preview, e export PDF estável via Playwright Chromium (`page.pdf`). html2canvas/html2pdf **não** é o motor principal.

O site agora é **Next.js (App Router)**. Sem sessão válida o visitante só vê `/login`; o editor não é público.

## Auth

Defina `AUTH_USER`, `AUTH_PASS` e `AUTH_SECRET` no ambiente (Vercel dashboard ou `.env.local`). Não commitar valores. Cookie HttpOnly, ~8h. Export PDF Playwright continua **local**.

## Uso rápido

1. `npm install`, crie `.env.local` com as três variáveis de auth, `npm run dev`.
2. Abra `http://localhost:3000`, entre, e use o editor em `public/editor/cv_editor_caio_bilingual.html`.
3. Toolbar: **EN** / **PT**, **Edit** / **Preview**, **Save** (`localStorage`).
4. PDF preferido (local):

```bat
cd editor
Exportar_CV_PDF.bat
```

Ou `python export_cv_pdf.py en pt`. O script lê o HTML em `public/editor/`. Saídas em `%USERPROFILE%\Downloads\`.

## Amostras

PDFs de referência em [`samples/`](samples/). Regenere após editar o HTML.

## Conteúdo

Não inventar métricas/texto do CV na documentação — o conteúdo fica no HTML.
