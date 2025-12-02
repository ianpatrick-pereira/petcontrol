import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import Header from './components/Header';
import Login from './pages/Login';
import MisMascotas from './pages/MisMascotas';
import Veterinario from './pages/Veterinario';
import Admin from './pages/Admin';

function ProtectedRoute({ children, allowedRoles }) {
  const { usuarioActual } = useApp();
  
  if (!usuarioActual) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(usuarioActual.rol)) {
    // Redirigir según el rol del usuario
    if (usuarioActual.rol === 'ADMIN') {
      return <Navigate to="/admin" replace />;
    } else if (usuarioActual.rol === 'VETERINARIO') {
      return <Navigate to="/veterinario" replace />;
    } else {
      return <Navigate to="/mascotas" replace />;
    }
  }

  return children;
}

function AppRoutes() {
  const { usuarioActual } = useApp();

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {usuarioActual && <Header />}
        <Routes>
          <Route 
            path="/login" 
            element={usuarioActual ? <Navigate to={
              usuarioActual.rol === 'ADMIN' ? '/admin' : 
              usuarioActual.rol === 'VETERINARIO' ? '/veterinario' : 
              '/mascotas'
            } replace /> : <Login />} 
          />
          
          <Route
            path="/mascotas"
            element={
              <ProtectedRoute allowedRoles={['CLIENTE', 'VETERINARIO', 'ADMIN']}>
                <MisMascotas />
              </ProtectedRoute>
            }
          />

          <Route
            path="/veterinario"
            element={
              <ProtectedRoute allowedRoles={['VETERINARIO', 'ADMIN']}>
                <Veterinario />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <Admin />
              </ProtectedRoute>
            }
          />

          <Route 
            path="/" 
            element={
              usuarioActual ? <Navigate to={
                usuarioActual.rol === 'ADMIN' ? '/admin' : 
                usuarioActual.rol === 'VETERINARIO' ? '/veterinario' : 
                '/mascotas'
              } replace /> : <Navigate to="/login" replace />
            } 
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

function App() {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
}

export default App;