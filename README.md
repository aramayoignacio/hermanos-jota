# INSTRUCCIONES PARA CONFIGURAR LAS VARIABLES DE ENTORNO

Para probar el Backend:

En la terminal de /hermanos-jota-backend crear archivo .env:

mkdir .env

pnpm run seed

Seguir el ejemplo del archivo .env.example y completar los datos requeridos para configurar las variables de entorno, luego:

pnpm run dev

Probar endpoints:

   # Obtener todos los productos
   curl http://localhost:3001/api/productos

   # Obtener producto específico
   curl http://localhost:3001/api/productos/1

   # Obtener productos por categoría
   curl "http://localhost:3001/api/productos?categoria=sillas"

   # Probar ruta no encontrada
   curl http://localhost:3001/api/categorias

Para probar el Front:

En la terminal de /hermanos-jota-frontend

pnpm start