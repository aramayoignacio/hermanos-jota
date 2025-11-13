import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { registro as registroAPI } from '../services/api';

function Registro() {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmarPassword: '',
    telefono: '',
    direccion: {
      calle: '',
      ciudad: '',
      provincia: '',
      codigoPostal: ''
    }
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.startsWith('direccion.')) {
      const field = name.split('.')[1];
      setFormData({
        ...formData,
        direccion: {
          ...formData.direccion,
          [field]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmarPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { confirmarPassword, ...datosRegistro } = formData;
      const response = await registroAPI(datosRegistro);
      
      if (response.success) {
        login(response.usuario, response.token);
        navigate('/');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section section-alt page-container">
      <div className="container">
        <div className="form-container-wide">
          <div className="section-header">
            <h2 className="section-title">CREAR CUENTA</h2>
            <p className="section-subtitle">
              Únete a nuestra comunidad
            </p>
          </div>

          <div className="contact-form">
            {error && (
              <div className="alert alert-error">
                <i className="fas fa-exclamation-triangle"></i> {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <h3 className="form-subtitle">Información Personal</h3>
              
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="nombre">Nombre Completo *</label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                    disabled={loading}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="telefono">Teléfono</label>
                  <input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="email">Correo Electrónico *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="password">Contraseña *</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    minLength="6"
                    disabled={loading}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="confirmarPassword">Confirmar Contraseña *</label>
                  <input
                    type="password"
                    id="confirmarPassword"
                    name="confirmarPassword"
                    value={formData.confirmarPassword}
                    onChange={handleChange}
                    required
                    minLength="6"
                    disabled={loading}
                  />
                </div>
              </div>

              <h3 className="form-subtitle">Dirección de Envío (Opcional)</h3>

              <div className="form-group">
                <label htmlFor="direccion.calle">Calle</label>
                <input
                  type="text"
                  id="direccion.calle"
                  name="direccion.calle"
                  value={formData.direccion.calle}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="direccion.ciudad">Ciudad</label>
                  <input
                    type="text"
                    id="direccion.ciudad"
                    name="direccion.ciudad"
                    value={formData.direccion.ciudad}
                    onChange={handleChange}
                    disabled={loading}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="direccion.provincia">Provincia</label>
                  <input
                    type="text"
                    id="direccion.provincia"
                    name="direccion.provincia"
                    value={formData.direccion.provincia}
                    onChange={handleChange}
                    disabled={loading}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="direccion.codigoPostal">Código Postal</label>
                  <input
                    type="text"
                    id="direccion.codigoPostal"
                    name="direccion.codigoPostal"
                    value={formData.direccion.codigoPostal}
                    onChange={handleChange}
                    disabled={loading}
                  />
                </div>
              </div>

              <button 
                type="submit" 
                className="btn btn-primary btn-full"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i>
                    Creando cuenta...
                  </>
                ) : (
                  <>
                    <i className="fas fa-user-plus"></i>
                    Crear Cuenta
                  </>
                )}
              </button>

              <div className="auth-link">
                ¿Ya tienes una cuenta?{' '}
                <Link to="/login">Inicia sesión aquí</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Registro;