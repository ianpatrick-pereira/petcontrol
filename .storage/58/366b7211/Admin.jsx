import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext.jsx';

export default function Admin() {
  const { obtenerTodasLasMascotas } = useApp();
  const [mascotas, setMascotas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    cargarMascotas();
  }, []);

  const cargarMascotas = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await obtenerTodasLasMascotas();
      setMascotas(data);
    } catch (error) {
      console.error('Error al cargar mascotas:', error);
      setError('Error al cargar las mascotas. Verifica que tienes permisos de administrador.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h2 className="mb-4">Panel de Administración</h2>
      
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">Estadísticas</h5>
          <p className="card-text">
            <strong>Total de mascotas registradas:</strong> {mascotas.length}
          </p>
        </div>
      </div>

      <h3 className="mb-3">Todas las Mascotas</h3>
      
      {mascotas.length === 0 ? (
        <div className="alert alert-info">
          No hay mascotas registradas en el sistema.
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Especie</th>
                <th>Raza</th>
                <th>Edad</th>
                <th>Usuario ID</th>
                <th>Fecha Creación</th>
              </tr>
            </thead>
            <tbody>
              {mascotas.map(mascota => (
                <tr key={mascota.id}>
                  <td>{mascota.id}</td>
                  <td>{mascota.nombre}</td>
                  <td>{mascota.especie}</td>
                  <td>{mascota.raza || '-'}</td>
                  <td>{mascota.edad || '-'}</td>
                  <td>{mascota.usuarioId}</td>
                  <td>{new Date(mascota.fechaCreacion).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}