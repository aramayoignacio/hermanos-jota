import React, { useState } from 'react';

function Contacto() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    tipoConsulta: '',
    mensaje: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Formulario enviado:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setFormData({
        nombre: '',
        email: '',
        telefono: '',
        tipoConsulta: '',
        mensaje: ''
      });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <section className="section section-alt page-container">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">CONVERSEMOS</h2>
          <p className="section-subtitle">
            ¿Tienes una visión? Hablemos de cómo crear juntos la pieza perfecta
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '3rem' }}>
          <div className="contact-form">
            {submitted ? (
              <div className="success-message">
                <i className="fas fa-check-circle"></i>
                <h3>¡Mensaje enviado con éxito!</h3>
                <p>Nos pondremos en contacto contigo pronto.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="nombre">Nombre Completo *</label>
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
                  <label htmlFor="email">Correo Electrónico *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
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
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="tipoConsulta">Tipo de Consulta *</label>
                  <select
                    id="tipoConsulta"
                    name="tipoConsulta"
                    value={formData.tipoConsulta}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Selecciona una opción</option>
                    <option value="producto">Consulta sobre producto</option>
                    <option value="personalizado">Diseño personalizado</option>
                    <option value="restauracion">Servicio de restauración</option>
                    <option value="herencia">Programa Herencia Viva</option>
                    <option value="otra">Otra consulta</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="mensaje">Cuéntanos tu proyecto *</label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    rows="5"
                    value={formData.mensaje}
                    onChange={handleChange}
                    placeholder="Describe tu visión, el espacio, tus necesidades..."
                    required
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary btn-full">
                  <i className="fas fa-paper-plane"></i>
                  Enviar Mensaje
                </button>
              </form>
            )}
          </div>

          <div>
            <h3 style={{ 
              fontFamily: 'var(--font-secondary)', 
              color: 'var(--siena-tostado)', 
              fontSize: '1.8rem', 
              marginBottom: '1.5rem' 
            }}>
              Visitanos en nuestro Taller
            </h3>
            
            <div className="contact-form" style={{ marginBottom: '1rem' }}>
              <i className="fas fa-map-marker-alt" style={{ fontSize: '1.5rem', color: 'var(--verde-salvia)', marginBottom: '0.5rem' }}></i>
              <h4 style={{ color: 'var(--siena-tostado)', marginBottom: '0.5rem', fontWeight: '600' }}>
                Showroom & Casa Taller
              </h4>
              <p style={{ color: 'var(--texto-claro)' }}>
                Av. San Juan 2847<br />
                C1232AAB - Barrio de San Cristóbal<br />
                Ciudad Autónoma de Buenos Aires
              </p>
            </div>

            <div className="contact-form" style={{ marginBottom: '1rem' }}>
              <i className="fas fa-clock" style={{ fontSize: '1.5rem', color: 'var(--verde-salvia)', marginBottom: '0.5rem' }}></i>
              <h4 style={{ color: 'var(--siena-tostado)', marginBottom: '0.5rem', fontWeight: '600' }}>
                Horarios de Atención
              </h4>
              <p style={{ color: 'var(--texto-claro)' }}>
                Lunes a Viernes: 10:00 - 19:00<br />
                Sábados: 10:00 - 14:00<br />
                Domingos: Cerrado
              </p>
            </div>

            <div className="contact-form">
              <i className="fas fa-phone" style={{ fontSize: '1.5rem', color: 'var(--verde-salvia)', marginBottom: '0.5rem' }}></i>
              <h4 style={{ color: 'var(--siena-tostado)', marginBottom: '0.5rem', fontWeight: '600' }}>
                Contacto Directo
              </h4>
              <p style={{ color: 'var(--texto-claro)' }}>
                WhatsApp: +54 11 4567-8900<br />
                Email: info@hermanosjota.com.ar<br />
                Ventas: ventas@hermanosjota.com.ar
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contacto;