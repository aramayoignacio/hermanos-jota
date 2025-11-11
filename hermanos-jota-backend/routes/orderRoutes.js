const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Product = require('../models/Product');
const { protegerRuta, esAdmin } = require('../middleware/auth');

// @route   POST /api/pedidos
// @desc    Crear nuevo pedido (requiere autenticación)
// @access  Privado
router.post('/', protegerRuta, async (req, res) => {
  try {
    const { productos, direccionEnvio, metodoPago, notas } = req.body;

    // Validar que haya productos
    if (!productos || productos.length === 0) {
      return res.status(400).json({
        success: false,
        mensaje: 'El pedido debe contener al menos un producto'
      });
    }

    // Validar y calcular subtotales
    const productosValidados = [];
    let total = 0;

    for (const item of productos) {
      // Verificar que el producto existe y está en stock
      const producto = await Product.findById(item.producto);

      if (!producto) {
        return res.status(404).json({
          success: false,
          mensaje: `Producto con ID ${item.producto} no encontrado`
        });
      }

      if (!producto.enStock) {
        return res.status(400).json({
          success: false,
          mensaje: `${producto.nombre} no está disponible`
        });
      }

      if (producto.stock < item.cantidad) {
        return res.status(400).json({
          success: false,
          mensaje: `Stock insuficiente para ${producto.nombre}. Disponible: ${producto.stock}`
        });
      }

      const subtotal = producto.precio * item.cantidad;

      productosValidados.push({
        producto: producto._id,
        nombre: producto.nombre,
        cantidad: item.cantidad,
        precio: producto.precio,
        subtotal
      });

      total += subtotal;

      // Actualizar stock del producto
      producto.stock -= item.cantidad;
      if (producto.stock === 0) {
        producto.enStock = false;
      }
      await producto.save();
    }

    // Crear pedido
    const pedido = await Order.create({
      usuario: req.usuario._id,
      productos: productosValidados,
      total,
      direccionEnvio: direccionEnvio || req.usuario.direccion,
      metodoPago: metodoPago || 'efectivo',
      notas
    });

    // Populate para devolver datos completos
    await pedido.populate('usuario', 'nombre email telefono');

    console.log('✅ Pedido creado:', pedido._id, 'Usuario:', req.usuario.nombre);

    res.status(201).json({
      success: true,
      mensaje: 'Pedido creado exitosamente',
      data: pedido
    });
  } catch (error) {
    console.error('Error al crear pedido:', error);
    res.status(500).json({
      success: false,
      mensaje: 'Error al crear pedido',
      error: error.message
    });
  }
});

// @route   GET /api/pedidos/mis-pedidos
// @desc    Obtener pedidos del usuario autenticado
// @access  Privado
router.get('/mis-pedidos', protegerRuta, async (req, res) => {
  try {
    const pedidos = await Order.find({ usuario: req.usuario._id })
      .sort({ createdAt: -1 })
      .populate('productos.producto', 'nombre imagenUrl');

    res.json({
      success: true,
      cantidad: pedidos.length,
      data: pedidos
    });
  } catch (error) {
    console.error('Error al obtener pedidos:', error);
    res.status(500).json({
      success: false,
      mensaje: 'Error al obtener pedidos',
      error: error.message
    });
  }
});

// @route   GET /api/pedidos/:id
// @desc    Obtener un pedido específico
// @access  Privado
router.get('/:id', protegerRuta, async (req, res) => {
  try {
    const pedido = await Order.findById(req.params.id)
      .populate('usuario', 'nombre email telefono')
      .populate('productos.producto', 'nombre material certificacion');

    if (!pedido) {
      return res.status(404).json({
        success: false,
        mensaje: 'Pedido no encontrado'
      });
    }

    // Verificar que el pedido pertenece al usuario (a menos que sea admin)
    if (pedido.usuario._id.toString() !== req.usuario._id.toString() && req.usuario.rol !== 'admin') {
      return res.status(403).json({
        success: false,
        mensaje: 'No autorizado para ver este pedido'
      });
    }

    res.json({
      success: true,
      data: pedido
    });
  } catch (error) {
    console.error('Error al obtener pedido:', error);
    res.status(500).json({
      success: false,
      mensaje: 'Error al obtener pedido',
      error: error.message
    });
  }
});

// @route   GET /api/pedidos
// @desc    Obtener todos los pedidos (solo admin)
// @access  Privado/Admin
router.get('/', protegerRuta, esAdmin, async (req, res) => {
  try {
    const { estado, usuario } = req.query;

    let filtros = {};
    if (estado) filtros.estado = estado;
    if (usuario) filtros.usuario = usuario;

    const pedidos = await Order.find(filtros)
      .sort({ createdAt: -1 })
      .populate('usuario', 'nombre email telefono')
      .populate('productos.producto', 'nombre');

    res.json({
      success: true,
      cantidad: pedidos.length,
      data: pedidos
    });
  } catch (error) {
    console.error('Error al obtener pedidos:', error);
    res.status(500).json({
      success: false,
      mensaje: 'Error al obtener pedidos',
      error: error.message
    });
  }
});

// @route   PUT /api/pedidos/:id/estado
// @desc    Actualizar estado del pedido (solo admin)
// @access  Privado/Admin
router.put('/:id/estado', protegerRuta, esAdmin, async (req, res) => {
  try {
    const { estado } = req.body;

    const pedido = await Order.findByIdAndUpdate(
      req.params.id,
      { estado },
      { new: true, runValidators: true }
    ).populate('usuario', 'nombre email');

    if (!pedido) {
      return res.status(404).json({
        success: false,
        mensaje: 'Pedido no encontrado'
      });
    }

    console.log('✅ Estado de pedido actualizado:', pedido._id, 'Nuevo estado:', estado);

    res.json({
      success: true,
      mensaje: 'Estado actualizado exitosamente',
      data: pedido
    });
  } catch (error) {
    console.error('Error al actualizar estado:', error);
    res.status(500).json({
      success: false,
      mensaje: 'Error al actualizar estado',
      error: error.message
    });
  }
});

module.exports = router;