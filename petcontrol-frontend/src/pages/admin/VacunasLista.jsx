import React from 'react';

const VacunasLista = () => {
  return (
    <div className="mt-4">
      <div className="mb-4">
        <h4>Gestión de Vacunas</h4>
        <p className="text-muted">Administrar registros de vacunación del sistema</p>
      </div>

      <div className="alert alert-info">
        <i className="bi bi-info-circle me-2"></i>
        <strong>Funcionalidad en desarrollo</strong>
        <p className="mb-0 mt-2">
          Esta sección permitirá gestionar los registros de vacunación de las mascotas. 
          Por ahora, las vacunas se pueden agregar desde el detalle de cada mascota.
        </p>
      </div>

      <div className="card">
        <div className="card-body text-center py-5">
          <i className="bi bi-shield-plus" style={{ fontSize: '4rem', color: '#ccc' }}></i>
          <h5 className="mt-3">Gestión de Vacunas</h5>
          <p className="text-muted">
            Aquí podrás ver y administrar todos los registros de vacunación del sistema
          </p>
        </div>
      </div>
    </div>
  );
};

export default VacunasLista;