import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary sticky-top">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <i className="bi bi-heart-pulse-fill me-2"></i>
          PetControl
        </Link>
        
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {!isAuthenticated() ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Inicio
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/about">
                    Nosotros
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Iniciar Sesión
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Registrarse
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="bi bi-person-circle me-1"></i>
                    {user?.nombre || user?.email}
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                    <li>
                      <span className="dropdown-item-text">
                        <small className="text-muted">Rol: {user?.rol}</small>
                      </span>
                    </li>
                    <li><hr className="dropdown-divider" /></li>
                    {user?.rol === 'ADMIN' && (
                      <li>
                        <Link className="dropdown-item" to="/admin/dashboard">
                          <i className="bi bi-speedometer2 me-2"></i>
                          Dashboard
                        </Link>
                      </li>
                    )}
                    {user?.rol === 'VETERINARIO' && (
                      <li>
                        <Link className="dropdown-item" to="/veterinario/mascotas">
                          <i className="bi bi-heart-pulse me-2"></i>
                          Todas las Mascotas
                        </Link>
                      </li>
                    )}
                    {user?.rol === 'CLIENTE' && (
                      <li>
                        <Link className="dropdown-item" to="/cliente/mis-mascotas">
                          <i className="bi bi-heart me-2"></i>
                          Mis Mascotas
                        </Link>
                      </li>
                    )}
                    <li>
                      <Link className="dropdown-item" to="/perfil">
                        <i className="bi bi-person me-2"></i>
                        Mi Perfil
                      </Link>
                    </li>
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <button className="dropdown-item text-danger" onClick={handleLogout}>
                        <i className="bi bi-box-arrow-right me-2"></i>
                        Cerrar Sesión
                      </button>
                    </li>
                  </ul>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;