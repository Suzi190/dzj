@echo off
echo Stopping server on port 5173 ...
set FOUND=0
for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":5173" ^| findstr "LISTENING"') do (
  taskkill /PID %%a /F >nul 2>&1
  echo killed PID %%a
  set FOUND=1
)
if "%FOUND%"=="0" echo nothing is listening on 5173.
echo Done. Press any key.
pause >nul