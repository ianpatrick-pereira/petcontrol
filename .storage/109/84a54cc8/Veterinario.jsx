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
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Panel de Veterinario
        </h1>
        <p className="text-gray-600">
          Bienvenido, {user?.nombre || user?.email}
        </p>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* Navegación de pestañas */}
      <div className="mb-6 border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setVistaActual('mascotas')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              vistaActual === 'mascotas'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            🐾 Todas las Mascotas ({mascotas.length})
          </button>
          <button
            onClick={() => setVistaActual('usuarios')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              vistaActual === 'usuarios'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            👥 Dueños ({usuarios.length})
          </button>
          <button
            onClick={() => setVistaActual('estadisticas')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              vistaActual === 'estadisticas'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
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
          <div className="mb-6 bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-3">Buscar Mascotas</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Buscar por nombre..."
                value={busqueda.nombre}
                onChange={(e) => setBusqueda({ ...busqueda, nombre: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <input
                type="text"
                placeholder="Buscar por especie..."
                value={busqueda.especie}
                onChange={(e) => setBusqueda({ ...busqueda, especie: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="flex gap-2">
                <button
                  onClick={buscarMascotas}
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  🔍 Buscar
                </button>
                <button
                  onClick={limpiarBusqueda}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                >
                  Limpiar
                </button>
              </div>
            </div>
          </div>

          {/* Lista de Mascotas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mascotas.map((mascota) => (
              <div key={mascota.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-gray-800">{mascota.nombre}</h3>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {mascota.especie}
                  </span>
                </div>
                <div className="space-y-2 text-gray-600">
                  <p><strong>Raza:</strong> {mascota.raza}</p>
                  <p><strong>Edad:</strong> {mascota.edad} años</p>
                  <p><strong>Color:</strong> {mascota.color}</p>
                  <p><strong>Peso:</strong> {mascota.peso} kg</p>
                  <div className="pt-3 mt-3 border-t border-gray-200">
                    <p className="text-sm"><strong>Dueño:</strong> {mascota.usuarioNombre || mascota.usuarioEmail}</p>
                    <p className="text-sm text-gray-500">{mascota.usuarioEmail}</p>
                  </div>
                  <p className="text-sm text-gray-400">
                    Registrado: {new Date(mascota.fechaRegistro).toLocaleDateString()}
                  </p>
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
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Usuario
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rol
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Mascotas
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {usuarios.map((usuario) => (
                  <tr key={usuario.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{usuario.nombre || 'Sin nombre'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{usuario.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        usuario.rol === 'ADMIN' ? 'bg-purple-100 text-purple-800' :
                        usuario.rol === 'VETERINARIO' ? 'bg-green-100 text-green-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {usuario.rol}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {usuario.cantidadMascotas} mascota(s)
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
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Mascotas</p>
                <p className="text-3xl font-bold text-blue-600">{estadisticas.totalMascotas}</p>
              </div>
              <div className="text-4xl">🐾</div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Usuarios</p>
                <p className="text-3xl font-bold text-green-600">{estadisticas.totalUsuarios}</p>
              </div>
              <div className="text-4xl">👥</div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Especies Registradas</p>
                <p className="text-3xl font-bold text-purple-600">
                  {Object.keys(estadisticas.mascotasPorEspecie || {}).length}
                </p>
              </div>
              <div className="text-4xl">📊</div>
            </div>
          </div>

          {/* Distribución por especie */}
          <div className="md:col-span-3 bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Mascotas por Especie</h3>
            <div className="space-y-3">
              {Object.entries(estadisticas.mascotasPorEspecie || {}).map(([especie, cantidad]) => (
                <div key={especie} className="flex items-center">
                  <div className="w-32 text-sm font-medium text-gray-700">{especie}</div>
                  <div className="flex-1 bg-gray-200 rounded-full h-6 overflow-hidden">
                    <div
                      className="bg-blue-600 h-full flex items-center justify-end pr-2 text-white text-xs font-bold"
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
  );
}

export default Veterinario;