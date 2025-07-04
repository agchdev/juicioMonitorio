@echo off
echo Construyendo y arrancando contenedores Docker para Juicio Monitorio...
docker-compose up --build -d
echo.
echo Aplicacion disponible en:
echo Frontend: http://localhost
echo Backend API: http://localhost:3001
echo.
echo Presiona cualquier tecla para mostrar los logs
pause > nul
docker-compose logs -f
