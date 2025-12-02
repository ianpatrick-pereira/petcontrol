import React, { createContext, useContext, useState, useCallback } from 'react';

const AlertContext = createContext();
export const useAlert = () => useContext(AlertContext);

export const AlertProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showAlert = useCallback((message, variant = 'info', ttl = 5000) => {
    const id = Date.now() + Math.random();
    const toast = { id, message, variant };
    setToasts((prev) => [toast, ...prev]);

    // Auto-dismiss
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, ttl);
  }, []);

  const removeToast = (id) => setToasts((prev) => prev.filter((t) => t.id !== id));

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}

      {/* Toast container (Bootstrap toasts) */}
      <div aria-live="polite" aria-atomic="true" className="position-fixed top-0 end-0 p-3" style={{ zIndex: 1080 }}>
        {toasts.map((t) => (
          <div key={t.id} className={`toast show align-items-center text-bg-${t.variant} mb-2`} role="alert" aria-live="assertive" aria-atomic="true">
            <div className="d-flex">
              <div className="toast-body">{t.message}</div>
              <button type="button" className="btn-close btn-close-white me-2 m-auto" onClick={() => removeToast(t.id)} aria-label="Close"></button>
            </div>
          </div>
        ))}
      </div>
    </AlertContext.Provider>
  );
};
