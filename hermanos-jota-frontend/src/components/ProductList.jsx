import React from 'react';
import ProductCard from './ProductCard';

function ProductList({ productos, loading, error, onSelectProduct }) {
  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Cargando productos artesanales...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <i className="fas fa-exclamation-triangle"></i>
        <h3>Error al cargar los productos</h3>
        <p>{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="btn btn-primary"
        >
          Intentar de nuevo
        </button>
      </div>
    );
  }

  if (productos.length === 0) {
    return (
      <div className="empty-container">
        <i className="fas fa-box-open"></i>
        <h3>No hay productos disponibles</h3>
        <p>Pronto agregaremos nuevas piezas artesanales</p>
      </div>
    );
  }

  return (
    <section className="section section-alt">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">NUESTRA COLECCIÓN</h2>
          <p className="section-subtitle">
            Piezas únicas que combinan tradición artesanal con diseño contemporáneo
          </p>
        </div>
        
        <div className="products-grid">
          {productos.map((producto) => (
            <ProductCard
              key={producto.id}
              producto={producto}
              onSelectProduct={onSelectProduct}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProductList;