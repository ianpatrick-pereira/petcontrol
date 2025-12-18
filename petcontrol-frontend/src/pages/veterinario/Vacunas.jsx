import React, { useState, useEffect } from 'react';
import * as vacunaService from '../../services/vacunaService';
import * as usuarioService from '../../services/usuarioService';
import * as mascotaService from '../../services/mascotaService';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import Toast from '../../components/common/Toast';
import { useToast } from '../../hooks/useToast';

const Vacunas = () => {
  const [vacunas, setVacunas] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [mascotas, setMascotas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedCliente, setSelectedCliente] = useState('');
  const [formData, setFormData] = useState({
    mascotaId: '',
    nombreVacuna: '',
    fechaAplicacion: '',
    proximaDosis: '',
    lote: '',
    veterinarioResponsable: '',
    observaciones: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const { toasts, showToast, removeToast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [vacunasData, clientesData] = await Promise.all([
        vacunaService.obtenerTodasLasVacunas(),
        usuarioService.getAllClientes()
      ]);
      
      setVacunas(vacunasData);
      setClientes(clientesData);
    } catch (err) {
      showToast('Error al cargar datos: ' + (err.response?.data?.message || err.message), 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleClienteChange = async (e) => {
    const clienteId = e.target.value;
    setSelectedCliente(clienteId);
    setFormData({ ...formData, mascotaId: '' });
    
    if (clienteId) {
      try {
        const mascotasCliente = await mascotaService.getMascotasPorCliente(clienteId);
        setMascotas(mascotasCliente);
      } catch (err) {
        showToast('Error al cargar mascotas: ' + (err.response?.data?.message || err.message), 'error');
      }
    } else {
      setMascotas([]);
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
    if (!formData.mascotaId) errors.mascotaId = 'Debe seleccionar una mascota';
    if (!formData.nombreVacuna.trim()) errors.nombreVacuna = 'El nombre de la vacuna es obligatorio';
    if (!formData.fechaAplicacion) errors.fechaAplicacion = 'La fecha de aplicación es obligatoria';
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
      const vacunaData = {
        mascotaId: parseInt(formData.mascotaId),
        nombreVacuna: formData.nombreVacuna,
        fechaAplicacion: formData.fechaAplicacion,
        proximaDosis: formData.proximaDosis || null,
        lote: formData.lote || null,
        veterinarioResponsable: formData.veterinarioResponsable || null,
        observaciones: formData.observaciones || null
      };

      await vacunaService.registrarVacuna(vacunaData);
      showToast('¡Vacuna registrada correctamente!', 'success');
      setShowModal(false);
      setFormData({
        mascotaId: '',
        nombreVacuna: '',
        fechaAplicacion: '',
        proximaDosis: '',
        lote: '',
        veterinarioResponsable: '',
        observaciones: ''
      });
      setSelectedCliente('');
      setMascotas([]);
      fetchData();
    } catch (err) {
      showToast('Error al registrar vacuna: ' + (err.response?.data?.message || err.message), 'error');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <LoadingSpinner message="Cargando vacunas..." />;
  }

  return (
    <>
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onClose={() => removeToast(toast.id)}
        />
      ))}

      <div className="mt-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h4>
              <i className="bi bi-shield-fill-plus me-2"></i>
              Gestión de Vacunas
            </h4>
            <p className="text-muted">Registrar y gestionar vacunas aplicadas</p>
          </div>
          <button className="btn btn-success" onClick={() => setShowModal(true)}>
            <i className="bi bi-plus-circle me-2"></i>
            Registrar Vacuna
          </button>
        </div>

        {vacunas.length === 0 ? (
          <div className="text-center py-5">
            <i className="bi bi-shield-fill-plus" style={{ fontSize: '4rem', color: '#ccc' }}></i>
            <h5 className="mt-3">No hay vacunas registradas</h5>
            <p className="text-muted">Registra la primera vacuna para comenzar</p>
            <button className="btn btn-success" onClick={() => setShowModal(true)}>
              <i className="bi bi-plus-circle me-2"></i>
              Registrar Vacuna
            </button>
          </div>
        ) : (
          <div className="card">
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Mascota</th>
                      <th>Dueño</th>
                      <th>Vacuna</th>
                      <th>Fecha Aplicación</th>
                      <th>Próxima Dosis</th>
                      <th>Lote</th>
                      <th>Veterinario</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vacunas.map((vacuna) => (
                      <tr key={vacuna.id}>
                        <td>{vacuna.id}</td>
                        <td>
                          <i className="bi bi-heart-fill text-danger me-2"></i>
                          {vacuna.nombreMascota}
                        </td>
                        <td>
                          <i className="bi bi-person-fill text-primary me-2"></i>
                          {vacuna.nombreDueno}
                        </td>
                        <td>
                          <span className="badge bg-success">{vacuna.nombreVacuna}</span>
                        </td>
                        <td>
                          {new Date(vacuna.fechaAplicacion).toLocaleDateString('es-CL')}
                        </td>
                        <td>
                          {vacuna.proximaDosis 
                            ? new Date(vacuna.proximaDosis).toLocaleDateString('es-CL')
                            : '-'}
                        </td>
                        <td>{vacuna.lote || '-'}</td>
                        <td>{vacuna.veterinarioResponsable || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Modal Registrar Vacuna */}
        {showModal && (
          <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">
                    <i className="bi bi-shield-fill-plus me-2"></i>
                    Registrar Nueva Vacuna
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="modal-body">
                    <div className="alert alert-info">
                      <i className="bi bi-info-circle me-2"></i>
                      <small>Primero selecciona el cliente, luego la mascota</small>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">
                        Cliente <span className="text-danger">*</span>
                      </label>
                      <select
                        className="form-select"
                        value={selectedCliente}
                        onChange={handleClienteChange}
                      >
                        <option value="">Seleccionar cliente</option>
                        {clientes.map((cliente) => (
                          <option key={cliente.id} value={cliente.id}>
                            {cliente.nombre} - {cliente.email}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">
                        Mascota <span className="text-danger">*</span>
                      </label>
                      <select
                        className={`form-select ${formErrors.mascotaId ? 'is-invalid' : ''}`}
                        name="mascotaId"
                        value={formData.mascotaId}
                        onChange={handleChange}
                        disabled={!selectedCliente}
                      >
                        <option value="">Seleccionar mascota</option>
                        {mascotas.map((mascota) => (
                          <option key={mascota.id} value={mascota.id}>
                            {mascota.nombre} - {mascota.especie} ({mascota.raza || 'Sin raza'})
                          </option>
                        ))}
                      </select>
                      {formErrors.mascotaId && (
                        <div className="invalid-feedback">{formErrors.mascotaId}</div>
                      )}
                    </div>

                    <div className="mb-3">
                      <label className="form-label">
                        Nombre de la Vacuna <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className={`form-control ${formErrors.nombreVacuna ? 'is-invalid' : ''}`}
                        name="nombreVacuna"
                        value={formData.nombreVacuna}
                        onChange={handleChange}
                        placeholder="Ej: Rabia, Parvovirus, Triple Felina"
                      />
                      {formErrors.nombreVacuna && (
                        <div className="invalid-feedback">{formErrors.nombreVacuna}</div>
                      )}
                    </div>

                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">
                          Fecha de Aplicación <span className="text-danger">*</span>
                        </label>
                        <input
                          type="date"
                          className={`form-control ${formErrors.fechaAplicacion ? 'is-invalid' : ''}`}
                          name="fechaAplicacion"
                          value={formData.fechaAplicacion}
                          onChange={handleChange}
                        />
                        {formErrors.fechaAplicacion && (
                          <div className="invalid-feedback">{formErrors.fechaAplicacion}</div>
                        )}
                      </div>

                      <div className="col-md-6 mb-3">
                        <label className="form-label">Próxima Dosis</label>
                        <input
                          type="date"
                          className="form-control"
                          name="proximaDosis"
                          value={formData.proximaDosis}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Lote</label>
                        <input
                          type="text"
                          className="form-control"
                          name="lote"
                          value={formData.lote}
                          onChange={handleChange}
                          placeholder="Número de lote"
                        />
                      </div>

                      <div className="col-md-6 mb-3">
                        <label className="form-label">Veterinario Responsable</label>
                        <input
                          type="text"
                          className="form-control"
                          name="veterinarioResponsable"
                          value={formData.veterinarioResponsable}
                          onChange={handleChange}
                          placeholder="Nombre del veterinario"
                        />
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Observaciones</label>
                      <textarea
                        className="form-control"
                        name="observaciones"
                        value={formData.observaciones}
                        onChange={handleChange}
                        rows="3"
                        placeholder="Observaciones adicionales"
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
                      className={`btn btn-success ${submitting ? 'btn-loading' : ''}`}
                      disabled={submitting}
                    >
                      {submitting ? 'Guardando...' : 'Registrar Vacuna'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Vacunas;