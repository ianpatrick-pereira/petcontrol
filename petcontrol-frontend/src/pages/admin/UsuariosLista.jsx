import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as usuarioService from '../../services/usuarioService';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const UsuariosLista = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteModal, setDeleteModal] = useState({ show: false, usuario: null });

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    try {
      setLoading(true);
      const data = await usuarioService.getAllUsuarios();
      setUsuarios(data);
      setError('');
    } catch (err) {
      setError('Error al cargar usuarios: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteModal.usuario) return;

    // Proteger usuarios predefinidos
    const protectedEmails = ['admin@admin.cl', 'veterinario@petcontrol.cl'];
    if (protectedEmails.includes(deleteModal.usuario.email.toLowerCase())) {
      window.alert('No se puede eliminar este usuario. Es un usuario protegido del sistema.');
      setDeleteModal({ show: false, usuario: null });
      return;
    }

    try {
      await usuarioService.deleteUsuario(deleteModal.usuario.id);
      setUsuarios(usuarios.filter(u => u.id !== deleteModal.usuario.id));
      setDeleteModal({ show: false, usuario: null });
      window.alert('Usuario eliminado correctamente');
    } catch (err) {
      window.alert('Error al eliminar usuario: ' + (err.response?.data?.message || err.message));
    }
  };

  const filteredUsuarios = usuarios.filter(usuario =>
    usuario.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    usuario.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    usuario.rol?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRoleBadgeClass = (rol) => {
    switch (rol) {
      case 'ADMIN':
        return 'bg-danger';
      case 'VETERINARIO':
        return 'bg-success';
      case 'CLIENTE':
        return 'bg-primary';
      default:
        return 'bg-secondary';
    }
  };

  if (loading) {
    return <LoadingSpinner message="Cargando usuarios..." />;
  }

  return (
    <div className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4>Gestión de Usuarios</h4>
          <p className="text-muted">Administrar usuarios del sistema</p>
        </div>
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
              placeholder="Buscar por nombre, email o rol..."
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
                  <th>Email</th>
                  <th>Rol</th>
                  <th>Fecha Creación</th>
                  <th className="text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsuarios.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center text-muted">
                      No se encontraron usuarios
                    </td>
                  </tr>
                ) : (
                  filteredUsuarios.map((usuario) => (
                    <tr key={usuario.id}>
                      <td>{usuario.id}</td>
                      <td>{usuario.nombre || '-'}</td>
                      <td>{usuario.email}</td>
                      <td>
                        <span className={`badge ${getRoleBadgeClass(usuario.rol)}`}>
                          {usuario.rol}
                        </span>
                      </td>
                      <td>
                        {usuario.fechaCreacion
                          ? new Date(usuario.fechaCreacion).toLocaleDateString('es-CL')
                          : '-'}
                      </td>
                      <td className="text-center table-actions">
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => setDeleteModal({ show: true, usuario })}
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
              Mostrando {filteredUsuarios.length} de {usuarios.length} usuarios
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
                  onClick={() => setDeleteModal({ show: false, usuario: null })}
                ></button>
              </div>
              <div className="modal-body">
                <p>
                  ¿Estás seguro de que deseas eliminar al usuario{' '}
                  <strong>{deleteModal.usuario?.nombre || deleteModal.usuario?.email}</strong>?
                </p>
                <p className="text-danger">
                  <small>Esta acción no se puede deshacer.</small>
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setDeleteModal({ show: false, usuario: null })}
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

export default UsuariosLista;