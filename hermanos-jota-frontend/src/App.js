import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import ContactForm from './components/ContactForm';

const API_URL = 'http://localhost:3001/api/productos';

function App() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentView, setCurrentView] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetchProductos();
  }, []);

  const fetchProductos = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        setProductos(data.data);
      } else {
        throw new Error('No se pudieron cargar los productos');
      }
    } catch (err) {
      console.error('Error al cargar productos:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectProduct = (producto) => {
    setSelectedProduct(producto);
    setCurrentView('detalle');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToCatalog = () => {
    setSelectedProduct(null);
    setCurrentView('productos');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToCart = (producto) => {
    const existingItem = cart.find(item => item.id === producto.id);

    if (existingItem) {
      setCart(cart.map(item =>
        item.id === producto.id
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...producto, cantidad: 1 }]);
    }

    console.log('========================================');
    console.log('🛒 PRODUCTO AGREGADO AL CARRITO');
    console.log('========================================');
    console.log('Producto:', producto.nombre);
    console.log('Precio:', producto.precio);
    console.log('Carrito actualizado:', [...cart, producto]);
    console.log('========================================');
  };

  const handleNavigate = (view) => {
    setCurrentView(view);
    setSelectedProduct(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cartCount = cart.reduce((total, item) => total + item.cantidad, 0);

  const renderContent = () => {
    if (currentView === 'detalle' && selectedProduct) {
      return (
        <ProductDetail
          producto={selectedProduct}
          onBack={handleBackToCatalog}
          onAddToCart={handleAddToCart}
        />
      );
    }

    if (currentView === 'contacto') {
      return <ContactForm />;
    }

    if (currentView === 'productos') {
      return (
        <ProductList
          productos={productos}
          loading={loading}
          error={error}
          onSelectProduct={handleSelectProduct}
        />
      );
    }

    return (
      <>
        <section className="hero">
          <div className="hero-container">
            <div className="hero-content">
              <h1>EL ARTE DE CREAR MUEBLES QUE ALIMENTAN EL ALMA</h1>
              <p className="hero-subtitle">
                Donde la herencia se encuentra con la innovación
              </p>
              <p className="hero-description">
                Cada pieza cuenta la historia de manos expertas y materiales nobles.
                Redescubrimos el arte olvidado de crear muebles que no solo sirven
                una función, sino que se convierten en legado.
              </p>
              <div className="cta-buttons">
                <button
                  onClick={() => handleNavigate('productos')}
                  className="btn btn-primary"
                >
                  <i className="fas fa-eye"></i>
                  Ver Colección
                </button>
                <button
                  onClick={() => handleNavigate('contacto')}
                  className="btn btn-secondary"
                >
                  <i className="fas fa-heart"></i>
                  Contacto
                </button>
              </div>
            </div>
            <div className="hero-image">
              <div className="hero-furniture"></div>
            </div>
          </div>
        </section>

        <section className="section section-alt">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">PRODUCTOS DESTACADOS</h2>
              <p className="section-subtitle">
                Un adelanto de nuestra colección artesanal
              </p>
            </div>
            <div className="products-grid">
              {productos.slice(0, 3).map((producto) => (
                <div
                  key={producto.id}
                  className="product-card"
                  onClick={() => handleSelectProduct(producto)}
                >
                  <div className="product-image">
                    <div className="sustainability-badge">
                      {producto.certificacion}
                    </div>
                  </div>
                  <div className="product-info">
                    <h3 className="product-title">{producto.nombre}</h3>
                    <p className="product-description">
                      {producto.descripcion.substring(0, 80)}...
                    </p>
                    <div className="product-price">
                      ${producto.precio.toLocaleString()}
                    </div>
                    <button className="btn btn-primary btn-small">
                      Ver Detalles
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="section-header" style={{ marginTop: '2rem' }}>
              <button
                onClick={() => handleNavigate('productos')}
                className="btn btn-secondary"
              >
                Ver Todos los Productos
              </button>
            </div>
          </div>
        </section>
      </>
    );
  };

  return (
    <div className="App">
      <Navbar cartCount={cartCount} onNavigate={handleNavigate} />
      <main>{renderContent()}</main>
      <Footer />
    </div>
  );
}

export default App;