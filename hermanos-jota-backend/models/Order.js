const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'El usuario es obligatorio']
  },
  productos: [{
    producto: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    nombre: {
      type: String,
      required: true
    },
    cantidad: {
      type: Number,
      required: true,
      min: 1
    },
    precio: {
      type: Number,
      required: true
    },
    subtotal: {
      type: Number,
      required: true
    }
  }],
  total: {
    type: Number,
    required: true,
    min: 0
  },
  estado: {
    type: String,
    enum: ['pendiente', 'confirmado', 'en_proceso', 'enviado', 'entregado', 'cancelado'],
    default: 'pendiente'
  },
  direccionEnvio: {
    calle: { type: String, required: true },
    ciudad: { type: String, required: true },
    provincia: { type: String, required: true },
    codigoPostal: { type: String, required: true }
  },
  metodoPago: {
    type: String,
    enum: ['efectivo', 'transferencia', 'tarjeta'],
    default: 'efectivo'
  },
  notas: {
    type: String,
    maxlength: 500
  }
}, {
  timestamps: true
});

// Calcular total antes de guardar
orderSchema.pre('save', function(next) {
  this.total = this.productos.reduce((sum, item) => sum + item.subtotal, 0);
  next();
});

module.exports = mongoose.model('Order', orderSchema);
