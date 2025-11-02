import React from 'react';
import { Link } from 'react-router-dom';

function ProductCard({ producto }) {
  return (
    <div className="product-card">
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
        <div className="product-price">
          ${producto.precio.toLocaleString('es-AR')}
        </div>
        <Link to={`/productos/${producto._id}`} className="btn btn-primary btn-small">
          <i className="fas fa-eye"></i>
          Ver Detalles
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;