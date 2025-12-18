import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const Perfil = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('info');

  return (
    <div className="mt-4">
      <div className="mb-4">
        <h4>Mi Perfil</h4>
        <p className="text-muted">Administra tu información personal</p>
      </div>

      <div className="row">
        <div className="col-md-3">
          <div className="card">
            <div className="card-body text-center">
              <i className="bi bi-person-circle" style={{ fontSize: '5rem', color: '#0d6efd' }}></i>
              <h5 className="mt-3">{user?.nombre || 'Usuario'}</h5>
              <p className="text-muted">{user?.email}</p>
              <span className={`badge ${
                user?.rol === 'ADMIN' ? 'bg-danger' :
                user?.rol === 'VETERINARIO' ? 'bg-success' :
                'bg-primary'
              }`}>
                {user?.rol}
              </span>
            </div>
          </div>
        </div>

        <div className="col-md-9">
          <div className="card">
            <div className="card-header">
              <ul className="nav nav-tabs card-header-tabs">
                <li className="nav-item">
                  <button
                    className={`nav-link ${activeTab === 'info' ? 'active' : ''}`}
                    onClick={() => setActiveTab('info')}
                  >
                    <i className="bi bi-person me-2"></i>
                    Información Personal
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link ${activeTab === 'password' ? 'active' : ''}`}
                    onClick={() => setActiveTab('password')}
                  >
                    <i className="bi bi-key me-2"></i>
                    Cambiar Contraseña
                  </button>
                </li>
              </ul>
            </div>
            <div className="card-body">
              {activeTab === 'info' && (
                <div>
                  <h5 className="mb-3">Información Personal</h5>
                  <div className="alert alert-info">
                    <i className="bi bi-info-circle me-2"></i>
                    Funcionalidad en desarrollo. Pronto podrás editar tu información personal.
                  </div>
                  <div className="mb-3">
                    <label className="form-label"><strong>Nombre:</strong></label>
                    <p>{user?.nombre || 'No especificado'}</p>
                  </div>
                  <div className="mb-3">
                    <label className="form-label"><strong>Email:</strong></label>
                    <p>{user?.email}</p>
                  </div>
                  <div className="mb-3">
                    <label className="form-label"><strong>Rol:</strong></label>
                    <p>{user?.rol}</p>
                  </div>
                </div>
              )}

              {activeTab === 'password' && (
                <div>
                  <h5 className="mb-3">Cambiar Contraseña</h5>
                  <div className="alert alert-info">
                    <i className="bi bi-info-circle me-2"></i>
                    Funcionalidad en desarrollo. Pronto podrás cambiar tu contraseña.
                  </div>
                  <form>
                    <div className="mb-3">
                      <label className="form-label">Contraseña Actual</label>
                      <input type="password" className="form-control" disabled />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Nueva Contraseña</label>
                      <input type="password" className="form-control" disabled />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Confirmar Nueva Contraseña</label>
                      <input type="password" className="form-control" disabled />
                    </div>
                    <button type="submit" className="btn btn-primary" disabled>
                      Actualizar Contraseña
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;