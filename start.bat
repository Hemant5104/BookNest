@echo off
echo ========================================
echo Starting Book Management System
echo ========================================
echo.

echo Starting Backend Server...
start "Backend Server" cmd /k "cd backend && npm run dev"

echo Waiting 3 seconds for backend to start...
timeout /t 3 /nobreak >nul

echo Starting Frontend Server...
start "Frontend Server" cmd /k "cd frontend && npm run dev"

echo.
echo ========================================
echo Servers are starting...
echo ========================================
echo.
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo Press any key to open the frontend in your browser...
pause >nul
start http://localhost:3000 