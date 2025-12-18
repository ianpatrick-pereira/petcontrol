import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Home = () => {
  const { isAuthenticated, user } = useAuth();

  const getDashboardLink = () => {
    if (!isAuthenticated()) return '/login';
    
    switch (user?.rol) {
      case 'ADMIN':
        return '/admin/dashboard';
      case 'VETERINARIO':
        return '/veterinario/mascotas';
      case 'CLIENTE':
        return '/cliente/mis-mascotas';
      default:
        return '/';
    }
  };

  return (
    <div className="flex-grow-1">
      {/* Hero Section */}
      <section className="bg-primary text-white py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="display-4 fw-bold mb-4">
                <i className="bi bi-heart-pulse-fill me-3"></i>
                PetControl
              </h1>
              <p className="lead mb-4">
                Sistema integral de gestión para el cuidado y seguimiento médico de tus mascotas.
              </p>
              <div className="d-flex gap-3">
                {!isAuthenticated() ? (
                  <>
                    <Link to="/register" className="btn btn-light btn-lg">
                      <i className="bi bi-person-plus me-2"></i>
                      Registrarse
                    </Link>
                    <Link to="/login" className="btn btn-outline-light btn-lg">
                      <i className="bi bi-box-arrow-in-right me-2"></i>
                      Iniciar Sesión
                    </Link>
                  </>
                ) : (
                  <Link to={getDashboardLink()} className="btn btn-light btn-lg">
                    <i className="bi bi-speedometer2 me-2"></i>
                    Ir al Panel
                  </Link>
                )}
              </div>
            </div>
            <div className="col-lg-6 text-center mt-4 mt-lg-0">
              <i className="bi bi-heart-pulse" style={{ fontSize: '15rem', opacity: 0.3 }}></i>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-5">
        <div className="container">
          <h2 className="text-center mb-5">Características Principales</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 text-center card-hover">
                <div className="card-body">
                  <i className="bi bi-heart text-primary" style={{ fontSize: '3rem' }}></i>
                  <h5 className="card-title mt-3">Gestión de Mascotas</h5>
                  <p className="card-text">
                    Registra y administra toda la información de tus mascotas en un solo lugar.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 text-center card-hover">
                <div className="card-body">
                  <i className="bi bi-file-medical text-success" style={{ fontSize: '3rem' }}></i>
                  <h5 className="card-title mt-3">Historial Médico</h5>
                  <p className="card-text">
                    Mantén un registro completo de recetas, vacunas y tratamientos médicos.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 text-center card-hover">
                <div className="card-body">
                  <i className="bi bi-shield-check text-warning" style={{ fontSize: '3rem' }}></i>
                  <h5 className="card-title mt-3">Seguridad</h5>
                  <p className="card-text">
                    Sistema seguro con autenticación y control de acceso por roles.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Roles Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-5">Roles del Sistema</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">
                    <i className="bi bi-person text-primary me-2"></i>
                    Cliente
                  </h5>
                  <ul className="list-unstyled">
                    <li><i className="bi bi-check-circle text-success me-2"></i>Gestionar sus propias mascotas</li>
                    <li><i className="bi bi-check-circle text-success me-2"></i>Ver historial médico</li>
                    <li><i className="bi bi-check-circle text-success me-2"></i>Agregar nuevas mascotas</li>
                    <li><i className="bi bi-check-circle text-success me-2"></i>Actualizar información</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">
                    <i className="bi bi-heart-pulse text-success me-2"></i>
                    Veterinario
                  </h5>
                  <ul className="list-unstyled">
                    <li><i className="bi bi-check-circle text-success me-2"></i>Ver todas las mascotas</li>
                    <li><i className="bi bi-check-circle text-success me-2"></i>Agregar recetas médicas</li>
                    <li><i className="bi bi-check-circle text-success me-2"></i>Registrar vacunas</li>
                    <li><i className="bi bi-check-circle text-success me-2"></i>Consultar historial completo</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">
                    <i className="bi bi-shield-fill-check text-danger me-2"></i>
                    Administrador
                  </h5>
                  <ul className="list-unstyled">
                    <li><i className="bi bi-check-circle text-success me-2"></i>Acceso total al sistema</li>
                    <li><i className="bi bi-check-circle text-success me-2"></i>Gestionar usuarios</li>
                    <li><i className="bi bi-check-circle text-success me-2"></i>Gestionar todas las mascotas</li>
                    <li><i className="bi bi-check-circle text-success me-2"></i>Ver reportes y estadísticas</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!isAuthenticated() && (
        <section className="py-5 bg-primary text-white">
          <div className="container text-center">
            <h2 className="mb-4">¿Listo para comenzar?</h2>
            <p className="lead mb-4">
              Únete a PetControl y lleva el control de la salud de tus mascotas.
            </p>
            <Link to="/register" className="btn btn-light btn-lg">
              <i className="bi bi-person-plus me-2"></i>
              Crear Cuenta Gratis
            </Link>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;