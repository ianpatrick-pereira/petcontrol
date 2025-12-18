import React from 'react';

const About = () => {
  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-lg-8 mx-auto">
          <h1 className="mb-4">
            <i className="bi bi-info-circle text-primary me-3"></i>
            Sobre PetControl
          </h1>
          
          <div className="card mb-4">
            <div className="card-body">
              <h3 className="card-title">Nuestra Misión</h3>
              <p className="card-text">
                PetControl es un sistema integral diseñado para facilitar la gestión y seguimiento
                médico de mascotas. Nuestro objetivo es proporcionar una plataforma segura y fácil
                de usar que conecte a dueños de mascotas, veterinarios y administradores en un solo
                lugar.
              </p>
            </div>
          </div>

          <div className="card mb-4">
            <div className="card-body">
              <h3 className="card-title">Características del Sistema</h3>
              <ul>
                <li><strong>Gestión de Mascotas:</strong> Registro completo de información de cada mascota</li>
                <li><strong>Historial Médico:</strong> Seguimiento de recetas, vacunas y tratamientos</li>
                <li><strong>Control de Acceso:</strong> Sistema de roles con permisos diferenciados</li>
                <li><strong>Seguridad:</strong> Autenticación JWT y encriptación de datos</li>
                <li><strong>Interfaz Intuitiva:</strong> Diseño responsive y fácil de usar</li>
              </ul>
            </div>
          </div>

          <div className="card mb-4">
            <div className="card-body">
              <h3 className="card-title">Tecnologías Utilizadas</h3>
              <div className="row">
                <div className="col-md-6">
                  <h5>Backend</h5>
                  <ul>
                    <li>Java 21</li>
                    <li>Spring Boot 3.2.0</li>
                    <li>Spring Security</li>
                    <li>JWT Authentication</li>
                    <li>MySQL Database</li>
                    <li>Swagger/OpenAPI</li>
                  </ul>
                </div>
                <div className="col-md-6">
                  <h5>Frontend</h5>
                  <ul>
                    <li>React 18</li>
                    <li>Vite</li>
                    <li>React Router</li>
                    <li>Axios</li>
                    <li>Bootstrap 5</li>
                    <li>Bootstrap Icons</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <h3 className="card-title">Contacto</h3>
              <p className="card-text">
                <i className="bi bi-envelope me-2"></i>
                <strong>Email:</strong> info@petcontrol.cl
              </p>
              <p className="card-text">
                <i className="bi bi-telephone me-2"></i>
                <strong>Teléfono:</strong> +56 9 1234 5678
              </p>
              <p className="card-text">
                <i className="bi bi-geo-alt me-2"></i>
                <strong>Dirección:</strong> Santiago, Chile
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;