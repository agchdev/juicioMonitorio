# Juicio Monitorio - Aplicación Dockerizada

## Estructura Docker

Este proyecto ha sido dockerizado para facilitar su despliegue y ejecución en cualquier entorno. La estructura Docker incluye:

- **Frontend**: Aplicación React/Vite servida por Nginx
- **Backend**: Servidor Express con API REST
- **Red Docker**: Comunicación interna entre servicios

## Requisitos previos

- Docker instalado en su sistema
- Docker Compose instalado en su sistema

## Configuración

1. Asegúrese de tener un archivo `.env` en la raíz del proyecto con las siguientes variables:

```
# Configuración SMTP para envío de correos
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=su_correo@gmail.com
SMTP_PASS=su_contraseña_de_aplicación
ADMIN_EMAIL=correo_administrador@gmail.com
```

## Ejecución con Docker

### Método 1: Script automático (Windows)

Simplemente ejecute el script `docker-start.bat` haciendo doble clic o desde la línea de comandos:

```
.\docker-start.bat
```

### Método 2: Comando manual

Para construir y ejecutar los contenedores:

```bash
docker-compose up --build -d
```

## Acceso a la aplicación

- **Frontend**: http://localhost
- **Backend API**: http://localhost:3001

## Comandos útiles

- Ver logs en tiempo real:
  ```
  docker-compose logs -f
  ```

- Detener los contenedores:
  ```
  docker-compose down
  ```

- Reiniciar los contenedores:
  ```
  docker-compose restart
  ```

## Estructura de archivos Docker

- `Dockerfile.frontend`: Configuración para construir la aplicación React/Vite
- `Dockerfile.backend`: Configuración para el servidor Express
- `docker-compose.yml`: Orquestación de los servicios
- `nginx.conf`: Configuración del servidor web Nginx
