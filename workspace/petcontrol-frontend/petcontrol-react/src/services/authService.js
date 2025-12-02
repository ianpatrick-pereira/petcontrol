import api from './api';

export const authService = {
  async login(email, password) {
    try {
      const response = await api.post('/auth/login', { email, password });
      const { token, email: userEmail, nombre, rol, id } = response.data;
      
      // Guardar token y datos del usuario
      localStorage.setItem('token', token);
      const usuario = { id, email: userEmail, nombre, rol };
      localStorage.setItem('usuarioActual', JSON.stringify(usuario));
      
      return usuario;
    } catch (error) {
      console.error('Error en login:', error);
      throw new Error('Email o contraseña incorrectos');
    }
  },

  async register(email, password, nombre = '') {
    try {
      const response = await api.post('/auth/register', { email, password, nombre });
      const { token, email: userEmail, nombre: userName, rol, id } = response.data;
      
      // Guardar token y datos del usuario
      localStorage.setItem('token', token);
      const usuario = { id, email: userEmail, nombre: userName, rol };
      localStorage.setItem('usuarioActual', JSON.stringify(usuario));
      
      return usuario;
    } catch (error) {
      console.error('Error en registro:', error);
      throw new Error('Este email ya está registrado');
    }
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuarioActual');
  },

  getUsuarioActual() {
    const usuarioStr = localStorage.getItem('usuarioActual');
    if (usuarioStr) {
      try {
        return JSON.parse(usuarioStr);
      } catch (e) {
        localStorage.removeItem('usuarioActual');
        return null;
      }
    }
    return null;
  },

  isAuthenticated() {
    return !!localStorage.getItem('token');
  },

  isAdmin() {
    const usuario = this.getUsuarioActual();
    return usuario && usuario.rol === 'ADMIN';
  }
};