import React, { useEffect } from 'react';

const VARIANT_CLASSES = {
  success: 'bg-success text-white border-0',
  error: 'bg-danger text-white border-0',
  warning: 'bg-warning text-dark border-0',
  info: 'bg-info text-dark border-0'
};

const Toast = ({ message, type = 'info', duration = 4000, onClose }) => {
  useEffect(() => {
    if (!duration) return undefined;
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className={`toast align-items-center m-2 ${VARIANT_CLASSES[type] || VARIANT_CLASSES.info}`} role="alert">
      <div className="d-flex">
        <div className="toast-body">{message}</div>
        <button type="button" className="btn-close btn-close-white me-2 m-auto" aria-label="Close" onClick={onClose}></button>
      </div>
    </div>
  );
};

export default Toast;
