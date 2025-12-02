import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function Header() {
  const navigate = useNavigate();
  const { usuarioActual, logout } = useApp();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getRoleLabel = (rol) => {
    const roles = {
      'ADMIN': 'Administrador',
      'VETERINARIO': 'Veterinario',
      'CLIENTE': 'Cliente'
    };
    return roles[rol] || rol;
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <button 
          className="navbar-brand btn btn-link text-white text-decoration-none"
          onClick={() => navigate('/')}
          style={{ cursor: 'pointer' }}
        >
          <strong>🐾 PetControl</strong>
        </button>
        
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
            <li className="nav-item dropdown">
              <button 
                className="nav-link dropdown-toggle btn btn-link text-white"
                id="navbarDropdown" 
                role="button" 
                data-bs-toggle="dropdown" 
                aria-expanded="false"
              >
                {usuarioActual?.email} ({getRoleLabel(usuarioActual?.rol)})
              </button>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                {usuarioActual?.rol === 'ADMIN' && (
                  <li>
                    <button 
                      className="dropdown-item"
                      onClick={() => navigate('/admin')}
                    >
                      Panel Admin
                    </button>
                  </li>
                )}
                {usuarioActual?.rol === 'VETERINARIO' && (
                  <li>
                    <button 
                      className="dropdown-item"
                      onClick={() => navigate('/veterinario')}
                    >
                      Panel Veterinario
                    </button>
                  </li>
                )}
                {usuarioActual?.rol === 'CLIENTE' && (
                  <li>
                    <button 
                      className="dropdown-item"
                      onClick={() => navigate('/mascotas')}
                    >
                      Mis Mascotas
                    </button>
                  </li>
                )}
                <li><hr className="dropdown-divider" /></li>
                <li>
                  <button 
                    className="dropdown-item text-danger"
                    onClick={handleLogout}
                  >
                    Cerrar Sesión
                  </button>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
