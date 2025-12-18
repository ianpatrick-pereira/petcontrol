import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Toast from '../common/Toast';
import { useToast } from '../../hooks/useToast';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    nombre: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const { toasts, showToast, removeToast } = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validatePassword = (password) => {
    // Debe tener al menos 8 caracteres
    if (password.length < 8) {
      return 'La contraseña debe tener al menos 8 caracteres';
    }
    
    // Debe contener al menos un número
    if (!/\d/.test(password)) {
      return 'La contraseña debe contener al menos un número';
    }

    return null;
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es obligatorio';
    } else if (formData.nombre.length > 100) {
      newErrors.nombre = 'El nombre no puede exceder 100 caracteres';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El correo es obligatorio';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Correo inválido';
    } else if (formData.email.length > 100) {
      newErrors.email = 'El correo no puede exceder 100 caracteres';
    }

    // Verificar que no se intente registrar con emails protegidos
    // Estos usuarios YA EXISTEN en el sistema y deben hacer LOGIN, no registro
    const protectedEmails = ['admin@admin.cl', 'veterinario@petcontrol.cl'];
    if (protectedEmails.includes(formData.email.toLowerCase().trim())) {
      newErrors.email = 'Este correo ya está registrado. Por favor, inicia sesión.';
    }

    if (!formData.password) {
      newErrors.password = 'La contraseña es obligatoria';
    } else {
      const passwordError = validatePassword(formData.password);
      if (passwordError) {
        newErrors.password = passwordError;
      }
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirma tu contraseña';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // Mostrar primer error como toast
      const firstError = Object.values(newErrors)[0];
      showToast(firstError, 'error');
      return;
    }

    setLoading(true);
    const result = await register({
      email: formData.email,
      password: formData.password,
      nombre: formData.nombre
    });
    setLoading(false);

    if (!result.success) {
      showToast(result.message || 'Error al registrar usuario', 'error');
    } else {
      showToast('¡Registro exitoso! Bienvenido a PetControl', 'success');
    }
  };

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
      
      <div className="container">
        <div className="row justify-content-center mt-5">
          <div className="col-md-6 col-lg-5">
            <div className="card shadow">
              <div className="card-body p-4">
                <div className="text-center mb-4">
                  <i className="bi bi-heart-pulse-fill text-primary" style={{ fontSize: '3rem' }}></i>
                  <h3 className="mt-2">PetControl</h3>
                  <p className="text-muted">Crear Cuenta Nueva</p>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">
                      Nombre Completo <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className={`form-control ${errors.nombre ? 'is-invalid' : ''}`}
                      id="nombre"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      placeholder="Juan Pérez"
                    />
                    {errors.nombre && (
                      <div className="invalid-feedback">{errors.nombre}</div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Correo Electrónico <span className="text-danger">*</span>
                    </label>
                    <input
                      type="email"
                      className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="ejemplo@correo.com"
                    />
                    {errors.email && (
                      <div className="invalid-feedback">{errors.email}</div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Contraseña <span className="text-danger">*</span>
                    </label>
                    <input
                      type="password"
                      className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                    />
                    {errors.password && (
                      <div className="invalid-feedback">{errors.password}</div>
                    )}
                    <small className="text-muted d-block mt-1">
                       Mínimo 8 caracteres y al menos un número
                    </small>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">
                      Confirmar Contraseña <span className="text-danger">*</span>
                    </label>
                    <input
                      type="password"
                      className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="••••••••"
                    />
                    {errors.confirmPassword && (
                      <div className="invalid-feedback">{errors.confirmPassword}</div>
                    )}
                  </div>

                  <button
                    type="submit"
                    className={`btn btn-primary w-100 ${loading ? 'btn-loading' : ''}`}
                    disabled={loading}
                  >
                    {loading ? 'Registrando...' : 'Registrarse'}
                  </button>
                </form>

                <div className="text-center mt-3">
                  <p className="text-muted">
                    ¿Ya tienes cuenta?{' '}
                    <Link to="/login" className="text-primary text-decoration-none">
                      Inicia sesión aquí
                    </Link>
                  </p>
                </div>

                <hr />

                <div className="alert alert-info mb-0">
                  <small>
                    <i className="bi bi-info-circle me-2"></i>
                    <strong>Requisitos de contraseña:</strong>
                    <ul className="mb-0 mt-2" style={{ fontSize: '0.85rem' }}>
                    <li>Mínimo 8 caracteres</li>
                    <li>Al menos un número (0-9)</li>
                    </ul>
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;