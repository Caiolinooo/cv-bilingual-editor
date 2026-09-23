"""Export CV to PDF via Chromium (no html2canvas crop)."""
import asyncio
import sys
from pathlib import Path

from playwright.async_api import async_playwright

HERE = Path(__file__).resolve().parent
HTML = HERE.parent / "public" / "editor" / "cv_editor_caio_bilingual.html"
DOWNLOADS = Path.home() / "Downloads"


async def export_lang(lang: str) -> Path:
    out = DOWNLOADS / f"CV_Caio_Correia_{lang.upper()}.pdf"
    async with async_playwright() as p:
        try:
            browser = await p.chromium.launch(headless=True)
        except Exception:
            browser = await p.chromium.launch(channel="msedge", headless=True)
        page = await browser.new_page(viewport={"width": 920, "height": 1300})
        await page.goto(HTML.as_uri(), wait_until="domcontentloaded", timeout=120000)
        for _ in range(60):
            ready = await page.evaluate(
                "typeof setLang === 'function' && typeof renderResume === 'function'"
            )
            if ready:
                break
            await page.wait_for_timeout(500)
        else:
            raise RuntimeError("setLang/renderResume not ready")
        await page.evaluate(
            """(lang) => {
          setLang(lang);
          mode = 'preview';
          document.body.classList.remove('edit-mode');
          document.body.classList.add('pdf-exporting');
          const layout = document.getElementById('layout');
          if (layout) layout.classList.add('preview-only');
          renderResume();
          const resume = document.getElementById('resume');
          document.body.innerHTML = '';
          document.body.style.margin = '0';
          document.body.style.background = '#fff';
          document.body.appendChild(resume);
          resume.style.boxShadow = 'none';
          resume.style.border = 'none';
          resume.style.maxWidth = '100%';
          resume.style.width = '100%';
          resume.style.margin = '0';
          resume.style.padding = '0';
          document.querySelectorAll('.inline-rm').forEach(n => n.remove());
          document.querySelectorAll('[contenteditable]').forEach(n => {
            n.removeAttribute('contenteditable');
          });
          document.querySelectorAll('.job-header').forEach(h => {
            h.style.display = 'grid';
            h.style.gridTemplateColumns = 'minmax(0, 1fr) auto';
            h.style.columnGap = '12px';
            h.style.alignItems = 'baseline';
            h.style.width = '100%';
            const t = h.querySelector('.job-title');
            const m = h.querySelector('.job-meta');
            if (t) t.style.textAlign = 'left';
            if (m) { m.style.textAlign = 'right'; m.style.whiteSpace = 'nowrap'; }
          });
          const st = document.createElement('style');
          st.textContent = '.job{break-inside:avoid!important;page-break-inside:avoid!important;}h3,.job-header{break-inside:avoid!important;page-break-inside:avoid!important;break-after:avoid!important;page-break-after:avoid!important;}section{break-inside:auto;page-break-inside:auto;}';
          document.head.appendChild(st);
        }""",
            lang,
        )
        await page.emulate_media(media="print")
        await page.pdf(
            path=str(out),
            format="A4",
            print_background=True,
            margin={
                "top": "12mm",
                "right": "12mm",
                "bottom": "12mm",
                "left": "12mm",
            },
        )
        await browser.close()
    return out


async def main():
    langs = sys.argv[1:] or ["en", "pt"]
    for lang in langs:
        path = await export_lang(lang.lower())
        print(f"OK {path} ({path.stat().st_size} bytes)")


if __name__ == "__main__":
    asyncio.run(main())
