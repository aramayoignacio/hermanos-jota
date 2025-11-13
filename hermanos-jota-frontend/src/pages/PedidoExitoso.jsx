import React from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';

function PedidoExitoso() {
  const location = useLocation();
  const pedido = location.state?.pedido;

  if (!pedido) {
    return <Navigate to="/" replace />;
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0
    }).format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-AR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <section className="section section-alt page-container">
      <div className="container">
        <div className="form-container-wide">
          <div className="contact-form" style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div className="success-icon">
              <i className="fas fa-check-circle"></i>
            </div>

            <h1 style={{ 
              fontFamily: 'var(--font-secondary)', 
              fontSize: '2.5rem', 
              color: 'var(--siena-tostado)', 
              marginBottom: '1rem' 
            }}>
              ¡Pedido Realizado con Éxito!
            </h1>

            <p style={{ 
              fontSize: '1.1rem', 
              color: 'var(--texto-claro)', 
              marginBottom: '2rem',
              lineHeight: '1.6'
            }}>
              Gracias por tu compra. Te enviaremos un correo con los detalles.
            </p>

            <div style={{
              background: 'var(--alabastro-calido)',
              padding: '1.5rem',
              borderRadius: '10px',
              marginBottom: '2rem'
            }}>
              <p style={{ fontSize: '0.9rem', color: 'var(--texto-claro)', marginBottom: '0.5rem' }}>
                Número de Pedido
              </p>
              <p style={{ 
                fontSize: '1.5rem', 
                fontWeight: '700', 
                color: 'var(--siena-tostado)',
                fontFamily: 'monospace'
              }}>
                #{pedido._id.slice(-8).toUpperCase()}
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '1rem',
              marginBottom: '2rem',
              textAlign: 'left'
            }}>
              <div>
                <p style={{ fontSize: '0.85rem', color: 'var(--texto-claro)', marginBottom: '0.25rem' }}>
                  Fecha
                </p>
                <p style={{ fontWeight: '600' }}>
                  {formatDate(pedido.createdAt)}
                </p>
              </div>
              <div>
                <p style={{ fontSize: '0.85rem', color: 'var(--texto-claro)', marginBottom: '0.25rem' }}>
                  Total
                </p>
                <p style={{ fontWeight: '600', color: 'var(--vara-oro)' }}>
                  {formatPrice(pedido.total)}
                </p>
              </div>
              <div>
                <p style={{ fontSize: '0.85rem', color: 'var(--texto-claro)', marginBottom: '0.25rem' }}>
                  Estado
                </p>
                <p style={{ fontWeight: '600', color: 'var(--verde-salvia)' }}>
                  Pendiente
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <Link to="/mis-pedidos" className="btn btn-primary">
                <i className="fas fa-list"></i>
                Ver Mis Pedidos
              </Link>
              <Link to="/productos" className="btn btn-secondary">
                <i className="fas fa-shopping-bag"></i>
                Seguir Comprando
              </Link>
            </div>
          </div>

          <div className="contact-form">
            <h3 className="form-subtitle">Resumen del Pedido</h3>

            {pedido.productos.map((item, index) => (
              <div key={index} style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '1rem',
                paddingBottom: '1rem',
                borderBottom: index < pedido.productos.length - 1 ? '1px solid #f0f0f0' : 'none'
              }}>
                <div>
                  <p style={{ fontWeight: '600', marginBottom: '0.25rem' }}>
                    {item.nombre}
                  </p>
                  <p style={{ fontSize: '0.85rem', color: 'var(--texto-claro)' }}>
                    Cantidad: {item.cantidad} × {formatPrice(item.precio)}
                  </p>
                </div>
                <span style={{ fontWeight: '600' }}>
                  {formatPrice(item.subtotal)}
                </span>
              </div>
            ))}

            <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '2px solid #e0e0e0' }}>
              <h4 style={{ fontSize: '1.1rem', color: 'var(--siena-tostado)', marginBottom: '1rem' }}>
                Dirección de Envío
              </h4>
              <p style={{ color: 'var(--texto-claro)', lineHeight: '1.6' }}>
                {pedido.direccionEnvio.calle}<br />
                {pedido.direccionEnvio.ciudad}, {pedido.direccionEnvio.provincia}<br />
                CP: {pedido.direccionEnvio.codigoPostal}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PedidoExitoso;