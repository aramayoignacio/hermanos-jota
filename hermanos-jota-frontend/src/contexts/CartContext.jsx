import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe usarse dentro de un CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setItems(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addItem = (producto, cantidad = 1) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.producto._id === producto._id);
      
      if (existingItem) {
        return prevItems.map(item =>
          item.producto._id === producto._id
            ? { ...item, cantidad: item.cantidad + cantidad }
            : item
        );
      }
      
      return [...prevItems, { producto, cantidad }];
    });
  };

  const removeItem = (productoId) => {
    setItems(prevItems => prevItems.filter(item => item.producto._id !== productoId));
  };

  const updateQuantity = (productoId, cantidad) => {
    if (cantidad <= 0) {
      removeItem(productoId);
      return;
    }
    
    setItems(prevItems =>
      prevItems.map(item =>
        item.producto._id === productoId
          ? { ...item, cantidad }
          : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    localStorage.removeItem('cart');
  };

  const getTotal = () => {
    return items.reduce((total, item) => {
      return total + (item.producto.precio * item.cantidad);
    }, 0);
  };

  const getItemCount = () => {
    return items.reduce((count, item) => count + item.cantidad, 0);
  };

  const value = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getTotal,
    getItemCount
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};