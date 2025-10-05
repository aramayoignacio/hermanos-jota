const express = require('express');
const router = express.Router();
const productos = require('../data/productos');

// GET /api/productos - Obtener todos los productos
router.get('/', (req, res) => {
  try {
    // Opcional: filtrado por categoría si se envía query param
    const { categoria } = req.query;
    
    if (categoria) {
      const productosFiltrados = productos.filter(
        p => p.categoria.toLowerCase() === categoria.toLowerCase()
      );
      return res.json({
        success: true,
        cantidad: productosFiltrados.length,
        data: productosFiltrados
      });
    }

    res.json({
      success: true,
      cantidad: productos.length,
      data: productos
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      mensaje: 'Error al obtener los productos',
      error: error.message
    });
  }
});

// GET /api/productos/:id - Obtener un producto por ID
router.get('/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    
    // Validar que el ID sea un número
    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        mensaje: 'El ID debe ser un número válido'
      });
    }

    const producto = productos.find(p => p.id === id);

    if (!producto) {
      return res.status(404).json({
        success: false,
        mensaje: `Producto con ID ${id} no encontrado`
      });
    }

    res.json({
      success: true,
      data: producto
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      mensaje: 'Error al obtener el producto',
      error: error.message
    });
  }
});

module.exports = router;
