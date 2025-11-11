const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'El email es obligatorio'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Por favor ingresa un email válido']
  },
  password: {
    type: String,
    required: [true, 'La contraseña es obligatoria'],
    minlength: [6, 'La contraseña debe tener al menos 6 caracteres'],
    select: false // No devolver el password por defecto en las consultas
  },
  telefono: {
    type: String,
    trim: true
  },
  direccion: {
    calle: String,
    ciudad: String,
    provincia: String,
    codigoPostal: String
  },
  rol: {
    type: String,
    enum: ['cliente', 'admin'],
    default: 'cliente'
  },
  activo: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Middleware para hashear password antes de guardar
userSchema.pre('save', async function(next) {
  // Solo hashear si el password fue modificado
  if (!this.isModified('password')) {
    return next();
  }

  try {
    // Generar salt y hashear password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Método para comparar passwords
userSchema.methods.compararPassword = async function(passwordIngresado) {
  return await bcrypt.compare(passwordIngresado, this.password);
};

// Método para obtener datos públicos del usuario
userSchema.methods.obtenerDatosPublicos = function() {
  return {
    _id: this._id,
    nombre: this.nombre,
    email: this.email,
    telefono: this.telefono,
    direccion: this.direccion,
    rol: this.rol,
    createdAt: this.createdAt
  };
};

module.exports = mongoose.model('User', userSchema);