import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import { getProducto, deleteProducto } from '../services/api';

function ProductoDetalle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    cargarProducto();
  }, [id]);

  const cargarProducto = async () => {
    try {
      setLoading(true);
      const data = await getProducto(id);
      setProducto(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEliminar = async () => {
    const confirmacion = window.confirm(
      `¿Estás seguro de eliminar "${producto.nombre}"? Esta acción no se puede deshacer.`
    );

    if (confirmacion) {
      try {
        await deleteProducto(id);
        alert('Producto eliminado exitosamente');
        navigate('/productos');
      } catch (err) {
        alert('Error al eliminar el producto: ' + err.message);
      }
    }
  };

  if (loading) return <LoadingSpinner />;

  if (error) {
    return (
      <div className="error-container">
        <i className="fas fa-exclamation-triangle"></i>
        <h3>Error al cargar el producto</h3>
        <p>{error}</p>
        <Link to="/productos" className="btn btn-primary">
          Volver al catálogo
        </Link>
      </div>
    );
  }

  if (!producto) {
    return (
      <div className="error-container">
        <h3>Producto no encontrado</h3>
        <Link to="/productos" className="btn btn-primary">
          Volver al catálogo
        </Link>
      </div>
    );
  }

  return (
    <section className="section product-detail-section">
      <div className="container">
        <Link to="/productos" className="btn btn-secondary back-button">
          <i className="fas fa-arrow-left"></i>
          Volver al catálogo
        </Link>

        <div className="product-detail-container">
          <div className="product-detail-image">
            <div className="detail-image-placeholder">
              <i className="fas fa-couch"></i>
            </div>
            <div className="sustainability-badge-large">
              {producto.certificacion}
            </div>
          </div>

          <div className="product-detail-info">
            <h1 className="detail-title">{producto.nombre}</h1>
            
            <div className="detail-price">
              ${producto.precio.toLocaleString('es-AR')}
            </div>

            <div className="detail-description">
              <h3>Descripción</h3>
              <p>{producto.descripcion}</p>
            </div>

            <div className="detail-specs">
              <h3>Especificaciones</h3>
              <ul>
                <li><strong>Material:</strong> {producto.material}</li>
                <li><strong>Categoría:</strong> {producto.categoria}</li>
                <li><strong>Certificación:</strong> {producto.certificacion}</li>
                {producto.especificaciones?.medidas && (
                  <li><strong>Medidas:</strong> {producto.especificaciones.medidas}</li>
                )}
                {producto.especificaciones?.acabado && (
                  <li><strong>Acabado:</strong> {producto.especificaciones.acabado}</li>
                )}
                <li><strong>Stock:</strong> {producto.stock} unidades</li>
              </ul>
            </div>

            <div className="detail-status">
              {producto.enStock ? (
                <span className="in-stock">
                  <i className="fas fa-check-circle"></i>
                  Disponible
                </span>
              ) : (
                <span className="out-of-stock">
                  <i className="fas fa-times-circle"></i>
                  Agotado
                </span>
              )}
            </div>

            <div className="detail-actions">
              <button className="btn btn-primary btn-large">
                <i className="fab fa-whatsapp"></i>
                Consultar por WhatsApp
              </button>
              
              <button 
                onClick={handleEliminar}
                className="btn btn-danger btn-large"
              >
                <i className="fas fa-trash"></i>
                Eliminar Producto
              </button>
            </div>

            <div className="product-meta">
              <p><small>ID: {producto._id}</small></p>
              <p><small>Creado: {new Date(producto.createdAt).toLocaleDateString('es-AR')}</small></p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductoDetalle;