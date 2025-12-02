import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext.jsx';
import { recetaService } from '../services/recetaService';

export default function MisMascotas() {
  const { obtenerMisMascotas, agregarMascota, editarMascota, borrarMascota } = useApp();
  const [mascotas, setMascotas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editando, setEditando] = useState(null);
  const [recetasExpandidas, setRecetasExpandidas] = useState({});
  const [recetasPorMascota, setRecetasPorMascota] = useState({});
  const [formulario, setFormulario] = useState({
    nombre: '',
    especie: '',
    raza: '',
    edad: '',
    descripcion: '',
    imagen: ''
  });

  useEffect(() => {
    cargarMascotas();
  }, []);

  const cargarMascotas = async () => {
    setLoading(true);
    try {
      const data = await obtenerMisMascotas();
      setMascotas(data);
    } catch (error) {
      console.error('Error al cargar mascotas:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editando) {
        await editarMascota(editando, formulario);
      } else {
        await agregarMascota(formulario);
      }
      setFormulario({ nombre: '', especie: '', raza: '', edad: '', descripcion: '', imagen: '' });
      setEditando(null);
      await cargarMascotas();
    } catch (error) {
      console.error('Error al guardar mascota:', error);
      alert('Error al guardar la mascota');
    }
  };

  const handleEditar = (mascota) => {
    setEditando(mascota.id);
    setFormulario({
      nombre: mascota.nombre,
      especie: mascota.especie,
      raza: mascota.raza || '',
      edad: mascota.edad || '',
      descripcion: mascota.descripcion || '',
      imagen: mascota.imagen || ''
    });
  };

  const handleEliminar = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta mascota?')) {
      try {
        await borrarMascota(id);
        await cargarMascotas();
      } catch (error) {
        console.error('Error al eliminar mascota:', error);
        alert('Error al eliminar la mascota');
      }
    }
  };

  const handleCancelar = () => {
    setEditando(null);
    setFormulario({ nombre: '', especie: '', raza: '', edad: '', descripcion: '', imagen: '' });
  };

  const toggleRecetas = async (mascotaId) => {
    if (recetasExpandidas[mascotaId]) {
      setRecetasExpandidas(prev => ({ ...prev, [mascotaId]: false }));
    } else {
      if (!recetasPorMascota[mascotaId]) {
        try {
          const response = await recetaService.getRecetasDeMiMascota(mascotaId);
          setRecetasPorMascota(prev => ({ ...prev, [mascotaId]: response.data || [] }));
        } catch (err) {
          console.error('Error cargando recetas:', err);
          alert('Error al cargar las recetas');
          return;
        }
      }
      setRecetasExpandidas(prev => ({ ...prev, [mascotaId]: true }));
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

  return (
    <div className="container py-4">
      <h2 className="mb-4">Mis Mascotas</h2>
      
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">{editando ? 'Editar Mascota' : 'Agregar Nueva Mascota'}</h5>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Nombre *</label>
                <input
                  type="text"
                  className="form-control"
                  name="nombre"
                  value={formulario.nombre}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Especie *</label>
                <input
                  type="text"
                  className="form-control"
                  name="especie"
                  value={formulario.especie}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Raza</label>
                <input
                  type="text"
                  className="form-control"
                  name="raza"
                  value={formulario.raza}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Edad</label>
                <input
                  type="number"
                  className="form-control"
                  name="edad"
                  value={formulario.edad}
                  onChange={handleChange}
                  min="0"
                />
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Descripción</label>
              <textarea
                className="form-control"
                name="descripcion"
                value={formulario.descripcion}
                onChange={handleChange}
                rows="3"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">URL de Imagen</label>
              <input
                type="text"
                className="form-control"
                name="imagen"
                value={formulario.imagen}
                onChange={handleChange}
                placeholder="https://ejemplo.com/imagen.jpg"
              />
            </div>
            <div className="d-flex gap-2">
              <button type="submit" className="btn btn-primary">
                {editando ? 'Actualizar' : 'Agregar'}
              </button>
              {editando && (
                <button type="button" className="btn btn-secondary" onClick={handleCancelar}>
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      <div className="row">
        {mascotas.length === 0 ? (
          <div className="col-12">
            <div className="alert alert-info">
              No tienes mascotas registradas. ¡Agrega tu primera mascota!
            </div>
          </div>
        ) : (
          mascotas.map(mascota => (
            <div key={mascota.id} className="col-md-6 col-lg-4 mb-4">
              <div className="card h-100">
                {mascota.imagen && (
                  <img
                    src={mascota.imagen}
                    className="card-img-top"
                    alt={mascota.nombre}
                    style={{ height: '200px', objectFit: 'cover' }}
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title">{mascota.nombre}</h5>
                  <p className="card-text">
                    <strong>Especie:</strong> {mascota.especie}<br />
                    {mascota.raza && <><strong>Raza:</strong> {mascota.raza}<br /></>}
                    {mascota.edad && <><strong>Edad:</strong> {mascota.edad} años<br /></>}
                    {mascota.descripcion && <><strong>Descripción:</strong> {mascota.descripcion}</>}
                  </p>

                  {/* Sección de Recetas */}
                  <div className="mt-3">
                    <button
                      className="btn btn-sm btn-info w-100"
                      onClick={() => toggleRecetas(mascota.id)}
                    >
                      {recetasExpandidas[mascota.id] ? '🔽 Ocultar Recetas' : '💊 Ver Recetas Médicas'}
                    </button>
                    
                    {recetasExpandidas[mascota.id] && (
                      <div className="mt-3 p-3 border rounded bg-light">
                        <h6 className="fw-bold text-primary mb-3">📋 Recetas Médicas</h6>
                        {recetasPorMascota[mascota.id] && recetasPorMascota[mascota.id].length > 0 ? (
                          <div className="space-y-3">
                            {recetasPorMascota[mascota.id].map((receta, index) => (
                              <div key={receta.id} className="border-bottom pb-3 mb-3">
                                <div className="d-flex justify-content-between align-items-start mb-2">
                                  <span className="badge bg-primary">Receta #{index + 1}</span>
                                  <small className="text-muted">
                                    {new Date(receta.fechaCreacion).toLocaleDateString('es-ES')}
                                  </small>
                                </div>
                                <p className="mb-2">
                                  <strong className="text-success">Diagnóstico:</strong><br />
                                  <span className="ms-2">{receta.diagnostico}</span>
                                </p>
                                <p className="mb-2">
                                  <strong className="text-danger">Medicamentos:</strong><br />
                                  <span className="ms-2">{receta.medicamentos}</span>
                                </p>
                                <p className="mb-2">
                                  <strong className="text-info">Dosificación:</strong><br />
                                  <span className="ms-2">{receta.dosificacion}</span>
                                </p>
                                {receta.indicaciones && (
                                  <p className="mb-2">
                                    <strong className="text-warning">Indicaciones:</strong><br />
                                    <span className="ms-2">{receta.indicaciones}</span>
                                  </p>
                                )}
                                {receta.diasTratamiento && (
                                  <p className="mb-0">
                                    <strong>Duración:</strong> {receta.diasTratamiento} días
                                  </p>
                                )}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-muted mb-0">No hay recetas médicas registradas para esta mascota.</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <div className="card-footer d-flex gap-2">
                  <button
                    className="btn btn-sm btn-warning"
                    onClick={() => handleEditar(mascota)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleEliminar(mascota.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}