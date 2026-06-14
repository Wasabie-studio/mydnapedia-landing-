@echo off
REM ── MyDNAPedia local preview launcher ──
REM Put this file inside the mydnapedia-landing- folder (next to index.html) and double-click it.
cd /d "%~dp0"

if not exist "index.html" (
  echo ERROR: index.html not found.
  echo Put start-preview.bat INSIDE the mydnapedia-landing- folder, next to index.html.
  pause
  exit /b
)

where py >/dev/null 2>/dev/null && (
  start "" http://localhost:4321/
  py -m http.server 4321
  exit /b
)
where python >/dev/null 2>/dev/null && (
  start "" http://localhost:4321/
  python -m http.server 4321
  exit /b
)
where npx >/dev/null 2>/dev/null && (
  start "" http://localhost:4321/
  npx serve -l 4321 .
  exit /b
)

echo No Python or Node found on this PC.
echo Install Python from https://www.python.org/downloads/  (tick "Add Python to PATH"), then run this again.
pause
