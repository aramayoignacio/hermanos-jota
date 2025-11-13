import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

function ProductCard({ producto }) {
  const { addItem } = useCart();
  const [agregado, setAgregado] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    addItem(producto, 1);
    setAgregado(true);
    
    setTimeout(() => {
      setAgregado(false);
    }, 2000);
  };

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
        
        <div className="product-actions">
          <Link 
            to={`/productos/${producto._id}`} 
            className="btn btn-secondary btn-small"
            style={{ flex: 1 }}
          >
            <i className="fas fa-eye"></i>
            Ver
          </Link>
          
          {producto.enStock && (
            <button
              onClick={handleAddToCart}
              className="btn btn-primary btn-small"
              style={{ 
                flex: 1,
                background: agregado ? 'var(--verde-salvia)' : 'var(--siena-tostado)'
              }}
            >
              {agregado ? (
                <>
                  <i className="fas fa-check"></i>
                  ✓
                </>
              ) : (
                <>
                  <i className="fas fa-cart-plus"></i>
                  Agregar
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;