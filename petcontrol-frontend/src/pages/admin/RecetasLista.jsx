import React from 'react';

const RecetasLista = () => {
  return (
    <div className="mt-4">
      <div className="mb-4">
        <h4>Gestión de Recetas</h4>
        <p className="text-muted">Administrar recetas médicas del sistema</p>
      </div>

      <div className="alert alert-info">
        <i className="bi bi-info-circle me-2"></i>
        <strong>Funcionalidad en desarrollo</strong>
        <p className="mb-0 mt-2">
          Esta sección permitirá gestionar las recetas médicas de las mascotas. 
          Por ahora, las recetas se pueden agregar desde el detalle de cada mascota.
        </p>
      </div>

      <div className="card">
        <div className="card-body text-center py-5">
          <i className="bi bi-file-medical" style={{ fontSize: '4rem', color: '#ccc' }}></i>
          <h5 className="mt-3">Gestión de Recetas</h5>
          <p className="text-muted">
            Aquí podrás ver y administrar todas las recetas médicas del sistema
          </p>
        </div>
      </div>
    </div>
  );
};

export default RecetasLista;