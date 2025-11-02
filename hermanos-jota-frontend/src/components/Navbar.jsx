import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <header className="header">
      <nav className="nav-container">
        <Link to="/" className="logo">HERMANOS JOTA</Link>
        
        <ul className="nav-menu">
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/productos">Productos</Link></li>
          <li><Link to="/contacto">Contacto</Link></li>
          <li><Link to="/admin/crear-producto" className="nav-admin">
            <i className="fas fa-plus-circle"></i> Agregar Producto
          </Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;