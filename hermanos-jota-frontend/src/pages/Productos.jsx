import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { getProductos } from '../services/api';

function Productos() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    try {
      setLoading(true);
      const data = await getProductos();
      setProductos(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  if (error) {
    return (
      <div className="error-container page-container">
        <i className="fas fa-exclamation-triangle"></i>
        <h3>Error al cargar los productos</h3>
        <p>{error}</p>
        <button onClick={cargarProductos} className="btn btn-primary">
          Intentar de nuevo
        </button>
      </div>
    );
  }

  return (
    <section className="section section-alt page-container">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">NUESTRA COLECCIÓN</h2>
          <p className="section-subtitle">
            {productos.length} productos artesanales únicos
          </p>
        </div>
        
        <div className="products-grid">
          {productos.map((producto) => (
            <ProductCard key={producto._id} producto={producto} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Productos;