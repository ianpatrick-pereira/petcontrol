import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as mascotaService from '../../services/mascotaService';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const MisMascotas = () => {
  const [mascotas, setMascotas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState({ show: false, mascota: null });
  const [formData, setFormData] = useState({
    nombre: '',
    especie: '',
    raza: '',
    edad: '',
    descripcion: '',
    imagen: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchMascotas();
  }, []);

  const fetchMascotas = async () => {
    try {
      setLoading(true);
      const data = await mascotaService.getMisMascotas();
      setMascotas(data);
      setError('');
    } catch (err) {
      setError('Error al cargar mascotas: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const errors = {};
    if (!formData.nombre.trim()) errors.nombre = 'El nombre es obligatorio';
    if (!formData.especie.trim()) errors.especie = 'La especie es obligatoria';
    if (formData.edad && (isNaN(formData.edad) || formData.edad < 0)) {
      errors.edad = 'La edad debe ser un número positivo';
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setSubmitting(true);
    try {
      const mascotaData = {
        nombre: formData.nombre,
        especie: formData.especie,
        raza: formData.raza || null,
        edad: formData.edad ? parseInt(formData.edad) : null,
        descripcion: formData.descripcion || null,
        imagen: formData.imagen || null
      };

      await mascotaService.createMascota(mascotaData);
      alert('Mascota agregada correctamente');
      setShowModal(false);
      setFormData({ nombre: '', especie: '', raza: '', edad: '', descripcion: '', imagen: '' });
      fetchMascotas();
    } catch (err) {
      alert('Error al agregar mascota: ' + (err.response?.data?.message || err.message));
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteModal.mascota) return;

    try {
      await mascotaService.deleteMascota(deleteModal.mascota.id);
      setMascotas(mascotas.filter(m => m.id !== deleteModal.mascota.id));
      setDeleteModal({ show: false, mascota: null });
      alert('Mascota eliminada correctamente');
    } catch (err) {
      alert('Error al eliminar mascota: ' + (err.response?.data?.message || err.message));
    }
  };

  if (loading) {
    return <LoadingSpinner message="Cargando tus mascotas..." />;
  }

  return (
    <div className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4>Mis Mascotas</h4>
          <p className="text-muted">Gestiona la información de tus mascotas</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          <i className="bi bi-plus-circle me-2"></i>
          Agregar Mascota
        </button>
      </div>

      {error && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          {error}
          <button type="button" className="btn-close" onClick={() => setError('')}></button>
        </div>
      )}

      {mascotas.length === 0 ? (
        <div className="text-center py-5">
          <i className="bi bi-heart" style={{ fontSize: '4rem', color: '#ccc' }}></i>
          <h5 className="mt-3">No tienes mascotas registradas</h5>
          <p className="text-muted">Agrega tu primera mascota para comenzar</p>
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            <i className="bi bi-plus-circle me-2"></i>
            Agregar Mascota
          </button>
        </div>
      ) : (
        <div className="row g-4">
          {mascotas.map((mascota) => (
            <div key={mascota.id} className="col-md-6 col-lg-4">
              <div className="card pet-card h-100">
                {mascota.imagen ? (
                  <img
                    src={mascota.imagen}
                    className="card-img-top"
                    alt={mascota.nombre}
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                ) : (
                  <div
                    className="card-img-top bg-light d-flex align-items-center justify-content-center"
                    style={{ height: '200px' }}
                  >
                    <i className="bi bi-heart-fill text-muted" style={{ fontSize: '4rem' }}></i>
                  </div>
                )}
                <div className="card-body">
                  <h5 className="card-title">
                    <i className="bi bi-heart-fill text-danger me-2"></i>
                    {mascota.nombre}
                  </h5>
                  <p className="card-text">
                    <strong>Especie:</strong> {mascota.especie}<br />
                    {mascota.raza && (
                      <>
                        <strong>Raza:</strong> {mascota.raza}<br />
                      </>
                    )}
                    {mascota.edad && (
                      <>
                        <strong>Edad:</strong> {mascota.edad} años<br />
                      </>
                    )}
                  </p>
                  {mascota.descripcion && (
                    <p className="card-text">
                      <small className="text-muted">{mascota.descripcion}</small>
                    </p>
                  )}
                </div>
                <div className="card-footer bg-transparent">
                  <div className="d-flex gap-2">
                    <Link
                      to={`/cliente/mascota/${mascota.id}`}
                      className="btn btn-sm btn-primary flex-fill"
                    >
                      <i className="bi bi-eye me-1"></i>
                      Ver Detalle
                    </Link>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => setDeleteModal({ show: true, mascota })}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Modal */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Agregar Nueva Mascota</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Nombre *</label>
                      <input
                        type="text"
                        className={`form-control ${formErrors.nombre ? 'is-invalid' : ''}`}
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                      />
                      {formErrors.nombre && <div className="invalid-feedback">{formErrors.nombre}</div>}
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Especie *</label>
                      <select
                        className={`form-select ${formErrors.especie ? 'is-invalid' : ''}`}
                        name="especie"
                        value={formData.especie}
                        onChange={handleChange}
                      >
                        <option value="">Seleccionar</option>
                        <option value="Perro">Perro</option>
                        <option value="Gato">Gato</option>
                        <option value="Ave">Ave</option>
                        <option value="Conejo">Conejo</option>
                        <option value="Otro">Otro</option>
                      </select>
                      {formErrors.especie && <div className="invalid-feedback">{formErrors.especie}</div>}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Raza</label>
                      <input
                        type="text"
                        className="form-control"
                        name="raza"
                        value={formData.raza}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Edad (años)</label>
                      <input
                        type="number"
                        className={`form-control ${formErrors.edad ? 'is-invalid' : ''}`}
                        name="edad"
                        value={formData.edad}
                        onChange={handleChange}
                        min="0"
                      />
                      {formErrors.edad && <div className="invalid-feedback">{formErrors.edad}</div>}
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Descripción</label>
                    <textarea
                      className="form-control"
                      name="descripcion"
                      value={formData.descripcion}
                      onChange={handleChange}
                      rows="3"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">URL de Imagen</label>
                    <input
                      type="url"
                      className="form-control"
                      name="imagen"
                      value={formData.imagen}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className={`btn btn-primary ${submitting ? 'btn-loading' : ''}`}
                    disabled={submitting}
                  >
                    {submitting ? 'Guardando...' : 'Agregar'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
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
                <p>¿Estás seguro de que deseas eliminar a <strong>{deleteModal.mascota?.nombre}</strong>?</p>
                <p className="text-danger"><small>Esta acción no se puede deshacer.</small></p>
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

export default MisMascotas;