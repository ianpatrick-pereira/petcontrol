import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as mascotaService from '../../services/mascotaService';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import Toast from '../../components/common/Toast';
import { useToast } from '../../hooks/useToast';

const MascotaDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [mascota, setMascota] = useState(null);
  const [historial, setHistorial] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toasts, showToast, removeToast } = useToast();

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [mascotaData, historialData] = await Promise.all([
        mascotaService.getMascotaById(id),
        mascotaService.getHistorialMedico(id)
      ]);
      setMascota(mascotaData);
      setHistorial(historialData);
    } catch (err) {
      showToast('Error al cargar datos: ' + (err.response?.data?.message || err.message), 'error');
      setTimeout(() => navigate('/cliente/mis-mascotas'), 2000);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner message="Cargando información..." />;
  }

  if (!mascota) {
    return null;
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
        <button className="btn btn-outline-secondary mb-3" onClick={() => navigate('/cliente/mis-mascotas')}>
          <i className="bi bi-arrow-left me-2"></i>
          Volver a Mis Mascotas
        </button>

        <div className="row">
          <div className="col-md-4">
            <div className="card">
              <div className="card-body text-center">
                {mascota.imagen ? (
                  <img
                    src={mascota.imagen}
                    alt={mascota.nombre}
                    className="img-fluid rounded mb-3"
                    style={{ maxHeight: '300px', objectFit: 'cover' }}
                  />
                ) : (
                  <div className="bg-light rounded mb-3 d-flex align-items-center justify-content-center" style={{ height: '300px' }}>
                    <i className="bi bi-image" style={{ fontSize: '4rem', color: '#ccc' }}></i>
                  </div>
                )}
                <h4>{mascota.nombre}</h4>
                <p className="text-muted mb-2">
                  <i className="bi bi-tag-fill me-2"></i>
                  {mascota.especie}
                </p>
                <p className="text-muted mb-2">
                  <i className="bi bi-award-fill me-2"></i>
                  {mascota.raza || 'Sin raza especificada'}
                </p>
                <p className="text-muted mb-2">
                  <i className="bi bi-calendar-fill me-2"></i>
                  {mascota.edad} {mascota.edad === 1 ? 'año' : 'años'}
                </p>
                {mascota.descripcion && (
                  <div className="mt-3">
                    <h6>Descripción</h6>
                    <p className="text-muted">{mascota.descripcion}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="col-md-8">
            <div className="card">
              <div className="card-header bg-primary text-white">
                <h5 className="mb-0">
                  <i className="bi bi-clipboard2-pulse-fill me-2"></i>
                  Historial Médico Completo
                </h5>
              </div>
              <div className="card-body">
                {historial.length === 0 ? (
                  <div className="text-center py-5">
                    <i className="bi bi-clipboard2-pulse" style={{ fontSize: '4rem', color: '#ccc' }}></i>
                    <h5 className="mt-3">Sin historial médico</h5>
                    <p className="text-muted">No hay vacunas ni recetas registradas para esta mascota</p>
                  </div>
                ) : (
                  <div className="timeline">
                    {historial.map((item, index) => (
                      <div key={`${item.tipo}-${item.id}`} className="timeline-item mb-4">
                        <div className="d-flex">
                          <div className="flex-shrink-0">
                            {item.tipo === 'VACUNA' ? (
                              <div className="rounded-circle bg-success text-white d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                                <i className="bi bi-shield-fill-check"></i>
                              </div>
                            ) : (
                              <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                                <i className="bi bi-file-medical-fill"></i>
                              </div>
                            )}
                          </div>
                          <div className="flex-grow-1 ms-3">
                            <div className="card">
                              <div className="card-body">
                                <div className="d-flex justify-content-between align-items-start mb-2">
                                  <div>
                                    <h6 className="mb-1">
                                      {item.tipo === 'VACUNA' ? (
                                        <span className="badge bg-success me-2">VACUNA</span>
                                      ) : (
                                        <span className="badge bg-primary me-2">RECETA</span>
                                      )}
                                      {item.titulo}
                                    </h6>
                                    <small className="text-muted">
                                      <i className="bi bi-calendar3 me-1"></i>
                                      {new Date(item.fecha).toLocaleDateString('es-CL', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                      })}
                                    </small>
                                  </div>
                                </div>
                                <p className="mb-2">{item.descripcion}</p>
                                <small className="text-muted">
                                  <i className="bi bi-person-badge me-1"></i>
                                  Veterinario: {item.veterinario}
                                </small>
                              </div>
                            </div>
                          </div>
                        </div>
                        {index < historial.length - 1 && (
                          <div className="timeline-line ms-3" style={{ height: '20px', width: '2px', backgroundColor: '#dee2e6' }}></div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MascotaDetalle;