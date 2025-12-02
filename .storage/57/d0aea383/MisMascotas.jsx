import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext.jsx';

export default function MisMascotas() {
  const { obtenerMisMascotas, agregarMascota, editarMascota, borrarMascota } = useApp();
  const [mascotas, setMascotas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editando, setEditando] = useState(null);
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