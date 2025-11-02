const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// @route   GET /api/productos
// @desc    Obtener todos los productos
// @access  Público
router.get('/', async (req, res) => {
  try {
    const { categoria, enStock, sortBy } = req.query;
    
    // Construir filtros dinámicos
    let filtros = {};
    if (categoria) {
      filtros.categoria = categoria;
    }
    if (enStock !== undefined) {
      filtros.enStock = enStock === 'true';
    }

    // Opciones de ordenamiento
    let ordenamiento = {};
    if (sortBy === 'precio-asc') {
      ordenamiento.precio = 1;
    } else if (sortBy === 'precio-desc') {
      ordenamiento.precio = -1;
    } else if (sortBy === 'nombre') {
      ordenamiento.nombre = 1;
    } else {
      ordenamiento.createdAt = -1; // Por defecto, más recientes primero
    }

    const productos = await Product.find(filtros).sort(ordenamiento);

    res.json({
      success: true,
      cantidad: productos.length,
      data: productos
    });
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({
      success: false,
      mensaje: 'Error al obtener los productos',
      error: error.message
    });
  }
});

// @route   GET /api/productos/:id
// @desc    Obtener un producto por ID
// @access  Público
router.get('/:id', async (req, res) => {
  try {
    const producto = await Product.findById(req.params.id);

    if (!producto) {
      return res.status(404).json({
        success: false,
        mensaje: 'Producto no encontrado'
      });
    }

    res.json({
      success: true,
      data: producto
    });
  } catch (error) {
    // Si el ID no es válido en formato MongoDB
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        mensaje: 'Producto no encontrado - ID inválido'
      });
    }

    console.error('Error al obtener producto:', error);
    res.status(500).json({
      success: false,
      mensaje: 'Error al obtener el producto',
      error: error.message
    });
  }
});

// @route   POST /api/productos
// @desc    Crear un nuevo producto
// @access  Privado (en producción debería tener autenticación)
router.post('/', async (req, res) => {
  try {
    const nuevoProducto = new Product(req.body);
    const productoGuardado = await nuevoProducto.save();

    console.log('✅ Producto creado:', productoGuardado.nombre);

    res.status(201).json({
      success: true,
      mensaje: 'Producto creado exitosamente',
      data: productoGuardado
    });
  } catch (error) {
    // Errores de validación de Mongoose
    if (error.name === 'ValidationError') {
      const errores = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        mensaje: 'Error de validación',
        errores: errores
      });
    }

    console.error('Error al crear producto:', error);
    res.status(500).json({
      success: false,
      mensaje: 'Error al crear el producto',
      error: error.message
    });
  }
});

// @route   PUT /api/productos/:id
// @desc    Actualizar un producto
// @access  Privado (en producción debería tener autenticación)
router.put('/:id', async (req, res) => {
  try {
    const productoActualizado = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true, // Devolver el documento actualizado
        runValidators: true // Ejecutar validaciones del schema
      }
    );

    if (!productoActualizado) {
      return res.status(404).json({
        success: false,
        mensaje: 'Producto no encontrado'
      });
    }

    console.log('✅ Producto actualizado:', productoActualizado.nombre);

    res.json({
      success: true,
      mensaje: 'Producto actualizado exitosamente',
      data: productoActualizado
    });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        mensaje: 'Producto no encontrado - ID inválido'
      });
    }

    if (error.name === 'ValidationError') {
      const errores = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        mensaje: 'Error de validación',
        errores: errores
      });
    }

    console.error('Error al actualizar producto:', error);
    res.status(500).json({
      success: false,
      mensaje: 'Error al actualizar el producto',
      error: error.message
    });
  }
});

// @route   DELETE /api/productos/:id
// @desc    Eliminar un producto
// @access  Privado (en producción debería tener autenticación)
router.delete('/:id', async (req, res) => {
  try {
    const productoEliminado = await Product.findByIdAndDelete(req.params.id);

    if (!productoEliminado) {
      return res.status(404).json({
        success: false,
        mensaje: 'Producto no encontrado'
      });
    }

    console.log('✅ Producto eliminado:', productoEliminado.nombre);

    res.json({
      success: true,
      mensaje: 'Producto eliminado exitosamente',
      data: productoEliminado
    });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        mensaje: 'Producto no encontrado - ID inválido'
      });
    }

    console.error('Error al eliminar producto:', error);
    res.status(500).json({
      success: false,
      mensaje: 'Error al eliminar el producto',
      error: error.message
    });
  }
});

module.exports = router;