const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { protegerRuta } = require('../middleware/auth');

// Función para generar JWT
const generarToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d' // Token válido por 30 días
  });
};

// @route   POST /api/auth/registro
// @desc    Registrar nuevo usuario
// @access  Público
router.post('/registro', async (req, res) => {
  try {
    const { nombre, email, password, telefono, direccion } = req.body;

    // Verificar si el usuario ya existe
    const usuarioExiste = await User.findOne({ email });
    if (usuarioExiste) {
      return res.status(400).json({
        success: false,
        mensaje: 'El email ya está registrado'
      });
    }

    // Crear usuario
    const usuario = await User.create({
      nombre,
      email,
      password, // Se hasheará automáticamente por el middleware
      telefono,
      direccion
    });

    // Generar token
    const token = generarToken(usuario._id);

    console.log('✅ Usuario registrado:', usuario.email);

    res.status(201).json({
      success: true,
      mensaje: 'Usuario registrado exitosamente',
      token,
      usuario: usuario.obtenerDatosPublicos()
    });
  } catch (error) {
    console.error('Error en registro:', error);

    if (error.name === 'ValidationError') {
      const errores = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        mensaje: 'Error de validación',
        errores
      });
    }

    res.status(500).json({
      success: false,
      mensaje: 'Error al registrar usuario',
      error: error.message
    });
  }
});

// @route   POST /api/auth/login
// @desc    Iniciar sesión
// @access  Público
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validar campos
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        mensaje: 'Por favor proporciona email y contraseña'
      });
    }

    // Buscar usuario (incluir password)
    const usuario = await User.findOne({ email }).select('+password');

    if (!usuario) {
      return res.status(401).json({
        success: false,
        mensaje: 'Credenciales inválidas'
      });
    }

    // Verificar contraseña
    const passwordCorrecto = await usuario.compararPassword(password);

    if (!passwordCorrecto) {
      return res.status(401).json({
        success: false,
        mensaje: 'Credenciales inválidas'
      });
    }

    // Verificar si el usuario está activo
    if (!usuario.activo) {
      return res.status(401).json({
        success: false,
        mensaje: 'Usuario inactivo'
      });
    }

    // Generar token
    const token = generarToken(usuario._id);

    console.log('✅ Login exitoso:', usuario.email);

    res.json({
      success: true,
      mensaje: 'Login exitoso',
      token,
      usuario: usuario.obtenerDatosPublicos()
    });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({
      success: false,
      mensaje: 'Error al iniciar sesión',
      error: error.message
    });
  }
});

// @route   GET /api/auth/perfil
// @desc    Obtener perfil del usuario autenticado
// @access  Privado
router.get('/perfil', protegerRuta, async (req, res) => {
  try {
    res.json({
      success: true,
      usuario: req.usuario.obtenerDatosPublicos()
    });
  } catch (error) {
    console.error('Error al obtener perfil:', error);
    res.status(500).json({
      success: false,
      mensaje: 'Error al obtener perfil',
      error: error.message
    });
  }
});

// @route   PUT /api/auth/perfil
// @desc    Actualizar perfil del usuario
// @access  Privado
router.put('/perfil', protegerRuta, async (req, res) => {
  try {
    const { nombre, telefono, direccion } = req.body;

    const usuarioActualizado = await User.findByIdAndUpdate(
      req.usuario._id,
      { nombre, telefono, direccion },
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      mensaje: 'Perfil actualizado exitosamente',
      usuario: usuarioActualizado.obtenerDatosPublicos()
    });
  } catch (error) {
    console.error('Error al actualizar perfil:', error);
    res.status(500).json({
      success: false,
      mensaje: 'Error al actualizar perfil',
      error: error.message
    });
  }
});

// @route   POST /api/auth/cambiar-password
// @desc    Cambiar contraseña del usuario
// @access  Privado
router.post('/cambiar-password', protegerRuta, async (req, res) => {
  try {
    const { passwordActual, passwordNuevo } = req.body;

    if (!passwordActual || !passwordNuevo) {
      return res.status(400).json({
        success: false,
        mensaje: 'Proporciona la contraseña actual y la nueva'
      });
    }

    // Obtener usuario con password
    const usuario = await User.findById(req.usuario._id).select('+password');

    // Verificar password actual
    const passwordCorrecto = await usuario.compararPassword(passwordActual);

    if (!passwordCorrecto) {
      return res.status(401).json({
        success: false,
        mensaje: 'Contraseña actual incorrecta'
      });
    }

    // Actualizar password
    usuario.password = passwordNuevo;
    await usuario.save();

    res.json({
      success: true,
      mensaje: 'Contraseña actualizada exitosamente'
    });
  } catch (error) {
    console.error('Error al cambiar contraseña:', error);
    res.status(500).json({
      success: false,
      mensaje: 'Error al cambiar contraseña',
      error: error.message
    });
  }
});

module.exports = router;