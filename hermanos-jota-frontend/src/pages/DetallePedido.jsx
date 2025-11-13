import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { obtenerPedido } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';

function DetallePedido() {
  const { id } = useParams();
  const [pedido, setPedido] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    cargarPedido();
  }, [id]);

  const cargarPedido = async () => {
    try {
      setLoading(true);
      const response = await obtenerPedido(id);
      setPedido(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

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
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) return <LoadingSpinner />;

  if (error) {
    return (
      <div className="error-container page-container">
        <i className="fas fa-exclamation-triangle"></i>
        <h3>Error al cargar el pedido</h3>
        <p>{error}</p>
        <Link to="/mis-pedidos" className="btn btn-primary">
          Volver a Mis Pedidos
        </Link>
      </div>
    );
  }

  if (!pedido) {
    return (
      <div className="error-container page-container">
        <h3>Pedido no encontrado</h3>
        <Link to="/mis-pedidos" className="btn btn-primary">
          Volver a Mis Pedidos
        </Link>
      </div>
    );
  }

  return (
    <section className="section section-alt page-container">
      <div className="container">
        <Link to="/mis-pedidos" className="btn btn-secondary back-button">
          <i className="fas fa-arrow-left"></i>
          Volver a Mis Pedidos
        </Link>

        <div className="section-header">
          <h2 className="section-title">DETALLE DEL PEDIDO</h2>
          <p className="section-subtitle">
            #{pedido._id.slice(-8).toUpperCase()}
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem', alignItems: 'start' }}>
          <div>
            <div className="contact-form" style={{ marginBottom: '2rem' }}>
              <h3 className="form-subtitle">Productos</h3>

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

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '1.5rem',
                paddingTop: '1.5rem',
                borderTop: '2px solid #e0e0e0'
              }}>
                <span style={{ fontSize: '1.2rem', fontWeight: '600' }}>Total</span>
                <span style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--vara-oro)' }}>
                  {formatPrice(pedido.total)}
                </span>
              </div>
            </div>

            <div className="contact-form">
              <h3 className="form-subtitle">Dirección de Envío</h3>
              <p style={{ color: 'var(--texto-claro)', lineHeight: '1.6' }}>
                {pedido.direccionEnvio.calle}<br />
                {pedido.direccionEnvio.ciudad}, {pedido.direccionEnvio.provincia}<br />
                CP: {pedido.direccionEnvio.codigoPostal}
              </p>

              {pedido.notas && (
                <>
                  <h3 className="form-subtitle">Notas</h3>
                  <p style={{ color: 'var(--texto-claro)' }}>
                    {pedido.notas}
                  </p>
                </>
              )}
            </div>
          </div>

          <div className="contact-form">
            <h3 className="form-subtitle">Información del Pedido</h3>

            <div style={{ marginBottom: '1rem' }}>
              <p style={{ fontSize: '0.85rem', color: 'var(--texto-claro)', marginBottom: '0.25rem' }}>
                Estado
              </p>
              <p style={{ fontWeight: '600', color: 'var(--verde-salvia)' }}>
                {pedido.estado.replace('_', ' ').toUpperCase()}
              </p>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <p style={{ fontSize: '0.85rem', color: 'var(--texto-claro)', marginBottom: '0.25rem' }}>
                Método de Pago
              </p>
              <p style={{ fontWeight: '600' }}>
                {pedido.metodoPago === 'efectivo' ? 'Efectivo' : 
                 pedido.metodoPago === 'transferencia' ? 'Transferencia' : 'Tarjeta'}
              </p>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <p style={{ fontSize: '0.85rem', color: 'var(--texto-claro)', marginBottom: '0.25rem' }}>
                Fecha de Pedido
              </p>
              <p style={{ fontWeight: '600' }}>
                {formatDate(pedido.createdAt)}
              </p>
            </div>

            <button className="btn btn-secondary btn-full">
              <i className="fab fa-whatsapp"></i>
              Contactar Soporte
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DetallePedido;