import { useState, useEffect } from 'react';
import { mascotaService } from '../services/mascotaService';
import { recetaService } from '../services/recetaService';
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
  const [showRecetaModal, setShowRecetaModal] = useState(false);
  const [mascotaSeleccionada, setMascotaSeleccionada] = useState(null);
  const [recetaForm, setRecetaForm] = useState({
    diagnostico: '',
    medicamentos: '',
    dosificacion: '',
    indicaciones: '',
    diasTratamiento: ''
  });

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

  const abrirModalReceta = (mascota) => {
    setMascotaSeleccionada(mascota);
    setRecetaForm({
      diagnostico: '',
      medicamentos: '',
      dosificacion: '',
      indicaciones: '',
      diasTratamiento: ''
    });
    setShowRecetaModal(true);
  };

  const handleCrearReceta = async () => {
    try {
      if (!recetaForm.diagnostico || !recetaForm.medicamentos || !recetaForm.dosificacion) {
        alert('Por favor completa los campos obligatorios: diagnóstico, medicamentos y dosificación');
        return;
      }

      const recetaData = {
        mascotaId: mascotaSeleccionada.id,
        diagnostico: recetaForm.diagnostico,
        medicamentos: recetaForm.medicamentos,
        dosificacion: recetaForm.dosificacion,
        indicaciones: recetaForm.indicaciones,
        diasTratamiento: recetaForm.diasTratamiento ? parseInt(recetaForm.diasTratamiento) : null
      };

      await recetaService.createReceta(recetaData);
      setShowRecetaModal(false);
      setMascotaSeleccionada(null);
      alert('✅ Receta médica creada exitosamente');
    } catch (err) {
      console.error('Error creando receta:', err);
      alert('❌ Error al crear la receta médica');
    }
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
              <div key={mascota.id} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden group">
                <div className="bg-gradient-to-br from-blue-50 to-green-50 p-6 border-b-4 border-blue-500">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold text-gray-800">{mascota.nombre}</h3>
                    <span className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full text-sm font-bold shadow-md">
                      {mascota.especie}
                    </span>
                  </div>
                </div>
                
                <div className="p-6 space-y-3 bg-white">
                  <div className="flex items-center gap-3 text-gray-700">
                    <span className="text-2xl">🏷️</span>
                    <div>
                      <p className="text-xs text-gray-500 font-semibold">Raza</p>
                      <p className="font-semibold">{mascota.raza || 'No especificado'}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 text-gray-700">
                    <span className="text-2xl">📅</span>
                    <div>
                      <p className="text-xs text-gray-500 font-semibold">Edad</p>
                      <p className="font-semibold">{mascota.edad} años</p>
                    </div>
                  </div>
                  
                  {mascota.descripcion && (
                    <div className="mt-4 p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border-l-4 border-blue-400">
                      <p className="text-sm text-gray-700 italic leading-relaxed">{mascota.descripcion}</p>
                    </div>
                  )}
                  
                  {mascota.fechaCreacion && (
                    <div className="flex items-center gap-2 text-xs text-gray-500 pt-3 border-t border-gray-100">
                      <span>📆</span>
                      <span>Registrado: {new Date(mascota.fechaCreacion).toLocaleDateString('es-ES', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}</span>
                    </div>
                  )}
                </div>

                <div className="p-6 bg-gradient-to-br from-gray-50 to-white border-t border-gray-100">
                  <button 
                    onClick={() => abrirModalReceta(mascota)}
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 px-6 rounded-2xl hover:from-green-600 hover:to-green-700 transition-all shadow-lg hover:shadow-xl font-bold text-base flex items-center justify-center gap-3 group-hover:scale-105 transform duration-300"
                  >
                    <span className="text-2xl">💊</span>
                    Crear Receta Médica
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

      {/* Modal de Crear Receta Médica - Profesional */}
      {showRecetaModal && mascotaSeleccionada && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[95vh] overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-green-500 px-8 py-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-1 flex items-center gap-3">
                    <span className="text-4xl">💊</span>
                    Nueva Receta Médica
                  </h2>
                  <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg px-4 py-2 mt-3 inline-block">
                    <p className="text-white text-sm">
                      <span className="font-semibold">Paciente:</span> {mascotaSeleccionada.nombre} 
                      <span className="mx-2">•</span>
                      <span className="font-semibold">Especie:</span> {mascotaSeleccionada.especie}
                      {mascotaSeleccionada.raza && (
                        <>
                          <span className="mx-2">•</span>
                          <span className="font-semibold">Raza:</span> {mascotaSeleccionada.raza}
                        </>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Body */}
            <div className="px-8 py-6 overflow-y-auto max-h-[calc(95vh-200px)]">
              <div className="space-y-5">
                {/* Diagnóstico */}
                <div className="group">
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                    <span className="bg-red-100 text-red-600 w-8 h-8 rounded-full flex items-center justify-center text-lg">🔬</span>
                    Diagnóstico Médico
                    <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={recetaForm.diagnostico}
                    onChange={(e) => setRecetaForm({ ...recetaForm, diagnostico: e.target.value })}
                    rows="3"
                    placeholder="Describe el diagnóstico del paciente..."
                    className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-500 transition-all resize-none bg-gray-50 focus:bg-white"
                    required
                  />
                </div>

                {/* Medicamentos */}
                <div className="group">
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                    <span className="bg-green-100 text-green-600 w-8 h-8 rounded-full flex items-center justify-center text-lg">💊</span>
                    Medicamentos Prescritos
                    <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={recetaForm.medicamentos}
                    onChange={(e) => setRecetaForm({ ...recetaForm, medicamentos: e.target.value })}
                    rows="4"
                    placeholder="Ej: &#10;• Amoxicilina 500mg&#10;• Antiinflamatorio&#10;• Protector gástrico"
                    className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-green-300 focus:border-green-500 transition-all resize-none bg-gray-50 focus:bg-white font-mono text-sm"
                    required
                  />
                </div>

                {/* Dosificación */}
                <div className="group">
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                    <span className="bg-blue-100 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center text-lg">⏰</span>
                    Dosificación y Frecuencia
                    <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={recetaForm.dosificacion}
                    onChange={(e) => setRecetaForm({ ...recetaForm, dosificacion: e.target.value })}
                    rows="3"
                    placeholder="Ej: 1 comprimido cada 12 horas con alimento"
                    className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-500 transition-all resize-none bg-gray-50 focus:bg-white"
                    required
                  />
                </div>

                {/* Indicaciones */}
                <div className="group">
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                    <span className="bg-yellow-100 text-yellow-600 w-8 h-8 rounded-full flex items-center justify-center text-lg">📋</span>
                    Indicaciones Especiales
                    <span className="text-gray-400 text-xs ml-1">(Opcional)</span>
                  </label>
                  <textarea
                    value={recetaForm.indicaciones}
                    onChange={(e) => setRecetaForm({ ...recetaForm, indicaciones: e.target.value })}
                    rows="3"
                    placeholder="Instrucciones adicionales para el propietario..."
                    className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-yellow-300 focus:border-yellow-500 transition-all resize-none bg-gray-50 focus:bg-white"
                  />
                </div>

                {/* Días de Tratamiento */}
                <div className="group">
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                    <span className="bg-purple-100 text-purple-600 w-8 h-8 rounded-full flex items-center justify-center text-lg">📅</span>
                    Duración del Tratamiento
                    <span className="text-gray-400 text-xs ml-1">(Opcional)</span>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={recetaForm.diasTratamiento}
                      onChange={(e) => setRecetaForm({ ...recetaForm, diasTratamiento: e.target.value })}
                      placeholder="7"
                      min="1"
                      max="365"
                      className="w-full px-5 py-4 pr-16 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all bg-gray-50 focus:bg-white text-lg font-semibold"
                    />
                    <span className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">días</span>
                  </div>
                </div>
              </div>

              {/* Nota informativa */}
              <div className="mt-6 bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-xl">
                <p className="text-sm text-blue-800">
                  <span className="font-bold">💡 Nota:</span> Los campos marcados con <span className="text-red-500 font-bold">*</span> son obligatorios. 
                  La receta será visible para el propietario de la mascota.
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-gray-50 px-8 py-5 flex gap-4 border-t border-gray-200">
              <button
                onClick={handleCrearReceta}
                className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-2xl font-bold hover:from-green-600 hover:to-green-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 text-lg"
              >
                <span className="text-2xl">✅</span>
                Crear Receta Médica
              </button>
              <button
                onClick={() => {
                  setShowRecetaModal(false);
                  setMascotaSeleccionada(null);
                }}
                className="px-8 py-4 bg-white border-2 border-gray-300 hover:border-gray-400 text-gray-700 rounded-2xl font-bold transition-all hover:bg-gray-100 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 text-lg"
              >
                <span className="text-2xl">❌</span>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Veterinario;