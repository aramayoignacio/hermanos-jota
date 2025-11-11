const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Verificar JWT y autenticar usuario
const protegerRuta = async (req, res, next) => {
  let token;

  // Verificar si el token está en el header Authorization
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Obtener token del header
      token = req.headers.authorization.split(' ')[1];

      // Verificar token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Obtener usuario del token (sin password)
      req.usuario = await User.findById(decoded.id).select('-password');

      if (!req.usuario) {
        return res.status(401).json({
          success: false,
          mensaje: 'Usuario no encontrado'
        });
      }

      if (!req.usuario.activo) {
        return res.status(401).json({
          success: false,
          mensaje: 'Usuario inactivo'
        });
      }

      next();
    } catch (error) {
      console.error('Error en verificación de token:', error);
      return res.status(401).json({
        success: false,
        mensaje: 'Token inválido o expirado'
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      mensaje: 'No autorizado - Token no proporcionado'
    });
  }
};

// Middleware para verificar rol de admin
const esAdmin = (req, res, next) => {
  if (req.usuario && req.usuario.rol === 'admin') {
    next();
  } else {
    res.status(403).json({
      success: false,
      mensaje: 'Acceso denegado - Se requieren permisos de administrador'
    });
  }
};

module.exports = { protegerRuta, esAdmin };