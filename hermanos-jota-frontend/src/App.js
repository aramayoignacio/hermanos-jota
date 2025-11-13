import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Productos from './pages/Productos';
import ProductoDetalle from './pages/ProductoDetalle';
import Contacto from './pages/Contacto';
import CrearProducto from './pages/CrearProducto';
import Login from './pages/Login';
import Registro from './pages/Registro';
import Perfil from './pages/Perfil';
import Carrito from './pages/Carrito';
import Checkout from './pages/Checkout';
import PedidoExitoso from './pages/PedidoExitoso';
import MisPedidos from './pages/MisPedidos';
import DetallePedido from './pages/DetallePedido';

import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <div className="App">
            <Navbar />
            <main>
              <Routes>
                {/* Rutas Públicas */}
                <Route path="/" element={<Home />} />
                <Route path="/productos" element={<Productos />} />
                <Route path="/productos/:id" element={<ProductoDetalle />} />
                <Route path="/contacto" element={<Contacto />} />
                <Route path="/carrito" element={<Carrito />} />
                
                {/* Rutas de Autenticación */}
                <Route path="/login" element={<Login />} />
                <Route path="/registro" element={<Registro />} />
                
                {/* Rutas Protegidas */}
                <Route 
                  path="/perfil" 
                  element={
                    <ProtectedRoute>
                      <Perfil />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/checkout" 
                  element={
                    <ProtectedRoute>
                      <Checkout />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/pedido-exitoso" 
                  element={
                    <ProtectedRoute>
                      <PedidoExitoso />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/mis-pedidos" 
                  element={
                    <ProtectedRoute>
                      <MisPedidos />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/pedidos/:id" 
                  element={
                    <ProtectedRoute>
                      <DetallePedido />
                    </ProtectedRoute>
                  } 
                />
                
                {/* Rutas de Administrador */}
                <Route 
                  path="/admin/crear-producto" 
                  element={
                    <ProtectedRoute requireAdmin={true}>
                      <CrearProducto />
                    </ProtectedRoute>
                  } 
                />
                
                {/* Ruta 404 */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;