import React from 'react';

function ProductDetail({ producto, onBack, onAddToCart }) {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0
    }).format(price);
  };

  const handleAddToCart = () => {
    onAddToCart(producto);
    alert(`✅ ${producto.nombre} agregado al carrito`);
  };

  return (
    <section className="section product-detail-section">
      <div className="container">
        <button onClick={onBack} className="btn btn-secondary back-button">
          <i className="fas fa-arrow-left"></i>
          Volver al catálogo
        </button>

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
            
            <div className="detail-price">{formatPrice(producto.precio)}</div>

            <div className="detail-description">
              <h3>Descripción</h3>
              <p>{producto.descripcion}</p>
            </div>

            <div className="detail-specs">
              <h3>Especificaciones</h3>
              <ul>
                <li>
                  <strong>Material Principal:</strong> {producto.material}
                </li>
                {producto.especificaciones && (
                  <>
                    <li>
                      <strong>Medidas:</strong> {producto.especificaciones.medidas}
                    </li>
                    <li>
                      <strong>Materiales:</strong> {producto.especificaciones.materiales}
                    </li>
                    <li>
                      <strong>Acabado:</strong> {producto.especificaciones.acabado}
                    </li>
                    {producto.especificaciones.peso && (
                      <li>
                        <strong>Peso:</strong> {producto.especificaciones.peso}
                      </li>
                    )}
                    {producto.especificaciones.capacidad && (
                      <li>
                        <strong>Capacidad:</strong> {producto.especificaciones.capacidad}
                      </li>
                    )}
                    {producto.especificaciones.garantia && (
                      <li>
                        <strong>Garantía:</strong> {producto.especificaciones.garantia}
                      </li>
                    )}
                  </>
                )}
                <li>
                  <strong>Categoría:</strong> {producto.categoria}
                </li>
                <li>
                  <strong>Certificación:</strong> {producto.certificacion}
                </li>
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
                  Agotado temporalmente
                </span>
              )}
            </div>

            <div className="detail-actions">
              <button
                onClick={handleAddToCart}
                className="btn btn-primary btn-large"
                disabled={!producto.enStock}
              >
                <i className="fas fa-shopping-cart"></i>
                {producto.enStock ? 'Añadir al Carrito' : 'No Disponible'}
              </button>
              
              <button className="btn btn-secondary btn-large">
                <i className="fab fa-whatsapp"></i>
                Consultar por WhatsApp
              </button>
            </div>

            <div className="detail-features">
              <div className="feature-item">
                <i className="fas fa-leaf"></i>
                <span>100% Sustentable</span>
              </div>
              <div className="feature-item">
                <i className="fas fa-hammer"></i>
                <span>Hecho a Mano</span>
              </div>
              <div className="feature-item">
                <i className="fas fa-shield-alt"></i>
                <span>Garantía Extendida</span>
              </div>
              <div className="feature-item">
                <i className="fas fa-truck"></i>
                <span>Envío a Todo el País</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductDetail;