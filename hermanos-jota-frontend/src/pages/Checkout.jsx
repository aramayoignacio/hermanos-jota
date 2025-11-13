import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { crearPedido } from '../services/api';

function Checkout() {
  const navigate = useNavigate();
  const { items, getTotal, clearCart } = useCart();
  const { user } = useAuth();
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    direccionEnvio: {
      calle: user?.direccion?.calle || '',
      ciudad: user?.direccion?.ciudad || '',
      provincia: user?.direccion?.provincia || '',
      codigoPostal: user?.direccion?.codigoPostal || ''
    },
    metodoPago: 'efectivo',
    notas: ''
  });

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0
    }).format(price);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.startsWith('direccion.')) {
      const field = name.split('.')[1];
      setFormData({
        ...formData,
        direccionEnvio: {
          ...formData.direccionEnvio,
          [field]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const pedidoData = {
        productos: items.map(item => ({
          producto: item.producto._id,
          cantidad: item.cantidad
        })),
        direccionEnvio: formData.direccionEnvio,
        metodoPago: formData.metodoPago,
        notas: formData.notas
      };

      const response = await crearPedido(pedidoData);
      
      if (response.success) {
        clearCart();
        navigate('/pedido-exitoso', { 
          state: { pedido: response.data } 
        });
      }
    } catch (err) {
      setError(err.message);
      window.scrollTo(0, 0);
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    navigate('/carrito');
    return null;
  }

  return (
    <section className="section section-alt page-container">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">FINALIZAR COMPRA</h2>
          <p className="section-subtitle">
            Completa los datos para confirmar tu pedido
          </p>
        </div>

        {error && (
          <div className="alert alert-error">
            <i className="fas fa-exclamation-triangle"></i> {error}
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem', alignItems: 'start' }}>
          <form onSubmit={handleSubmit}>
            <div className="contact-form" style={{ marginBottom: '2rem' }}>
              <h3 className="form-subtitle">Dirección de Envío</h3>

              <div className="form-group">
                <label htmlFor="direccion.calle">Calle *</label>
                <input
                  type="text"
                  id="direccion.calle"
                  name="direccion.calle"
                  value={formData.direccionEnvio.calle}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="direccion.ciudad">Ciudad *</label>
                  <input
                    type="text"
                    id="direccion.ciudad"
                    name="direccion.ciudad"
                    value={formData.direccionEnvio.ciudad}
                    onChange={handleChange}
                    required
                    disabled={loading}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="direccion.provincia">Provincia *</label>
                  <input
                    type="text"
                    id="direccion.provincia"
                    name="direccion.provincia"
                    value={formData.direccionEnvio.provincia}
                    onChange={handleChange}
                    required
                    disabled={loading}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="direccion.codigoPostal">Código Postal *</label>
                  <input
                    type="text"
                    id="direccion.codigoPostal"
                    name="direccion.codigoPostal"
                    value={formData.direccionEnvio.codigoPostal}
                    onChange={handleChange}
                    required
                    disabled={loading}
                  />
                </div>
              </div>
            </div>

            <div className="contact-form" style={{ marginBottom: '2rem' }}>
              <h3 className="form-subtitle">Método de Pago</h3>

              <div className="form-group">
                <label htmlFor="metodoPago">Selecciona un método *</label>
                <select
                  id="metodoPago"
                  name="metodoPago"
                  value={formData.metodoPago}
                  onChange={handleChange}
                  required
                  disabled={loading}
                >
                  <option value="efectivo">Efectivo (Pago contra entrega)</option>
                  <option value="transferencia">Transferencia Bancaria</option>
                  <option value="tarjeta">Tarjeta de Crédito/Débito</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="notas">Notas adicionales</label>
                <textarea
                  id="notas"
                  name="notas"
                  rows="3"
                  value={formData.notas}
                  onChange={handleChange}
                  placeholder="Instrucciones especiales..."
                  disabled={loading}
                ></textarea>
              </div>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary btn-full"
              disabled={loading}
            >
              {loading ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i>
                  Procesando...
                </>
              ) : (
                <>
                  <i className="fas fa-check"></i>
                  Confirmar Pedido
                </>
              )}
            </button>
          </form>

          <div className="cart-summary">
            <h3>Resumen del Pedido</h3>

            <div style={{ marginBottom: '1.5rem' }}>
              {items.map((item) => (
                <div key={item.producto._id} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '1rem',
                  paddingBottom: '1rem',
                  borderBottom: '1px solid #f0f0f0'
                }}>
                  <div>
                    <p style={{ fontWeight: '600', marginBottom: '0.25rem' }}>
                      {item.producto.nombre}
                    </p>
                    <p style={{ fontSize: '0.85rem', color: 'var(--texto-claro)' }}>
                      Cantidad: {item.cantidad}
                    </p>
                  </div>
                  <span style={{ fontWeight: '600' }}>
                    {formatPrice(item.producto.precio * item.cantidad)}
                  </span>
                </div>
              ))}
            </div>

            <div className="cart-summary-total">
              <span>Total</span>
              <span>{formatPrice(getTotal())}</span>
            </div>

            <div style={{ 
              marginTop: '1.5rem', 
              padding: '1rem', 
              background: 'rgba(135, 169, 107, 0.1)', 
              borderRadius: '8px' 
            }}>
              <p style={{ fontSize: '0.85rem', color: 'var(--verde-salvia)', margin: 0 }}>
                <i className="fas fa-shield-alt"></i> Compra segura
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Checkout;