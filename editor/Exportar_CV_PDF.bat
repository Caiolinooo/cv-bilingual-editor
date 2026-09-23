@echo off
cd /d "%~dp0"
echo Gerando PDFs do curriculo (Chromium nativo)...
python "%~dp0export_cv_pdf.py" en pt
if errorlevel 1 (
  echo Falhou. Instale: python -m pip install playwright ^&^& python -m playwright install chromium
  pause
  exit /b 1
)
echo.
echo PDFs salvos em %%USERPROFILE%%\Downloads\
explorer "%USERPROFILE%\Downloads"
pause
