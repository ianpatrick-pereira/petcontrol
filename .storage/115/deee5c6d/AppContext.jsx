import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';
import { mascotaService } from '../services/mascotaService';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp debe ser usado dentro de AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [usuarioActual, setUsuarioActual] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const usuario = authService.obtenerUsuarioActual();
    if (usuario) {
      setUsuarioActual(usuario);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const data = await authService.login(email, password);
      setUsuarioActual(data.usuario);
      return data;
    } catch (error) {
      throw error;
    }
  };

  const register = async (email, password, nombre) => {
    try {
      const data = await authService.register(email, password, nombre);
      setUsuarioActual(data.usuario);
      return data;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    authService.logout();
    setUsuarioActual(null);
  };

  const obtenerMisMascotas = async () => {
    return await mascotaService.obtenerMisMascotas();
  };

  const agregarMascota = async (mascota) => {
    return await mascotaService.crearMascota(mascota);
  };

  const editarMascota = async (id, mascota) => {
    return await mascotaService.actualizarMascota(id, mascota);
  };

  const borrarMascota = async (id) => {
    return await mascotaService.eliminarMascota(id);
  };

  const obtenerTodasLasMascotas = async () => {
    return await mascotaService.obtenerTodasLasMascotas();
  };

  const obtenerTodasLasMascotasVeterinario = async () => {
    return await mascotaService.obtenerTodasLasMascotasVeterinario();
  };

  const value = {
    usuarioActual,
    loading,
    login,
    register,
    logout,
    obtenerMisMascotas,
    agregarMascota,
    editarMascota,
    borrarMascota,
    obtenerTodasLasMascotas,
    obtenerTodasLasMascotasVeterinario
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};