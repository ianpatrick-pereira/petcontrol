import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Sidebar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();

  const isActive = (path) => {
    return location.pathname === path ? 'nav-active' : '';
  };

  const menuItems = {
    ADMIN: [
      { path: '/admin/dashboard', icon: 'bi-house-fill', label: 'Dashboard' },
      { path: '/admin/usuarios', icon: 'bi-people', label: 'Usuarios' },
      { path: '/admin/mascotas', icon: 'bi-heart-pulse', label: 'Mascotas' },
      { path: '/admin/recetas', icon: 'bi-file-medical', label: 'Recetas' },
      { path: '/admin/vacunas', icon: 'bi-shield-plus', label: 'Vacunas' },
      { path: '/admin/reportes', icon: 'bi-graph-up', label: 'Reportes' },
    ],
    VETERINARIO: [
      { path: '/veterinario/mascotas', icon: 'bi-heart-pulse', label: 'Todas las Mascotas' },
      { path: '/veterinario/recetas', icon: 'bi-file-medical', label: 'Recetas' },
      { path: '/veterinario/vacunas', icon: 'bi-shield-plus', label: 'Vacunas' },
    ],
    CLIENTE: [
      { path: '/cliente/mis-mascotas', icon: 'bi-heart', label: 'Mis Mascotas' },
    ]
  };

  const currentMenuItems = menuItems[user?.rol] || [];

  return (
    <div className="sidebar border border-right col-md-3 col-lg-2 p-0 bg-body-tertiary">
      <div className="offcanvas-md offcanvas-start bg-body-tertiary" tabIndex="-1" id="sidebarMenu">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title">
            <i className="bi bi-heart-pulse-fill me-2"></i>
            PetControl
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            data-bs-target="#sidebarMenu"
            aria-label="Close"
          ></button>
        </div>
        
        <div className="offcanvas-body d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto">
          <ul className="nav flex-column">
            {currentMenuItems.map((item) => (
              <li key={item.path} className="nav-item mx-2">
                <Link
                  to={item.path}
                  className={`nav-link nav-menu d-flex gap-2 ${isActive(item.path)}`}
                >
                  <i className={`bi ${item.icon}`}></i>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <hr className="my-3" />

          <ul className="nav flex-column mb-auto">
            <li className="nav-item mx-2">
              <Link
                to="/perfil"
                className={`nav-link nav-menu d-flex gap-2 ${isActive('/perfil')}`}
              >
                <i className="bi bi-person-circle"></i>
                Mi Perfil
              </Link>
            </li>
          </ul>

          <hr className="my-3" />

          <ul className="nav flex-column mb-auto">
            <li className="nav-item mt-2 mx-2">
              <Link className="mx-4 text-center d-flex gap-2 btn btn-outline-primary" to="/">
                <i className="bi bi-house"></i>
                <strong>Inicio</strong>
              </Link>
            </li>
            <li className="nav-item mt-2 mx-2">
              <button
                className="mx-4 text-center d-flex gap-2 btn btn-danger w-100"
                onClick={logout}
              >
                <i className="bi bi-door-closed"></i>
                Cerrar Sesión
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;