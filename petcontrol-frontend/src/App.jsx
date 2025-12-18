import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Sidebar from './components/layout/Sidebar';

// Auth pages
import Login from './components/auth/Login';
import Register from './components/auth/Register';

// Public pages
import Home from './pages/public/Home';
import About from './pages/public/About';

// Cliente pages
import MisMascotas from './pages/cliente/MisMascotas';
import MascotaDetalle from './pages/cliente/MascotaDetalle';

// Veterinario pages
import TodasMascotas from './pages/veterinario/TodasMascotas';
import MascotaInfo from './pages/veterinario/MascotaInfo';

// Admin pages
import Dashboard from './pages/admin/Dashboard';
import UsuariosLista from './pages/admin/UsuariosLista';
import UsuarioForm from './pages/admin/UsuarioForm';
import MascotasLista from './pages/admin/MascotasLista';
import MascotaForm from './pages/admin/MascotaForm';
import RecetasLista from './pages/admin/RecetasLista';
import VacunasLista from './pages/admin/VacunasLista';
import Perfil from './pages/admin/Perfil';

function App() {
  return (
    <AuthProvider>
      <div className="d-flex flex-column min-vh-100">
        <Routes>
          {/* Public routes with Navbar */}
          <Route path="/" element={
            <>
              <Navbar />
              <Home />
              <Footer />
            </>
          } />
          <Route path="/about" element={
            <>
              <Navbar />
              <About />
              <Footer />
            </>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Cliente routes */}
          <Route path="/cliente/*" element={
            <ProtectedRoute roles={['CLIENTE']}>
              <>
                <Navbar />
                <div className="container-fluid">
                  <div className="row">
                    <Sidebar />
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                      <Routes>
                        <Route path="mis-mascotas" element={<MisMascotas />} />
                        <Route path="mascota/:id" element={<MascotaDetalle />} />
                        <Route path="*" element={<Navigate to="/cliente/mis-mascotas" replace />} />
                      </Routes>
                    </main>
                  </div>
                </div>
              </>
            </ProtectedRoute>
          } />

          {/* Veterinario routes */}
          <Route path="/veterinario/*" element={
            <ProtectedRoute roles={['VETERINARIO']}>
              <>
                <Navbar />
                <div className="container-fluid">
                  <div className="row">
                    <Sidebar />
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                      <Routes>
                        <Route path="mascotas" element={<TodasMascotas />} />
                        <Route path="mascota/:id" element={<MascotaInfo />} />
                        <Route path="recetas" element={<RecetasLista />} />
                        <Route path="vacunas" element={<VacunasLista />} />
                        <Route path="*" element={<Navigate to="/veterinario/mascotas" replace />} />
                      </Routes>
                    </main>
                  </div>
                </div>
              </>
            </ProtectedRoute>
          } />

          {/* Admin routes */}
          <Route path="/admin/*" element={
            <ProtectedRoute roles={['ADMIN']}>
              <>
                <Navbar />
                <div className="container-fluid">
                  <div className="row">
                    <Sidebar />
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                      <Routes>
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="usuarios" element={<UsuariosLista />} />
                        <Route path="usuarios/nuevo" element={<UsuarioForm />} />
                        <Route path="usuarios/:id/editar" element={<UsuarioForm />} />
                        <Route path="mascotas" element={<MascotasLista />} />
                        <Route path="mascotas/nuevo" element={<MascotaForm />} />
                        <Route path="mascotas/:id/editar" element={<MascotaForm />} />
                        <Route path="recetas" element={<RecetasLista />} />
                        <Route path="vacunas" element={<VacunasLista />} />
                        <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
                      </Routes>
                    </main>
                  </div>
                </div>
              </>
            </ProtectedRoute>
          } />

          {/* Perfil route (accessible by all authenticated users) */}
          <Route path="/perfil" element={
            <ProtectedRoute roles={['ADMIN', 'VETERINARIO', 'CLIENTE']}>
              <>
                <Navbar />
                <div className="container-fluid">
                  <div className="row">
                    <Sidebar />
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                      <Perfil />
                    </main>
                  </div>
                </div>
              </>
            </ProtectedRoute>
          } />

          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;