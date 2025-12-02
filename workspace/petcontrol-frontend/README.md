# PetControl Frontend

Frontend desarrollado con React + Vite integrado con backend Spring Boot mediante API REST y autenticación JWT.

## Características

- ✅ Interfaz de usuario con React 18
- ✅ Enrutamiento con React Router
- ✅ Integración con API REST del backend
- ✅ Autenticación JWT con gestión de sesiones
- ✅ Control de acceso basado en roles (Usuario/Admin)
- ✅ Persistencia de sesión en localStorage
- ✅ Gestión completa de mascotas (CRUD)
- ✅ Estilos con Bootstrap 5

## Requisitos

- Node.js 16 o superior
- npm o pnpm
- Backend Spring Boot ejecutándose en http://localhost:8080

## Instalación

```bash
cd petcontrol-frontend
npm install
```

## Ejecución

```bash
npm run dev
```

La aplicación se ejecutará en `http://localhost:5173`

## Estructura del Proyecto

```
src/
├── assets/          # Recursos estáticos
├── context/         # Context API (AppContext)
├── pages/           # Componentes de páginas
│   ├── Login.jsx
│   ├── MisMascotas.jsx
│   └── Admin.jsx
├── router/          # Componentes de enrutamiento
│   └── RequiereSesion.jsx
├── services/        # Servicios de API
│   ├── api.js           # Cliente HTTP con axios
│   ├── authService.js   # Servicio de autenticación
│   └── mascotaService.js # Servicio de mascotas
├── App.jsx          # Componente principal
└── main.jsx         # Punto de entrada
```

## Servicios de API

### authService
- `login(email, password)` - Iniciar sesión
- `register(email, password, nombre)` - Registrar usuario
- `logout()` - Cerrar sesión
- `getUsuarioActual()` - Obtener usuario actual
- `isAuthenticated()` - Verificar autenticación
- `isAdmin()` - Verificar rol de administrador

### mascotaService
- `obtenerMisMascotas()` - Obtener mascotas del usuario
- `obtenerMascotaPorId(id)` - Obtener mascota por ID
- `crearMascota(mascota)` - Crear nueva mascota
- `actualizarMascota(id, mascota)` - Actualizar mascota
- `eliminarMascota(id)` - Eliminar mascota
- `obtenerTodasLasMascotas()` - Obtener todas las mascotas (solo admin)

## Gestión de Sesiones

El sistema implementa gestión de sesiones segura mediante:

1. **Token JWT**: Almacenado en localStorage tras login/registro
2. **Interceptor de Axios**: Agrega automáticamente el token a todas las peticiones
3. **Persistencia**: La sesión se mantiene incluso tras recargar la página
4. **Expiración**: Redirección automática al login cuando el token expira
5. **Logout**: Limpieza completa de tokens y datos de sesión

## Control de Acceso

### Rutas Protegidas
- `/mis-mascotas` - Requiere autenticación
- `/admin` - Requiere autenticación + rol ADMIN

### Componente RequiereSesion
Protege rutas verificando la autenticación del usuario y redirigiendo al login si es necesario.

### Restricciones en Componentes
- **MisMascotas**: Solo muestra y permite editar las mascotas del usuario autenticado
- **Admin**: Solo accesible para usuarios con rol ADMIN, muestra todas las mascotas del sistema

## Usuarios de Prueba

### Administrador
```
Email: admin@admin.cl
Password: admin.123
```

## Integración con Backend

El frontend se comunica con el backend mediante:

- **Base URL**: `http://localhost:8080/api`
- **Autenticación**: Bearer Token (JWT)
- **Headers**: `Authorization: Bearer {token}`

### Endpoints Utilizados

- `POST /auth/login` - Iniciar sesión
- `POST /auth/register` - Registrar usuario
- `GET /mascotas/mis-mascotas` - Obtener mascotas del usuario
- `POST /mascotas` - Crear mascota
- `PUT /mascotas/{id}` - Actualizar mascota
- `DELETE /mascotas/{id}` - Eliminar mascota
- `GET /admin/mascotas` - Obtener todas las mascotas (admin)

## Scripts Disponibles

- `npm run dev` - Inicia servidor de desarrollo
- `npm run build` - Construye para producción
- `npm run preview` - Previsualiza build de producción
- `npm run test` - Ejecuta tests con Karma

## Tecnologías Utilizadas

- React 18
- Vite
- React Router DOM
- Axios
- Bootstrap 5
- Chart.js (para gráficos)

## Notas Importantes

1. **Backend Requerido**: El frontend requiere que el backend esté ejecutándose en http://localhost:8080
2. **CORS**: El backend debe tener configurado CORS para permitir peticiones desde http://localhost:5173
3. **Token JWT**: Se almacena en localStorage y se envía automáticamente en todas las peticiones
4. **Sesión Persistente**: La sesión se mantiene incluso si se recarga la página