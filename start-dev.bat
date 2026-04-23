@echo off
echo ===================================
echo ResQFood - Starting Both Servers
echo ===================================

echo.
echo Starting Backend Server...
start cmd /k "cd backend && python -m uvicorn app:app --reload --host 0.0.0.0 --port 8000"

timeout /t 3

echo.
echo Starting Frontend Dev Server...
start cmd /k "cd frontend\my-project && npm run dev"

echo.
echo ===================================
echo Servers started in new windows
echo Backend: http://localhost:8000
echo Frontend: http://localhost:5173
echo ===================================
