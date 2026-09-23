# Editor de CV bilingue (EN/PT) — PDF via Chromium

Espelho curto do [README.md](README.md) (inglês é o documento principal).

## O que é

Editor HTML em um arquivo, com troca EN | PT, edição/preview, e export PDF estável via Playwright Chromium (`page.pdf`). html2canvas/html2pdf **não** é o motor principal.

## Uso rápido

1. Abra `editor/cv_editor_caio_bilingual.html` no Chrome ou Edge.
2. Toolbar: **EN** / **PT**, **Edit** / **Preview**, **Save** (`localStorage`).
3. PDF preferido:

```bat
cd editor
Exportar_CV_PDF.bat
```

Ou `python export_cv_pdf.py en pt`. Saídas em `%USERPROFILE%\Downloads\`.

## Amostras

PDFs de referência em [`samples/`](samples/). Regenere após editar o HTML.

## Conteúdo

Não inventar métricas/texto do CV na documentação — o conteúdo fica no HTML.
