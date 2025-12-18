import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import api from '../../config/api';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalMascotas: 0,
    totalUsuarios: 0,
    totalRecetas: 0,
    totalVacunas: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Fetch statistics from different endpoints
      const [mascotasRes, usuariosRes] = await Promise.all([
        api.get('/admin/mascotas'),
        api.get('/admin/usuarios')
      ]);

      setStats({
        totalMascotas: mascotasRes.data.length || 0,
        totalUsuarios: usuariosRes.data.length || 0,
        totalRecetas: 0, // Will be implemented when endpoint is available
        totalVacunas: 0  // Will be implemented when endpoint is available
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner message="Cargando estadísticas..." />;
  }

  return (
    <div className="mt-4">
      <h4 className="card-title">Dashboard</h4>
      <p className="card-text">Resumen de las actividades del sistema</p>

      {/* Statistics Cards */}
      <div className="container dashboard-section mb-3">
        <div className="row g-4">
          <div className="col-6 col-md-3">
            <div className="card text-white dashboard-card bg-primary">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div className="dashboard-icon">
                    <i className="bi bi-heart-pulse-fill"></i>
                  </div>
                  <div className="ms-3">
                    <h5 className="card-title">Mascotas</h5>
                    <h3 className="card-text">{stats.totalMascotas}</h3>
                  </div>
                </div>
                <p className="card-text text-center mt-3">
                  <small>Total registradas</small>
                </p>
              </div>
            </div>
          </div>

          <div className="col-6 col-md-3">
            <div className="card text-white dashboard-card bg-success">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div className="dashboard-icon">
                    <i className="bi bi-people-fill"></i>
                  </div>
                  <div className="ms-3">
                    <h5 className="card-title">Usuarios</h5>
                    <h3 className="card-text">{stats.totalUsuarios}</h3>
                  </div>
                </div>
                <p className="card-text text-center mt-3">
                  <small>Total en el sistema</small>
                </p>
              </div>
            </div>
          </div>

          <div className="col-6 col-md-3">
            <div className="card text-white dashboard-card bg-warning">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div className="dashboard-icon">
                    <i className="bi bi-file-medical-fill"></i>
                  </div>
                  <div className="ms-3">
                    <h5 className="card-title">Recetas</h5>
                    <h3 className="card-text">{stats.totalRecetas}</h3>
                  </div>
                </div>
                <p className="card-text text-center mt-3">
                  <small>Total emitidas</small>
                </p>
              </div>
            </div>
          </div>

          <div className="col-6 col-md-3">
            <div className="card text-white dashboard-card bg-info">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div className="dashboard-icon">
                    <i className="bi bi-shield-plus-fill"></i>
                  </div>
                  <div className="ms-3">
                    <h5 className="card-title">Vacunas</h5>
                    <h3 className="card-text">{stats.totalVacunas}</h3>
                  </div>
                </div>
                <p className="card-text text-center mt-3">
                  <small>Total aplicadas</small>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Access Cards */}
      <div className="mt-4">
        <div className="row row-cols-2 row-cols-md-4 g-4">
          <div className="col">
            <Link to="/admin/dashboard" className="text-decoration-none">
              <div className="card h-100 card-hover">
                <div className="card-body text-center">
                  <i className="bi bi-speedometer2 text-primary" style={{ fontSize: '2rem' }}></i>
                  <h6 className="card-title mt-3">Dashboard</h6>
                  <p className="card-text small">Visión general del sistema</p>
                </div>
              </div>
            </Link>
          </div>

          <div className="col">
            <Link to="/admin/usuarios" className="text-decoration-none">
              <div className="card h-100 card-hover">
                <div className="card-body text-center">
                  <i className="bi bi-people text-success" style={{ fontSize: '2rem' }}></i>
                  <h6 className="card-title mt-3">Usuarios</h6>
                  <p className="card-text small">Gestión de usuarios</p>
                </div>
              </div>
            </Link>
          </div>

          <div className="col">
            <Link to="/admin/mascotas" className="text-decoration-none">
              <div className="card h-100 card-hover">
                <div className="card-body text-center">
                  <i className="bi bi-heart-pulse text-danger" style={{ fontSize: '2rem' }}></i>
                  <h6 className="card-title mt-3">Mascotas</h6>
                  <p className="card-text small">Administrar mascotas</p>
                </div>
              </div>
            </Link>
          </div>

          <div className="col">
            <Link to="/admin/recetas" className="text-decoration-none">
              <div className="card h-100 card-hover">
                <div className="card-body text-center">
                  <i className="bi bi-file-medical text-warning" style={{ fontSize: '2rem' }}></i>
                  <h6 className="card-title mt-3">Recetas</h6>
                  <p className="card-text small">Gestión de recetas</p>
                </div>
              </div>
            </Link>
          </div>

          <div className="col">
            <Link to="/admin/vacunas" className="text-decoration-none">
              <div className="card h-100 card-hover">
                <div className="card-body text-center">
                  <i className="bi bi-shield-plus text-info" style={{ fontSize: '2rem' }}></i>
                  <h6 className="card-title mt-3">Vacunas</h6>
                  <p className="card-text small">Registro de vacunas</p>
                </div>
              </div>
            </Link>
          </div>

          <div className="col">
            <Link to="/admin/reportes" className="text-decoration-none">
              <div className="card h-100 card-hover">
                <div className="card-body text-center">
                  <i className="bi bi-graph-up text-primary" style={{ fontSize: '2rem' }}></i>
                  <h6 className="card-title mt-3">Reportes</h6>
                  <p className="card-text small">Informes y estadísticas</p>
                </div>
              </div>
            </Link>
          </div>

          <div className="col">
            <Link to="/perfil" className="text-decoration-none">
              <div className="card h-100 card-hover">
                <div className="card-body text-center">
                  <i className="bi bi-person-circle text-secondary" style={{ fontSize: '2rem' }}></i>
                  <h6 className="card-title mt-3">Perfil</h6>
                  <p className="card-text small">Configuración de cuenta</p>
                </div>
              </div>
            </Link>
          </div>

          <div className="col">
            <Link to="/" className="text-decoration-none">
              <div className="card h-100 card-hover">
                <div className="card-body text-center">
                  <i className="bi bi-house text-dark" style={{ fontSize: '2rem' }}></i>
                  <h6 className="card-title mt-3">Inicio</h6>
                  <p className="card-text small">Página principal</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;