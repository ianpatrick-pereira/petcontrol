import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-white mt-5 py-4">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5>
              <i className="bi bi-heart-pulse-fill me-2"></i>
              PetControl
            </h5>
            <p className="text-muted">
              Sistema de gestión integral para el cuidado de tus mascotas.
            </p>
          </div>
          <div className="col-md-4">
            <h6>Enlaces Rápidos</h6>
            <ul className="list-unstyled">
              <li><a href="/" className="text-muted text-decoration-none">Inicio</a></li>
              <li><a href="/about" className="text-muted text-decoration-none">Nosotros</a></li>
              <li><a href="/login" className="text-muted text-decoration-none">Iniciar Sesión</a></li>
            </ul>
          </div>
          <div className="col-md-4">
            <h6>Contacto</h6>
            <p className="text-muted">
              <i className="bi bi-envelope me-2"></i>
              info@petcontrol.cl
            </p>
            <p className="text-muted">
              <i className="bi bi-telephone me-2"></i>
              +56 9 1234 5678
            </p>
          </div>
        </div>
        <hr className="bg-secondary" />
        <div className="text-center text-muted">
          <small>&copy; 2024 PetControl. Todos los derechos reservados.</small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;