const API_URL = process.env.REACT_APP_API_URL || 'https://hermanos-jota-y1ew.onrender.com/api';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

// ==================== PRODUCTOS ====================

export const getProductos = async (filtros = {}) => {
  const params = new URLSearchParams(filtros);
  const response = await fetch(`${API_URL}/productos?${params}`);
  if (!response.ok) throw new Error('Error al obtener productos');
  return response.json();
};

export const getProducto = async (id) => {
  const response = await fetch(`${API_URL}/productos/${id}`);
  if (!response.ok) throw new Error('Error al obtener el producto');
  return response.json();
};

export const createProducto = async (productoData) => {
  const response = await fetch(`${API_URL}/productos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader()
    },
    body: JSON.stringify(productoData),
  });
  if (!response.ok) throw new Error('Error al crear el producto');
  return response.json();
};

export const updateProducto = async (id, productoData) => {
  const response = await fetch(`${API_URL}/productos/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader()
    },
    body: JSON.stringify(productoData),
  });
  if (!response.ok) throw new Error('Error al actualizar el producto');
  return response.json();
};

export const deleteProducto = async (id) => {
  const response = await fetch(`${API_URL}/productos/${id}`, {
    method: 'DELETE',
    headers: getAuthHeader()
  });
  if (!response.ok) throw new Error('Error al eliminar el producto');
  return response.json();
};

// ==================== AUTENTICACIÓN ====================

export const registro = async (userData) => {
  const response = await fetch(`${API_URL}/auth/registro`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.mensaje || 'Error en el registro');
  }
  
  return data;
};

export const login = async (email, password) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.mensaje || 'Error en el login');
  }
  
  return data;
};

export const obtenerPerfil = async () => {
  const response = await fetch(`${API_URL}/auth/perfil`, {
    headers: getAuthHeader()
  });
  
  if (!response.ok) throw new Error('Error al obtener perfil');
  return response.json();
};

export const actualizarPerfil = async (userData) => {
  const response = await fetch(`${API_URL}/auth/perfil`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader()
    },
    body: JSON.stringify(userData),
  });
  
  if (!response.ok) throw new Error('Error al actualizar perfil');
  return response.json();
};

export const cambiarPassword = async (passwordActual, passwordNuevo) => {
  const response = await fetch(`${API_URL}/auth/cambiar-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader()
    },
    body: JSON.stringify({ passwordActual, passwordNuevo }),
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.mensaje || 'Error al cambiar contraseña');
  }
  
  return data;
};

// ==================== PEDIDOS ====================

export const crearPedido = async (pedidoData) => {
  const response = await fetch(`${API_URL}/pedidos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader()
    },
    body: JSON.stringify(pedidoData),
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.mensaje || 'Error al crear pedido');
  }
  
  return data;
};

export const obtenerMisPedidos = async () => {
  const response = await fetch(`${API_URL}/pedidos/mis-pedidos`, {
    headers: getAuthHeader()
  });
  
  if (!response.ok) throw new Error('Error al obtener pedidos');
  return response.json();
};

export const obtenerPedido = async (id) => {
  const response = await fetch(`${API_URL}/pedidos/${id}`, {
    headers: getAuthHeader()
  });
  
  if (!response.ok) throw new Error('Error al obtener el pedido');
  return response.json();
};

export const obtenerTodosPedidos = async (filtros = {}) => {
  const params = new URLSearchParams(filtros);
  const response = await fetch(`${API_URL}/pedidos?${params}`, {
    headers: getAuthHeader()
  });
  
  if (!response.ok) throw new Error('Error al obtener pedidos');
  return response.json();
};

export const actualizarEstadoPedido = async (id, estado) => {
  const response = await fetch(`${API_URL}/pedidos/${id}/estado`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader()
    },
    body: JSON.stringify({ estado }),
  });
  
  if (!response.ok) throw new Error('Error al actualizar estado del pedido');
  return response.json();
};