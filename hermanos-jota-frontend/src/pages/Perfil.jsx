import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { actualizarPerfil, cambiarPassword } from '../services/api';

function Perfil() {
  const { user, updateUser } = useAuth();
  const [editando, setEditando] = useState(false);
  const [cambiandoPassword, setCambiandoPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState({ tipo: '', texto: '' });

  const [formData, setFormData] = useState({
    nombre: user?.nombre || '',
    telefono: user?.telefono || '',
    direccion: {
      calle: user?.direccion?.calle || '',
      ciudad: user?.direccion?.ciudad || '',
      provincia: user?.direccion?.provincia || '',
      codigoPostal: user?.direccion?.codigoPostal || ''
    }
  });

  const [passwordData, setPasswordData] = useState({
    passwordActual: '',
    passwordNuevo: '',
    confirmarPassword: ''
  });

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
  };

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmitPerfil = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMensaje({ tipo: '', texto: '' });

    try {
      const response = await actualizarPerfil(formData);
      if (response.success) {
        updateUser(response.usuario);
        setMensaje({ tipo: 'success', texto: 'Perfil actualizado exitosamente' });
        setEditando(false);
      }
    } catch (err) {
      setMensaje({ tipo: 'error', texto: err.message });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitPassword = async (e) => {
    e.preventDefault();

    if (passwordData.passwordNuevo !== passwordData.confirmarPassword) {
      setMensaje({ tipo: 'error', texto: 'Las contraseñas no coinciden' });
      return;
    }

    if (passwordData.passwordNuevo.length < 6) {
      setMensaje({ tipo: 'error', texto: 'La contraseña debe tener al menos 6 caracteres' });
      return;
    }

    setLoading(true);
    setMensaje({ tipo: '', texto: '' });

    try {
      const response = await cambiarPassword(
        passwordData.passwordActual, 
        passwordData.passwordNuevo
      );
      if (response.success) {
        setMensaje({ tipo: 'success', texto: 'Contraseña actualizada exitosamente' });
        setPasswordData({ passwordActual: '', passwordNuevo: '', confirmarPassword: '' });
        setCambiandoPassword(false);
      }
    } catch (err) {
      setMensaje({ tipo: 'error', texto: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section section-alt page-container">
      <div className="container">
        <div className="form-container-wide">
          <div className="section-header">
            <h2 className="section-title">MI PERFIL</h2>
            <p className="section-subtitle">
              Gestiona tu información personal
            </p>
          </div>

          {mensaje.texto && (
            <div className={`alert ${mensaje.tipo === 'success' ? 'alert-success' : 'alert-error'}`}>
              <i className={`fas fa-${mensaje.tipo === 'success' ? 'check-circle' : 'exclamation-triangle'}`}></i> {mensaje.texto}
            </div>
          )}

          <div className="contact-form" style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 className="form-subtitle" style={{ marginBottom: 0 }}>Información Personal</h3>
              {!editando && (
                <button 
                  onClick={() => setEditando(true)}
                  className="btn btn-secondary"
                  style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}
                >
                  <i className="fas fa-edit"></i> Editar
                </button>
              )}
            </div>

            <form onSubmit={handleSubmitPerfil}>
              <div className="form-grid">
                <div className="form-group">
                  <label>Nombre Completo</label>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    disabled={!editando || loading}
                  />
                </div>

                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    value={user?.email}
                    disabled
                  />
                </div>

                <div className="form-group">
                  <label>Teléfono</label>
                  <input
                    type="tel"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    disabled={!editando || loading}
                  />
                </div>

                <div className="form-group">
                  <label>Rol</label>
                  <input
                    type="text"
                    value={user?.rol === 'admin' ? 'Administrador' : 'Cliente'}
                    disabled
                  />
                </div>
              </div>

              <h3 className="form-subtitle">Dirección</h3>

              <div className="form-group">
                <label>Calle</label>
                <input
                  type="text"
                  name="direccion.calle"
                  value={formData.direccion.calle}
                  onChange={handleChange}
                  disabled={!editando || loading}
                />
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label>Ciudad</label>
                  <input
                    type="text"
                    name="direccion.ciudad"
                    value={formData.direccion.ciudad}
                    onChange={handleChange}
                    disabled={!editando || loading}
                  />
                </div>

                <div className="form-group">
                  <label>Provincia</label>
                  <input
                    type="text"
                    name="direccion.provincia"
                    value={formData.direccion.provincia}
                    onChange={handleChange}
                    disabled={!editando || loading}
                  />
                </div>

                <div className="form-group">
                  <label>Código Postal</label>
                  <input
                    type="text"
                    name="direccion.codigoPostal"
                    value={formData.direccion.codigoPostal}
                    onChange={handleChange}
                    disabled={!editando || loading}
                  />
                </div>
              </div>

              {editando && (
                <div className="form-actions">
                  <button 
                    type="button"
                    onClick={() => setEditando(false)}
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
                        <i className="fas fa-spinner fa-spin"></i> Guardando...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-save"></i> Guardar
                      </>
                    )}
                  </button>
                </div>
              )}
            </form>
          </div>

          <div className="contact-form">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 className="form-subtitle" style={{ marginBottom: 0 }}>Cambiar Contraseña</h3>
              {!cambiandoPassword && (
                <button 
                  onClick={() => setCambiandoPassword(true)}
                  className="btn btn-secondary"
                  style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}
                >
                  <i className="fas fa-key"></i> Cambiar
                </button>
              )}
            </div>

            {cambiandoPassword && (
              <form onSubmit={handleSubmitPassword}>
                <div className="form-group">
                  <label>Contraseña Actual *</label>
                  <input
                    type="password"
                    name="passwordActual"
                    value={passwordData.passwordActual}
                    onChange={handlePasswordChange}
                    required
                    disabled={loading}
                  />
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <label>Nueva Contraseña *</label>
                    <input
                      type="password"
                      name="passwordNuevo"
                      value={passwordData.passwordNuevo}
                      onChange={handlePasswordChange}
                      required
                      minLength="6"
                      disabled={loading}
                    />
                  </div>

                  <div className="form-group">
                    <label>Confirmar Nueva Contraseña *</label>
                    <input
                      type="password"
                      name="confirmarPassword"
                      value={passwordData.confirmarPassword}
                      onChange={handlePasswordChange}
                      required
                      minLength="6"
                      disabled={loading}
                    />
                  </div>
                </div>

                <div className="form-actions">
                  <button 
                    type="button"
                    onClick={() => {
                      setCambiandoPassword(false);
                      setPasswordData({ passwordActual: '', passwordNuevo: '', confirmarPassword: '' });
                    }}
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
                        <i className="fas fa-spinner fa-spin"></i> Actualizando...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-check"></i> Cambiar
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Perfil;