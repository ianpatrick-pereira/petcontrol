import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as mascotaService from '../../services/mascotaService';
import * as usuarioService from '../../services/usuarioService';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const MascotaForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    nombre: '',
    especie: '',
    raza: '',
    edad: '',
    descripcion: '',
    imagen: '',
    usuarioId: ''
  });

  const [usuarios, setUsuarios] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(isEdit);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchUsuarios();
    if (isEdit) {
      fetchMascota();
    }
  }, [id]);

  const fetchUsuarios = async () => {
    try {
      const data = await usuarioService.getAllUsuarios();
      setUsuarios(data);
    } catch (err) {
      console.error('Error loading users:', err);
    }
  };

  const fetchMascota = async () => {
    try {
      setLoadingData(true);
      const data = await mascotaService.getMascotaById(id);
      setFormData({
        nombre: data.nombre || '',
        especie: data.especie || '',
        raza: data.raza || '',
        edad: data.edad || '',
        descripcion: data.descripcion || '',
        imagen: data.imagen || '',
        usuarioId: data.usuario?.id || ''
      });
    } catch (err) {
      setErrorMessage('Error al cargar mascota: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoadingData(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es obligatorio';
    } else if (formData.nombre.length > 100) {
      newErrors.nombre = 'El nombre no puede exceder 100 caracteres';
    }

    if (!formData.especie.trim()) {
      newErrors.especie = 'La especie es obligatoria';
    }

    if (formData.edad && (isNaN(formData.edad) || formData.edad < 0)) {
      newErrors.edad = 'La edad debe ser un número positivo';
    }

    if (formData.descripcion && formData.descripcion.length > 1000) {
      newErrors.descripcion = 'La descripción no puede exceder 1000 caracteres';
    }

    if (!formData.usuarioId) {
      newErrors.usuarioId = 'Debe seleccionar un dueño';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    try {
      const mascotaData = {
        nombre: formData.nombre,
        especie: formData.especie,
        raza: formData.raza || null,
        edad: formData.edad ? parseInt(formData.edad) : null,
        descripcion: formData.descripcion || null,
        imagen: formData.imagen || null,
        usuarioId: parseInt(formData.usuarioId)
      };

      if (isEdit) {
        await mascotaService.updateMascota(id, mascotaData);
        alert('Mascota actualizada correctamente');
      } else {
        await mascotaService.createMascota(mascotaData);
        alert('Mascota creada correctamente');
      }

      navigate('/admin/mascotas');
    } catch (err) {
      setErrorMessage(err.response?.data?.message || 'Error al guardar mascota');
    } finally {
      setLoading(false);
    }
  };

  if (loadingData) {
    return <LoadingSpinner message="Cargando datos..." />;
  }

  return (
    <div className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4>{isEdit ? 'Editar Mascota' : 'Nueva Mascota'}</h4>
          <p className="text-muted">
            {isEdit ? 'Actualizar información de la mascota' : 'Registrar una nueva mascota'}
          </p>
        </div>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => navigate('/admin/mascotas')}
        >
          <i className="bi bi-arrow-left me-2"></i>
          Volver
        </button>
      </div>

      {errorMessage && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          {errorMessage}
          <button type="button" className="btn-close" onClick={() => setErrorMessage('')}></button>
        </div>
      )}

      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="nombre" className="form-label">
                  Nombre <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.nombre ? 'is-invalid' : ''}`}
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  placeholder="Ej: Firulais"
                />
                {errors.nombre && <div className="invalid-feedback">{errors.nombre}</div>}
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="especie" className="form-label">
                  Especie <span className="text-danger">*</span>
                </label>
                <select
                  className={`form-select ${errors.especie ? 'is-invalid' : ''}`}
                  id="especie"
                  name="especie"
                  value={formData.especie}
                  onChange={handleChange}
                >
                  <option value="">Seleccionar especie</option>
                  <option value="Perro">Perro</option>
                  <option value="Gato">Gato</option>
                  <option value="Ave">Ave</option>
                  <option value="Conejo">Conejo</option>
                  <option value="Hamster">Hamster</option>
                  <option value="Otro">Otro</option>
                </select>
                {errors.especie && <div className="invalid-feedback">{errors.especie}</div>}
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="raza" className="form-label">
                  Raza
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="raza"
                  name="raza"
                  value={formData.raza}
                  onChange={handleChange}
                  placeholder="Ej: Labrador"
                />
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="edad" className="form-label">
                  Edad (años)
                </label>
                <input
                  type="number"
                  className={`form-control ${errors.edad ? 'is-invalid' : ''}`}
                  id="edad"
                  name="edad"
                  value={formData.edad}
                  onChange={handleChange}
                  placeholder="Ej: 3"
                  min="0"
                />
                {errors.edad && <div className="invalid-feedback">{errors.edad}</div>}
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="usuarioId" className="form-label">
                Dueño <span className="text-danger">*</span>
              </label>
              <select
                className={`form-select ${errors.usuarioId ? 'is-invalid' : ''}`}
                id="usuarioId"
                name="usuarioId"
                value={formData.usuarioId}
                onChange={handleChange}
              >
                <option value="">Seleccionar dueño</option>
                {usuarios.map((usuario) => (
                  <option key={usuario.id} value={usuario.id}>
                    {usuario.nombre || usuario.email} ({usuario.rol})
                  </option>
                ))}
              </select>
              {errors.usuarioId && <div className="invalid-feedback">{errors.usuarioId}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="descripcion" className="form-label">
                Descripción
              </label>
              <textarea
                className={`form-control ${errors.descripcion ? 'is-invalid' : ''}`}
                id="descripcion"
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                rows="3"
                placeholder="Información adicional sobre la mascota..."
              />
              {errors.descripcion && <div className="invalid-feedback">{errors.descripcion}</div>}
              <small className="text-muted">Máximo 1000 caracteres</small>
            </div>

            <div className="mb-3">
              <label htmlFor="imagen" className="form-label">
                URL de Imagen
              </label>
              <input
                type="url"
                className="form-control"
                id="imagen"
                name="imagen"
                value={formData.imagen}
                onChange={handleChange}
                placeholder="/images/Pet.jpg"
              />
              <small className="text-muted">URL de la foto de la mascota</small>
            </div>

            <div className="d-flex gap-2">
              <button
                type="submit"
                className={`btn btn-primary ${loading ? 'btn-loading' : ''}`}
                disabled={loading}
              >
                {loading ? 'Guardando...' : (isEdit ? 'Actualizar' : 'Crear')}
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate('/admin/mascotas')}
                disabled={loading}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MascotaForm;