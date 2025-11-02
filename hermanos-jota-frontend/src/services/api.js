const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

// Obtener todos los productos
export const getProductos = async () => {
  const response = await fetch(`${API_URL}/productos`);
  if (!response.ok) throw new Error('Error al obtener productos');
  return response.json();
};

// Obtener un producto por ID
export const getProducto = async (id) => {
  const response = await fetch(`${API_URL}/productos/${id}`);
  if (!response.ok) throw new Error('Error al obtener el producto');
  return response.json();
};

// Crear un nuevo producto
export const createProducto = async (productoData) => {
  const response = await fetch(`${API_URL}/productos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(productoData),
  });
  if (!response.ok) throw new Error('Error al crear el producto');
  return response.json();
};

// Actualizar un producto
export const updateProducto = async (id, productoData) => {
  const response = await fetch(`${API_URL}/productos/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(productoData),
  });
  if (!response.ok) throw new Error('Error al actualizar el producto');
  return response.json();
};

// Eliminar un producto
export const deleteProducto = async (id) => {
  const response = await fetch(`${API_URL}/productos/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Error al eliminar el producto');
  return response.json();
};