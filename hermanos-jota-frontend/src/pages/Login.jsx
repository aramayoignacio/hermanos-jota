import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { login as loginAPI } from '../services/api';

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const from = location.state?.from?.pathname || '/';

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await loginAPI(formData.email, formData.password);
      
      if (response.success) {
        login(response.usuario, response.token);
        navigate(from, { replace: true });
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
        <div className="form-container">
          <div className="section-header">
            <h2 className="section-title">INICIAR SESIÓN</h2>
            <p className="section-subtitle">
              Accede a tu cuenta para gestionar tus pedidos
            </p>
          </div>

          <div className="contact-form">
            {error && (
              <div className="alert alert-error">
                <i className="fas fa-exclamation-triangle"></i> {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
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

              <div className="form-group">
                <label htmlFor="password">Contraseña *</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>

              <button 
                type="submit" 
                className="btn btn-primary btn-full"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i>
                    Iniciando sesión...
                  </>
                ) : (
                  <>
                    <i className="fas fa-sign-in-alt"></i>
                    Iniciar Sesión
                  </>
                )}
              </button>

              <div className="auth-link">
                ¿No tienes una cuenta?{' '}
                <Link to="/registro">Regístrate aquí</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;