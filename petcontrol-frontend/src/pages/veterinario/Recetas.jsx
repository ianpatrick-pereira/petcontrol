import React, { useState, useEffect } from 'react';
import * as recetaService from '../../services/recetaService';
import * as usuarioService from '../../services/usuarioService';
import * as mascotaService from '../../services/mascotaService';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import Toast from '../../components/common/Toast';
import { useToast } from '../../hooks/useToast';

const Recetas = () => {
  const [recetas, setRecetas] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [mascotas, setMascotas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedCliente, setSelectedCliente] = useState('');
  const [formData, setFormData] = useState({
    mascotaId: '',
    diagnostico: '',
    medicamentos: '',
    dosificacion: '',
    indicaciones: '',
    veterinario: '',
    diasTratamiento: ''
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
      const [recetasData, usuariosData] = await Promise.all([
        recetaService.obtenerTodasLasRecetas(),
        usuarioService.getAllUsuarios()
      ]);
      
      setRecetas(recetasData);
      // Filtrar solo clientes
      const clientesData = usuariosData.filter(u => u.rol === 'CLIENTE');
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
        // Obtener mascotas del cliente seleccionado
        const todasMascotas = await mascotaService.adminGetAllMascotas();
        const mascotasCliente = todasMascotas.filter(m => m.usuario?.id === parseInt(clienteId));
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
    if (!formData.diagnostico.trim()) errors.diagnostico = 'El diagnóstico es obligatorio';
    if (!formData.medicamentos.trim()) errors.medicamentos = 'Los medicamentos son obligatorios';
    if (!formData.veterinario.trim()) errors.veterinario = 'El nombre del veterinario es obligatorio';
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
      const recetaData = {
        mascotaId: parseInt(formData.mascotaId),
        diagnostico: formData.diagnostico,
        medicamentos: formData.medicamentos,
        dosificacion: formData.dosificacion || null,
        indicaciones: formData.indicaciones || null,
        veterinario: formData.veterinario,
        diasTratamiento: formData.diasTratamiento ? parseInt(formData.diasTratamiento) : null
      };

      await recetaService.crearReceta(recetaData);
      showToast('¡Receta creada correctamente!', 'success');
      setShowModal(false);
      setFormData({
        mascotaId: '',
        diagnostico: '',
        medicamentos: '',
        dosificacion: '',
        indicaciones: '',
        veterinario: '',
        diasTratamiento: ''
      });
      setSelectedCliente('');
      setMascotas([]);
      fetchData();
    } catch (err) {
      showToast('Error al crear receta: ' + (err.response?.data?.message || err.message), 'error');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <LoadingSpinner message="Cargando recetas..." />;
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
              <i className="bi bi-file-medical me-2"></i>
              Gestión de Recetas
            </h4>
            <p className="text-muted">Crear y gestionar recetas médicas</p>
          </div>
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            <i className="bi bi-plus-circle me-2"></i>
            Nueva Receta
          </button>
        </div>

        {recetas.length === 0 ? (
          <div className="text-center py-5">
            <i className="bi bi-file-medical" style={{ fontSize: '4rem', color: '#ccc' }}></i>
            <h5 className="mt-3">No hay recetas registradas</h5>
            <p className="text-muted">Crea la primera receta para comenzar</p>
            <button className="btn btn-primary" onClick={() => setShowModal(true)}>
              <i className="bi bi-plus-circle me-2"></i>
              Nueva Receta
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
                      <th>Diagnóstico</th>
                      <th>Medicamentos</th>
                      <th>Veterinario</th>
                      <th>Fecha Emisión</th>
                      <th>Días Tratamiento</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recetas.map((receta) => (
                      <tr key={receta.id}>
                        <td>{receta.id}</td>
                        <td>
                          <i className="bi bi-heart-fill text-danger me-2"></i>
                          {receta.nombreMascota}
                        </td>
                        <td>{receta.diagnostico}</td>
                        <td>
                          <small>{receta.medicamentos.substring(0, 50)}...</small>
                        </td>
                        <td>{receta.veterinario}</td>
                        <td>
                          {new Date(receta.fechaEmision).toLocaleDateString('es-CL')}
                        </td>
                        <td>
                          {receta.diasTratamiento ? `${receta.diasTratamiento} días` : '-'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Modal Nueva Receta */}
        {showModal && (
          <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">
                    <i className="bi bi-file-medical me-2"></i>
                    Nueva Receta Médica
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
                            {cliente.nombre || cliente.email}
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
                        Diagnóstico <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className={`form-control ${formErrors.diagnostico ? 'is-invalid' : ''}`}
                        name="diagnostico"
                        value={formData.diagnostico}
                        onChange={handleChange}
                        placeholder="Ej: Infección respiratoria aguda"
                      />
                      {formErrors.diagnostico && (
                        <div className="invalid-feedback">{formErrors.diagnostico}</div>
                      )}
                    </div>

                    <div className="mb-3">
                      <label className="form-label">
                        Medicamentos <span className="text-danger">*</span>
                      </label>
                      <textarea
                        className={`form-control ${formErrors.medicamentos ? 'is-invalid' : ''}`}
                        name="medicamentos"
                        value={formData.medicamentos}
                        onChange={handleChange}
                        rows="3"
                        placeholder="Lista de medicamentos recetados"
                      />
                      {formErrors.medicamentos && (
                        <div className="invalid-feedback">{formErrors.medicamentos}</div>
                      )}
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Dosificación</label>
                      <input
                        type="text"
                        className="form-control"
                        name="dosificacion"
                        value={formData.dosificacion}
                        onChange={handleChange}
                        placeholder="Ej: 1 comprimido cada 12 horas"
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Indicaciones</label>
                      <textarea
                        className="form-control"
                        name="indicaciones"
                        value={formData.indicaciones}
                        onChange={handleChange}
                        rows="3"
                        placeholder="Indicaciones adicionales para el tratamiento"
                      />
                    </div>

                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">
                          Veterinario <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className={`form-control ${formErrors.veterinario ? 'is-invalid' : ''}`}
                          name="veterinario"
                          value={formData.veterinario}
                          onChange={handleChange}
                          placeholder="Nombre del veterinario"
                        />
                        {formErrors.veterinario && (
                          <div className="invalid-feedback">{formErrors.veterinario}</div>
                        )}
                      </div>

                      <div className="col-md-6 mb-3">
                        <label className="form-label">Días de Tratamiento</label>
                        <input
                          type="number"
                          className="form-control"
                          name="diasTratamiento"
                          value={formData.diasTratamiento}
                          onChange={handleChange}
                          placeholder="Ej: 7"
                          min="1"
                        />
                      </div>
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
                      {submitting ? 'Guardando...' : 'Crear Receta'}
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

export default Recetas;