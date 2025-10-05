const express = require('express');
const cors = require('cors');
const productosRoutes = require('./routes/productosRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

// ========================================
// MIDDLEWARES GLOBALES
// ========================================

// Middleware para logging de peticiones
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  next();
});

// Middleware CORS para permitir peticiones desde el frontend
app.use(cors({
  origin: 'http://localhost:3000', // URL del frontend React
  credentials: true
}));

// Middleware para parsear JSON en el body
app.use(express.json());

// Middleware para parsear datos de formularios
app.use(express.urlencoded({ extended: true }));

// ========================================
// RUTAS
// ========================================

// Ruta de bienvenida
app.get('/', (req, res) => {
  res.json({
    mensaje: '¡Bienvenido a la API de Hermanos Jota!',
    version: '1.0.0',
    endpoints: {
      productos: '/api/productos',
      productoDetalle: '/api/productos/:id'
    },
  });
});

// Rutas de productos
app.use('/api/productos', productosRoutes);

// ========================================
// MANEJO DE ERRORES
// ========================================

// Middleware para rutas no encontradas (404)
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    mensaje: 'Ruta no encontrada',
    ruta: req.originalUrl,
    metodo: req.method
  });
});

// Middleware de manejo de errores centralizado
app.use((err, req, res, next) => {
  console.error('Error capturado:', err.stack);
  
  res.status(err.status || 500).json({
    success: false,
    mensaje: err.message || 'Error interno del servidor',
    error: process.env.NODE_ENV === 'development' ? err.stack : {}
  });
});

// ========================================
// INICIAR SERVIDOR
// ========================================

app.listen(PORT, () => {
  console.log('========================================');
  console.log('Servidor Express - Hermanos Jota API');
  console.log('========================================');
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  console.log(`Productos disponibles: 8`);
  console.log(`Endpoints:`);
  console.log(`   - GET http://localhost:${PORT}/api/productos`);
  console.log(`   - GET http://localhost:${PORT}/api/productos/:id`);
  console.log(`   - GET http://localhost:3001/api/productos?categoria=sillas`);
  console.log('========================================');
});
