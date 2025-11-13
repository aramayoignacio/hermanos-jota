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

// CORS - CONFIGURACIÓN PARA PRODUCCIÓN Y DESARROLLO
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: function(origin, callback) {
    // Permitir requests sin origin (mobile apps, Postman, curl, etc)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1 || allowedOrigins.some(allowed => origin?.includes(allowed))) {
      callback(null, true);
    } else {
      console.log('❌ Origin bloqueado por CORS:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Parsear JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ========================================
// RUTAS
// ========================================

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Ruta de bienvenida
app.get('/', (req, res) => {
  res.json({
    mensaje: '¡Bienvenido a la API de Hermanos Jota!',
    version: '3.0.0',
    database: 'MongoDB Atlas',
    autenticacion: 'JWT',
    ambiente: process.env.NODE_ENV || 'development',
    endpoints: {
      productos: {
        listar: 'GET /api/productos',
        obtener: 'GET /api/productos/:id',
        crear: 'POST /api/productos (protegido)',
        actualizar: 'PUT /api/productos/:id (protegido)',
        eliminar: 'DELETE /api/productos/:id (protegido)'
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
  console.error('❌ Error:', err.message);
  res.status(err.status || 500).json({
    success: false,
    mensaje: err.message || 'Error interno del servidor',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// ========================================
// INICIAR SERVIDOR
// ========================================

app.listen(PORT, '0.0.0.0', () => {
  console.log('========================================');
  console.log('🚀 Servidor Express + MongoDB + JWT');
  console.log('========================================');
  console.log(`✅ Servidor corriendo en puerto ${PORT}`);
  console.log(`🗄️  Base de datos: MongoDB Atlas`);
  console.log(`🔐 Autenticación: JWT`);
  console.log(`🌍 Entorno: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🌐 CORS habilitado para: ${allowedOrigins.join(', ')}`);
  console.log('========================================');
});