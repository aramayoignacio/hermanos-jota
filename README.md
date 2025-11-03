# Hermanos Jota — Instrucciones de configuración y ejecución

Este repositorio contiene el backend y el frontend de la tienda "Hermanos Jota".
Este documento describe cómo preparar el entorno, ejecutar localmente ambos proyectos
y cómo probar los endpoints principales.

## Requisitos previos

- Node.js (v16+ recomendado)
- pnpm (instalable con `npm i -g pnpm`) — el repositorio usa pnpm según los `package.json`.
- Git (opcional)

## Estructura relevante

- `hermanos-jota-backend/` — servidor (API REST)
- `hermanos-jota-frontend/` — aplicación React (cliente)

--------------------------------------------------

## Backend — configuración y ejecución

1. Abrir una terminal en `hermanos-jota-backend`:

2. Crear un archivo `.env` a partir de `.env.example` y completar las variables necesarias.

3. Instalar dependencias, cargar datos de ejemplo y arrancar en modo desarrollo:

```bash
pnpm install
pnpm run seed   # si existe el script para popular la BD
pnpm run dev    # o pnpm start según el package.json
```

4. Endpoints principales (ejemplos con curl):

```bash
# Obtener todos los productos
curl http://localhost:3001/api/productos

# Obtener producto por id (ej. id=1)
curl http://localhost:3001/api/productos/1

# Obtener productos filtrando por categoría
curl http://localhost:3001/api/productos?categoria=sillas

# Probar ruta no encontrada (debería devolver 404)
curl http://localhost:3001/api/categorias
```

--------------------------------------------------

## Frontend — configuración y ejecución

1. Abrir una terminal en `hermanos-jota-frontend`:

2. Instalar dependencias y arrancar la aplicación:

```bash
pnpm install
pnpm start
```

3. Acceder al frontend en el navegador: por defecto en `http://localhost:3000` (o el puerto que muestre pnpm).

--------------------------------------------------

## URLs de despliegue

- Frontend (deploy): https://hermanos-jota-jet.vercel.app/
- Backend (deploy):  https://hermanos-jota-y1ew.onrender.com

--------------------------------------------------
