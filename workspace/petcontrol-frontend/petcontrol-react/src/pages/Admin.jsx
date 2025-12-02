import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { mascotaService } from '../services/mascotaService';

function Admin() {
  const { usuario } = useApp();
  const [vistaActual, setVistaActual] = useState('mascotas');
  const [mascotas, setMascotas] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [mascotaEditando, setMascotaEditando] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    especie: '',
    raza: '',
    edad: '',
    descripcion: ''
  });

  useEffect(() => {
    cargarDatos();
  }, [vistaActual]);

  const cargarDatos = async () => {
    setLoading(true);
    setError(null);
    try {
      if (vistaActual === 'mascotas') {
        const data = await mascotaService.getAllMascotasAdmin();
        console.log('Mascotas cargadas:', data);
        setMascotas(Array.isArray(data) ? data : []);
      } else {
        const data = await mascotaService.getAllMascotasVeterinario();
        console.log('Datos veterinario:', data);
        // Extraer usuarios únicos de las mascotas
        const usuariosMap = new Map();
        const mascotasArray = Array.isArray(data) ? data : [];
        mascotasArray.forEach(mascota => {
          if (mascota.usuario && !usuariosMap.has(mascota.usuario.id)) {
            usuariosMap.set(mascota.usuario.id, mascota.usuario);
          }
        });
        setUsuarios(Array.from(usuariosMap.values()));
      }
    } catch (err) {
      console.error('Error cargando datos:', err);
      setError('Error al cargar los datos: ' + (err.response?.data?.mensaje || err.message));
    } finally {
      setLoading(false);
    }
  };

  const abrirModalEdicion = (mascota) => {
    setMascotaEditando(mascota);
    setFormData({
      nombre: mascota.nombre || '',
      especie: mascota.especie || '',
      raza: mascota.raza || '',
      edad: mascota.edad || '',
      descripcion: mascota.descripcion || ''
    });
    setShowEditModal(true);
  };

  const handleGuardarEdicion = async () => {
    try {
      await mascotaService.updateMascotaAdmin(mascotaEditando.id, formData);
      setShowEditModal(false);
      setMascotaEditando(null);
      cargarDatos();
    } catch (err) {
      console.error('Error actualizando mascota:', err);
      alert('Error al actualizar la mascota');
    }
  };

  const handleEliminarMascota = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar esta mascota?')) return;
    
    try {
      await mascotaService.deleteMascotaAdmin(id);
      cargarDatos();
    } catch (err) {
      console.error('Error eliminando mascota:', err);
      alert('Error al eliminar la mascota');
    }
  };

  const handleEliminarUsuario = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar este usuario? Se eliminarán todas sus mascotas.')) return;
    
    try {
      await mascotaService.deleteUsuarioCliente(id);
      cargarDatos();
    } catch (err) {
      console.error('Error eliminando usuario:', err);
      alert('Error al eliminar el usuario. Verifica que sea un CLIENTE.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-white p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-purple-100">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-xl shadow-lg">
            <h1 className="text-4xl font-bold mb-2">Panel de Administración</h1>
            <p className="text-purple-100">Bienvenido, {usuario?.nombre}</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="flex gap-4">
          <button
            onClick={() => setVistaActual('mascotas')}
            className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg ${
              vistaActual === 'mascotas'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white transform scale-105'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            🐾 Gestión de Mascotas
          </button>
          <button
            onClick={() => setVistaActual('usuarios')}
            className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg ${
              vistaActual === 'usuarios'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white transform scale-105'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            👥 Gestión de Usuarios
          </button>
        </div>
      </div>

      {/* Contenido */}
      <div className="max-w-7xl mx-auto">
        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-600"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl">
            {error}
          </div>
        )}

        {!loading && !error && vistaActual === 'mascotas' && (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left">ID</th>
                  <th className="px-6 py-4 text-left">Nombre</th>
                  <th className="px-6 py-4 text-left">Especie</th>
                  <th className="px-6 py-4 text-left">Raza</th>
                  <th className="px-6 py-4 text-left">Edad</th>
                  <th className="px-6 py-4 text-left">Dueño</th>
                  <th className="px-6 py-4 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {mascotas.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-12 text-gray-500">
                      No hay mascotas registradas
                    </td>
                  </tr>
                ) : (
                  mascotas.map((mascota) => (
                    <tr key={mascota.id} className="border-b hover:bg-purple-50 transition-colors">
                      <td className="px-6 py-4">{mascota.id}</td>
                      <td className="px-6 py-4 font-semibold">{mascota.nombre}</td>
                      <td className="px-6 py-4">{mascota.especie}</td>
                      <td className="px-6 py-4">{mascota.raza}</td>
                      <td className="px-6 py-4">{mascota.edad} años</td>
                      <td className="px-6 py-4">{mascota.usuario?.nombre || 'Sin dueño'}</td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2 justify-center">
                          <button
                            onClick={() => abrirModalEdicion(mascota)}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors shadow-md"
                          >
                            ✏️ Editar
                          </button>
                          <button
                            onClick={() => handleEliminarMascota(mascota.id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors shadow-md"
                          >
                            🗑️ Eliminar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {!loading && !error && vistaActual === 'usuarios' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {usuarios.length === 0 ? (
              <div className="col-span-full text-center py-12 text-gray-500 bg-white rounded-2xl shadow-xl">
                No hay usuarios registrados
              </div>
            ) : (
              usuarios.map((usuario) => (
                <div key={usuario.id} className="bg-white rounded-2xl shadow-xl p-6 border border-purple-100 hover:shadow-2xl transition-shadow">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                      {usuario.nombre?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">{usuario.nombre}</h3>
                      <p className="text-gray-500 text-sm">{usuario.email}</p>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                      usuario.rol === 'ADMIN' ? 'bg-purple-100 text-purple-700' :
                      usuario.rol === 'VETERINARIO' ? 'bg-blue-100 text-blue-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {usuario.rol}
                    </span>
                  </div>

                  {usuario.rol === 'CLIENTE' && (
                    <button
                      onClick={() => handleEliminarUsuario(usuario.id)}
                      className="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-3 rounded-lg transition-colors shadow-md font-semibold"
                    >
                      🗑️ Eliminar Usuario
                    </button>
                  )}
                  {usuario.rol !== 'CLIENTE' && (
                    <div className="text-center text-gray-400 py-3 border border-gray-200 rounded-lg">
                      No se puede eliminar
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Modal de Edición */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Editar Mascota</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Nombre</label>
                <input
                  type="text"
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Especie</label>
                <input
                  type="text"
                  value={formData.especie}
                  onChange={(e) => setFormData({ ...formData, especie: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Raza</label>
                <input
                  type="text"
                  value={formData.raza}
                  onChange={(e) => setFormData({ ...formData, raza: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Edad</label>
                <input
                  type="number"
                  value={formData.edad}
                  onChange={(e) => setFormData({ ...formData, edad: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Descripción</label>
                <textarea
                  value={formData.descripcion}
                  onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                  rows="3"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleGuardarEdicion}
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
              >
                💾 Guardar
              </button>
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setMascotaEditando(null);
                }}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                ❌ Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Admin;