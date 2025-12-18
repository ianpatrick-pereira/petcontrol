import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const ProtectedRoute = ({ children, roles }) => {
  const { user, loading, isAuthenticated, hasRole } = useAuth();

  if (loading) {
    return (
      <div className="spinner-container">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  if (roles && !hasRole(roles)) {
    // Redirect to appropriate page based on user role
    switch (user?.rol) {
      case 'ADMIN':
        return <Navigate to="/admin/dashboard" replace />;
      case 'VETERINARIO':
        return <Navigate to="/veterinario/mascotas" replace />;
      case 'CLIENTE':
        return <Navigate to="/cliente/mis-mascotas" replace />;
      default:
        return <Navigate to="/" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;