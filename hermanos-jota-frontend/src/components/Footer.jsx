import React from 'react';

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Hermanos Jota</h3>
            <p>
              El redescubrimiento de un arte olvidado. Creamos muebles que 
              alimentan el alma y se convierten en legado.
            </p>
            <div className="footer-social">
              <a href="https://instagram.com/hermanosjota_ba" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://facebook.com/hermanosjota" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="https://wa.me/5411456789000" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-whatsapp"></i>
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h3>Compromiso</h3>
            <p>100% Madera Certificada FSC</p>
            <p>30% Materiales Recuperados</p>
            <p>Proveedores Locales</p>
            <p>Garantía de 10 Años</p>
          </div>

          <div className="footer-section">
            <h3>Servicios</h3>
            <p>Programa Herencia Viva</p>
            <p>Servicio de Restauración</p>
            <p>Taller de Cuidados</p>
            <p>Diseños Personalizados</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2025 Hermanos Jota. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;