import React from 'react';

const LoadingSpinner = ({ size = 'md', message = 'Cargando...' }) => {
  const sizeClass = size === 'sm' ? 'spinner-border-sm' : '';

  return (
    <div className="spinner-container">
      <div className="text-center">
        <div className={`spinner-border text-primary ${sizeClass}`} role="status">
          <span className="visually-hidden">{message}</span>
        </div>
        {message && <p className="mt-2 text-muted">{message}</p>}
      </div>
    </div>
  );
};

export default LoadingSpinner;