@echo off
cd /d "%~dp0"
title douzhi-mirror  http://localhost:5173/
echo ==============================================
echo   douzhi local mirror : http://localhost:5173/
echo   browser will open automatically
echo   close this window to stop the server
echo ==============================================
echo.
netstat -ano | findstr ":5173" | findstr "LISTENING" >nul
if not errorlevel 1 (
  echo [i] port 5173 is already in use - only opening the browser.
  start "" http://localhost:5173/
  echo Press any key to close this window ^(server keeps running^).
  pause >nul
  exit /b
)
start "" /b powershell -NoProfile -WindowStyle Hidden -Command "Start-Sleep -Seconds 3; Start-Process 'http://localhost:5173/'"
node server.js 5173
echo.
echo Server stopped. Press any key.
pause >nul