import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { obtenerMisPedidos } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';

function MisPedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    cargarPedidos();
  }, []);

  const cargarPedidos = async () => {
    try {
      setLoading(true);
      const response = await obtenerMisPedidos();
      setPedidos(response.data);
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
      day: 'numeric'
    });
  };

  const getEstadoBadge = (estado) => {
    const config = {
      pendiente: { color: '#D4A437', icon: 'clock', texto: 'Pendiente' },
      confirmado: { color: '#87A96B', icon: 'check-circle', texto: 'Confirmado' },
      en_proceso: { color: '#5B9BD5', icon: 'sync', texto: 'En Proceso' },
      enviado: { color: '#9B59B6', icon: 'truck', texto: 'Enviado' },
      entregado: { color: '#27AE60', icon: 'check-double', texto: 'Entregado' },
      cancelado: { color: '#C47A6D', icon: 'times-circle', texto: 'Cancelado' }
    }[estado] || { color: '#D4A437', icon: 'clock', texto: 'Pendiente' };

    return (
      <span className="order-status-badge" style={{
        background: `${config.color}20`,
        color: config.color
      }}>
        <i className={`fas fa-${config.icon}`}></i>
        {config.texto}
      </span>
    );
  };

  if (loading) return <LoadingSpinner />;

  if (error) {
    return (
      <div className="error-container page-container">
        <i className="fas fa-exclamation-triangle"></i>
        <h3>Error al cargar los pedidos</h3>
        <p>{error}</p>
        <button onClick={cargarPedidos} className="btn btn-primary">
          Intentar de nuevo
        </button>
      </div>
    );
  }

  return (
    <section className="section section-alt page-container">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">MIS PEDIDOS</h2>
          <p className="section-subtitle">
            {pedidos.length} {pedidos.length === 1 ? 'pedido' : 'pedidos'}
          </p>
        </div>

        {pedidos.length === 0 ? (
          <div className="empty-container">
            <i className="fas fa-box-open"></i>
            <h3>No tienes pedidos aún</h3>
            <p>Descubre nuestros muebles</p>
            <Link to="/productos" className="btn btn-primary">
              <i className="fas fa-shopping-bag"></i>
              Explorar
            </Link>
          </div>
        ) : (
          <div>
            {pedidos.map((pedido) => (
              <div key={pedido._id} className="order-card">
                <div className="order-header">
                  <div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--texto-claro)', marginBottom: '0.25rem' }}>
                      Pedido
                    </p>
                    <p className="order-id">
                      #{pedido._id.slice(-8).toUpperCase()}
                    </p>
                  </div>

                  <div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--texto-claro)', marginBottom: '0.25rem' }}>
                      Fecha
                    </p>
                    <p className="order-date">
                      {formatDate(pedido.createdAt)}
                    </p>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    {getEstadoBadge(pedido.estado)}
                  </div>
                </div>

                <div className="order-items">
                  {pedido.productos.map((item, index) => (
                    <div key={index} className="order-item">
                      <div>
                        <p style={{ fontWeight: '600', marginBottom: '0.25rem' }}>
                          {item.nombre}
                        </p>
                        <p style={{ fontSize: '0.85rem', color: 'var(--texto-claro)' }}>
                          Cantidad: {item.cantidad}
                        </p>
                      </div>
                      <span style={{ fontWeight: '600' }}>
                        {formatPrice(item.subtotal)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="order-footer">
                  <div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--texto-claro)', marginBottom: '0.25rem' }}>
                      Total
                    </p>
                    <p className="order-total">
                      {formatPrice(pedido.total)}
                    </p>
                  </div>

                  <Link 
                    to={`/pedidos/${pedido._id}`}
                    className="btn btn-secondary"
                    style={{ padding: '0.7rem 1.5rem' }}
                  >
                    <i className="fas fa-eye"></i>
                    Ver Detalles
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default MisPedidos;