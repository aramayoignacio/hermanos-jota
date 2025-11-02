require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const productRoutes = require('./routes/productRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

// Conectar a MongoDB
connectDB();

// ========================================
// MIDDLEWARES GLOBALES
// ========================================

// Middleware de logging
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  next();
});

// CORS
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

// Parsear JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ========================================
// RUTAS
// ========================================

// Ruta de bienvenida
app.get('/', (req, res) => {
  res.json({
    mensaje: '¡Bienvenido a la API de Hermanos Jota!',
    version: '2.0.0',
    database: 'MongoDB Atlas',
    endpoints: {
      productos: {
        listar: 'GET /api/productos',
        obtener: 'GET /api/productos/:id',
        crear: 'POST /api/productos',
        actualizar: 'PUT /api/productos/:id',
        eliminar: 'DELETE /api/productos/:id'
      }
    }
  });
});

// Rutas de productos
app.use('/api/productos', productRoutes);

// ========================================
// MANEJO DE ERRORES
// ========================================

// 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    mensaje: 'Ruta no encontrada',
    ruta: req.originalUrl
  });
});

// Manejador de errores global
app.use((err, req, res, next) => {
  console.error('❌ Error:', err.stack);
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
  console.log('🚀 Servidor Express + MongoDB');
  console.log('========================================');
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
  console.log(`🗄️  Base de datos: MongoDB Atlas`);
  console.log(`🌍 Entorno: ${process.env.NODE_ENV || 'development'}`);
  console.log('========================================');
});