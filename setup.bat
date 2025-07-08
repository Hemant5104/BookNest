@echo off
echo ========================================
echo Book Management System Setup
echo ========================================
echo.

echo Checking Node.js installation...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)
echo Node.js is installed ✓
echo.

echo Checking MongoDB installation...
mongod --version >nul 2>&1
if %errorlevel% neq 0 (
    echo WARNING: MongoDB is not installed or not in PATH!
    echo Please install MongoDB from https://www.mongodb.com/try/download/community
    echo.
    echo After installation, make sure MongoDB service is running
    echo.
    pause
)
echo MongoDB check completed
echo.

echo Installing backend dependencies...
cd backend
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Failed to install backend dependencies!
    pause
    exit /b 1
)
echo Backend dependencies installed ✓
echo.

echo Creating .env file for backend...
(
echo PORT=5000
echo MONGODB_URI=mongodb://localhost:27017/bookmanagement
echo NODE_ENV=development
) > .env
echo Backend .env file created ✓
echo.

echo Installing frontend dependencies...
cd ..\frontend
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Failed to install frontend dependencies!
    pause
    exit /b 1
)
echo Frontend dependencies installed ✓
echo.

cd ..
echo.
echo ========================================
echo Setup completed successfully!
echo ========================================
echo.
echo To start the application:
echo.
echo Terminal 1 (Backend):
echo   cd backend
echo   npm run dev
echo.
echo Terminal 2 (Frontend):
echo   cd frontend
echo   npm run dev
echo.
echo Optional: Seed the database with sample books:
echo   cd backend
echo   npm run seed
echo.
echo Access the application at:
echo   Frontend: http://localhost:3000
echo   Backend API: http://localhost:5000
echo.
pause 