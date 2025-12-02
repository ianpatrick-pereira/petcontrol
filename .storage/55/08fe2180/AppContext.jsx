import { createContext, useContext, useEffect, useState } from 'react';
import { authService } from '../services/authService';
import { mascotaService } from '../services/mascotaService';

const Ctx = createContext();

export function AppProvider({ children }) {
  const [usuarioActual, setUsuarioActual] = useState(null);
  const [carrito, setCarrito] = useState([]);

  // Cargar sesión persistente al montar
  useEffect(() => {
    const usuario = authService.getUsuarioActual();
    if (usuario) {
      setUsuarioActual(usuario);
    }
  }, []);

  async function login(email, password) {
    try {
      const usuario = await authService.login(email, password);
      setUsuarioActual(usuario);
      return usuario;
    } catch (error) {
      throw error;
    }
  }

  async function register(email, password, nombre = '') {
    try {
      const usuario = await authService.register(email, password, nombre);
      setUsuarioActual(usuario);
      return usuario;
    } catch (error) {
      throw error;
    }
  }

  function logout() {
    authService.logout();
    setUsuarioActual(null);
  }

  function isAdmin() {
    return usuarioActual && usuarioActual.rol === 'ADMIN';
  }

  // Funciones de carrito (mantenidas para compatibilidad)
  const agregarAlCarrito = (prod, qty = 1) => setCarrito(c => {
    const i = c.findIndex(x => x.id === prod.id);
    if (i >= 0) {
      const n = [...c];
      n[i] = { ...n[i], cantidad: n[i].cantidad + qty };
      return n;
    }
    return [...c, { id: prod.id, nombre: prod.nombre, precio: prod.precio, cantidad: qty }];
  });
  const quitarDelCarrito = id => setCarrito(c => c.filter(x => x.id !== id));
  const vaciarCarrito = () => setCarrito([]);

  // Funciones de mascotas usando el servicio del backend
  async function obtenerMisMascotas() {
    if (!usuarioActual) return [];
    try {
      return await mascotaService.obtenerMisMascotas();
    } catch (error) {
      console.error('Error al obtener mascotas:', error);
      return [];
    }
  }

  async function agregarMascota(datos) {
    if (!usuarioActual) throw new Error('Debes iniciar sesión');
    try {
      return await mascotaService.crearMascota(datos);
    } catch (error) {
      throw error;
    }
  }

  async function editarMascota(id, datos) {
    if (!usuarioActual) throw new Error('Debes iniciar sesión');
    try {
      return await mascotaService.actualizarMascota(id, datos);
    } catch (error) {
      throw error;
    }
  }

  async function borrarMascota(id) {
    if (!usuarioActual) throw new Error('Debes iniciar sesión');
    try {
      await mascotaService.eliminarMascota(id);
    } catch (error) {
      throw error;
    }
  }

  async function obtenerTodasLasMascotas() {
    if (!isAdmin()) throw new Error('No tienes permisos de administrador');
    try {
      return await mascotaService.obtenerTodasLasMascotas();
    } catch (error) {
      throw error;
    }
  }

  return (
    <Ctx.Provider value={{
      usuarioActual,
      login,
      register,
      logout,
      isAdmin,
      carrito,
      agregarAlCarrito,
      quitarDelCarrito,
      vaciarCarrito,
      obtenerMisMascotas,
      agregarMascota,
      editarMascota,
      borrarMascota,
      obtenerTodasLasMascotas
    }}>
      {children}
    </Ctx.Provider>
  );
}

export const useApp = () => useContext(Ctx);