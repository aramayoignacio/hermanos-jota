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
          </div>
          
          <div className="footer-section">
            <h3>Compromiso</h3>
            <p>🌱 100% Madera Certificada FSC</p>
            <p>♻️ 30% Materiales Recuperados</p>
            <p>🛡️ Garantía de 10 Años</p>
          </div>
          
          <div className="footer-section">
            <h3>Contacto</h3>
            <p>📍 Av. San Juan 2847, CABA</p>
            <p>📞 +54 11 4567-8900</p>
            <p>✉️ info@hermanosjota.com.ar</p>
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