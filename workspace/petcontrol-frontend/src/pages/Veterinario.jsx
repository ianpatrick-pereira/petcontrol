import { useState, useEffect } from 'react';
import { mascotaService } from '../services/mascotaService';
import { useApp } from '../context/AppContext';

function Veterinario() {
  const { user } = useApp();
  const [mascotas, setMascotas] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [estadisticas, setEstadisticas] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [busqueda, setBusqueda] = useState({ nombre: '', especie: '' });
  const [vistaActual, setVistaActual] = useState('mascotas'); // mascotas, usuarios, estadisticas

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      setLoading(true);
      const [mascotasData, usuariosData, statsData] = await Promise.all([
        mascotaService.getAllMascotasVeterinario(),
        mascotaService.getAllUsuarios(),
        mascotaService.getEstadisticas()
      ]);
      setMascotas(mascotasData);
      setUsuarios(usuariosData);
      setEstadisticas(statsData);
      setError('');
    } catch (err) {
      setError('Error al cargar los datos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const buscarMascotas = async () => {
    try {
      setLoading(true);
      const resultado = await mascotaService.buscarMascotas(busqueda.nombre, busqueda.especie);
      setMascotas(resultado);
      setError('');
    } catch (err) {
      setError('Error al buscar mascotas');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const limpiarBusqueda = () => {
    setBusqueda({ nombre: '', especie: '' });
    cargarDatos();
  };

  if (loading && !mascotas.length) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Cargando datos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 px-4 py-8">
      <div className="container mx-auto">
      <div className="mb-8 bg-gradient-to-r from-blue-600 to-green-500 rounded-xl shadow-lg p-6">
        <h1 className="text-3xl font-bold text-white mb-2">
          🩺 Panel de Veterinario
        </h1>
        <p className="text-blue-50">
          Bienvenido, {user?.nombre || user?.email}
        </p>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* Navegación de pestañas */}
      <div className="mb-6 bg-white rounded-xl shadow-lg overflow-hidden">
        <nav className="flex">
          <button
            onClick={() => setVistaActual('mascotas')}
            className={`flex-1 py-4 px-6 font-semibold transition-all duration-300 ${
              vistaActual === 'mascotas'
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
            }`}
          >
            🐾 Todas las Mascotas ({mascotas.length})
          </button>
          <button
            onClick={() => setVistaActual('usuarios')}
            className={`flex-1 py-4 px-6 font-semibold transition-all duration-300 ${
              vistaActual === 'usuarios'
                ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-green-50 hover:text-green-600'
            }`}
          >
            👥 Dueños ({usuarios.length})
          </button>
          <button
            onClick={() => setVistaActual('estadisticas')}
            className={`flex-1 py-4 px-6 font-semibold transition-all duration-300 ${
              vistaActual === 'estadisticas'
                ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-purple-50 hover:text-purple-600'
            }`}
          >
            📊 Estadísticas
          </button>
        </nav>
      </div>

      {/* Vista de Mascotas */}
      {vistaActual === 'mascotas' && (
        <div>
          {/* Buscador */}
          <div className="mb-6 bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">🔍 Buscar Mascotas</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Buscar por nombre..."
                value={busqueda.nombre}
                onChange={(e) => setBusqueda({ ...busqueda, nombre: e.target.value })}
                className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-300 focus:border-blue-500 transition-all shadow-sm"
              />
              <input
                type="text"
                placeholder="Buscar por especie..."
                value={busqueda.especie}
                onChange={(e) => setBusqueda({ ...busqueda, especie: e.target.value })}
                className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-300 focus:border-blue-500 transition-all shadow-sm"
              />
              <div className="flex gap-2">
                <button
                  onClick={buscarMascotas}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-3 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all shadow-md hover:shadow-lg font-semibold"
                >
                  🔍 Buscar
                </button>
                <button
                  onClick={limpiarBusqueda}
                  className="px-4 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition font-semibold"
                >
                  Limpiar
                </button>
              </div>
            </div>
          </div>

          {/* Lista de Mascotas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mascotas.map((mascota) => (
              <div key={mascota.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl hover:scale-105 transition-all duration-300 border-l-4 border-blue-500">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-gray-800">{mascota.nombre}</h3>
                  <span className="px-4 py-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full text-sm font-semibold shadow-md">
                    {mascota.especie}
                  </span>
                </div>
                <div className="space-y-3 text-gray-700">
                  <p className="flex items-center"><span className="font-semibold text-blue-600 mr-2">🏷️ Raza:</span> {mascota.raza || 'No especificado'}</p>
                  <p className="flex items-center"><span className="font-semibold text-green-600 mr-2">📅 Edad:</span> {mascota.edad} años</p>
                  {mascota.descripcion && (
                    <p className="text-sm italic text-gray-600 bg-gray-50 p-3 rounded-lg border-l-2 border-gray-300">{mascota.descripcion}</p>
                  )}
                  {mascota.fechaCreacion && (
                    <p className="text-xs text-gray-500 flex items-center">
                      <span className="mr-2">📆</span> Registrado: {new Date(mascota.fechaCreacion).toLocaleDateString('es-ES')}
                    </p>
                  )}
                </div>
                <div className="mt-5 pt-4 border-t border-gray-200">
                  <button className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-4 rounded-xl hover:from-green-600 hover:to-green-700 transition-all shadow-md hover:shadow-lg font-semibold text-sm">
                    📋 Ver Historial Médico
                  </button>
                </div>
              </div>
            ))}
          </div>

          {mascotas.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No se encontraron mascotas</p>
            </div>
          )}
        </div>
      )}

      {/* Vista de Usuarios */}
      {vistaActual === 'usuarios' && (
        <div>
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-green-500 to-green-600">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                    👤 Usuario
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                    📧 Email
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                    🎯 Rol
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                    🐾 Mascotas
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {usuarios.map((usuario) => (
                  <tr key={usuario.id} className="hover:bg-gradient-to-r hover:from-green-50 hover:to-blue-50 transition-all duration-200">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-gray-900">{usuario.nombre || 'Sin nombre'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">{usuario.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full shadow-sm ${
                        usuario.rol === 'ADMIN' ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white' :
                        usuario.rol === 'VETERINARIO' ? 'bg-gradient-to-r from-green-500 to-green-600 text-white' :
                        'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                      }`}>
                        {usuario.rol}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-semibold text-gray-700 bg-gray-100 px-3 py-1 rounded-full">
                        {usuario.cantidadMascotas} mascota(s)
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Vista de Estadísticas */}
      {vistaActual === 'estadisticas' && estadisticas && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-xl p-8 hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-semibold mb-2">Total Mascotas</p>
                <p className="text-5xl font-bold text-white">{estadisticas.totalMascotas}</p>
              </div>
              <div className="text-6xl opacity-80">🐾</div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-xl p-8 hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-semibold mb-2">Total Usuarios</p>
                <p className="text-5xl font-bold text-white">{estadisticas.totalUsuarios}</p>
              </div>
              <div className="text-6xl opacity-80">👥</div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-xl p-8 hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-semibold mb-2">Especies Registradas</p>
                <p className="text-5xl font-bold text-white">
                  {Object.keys(estadisticas.mascotasPorEspecie || {}).length}
                </p>
              </div>
              <div className="text-6xl opacity-80">📊</div>
            </div>
          </div>

          {/* Distribución por especie */}
          <div className="md:col-span-3 bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">📊 Mascotas por Especie</h3>
            <div className="space-y-4">
              {Object.entries(estadisticas.mascotasPorEspecie || {}).map(([especie, cantidad]) => (
                <div key={especie} className="flex items-center">
                  <div className="w-40 text-sm font-semibold text-gray-800">{especie}</div>
                  <div className="flex-1 bg-gray-200 rounded-full h-8 overflow-hidden shadow-inner">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-blue-600 h-full flex items-center justify-end pr-3 text-white text-sm font-bold shadow-md transition-all duration-500 hover:from-blue-600 hover:to-blue-700"
                      style={{ width: `${(cantidad / estadisticas.totalMascotas) * 100}%` }}
                    >
                      {cantidad}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
}

export default Veterinario;