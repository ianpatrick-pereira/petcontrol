# Documentación de Integración Frontend-Backend
## PetControl - Sistema de Gestión de Mascotas

---

## 1. Arquitectura del Sistema

### 1.1 Componentes Principales

El sistema PetControl está compuesto por dos componentes principales que se comunican mediante API REST:

- **Backend**: Spring Boot 3.2 con base de datos H2
- **Frontend**: React 18 con Vite

```
┌─────────────────────┐         HTTP/REST          ┌─────────────────────┐
│                     │    ←─────────────────→     │                     │
│  Frontend (React)   │    JSON + JWT Token        │  Backend (Spring)   │
│  Puerto: 5173       │                            │  Puerto: 8080       │
│                     │                            │                     │
└─────────────────────┘                            └─────────────────────┘
         │                                                    │
         │                                                    │
    localStorage                                         Base de Datos
    (Token JWT)                                              (H2)
```

### 1.2 Flujo de Comunicación

1. Usuario realiza login/registro en el frontend
2. Frontend envía credenciales al backend vía POST
3. Backend valida y genera token JWT
4. Frontend almacena token en localStorage
5. Todas las peticiones subsecuentes incluyen el token en el header Authorization
6. Backend valida el token y procesa la petición
7. Backend retorna datos en formato JSON

---

## 2. Autenticación y Seguridad

### 2.1 Sistema de Autenticación JWT

#### Backend - Generación de Token

**Archivo**: `JwtUtil.java`

```java
public String generateToken(UserDetails userDetails, String rol) {
    Map<String, Object> claims = new HashMap<>();
    claims.put("rol", rol);
    return createToken(claims, userDetails.getUsername());
}

private String createToken(Map<String, Object> claims, String subject) {
    return Jwts.builder()
            .claims(claims)
            .subject(subject)
            .issuedAt(new Date(System.currentTimeMillis()))
            .expiration(new Date(System.currentTimeMillis() + expiration))
            .signWith(getSigningKey())
            .compact();
}
```

**Configuración**: `application.properties`
```properties
jwt.secret=5367566B59703373367639792F423F4528482B4D6251655468576D5A71347437
jwt.expiration=86400000  # 24 horas
```

#### Frontend - Almacenamiento y Uso del Token

**Archivo**: `authService.js`

```javascript
async login(email, password) {
    const response = await api.post('/auth/login', { email, password });
    const { token, email: userEmail, nombre, rol, id } = response.data;
    
    // Guardar token y datos del usuario
    localStorage.setItem('token', token);
    const usuario = { id, email: userEmail, nombre, rol };
    localStorage.setItem('usuarioActual', JSON.stringify(usuario));
    
    return usuario;
}
```

**Archivo**: `api.js` - Interceptor para agregar token

```javascript
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
```

### 2.2 Gestión de Roles

#### Backend - Definición de Roles

**Archivo**: `Usuario.java`

```java
public enum Rol {
    USUARIO,
    ADMIN
}
```

**Archivo**: `SecurityConfig.java`

```java
.authorizeHttpRequests(auth -> auth
    .requestMatchers("/auth/**", "/h2-console/**", "/swagger-ui/**").permitAll()
    .requestMatchers("/admin/**").hasRole("ADMIN")
    .anyRequest().authenticated()
)
```

#### Frontend - Verificación de Roles

**Archivo**: `authService.js`

```javascript
isAdmin() {
    const usuario = this.getUsuarioActual();
    return usuario && usuario.rol === 'ADMIN';
}
```

**Archivo**: `App.jsx` - Restricción de acceso

```javascript
<Route path="/admin" element={
  <RequiereSesion>
    {usuarioActual && usuarioActual.rol === 'ADMIN' 
      ? <Admin/> 
      : <div>Acceso denegado</div>}
  </RequiereSesion>
} />
```

---

## 3. Endpoints de la API REST

### 3.1 Autenticación

#### POST /api/auth/register
Registra un nuevo usuario en el sistema.

**Request Body**:
```json
{
  "email": "usuario@ejemplo.com",
  "password": "contraseña123",
  "nombre": "Nombre Usuario"
}
```

**Response** (200 OK):
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "email": "usuario@ejemplo.com",
  "nombre": "Nombre Usuario",
  "rol": "USUARIO",
  "id": 1
}
```

**Errores**:
- 400 Bad Request: Email ya registrado o datos inválidos

#### POST /api/auth/login
Autentica un usuario existente.

**Request Body**:
```json
{
  "email": "usuario@ejemplo.com",
  "password": "contraseña123"
}
```

**Response** (200 OK):
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "email": "usuario@ejemplo.com",
  "nombre": "Nombre Usuario",
  "rol": "USUARIO",
  "id": 1
}
```

**Errores**:
- 401 Unauthorized: Credenciales incorrectas

### 3.2 Gestión de Mascotas

#### GET /api/mascotas/mis-mascotas
Obtiene todas las mascotas del usuario autenticado.

**Headers**:
```
Authorization: Bearer {token}
```

**Response** (200 OK):
```json
[
  {
    "id": 1,
    "nombre": "Firulais",
    "especie": "Perro",
    "raza": "Labrador",
    "edad": 3,
    "descripcion": "Perro muy juguetón",
    "imagen": "https://ejemplo.com/imagen.jpg",
    "usuarioId": 1,
    "fechaCreacion": "2024-11-27T10:00:00",
    "fechaActualizacion": "2024-11-27T10:00:00"
  }
]
```

#### POST /api/mascotas
Crea una nueva mascota.

**Headers**:
```
Authorization: Bearer {token}
```

**Request Body**:
```json
{
  "nombre": "Michi",
  "especie": "Gato",
  "raza": "Siamés",
  "edad": 2,
  "descripcion": "Gato muy tranquilo",
  "imagen": "https://ejemplo.com/gato.jpg"
}
```

**Response** (201 Created):
```json
{
  "id": 2,
  "nombre": "Michi",
  "especie": "Gato",
  "raza": "Siamés",
  "edad": 2,
  "descripcion": "Gato muy tranquilo",
  "imagen": "https://ejemplo.com/gato.jpg",
  "usuarioId": 1,
  "fechaCreacion": "2024-11-27T11:00:00",
  "fechaActualizacion": "2024-11-27T11:00:00"
}
```

#### PUT /api/mascotas/{id}
Actualiza una mascota existente.

**Headers**:
```
Authorization: Bearer {token}
```

**Request Body**:
```json
{
  "nombre": "Michi Actualizado",
  "especie": "Gato",
  "raza": "Siamés",
  "edad": 3,
  "descripcion": "Descripción actualizada",
  "imagen": "https://ejemplo.com/gato-nuevo.jpg"
}
```

**Response** (200 OK): Mismo formato que POST

**Errores**:
- 403 Forbidden: No tienes permiso para editar esta mascota
- 404 Not Found: Mascota no encontrada

#### DELETE /api/mascotas/{id}
Elimina una mascota.

**Headers**:
```
Authorization: Bearer {token}
```

**Response** (204 No Content)

**Errores**:
- 403 Forbidden: No tienes permiso para eliminar esta mascota

### 3.3 Administración (Solo ADMIN)

#### GET /api/admin/mascotas
Obtiene todas las mascotas del sistema.

**Headers**:
```
Authorization: Bearer {token}
```

**Response** (200 OK): Array de todas las mascotas

**Errores**:
- 403 Forbidden: No tienes permisos de administrador

---

## 4. Gestión de Sesiones

### 4.1 Persistencia de Sesión

#### Backend
- El backend NO mantiene sesiones (stateless)
- Cada petición debe incluir el token JWT
- El token se valida en cada request mediante `JwtRequestFilter`

#### Frontend
- Token almacenado en `localStorage` con clave `token`
- Datos del usuario almacenados en `localStorage` con clave `usuarioActual`
- La sesión persiste incluso tras recargar la página

**Archivo**: `AppContext.jsx`

```javascript
useEffect(() => {
    const usuario = authService.getUsuarioActual();
    if (usuario) {
      setUsuarioActual(usuario);
    }
}, []);
```

### 4.2 Renovación y Expiración

#### Expiración del Token
- Duración: 24 horas (configurable en `application.properties`)
- Al expirar, el backend retorna 401 Unauthorized
- El frontend detecta el 401 y redirige al login

**Archivo**: `api.js` - Interceptor de respuestas

```javascript
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('usuarioActual');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
```

### 4.3 Cierre de Sesión

**Frontend**: `authService.js`

```javascript
logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuarioActual');
}
```

**Uso en componente**:

```javascript
const { logout } = useApp();

const handleLogout = () => {
    logout();
    navigate('/login');
};
```

---

## 5. Control de Acceso en Frontend

### 5.1 Protección de Rutas

**Archivo**: `RequiereSesion.jsx`

```javascript
export default function RequiereSesion({ children }) {
  const { usuarioActual } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    if (!usuarioActual) {
      navigate('/login');
    }
  }, [usuarioActual, navigate]);

  if (!usuarioActual) {
    return null;
  }

  return children;
}
```

**Uso en App.jsx**:

```javascript
<Route path="/mis-mascotas" element={
  <RequiereSesion><MisMascotas/></RequiereSesion>
} />

<Route path="/admin" element={
  <RequiereSesion>
    {usuarioActual && usuarioActual.rol === 'ADMIN' 
      ? <Admin/> 
      : <div>Acceso denegado</div>}
  </RequiereSesion>
} />
```

### 5.2 Restricciones por Rol

#### Ejemplo: Panel de Administración

**Archivo**: `Admin.jsx`

```javascript
const { obtenerTodasLasMascotas, isAdmin } = useApp();

useEffect(() => {
    if (!isAdmin()) {
      setError('No tienes permisos de administrador');
      return;
    }
    cargarMascotas();
}, []);
```

#### Ejemplo: Navegación Condicional

**Archivo**: `App.jsx`

```javascript
<nav className="navbar">
  <Link to="/mis-mascotas">Mis Mascotas</Link>
  {usuarioActual?.rol === 'ADMIN' && (
    <Link to="/admin">Administrador</Link>
  )}
</nav>
```

---

## 6. Configuración CORS

### Backend

**Archivo**: `CorsConfig.java`

```java
@Bean
public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration configuration = new CorsConfiguration();
    configuration.setAllowedOrigins(Arrays.asList("http://localhost:5173"));
    configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
    configuration.setAllowedHeaders(Arrays.asList("*"));
    configuration.setExposedHeaders(Arrays.asList("Authorization"));
    configuration.setAllowCredentials(true);
    configuration.setMaxAge(3600L);
    
    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", configuration);
    return source;
}
```

---

## 7. Manejo de Errores

### 7.1 Backend

Los errores se manejan mediante códigos HTTP estándar:

- **200 OK**: Operación exitosa
- **201 Created**: Recurso creado exitosamente
- **204 No Content**: Eliminación exitosa
- **400 Bad Request**: Datos inválidos
- **401 Unauthorized**: No autenticado o token inválido
- **403 Forbidden**: No autorizado (sin permisos)
- **404 Not Found**: Recurso no encontrado

### 7.2 Frontend

**Manejo de errores en servicios**:

```javascript
async crearMascota(mascota) {
    try {
      const response = await api.post('/mascotas', mascota);
      return response.data;
    } catch (error) {
      console.error('Error al crear mascota:', error);
      throw error;
    }
}
```

**Manejo de errores en componentes**:

```javascript
const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await agregarMascota(formulario);
      await cargarMascotas();
    } catch (error) {
      alert('Error al guardar la mascota');
    }
};
```

---

## 8. Documentación Swagger

El backend incluye documentación interactiva de la API mediante Swagger/OpenAPI.

**URL**: http://localhost:8080/api/swagger-ui.html

### Características:
- Listado de todos los endpoints
- Descripción de parámetros y respuestas
- Posibilidad de probar endpoints directamente
- Autenticación JWT integrada

---

## 9. Instrucciones de Despliegue

### 9.1 Backend

```bash
cd petcontrol-backend
mvn clean install
mvn spring-boot:run
```

El backend estará disponible en: http://localhost:8080/api

### 9.2 Frontend

```bash
cd petcontrol-frontend
npm install
npm run dev
```

El frontend estará disponible en: http://localhost:5173

### 9.3 Orden de Inicio

1. **Primero**: Iniciar el backend
2. **Segundo**: Iniciar el frontend
3. **Verificar**: Que el backend esté respondiendo en http://localhost:8080/api

---

## 10. Credenciales de Prueba

### Usuario Administrador
```
Email: admin@admin.cl
Password: admin.123
Rol: ADMIN
```

### Crear Usuario Normal
Usar el formulario de registro en el frontend o el endpoint `/api/auth/register`

---

## 11. Flujo Completo de Uso

### Registro de Usuario

1. Usuario accede a `/login`
2. Selecciona "Regístrate aquí"
3. Ingresa email y contraseña
4. Frontend envía POST a `/api/auth/register`
5. Backend crea usuario con rol USUARIO
6. Backend genera token JWT
7. Frontend almacena token y datos en localStorage
8. Usuario es redirigido a `/mis-mascotas`

### Login de Usuario

1. Usuario accede a `/login`
2. Ingresa email y contraseña
3. Frontend envía POST a `/api/auth/login`
4. Backend valida credenciales
5. Backend genera token JWT
6. Frontend almacena token y datos en localStorage
7. Usuario es redirigido según su rol:
   - USUARIO → `/mis-mascotas`
   - ADMIN → `/admin`

### Gestión de Mascotas

1. Usuario autenticado accede a `/mis-mascotas`
2. Frontend envía GET a `/api/mascotas/mis-mascotas` con token
3. Backend valida token y retorna mascotas del usuario
4. Usuario puede:
   - **Crear**: Completa formulario → POST `/api/mascotas`
   - **Editar**: Click en "Editar" → PUT `/api/mascotas/{id}`
   - **Eliminar**: Click en "Eliminar" → DELETE `/api/mascotas/{id}`

### Panel de Administración

1. Usuario ADMIN accede a `/admin`
2. Frontend verifica rol en componente
3. Frontend envía GET a `/api/admin/mascotas` con token
4. Backend valida rol ADMIN
5. Backend retorna todas las mascotas del sistema
6. Admin visualiza estadísticas y listado completo

---

## 12. Seguridad Implementada

### 12.1 Backend
- ✅ Contraseñas encriptadas con BCrypt
- ✅ Tokens JWT firmados con clave secreta
- ✅ Validación de tokens en cada petición
- ✅ Control de acceso basado en roles
- ✅ CORS configurado para orígenes permitidos
- ✅ Sesiones stateless (sin estado en servidor)

### 12.2 Frontend
- ✅ Token almacenado en localStorage (no en cookies)
- ✅ Token enviado en header Authorization
- ✅ Redirección automática al login si token expira
- ✅ Protección de rutas con RequiereSesion
- ✅ Verificación de roles en componentes
- ✅ Limpieza de datos al cerrar sesión

---

## 13. Conclusión

Este sistema implementa una arquitectura moderna de aplicación web con:

- **Separación clara** entre frontend y backend
- **Comunicación segura** mediante API REST y JWT
- **Gestión de sesiones** persistente y segura
- **Control de acceso** granular basado en roles
- **Documentación completa** de la API
- **Manejo robusto de errores**

La integración entre ambos componentes garantiza una experiencia de usuario fluida y segura, cumpliendo con todos los requisitos de la evaluación.