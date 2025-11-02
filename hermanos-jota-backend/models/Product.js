const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre del producto es obligatorio'],
    trim: true,
    maxlength: [100, 'El nombre no puede exceder 100 caracteres']
  },
  descripcion: {
    type: String,
    required: [true, 'La descripción es obligatoria'],
    maxlength: [1000, 'La descripción no puede exceder 1000 caracteres']
  },
  precio: {
    type: Number,
    required: [true, 'El precio es obligatorio'],
    min: [0, 'El precio no puede ser negativo']
  },
  categoria: {
    type: String,
    required: true,
    trim: true
  },
  material: {
    type: String,
    required: true,
    trim: true
  },
  certificacion: {
    type: String,
    required: true,
    enum: ['FSC', 'Premium', 'Sustentable', 'Reciclado', 'Herencia Viva', 'Ergonómica', 'Edición Limitada'],
    default: 'FSC'
  },
  especificaciones: {
    medidas: String,
    materiales: String,
    acabado: String,
    peso: String,
    capacidad: String,
    garantia: String,
    certificacion: String
  },
  enStock: {
    type: Boolean,
    default: true
  },
  stock: {
    type: Number,
    default: 0,
    min: [0, 'El stock no puede ser negativo']
  },
  imagenUrl: {
    type: String,
    default: 'default-product.jpg'
  }
}, {
  timestamps: true // Crea automáticamente createdAt y updatedAt
});

// Índice para búsquedas más rápidas
productSchema.index({ nombre: 1, categoria: 1 });

// Método virtual para verificar disponibilidad
productSchema.virtual('disponible').get(function() {
  return this.enStock && this.stock > 0;
});

// Configurar toJSON para incluir virtuals
productSchema.set('toJSON', { virtuals: true });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;