import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as mascotaService from '../../services/mascotaService';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const MascotasLista = () => {
  const [mascotas, setMascotas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteModal, setDeleteModal] = useState({ show: false, mascota: null });

  useEffect(() => {
    fetchMascotas();
  }, []);

  const fetchMascotas = async () => {
    try {
      setLoading(true);
      const data = await mascotaService.adminGetAllMascotas();
      setMascotas(data);
      setError('');
    } catch (err) {
      setError('Error al cargar mascotas: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteModal.mascota) return;

    try {
      await mascotaService.adminDeleteMascota(deleteModal.mascota.id);
      setMascotas(mascotas.filter(m => m.id !== deleteModal.mascota.id));
      setDeleteModal({ show: false, mascota: null });
      window.alert('Mascota eliminada correctamente');
    } catch (err) {
      window.alert('Error al eliminar mascota: ' + (err.response?.data?.message || err.message));
    }
  };

  const filteredMascotas = mascotas.filter(mascota =>
    mascota.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mascota.especie?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mascota.raza?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mascota.nombreDueno?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <LoadingSpinner message="Cargando mascotas..." />;
  }

  return (
    <div className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4>Gestión de Mascotas</h4>
          <p className="text-muted">Administrar todas las mascotas del sistema</p>
        </div>
        <Link to="/admin/mascotas/nuevo" className="btn btn-primary">
          <i className="bi bi-plus-circle me-2"></i>
          Nueva Mascota
        </Link>
      </div>

      {error && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          {error}
          <button type="button" className="btn-close" onClick={() => setError('')}></button>
        </div>
      )}

      <div className="card">
        <div className="card-body">
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Buscar por nombre, especie, raza o dueño..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Especie</th>
                  <th>Raza</th>
                  <th>Edad</th>
                  <th>Dueño</th>
                  <th className="text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredMascotas.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center text-muted">
                      No se encontraron mascotas
                    </td>
                  </tr>
                ) : (
                  filteredMascotas.map((mascota) => (
                    <tr key={mascota.id}>
                      <td>{mascota.id}</td>
                      <td>
                        <i className="bi bi-heart-fill text-danger me-2"></i>
                        {mascota.nombre}
                      </td>
                      <td>{mascota.especie}</td>
                      <td>{mascota.raza || '-'}</td>
                      <td>{mascota.edad ? `${mascota.edad} años` : '-'}</td>
                      <td>
                        <i className="bi bi-person-fill text-primary me-1"></i>
                        {mascota.nombreDueno || mascota.emailDueno || '-'}
                      </td>
                      <td className="text-center table-actions">
                        <Link
                          to={`/admin/mascotas/${mascota.id}/editar`}
                          className="btn btn-sm btn-warning me-1"
                          title="Editar"
                        >
                          <i className="bi bi-pencil"></i>
                        </Link>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => setDeleteModal({ show: true, mascota })}
                          title="Eliminar"
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="mt-3">
            <small className="text-muted">
              Mostrando {filteredMascotas.length} de {mascotas.length} mascotas
            </small>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModal.show && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirmar Eliminación</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setDeleteModal({ show: false, mascota: null })}
                ></button>
              </div>
              <div className="modal-body">
                <p>
                  ¿Estás seguro de que deseas eliminar a{' '}
                  <strong>{deleteModal.mascota?.nombre}</strong>?
                </p>
                <p className="text-danger">
                  <small>Esta acción no se puede deshacer y eliminará todo el historial médico asociado.</small>
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setDeleteModal({ show: false, mascota: null })}
                >
                  Cancelar
                </button>
                <button type="button" className="btn btn-danger" onClick={handleDelete}>
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MascotasLista;