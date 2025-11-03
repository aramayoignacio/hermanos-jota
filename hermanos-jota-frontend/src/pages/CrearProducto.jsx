import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProducto } from '../services/api';

function CrearProducto() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    categoria: '',
    material: '',
    certificacion: 'FSC',
    stock: '',
    enStock: true,
    imagenUrl: '',
    especificaciones: {
      medidas: '',
      materiales: '',
      acabado: '',
      peso: '',
      capacidad: '',
      garantia: ''
    }
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.startsWith('espec_')) {
      const especKey = name.replace('espec_', '');
      setFormData(prev => ({
        ...prev,
        especificaciones: {
          ...prev.especificaciones,
          [especKey]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const productoData = {
        ...formData,
        precio: Number(formData.precio),
        stock: Number(formData.stock)
      };

      const response = await createProducto(productoData);
      alert('¡Producto creado exitosamente!');
      navigate(`/productos/${response.data._id}`);
    } catch (error) {
      alert('Error al crear el producto: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section crear-producto-page">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">CREAR NUEVO PRODUCTO</h2>
          <p className="section-subtitle">
            Completa los campos para agregar un producto al catálogo
          </p>
        </div>

        <form onSubmit={handleSubmit} className="producto-form">
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="nombre">Nombre del Producto *</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="categoria">Categoría *</label>
              <select
                id="categoria"
                name="categoria"
                value={formData.categoria}
                onChange={handleChange}
                required
              >
                <option value="">Selecciona una categoría</option>
                <option value="mesas">Mesas</option>
                <option value="sillas">Sillas</option>
                <option value="sofas">Sofás</option>
                <option value="camas">Camas</option>
                <option value="bibliotecas">Bibliotecas</option>
                <option value="escritorios">Escritorios</option>
                <option value="aparadores">Aparadores</option>
                <option value="butacas">Butacas</option>
                <option value="sillones">Sillones</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="precio">Precio (ARS) *</label>
              <input
                type="number"
                id="precio"
                name="precio"
                value={formData.precio}
                onChange={handleChange}
                min="0"
                step="1000"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="stock">Stock *</label>
              <input
                type="number"
                id="stock"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                min="0"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="material">Material *</label>
              <input
                type="text"
                id="material"
                name="material"
                value={formData.material}
                onChange={handleChange}
                placeholder="Ej: Nogal macizo"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="certificacion">Certificación *</label>
              <select
                id="certificacion"
                name="certificacion"
                value={formData.certificacion}
                onChange={handleChange}
                required
              >
                <option value="FSC">FSC</option>
                <option value="Premium">Premium</option>
                <option value="Sustentable">Sustentable</option>
                <option value="Reciclado">Reciclado</option>
                <option value="Herencia Viva">Herencia Viva</option>
                <option value="Ergonómica">Ergonómica</option>
                <option value="Edición Limitada">Edición Limitada</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="descripcion">Descripción *</label>
            <textarea
              id="descripcion"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              rows="4"
              placeholder="Descripción detallada del producto..."
              required
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="imagenUrl">URL de la Imagen</label>
            <input
              type="text"
              id="imagenUrl"
              name="imagenUrl"
              value={formData.imagenUrl}
              onChange={handleChange}
              placeholder="https://ejemplo.com/imagen.jpg"
            />
          </div>

          <h3 className="form-subtitle">Especificaciones (Opcional)</h3>

          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="espec_medidas">Medidas</label>
              <input
                type="text"
                id="espec_medidas"
                name="espec_medidas"
                value={formData.especificaciones.medidas}
                onChange={handleChange}
                placeholder="180x90x75 cm"
              />
            </div>

            <div className="form-group">
              <label htmlFor="espec_acabado">Acabado</label>
              <input
                type="text"
                id="espec_acabado"
                name="espec_acabado"
                value={formData.especificaciones.acabado}
                onChange={handleChange}
                placeholder="Aceite natural"
              />
            </div>

            <div className="form-group">
              <label htmlFor="espec_peso">Peso</label>
              <input
                type="text"
                id="espec_peso"
                name="espec_peso"
                value={formData.especificaciones.peso}
                onChange={handleChange}
                placeholder="45 kg"
              />
            </div>

            <div className="form-group">
              <label htmlFor="espec_garantia">Garantía</label>
              <input
                type="text"
                id="espec_garantia"
                name="espec_garantia"
                value={formData.especificaciones.garantia}
                onChange={handleChange}
                placeholder="10 años"
              />
            </div>
          </div>

          <div className="form-checkbox">
            <label>
              <input
                type="checkbox"
                name="enStock"
                checked={formData.enStock}
                onChange={handleChange}
              />
              <span>Producto en stock</span>
            </label>
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={() => navigate('/productos')}
              className="btn btn-secondary"
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i>
                  Creando...
                </>
              ) : (
                <>
                  <i className="fas fa-save"></i>
                  Crear Producto
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default CrearProducto;