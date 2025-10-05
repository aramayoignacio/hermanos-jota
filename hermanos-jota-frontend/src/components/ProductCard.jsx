import React from 'react';

function ProductCard({ producto, onSelectProduct }) {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="product-card" onClick={() => onSelectProduct(producto)}>
      <div className="product-image">
        <div className="sustainability-badge">{producto.certificacion}</div>
        {!producto.enStock && (
          <div className="out-of-stock-badge">Agotado</div>
        )}
      </div>
      <div className="product-info">
        <h3 className="product-title">{producto.nombre}</h3>
        <p className="product-description">
          {producto.descripcion.substring(0, 100)}...
        </p>
        <div className="product-details">
          <span className="product-material">
            <i className="fas fa-tree"></i> {producto.material}
          </span>
        </div>
        <div className="product-price">{formatPrice(producto.precio)}</div>
        <button className="btn btn-primary btn-small">
          <i className="fas fa-eye"></i>
          Ver Detalles
        </button>
      </div>
    </div>
  );
}

export default ProductCard;