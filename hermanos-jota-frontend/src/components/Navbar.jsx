import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const { getItemCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const cartCount = getItemCount();

  return (
    <header className="header">
      <nav className="nav-container">
        <Link to="/" className="logo">HERMANOS JOTA</Link>
        
        <ul className="nav-menu">
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/productos">Productos</Link></li>
          <li><Link to="/contacto">Contacto</Link></li>
          
          {isAuthenticated() ? (
            <>
              <li>
                <Link to="/carrito" style={{ position: 'relative' }}>
                  <i className="fas fa-shopping-cart"></i> Carrito
                  {cartCount > 0 && (
                    <span className="cart-badge">{cartCount}</span>
                  )}
                </Link>
              </li>
              <li><Link to="/mis-pedidos">Mis Pedidos</Link></li>
              <li><Link to="/perfil">Mi Perfil</Link></li>
              {user?.rol === 'admin' && (
                <li>
                  <Link to="/admin/crear-producto" className="nav-admin">
                    <i className="fas fa-plus-circle"></i> Admin
                  </Link>
                </li>
              )}
              <li>
                <button
                  onClick={handleLogout}
                  className="btn btn-secondary"
                  style={{ padding: '0.5rem 1rem', fontSize: '0.95rem' }}
                >
                  <i className="fas fa-sign-out-alt"></i> Salir
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/carrito" style={{ position: 'relative' }}>
                  <i className="fas fa-shopping-cart"></i> Carrito
                  {cartCount > 0 && (
                    <span className="cart-badge">{cartCount}</span>
                  )}
                </Link>
              </li>
              <li><Link to="/login">Iniciar Sesión</Link></li>
              <li>
                <Link to="/registro" className="nav-admin">
                  Registrarse
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;