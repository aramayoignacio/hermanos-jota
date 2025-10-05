import React, { useState } from 'react';

function ContactForm() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    tipoConsulta: '',
    mensaje: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log('========================================');
    console.log('FORMULARIO DE CONTACTO ENVIADO');
    console.log('========================================');
    console.log('Datos del formulario:', formData);
    console.log('========================================');
    
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
    <section className="section section-alt">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">CONVERSEMOS</h2>
          <p className="section-subtitle">
            ¿Tienes una visión? Hablemos de cómo crear juntos la pieza perfecta
          </p>
        </div>

        <div className="contact-container">
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

          <div className="contact-info-sidebar">
            <div className="contact-card">
              <i className="fas fa-map-marker-alt"></i>
              <h4>Showroom & Casa Taller</h4>
              <p>
                Av. San Juan 2847<br />
                Barrio de San Cristóbal<br />
                Buenos Aires, Argentina
              </p>
            </div>

            <div className="contact-card">
              <i className="fas fa-clock"></i>
              <h4>Horarios</h4>
              <p>
                Lunes a Viernes: 10:00 - 19:00<br />
                Sábados: 10:00 - 14:00
              </p>
            </div>

            <div className="contact-card">
              <i className="fas fa-phone"></i>
              <h4>Contacto</h4>
              <p>
                WhatsApp: +54 11 4567-8900<br />
                info@hermanosjota.com.ar
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactForm;