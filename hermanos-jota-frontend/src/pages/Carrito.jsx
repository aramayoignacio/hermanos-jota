import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

function Carrito() {
  const { items, removeItem, updateQuantity, getTotal, getItemCount } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0
    }).format(price);
  };

  const handleCheckout = () => {
    if (!isAuthenticated()) {
      navigate('/login', { state: { from: { pathname: '/checkout' } } });
    } else {
      navigate('/checkout');
    }
  };

  if (items.length === 0) {
    return (
      <section className="section section-alt page-container">
        <div className="container">
          <div className="empty-container">
            <i className="fas fa-shopping-cart"></i>
            <h3>Tu carrito está vacío</h3>
            <p>Descubre nuestros muebles artesanales</p>
            <Link to="/productos" className="btn btn-primary">
              <i className="fas fa-shopping-bag"></i>
              Explorar Productos
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section section-alt page-container">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">MI CARRITO</h2>
          <p className="section-subtitle">
            {getItemCount()} {getItemCount() === 1 ? 'producto' : 'productos'}
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem', alignItems: 'start' }}>
          <div>
            {items.map((item) => (
              <div key={item.producto._id} className="cart-item">
                <div className="cart-item-content">
                  <div className="cart-item-image">
                    <i className="fas fa-couch"></i>
                  </div>

                  <div className="cart-item-info">
                    <h3>{item.producto.nombre}</h3>
                    <p>
                      <i className="fas fa-tree"></i> {item.producto.material}
                    </p>
                    <p className="cart-item-price">
                      {formatPrice(item.producto.precio)}
                    </p>
                  </div>

                  <div className="cart-item-controls">
                    <div className="cart-quantity-controls">
                      <button
                        className="quantity-btn"
                        onClick={() => updateQuantity(item.producto._id, item.cantidad - 1)}
                      >
                        <i className="fas fa-minus"></i>
                      </button>
                      <span className="quantity-value">{item.cantidad}</span>
                      <button
                        className="quantity-btn"
                        onClick={() => updateQuantity(item.producto._id, item.cantidad + 1)}
                      >
                        <i className="fas fa-plus"></i>
                      </button>
                    </div>
                    <button
                      className="cart-remove-btn"
                      onClick={() => removeItem(item.producto._id)}
                    >
                      <i className="fas fa-trash"></i> Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>Resumen del Pedido</h3>

            <div style={{ borderBottom: '1px solid #e0e0e0', paddingBottom: '1rem', marginBottom: '1rem' }}>
              <div className="cart-summary-line">
                <span>Subtotal</span>
                <span>{formatPrice(getTotal())}</span>
              </div>
              <div className="cart-summary-line">
                <span>Envío</span>
                <span style={{ color: 'var(--verde-salvia)' }}>A calcular</span>
              </div>
            </div>

            <div className="cart-summary-total">
              <span>Total</span>
              <span>{formatPrice(getTotal())}</span>
            </div>

            <button
              onClick={handleCheckout}
              className="btn btn-primary btn-full"
              style={{ marginBottom: '1rem' }}
            >
              <i className="fas fa-shopping-bag"></i>
              Finalizar Compra
            </button>

            <Link to="/productos" className="btn btn-secondary btn-full">
              <i className="fas fa-arrow-left"></i>
              Seguir Comprando
            </Link>

            <div style={{ 
              marginTop: '1.5rem', 
              padding: '1rem', 
              background: 'rgba(135, 169, 107, 0.1)', 
              borderRadius: '8px' 
            }}>
              <p style={{ fontSize: '0.85rem', color: 'var(--verde-salvia)', margin: 0 }}>
                <i className="fas fa-truck"></i> Envío gratis en compras superiores a $500.000
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Carrito;