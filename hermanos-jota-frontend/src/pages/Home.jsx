import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-container">
          <div className="hero-content fade-in-up">
            <h1>EL ARTE DE CREAR MUEBLES QUE ALIMENTAN EL ALMA</h1>
            <p className="hero-subtitle">Donde la herencia se encuentra con la innovación</p>
            <p className="hero-description">
              Cada pieza cuenta la historia de manos expertas y materiales nobles. 
              Redescubrimos el arte olvidado de crear muebles que no solo sirven una función, 
              sino que se convierten en legado para las generaciones futuras.
            </p>
            <div className="cta-buttons">
              <Link to="/productos" className="btn btn-primary">
                <i className="fas fa-eye"></i>
                Ver Colección
              </Link>
              <Link to="/contacto" className="btn btn-secondary">
                <i className="fas fa-heart"></i>
                Contacto
              </Link>
            </div>
          </div>
          <div className="hero-image">
            <div className="hero-furniture"></div>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">NUESTRA FILOSOFÍA</h2>
            <p className="section-subtitle">
              El redescubrimiento de un arte olvidado: crear muebles que no solo sirven una función, 
              sino que alimentan el alma.
            </p>
          </div>
          
          <div className="about-values">
            <div className="value-item">
              <div className="value-icon">
                <i className="fas fa-leaf"></i>
              </div>
              <h3 className="value-title">Sustentabilidad</h3>
              <p className="value-description">
                100% madera FSC, acabados naturales
              </p>
            </div>
            
            <div className="value-item">
              <div className="value-icon">
                <i className="fas fa-hammer"></i>
              </div>
              <h3 className="value-title">Artesanía</h3>
              <p className="value-description">
                Técnicas tradicionales, piezas únicas
              </p>
            </div>
            
            <div className="value-item">
              <div className="value-icon">
                <i className="fas fa-shield-alt"></i>
              </div>
              <h3 className="value-title">Herencia Viva</h3>
              <p className="value-description">
                Garantía de 10 años
              </p>
            </div>
            
            <div className="value-item">
              <div className="value-icon">
                <i className="fas fa-map-marker-alt"></i>
              </div>
              <h3 className="value-title">Local</h3>
              <p className="value-description">
                Proveedores de Buenos Aires
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;