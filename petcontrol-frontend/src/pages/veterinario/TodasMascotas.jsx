import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as mascotaService from '../../services/mascotaService';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const TodasMascotas = () => {
  const [mascotas, setMascotas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchMascotas();
  }, []);

  const fetchMascotas = async () => {
    try {
      setLoading(true);
      const data = await mascotaService.getAllMascotas();
      setMascotas(data);
      setError('');
    } catch (err) {
      setError('Error al cargar mascotas: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  const filteredMascotas = mascotas.filter(mascota =>
    mascota.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mascota.especie?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mascota.raza?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mascota.usuario?.nombre?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <LoadingSpinner message="Cargando mascotas..." />;
  }

  return (
    <div className="mt-4">
      <div className="mb-4">
        <h4>Todas las Mascotas</h4>
        <p className="text-muted">Vista de todas las mascotas registradas en el sistema</p>
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

          {filteredMascotas.length === 0 ? (
            <div className="text-center py-5">
              <i className="bi bi-heart" style={{ fontSize: '4rem', color: '#ccc' }}></i>
              <h5 className="mt-3">No se encontraron mascotas</h5>
            </div>
          ) : (
            <div className="row g-4">
              {filteredMascotas.map((mascota) => (
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
                        <strong>Dueño:</strong> {mascota.usuario?.nombre || mascota.usuario?.email}
                      </p>
                      {mascota.descripcion && (
                        <p className="card-text">
                          <small className="text-muted">{mascota.descripcion}</small>
                        </p>
                      )}
                    </div>
                    <div className="card-footer bg-transparent">
                      <Link
                        to={`/veterinario/mascota/${mascota.id}`}
                        className="btn btn-sm btn-primary w-100"
                      >
                        <i className="bi bi-eye me-1"></i>
                        Ver Información Médica
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-3">
            <small className="text-muted">
              Mostrando {filteredMascotas.length} de {mascotas.length} mascotas
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodasMascotas;