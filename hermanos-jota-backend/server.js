require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const orderRoutes = require('./routes/orderRoutes');

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
  origin: 'https://hermanos-jota-y1ew.onrender.com',
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
    version: '3.0.0',
    database: 'MongoDB Atlas',
    autenticacion: 'JWT',
    endpoints: {
      productos: {
        listar: 'GET /api/productos',
        obtener: 'GET /api/productos/:id',
        crear: 'POST /api/productos',
        actualizar: 'PUT /api/productos/:id',
        eliminar: 'DELETE /api/productos/:id'
      },
      autenticacion: {
        registro: 'POST /api/auth/registro',
        login: 'POST /api/auth/login',
        perfil: 'GET /api/auth/perfil (protegido)',
        actualizarPerfil: 'PUT /api/auth/perfil (protegido)',
        cambiarPassword: 'POST /api/auth/cambiar-password (protegido)'
      },
      pedidos: {
        crear: 'POST /api/pedidos (protegido)',
        misPedidos: 'GET /api/pedidos/mis-pedidos (protegido)',
        obtener: 'GET /api/pedidos/:id (protegido)',
        listarTodos: 'GET /api/pedidos (admin)',
        actualizarEstado: 'PUT /api/pedidos/:id/estado (admin)'
      }
    }
  });
});

// Rutas de la API
app.use('/api/productos', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/pedidos', orderRoutes);

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
  console.log('🚀 Servidor Express + MongoDB + JWT');
  console.log('========================================');
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
  console.log(`🗄️  Base de datos: MongoDB Atlas`);
  console.log(`🔐 Autenticación: JWT`);
  console.log(`🌍 Entorno: ${process.env.NODE_ENV || 'development'}`);
  console.log('========================================');
});