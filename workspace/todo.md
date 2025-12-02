# PetControl - Integración Frontend-Backend

## Archivos Backend Creados ✅
1. ✅ pom.xml - Configuración Maven con dependencias
2. ✅ application.properties - Configuración de la aplicación
3. ✅ PetControlApplication.java - Clase principal
4. ✅ Modelos: Usuario.java, Mascota.java
5. ✅ Repositorios: UsuarioRepository.java, MascotaRepository.java
6. ✅ Seguridad: JwtUtil.java, JwtRequestFilter.java, CustomUserDetailsService.java
7. ✅ Configuración: SecurityConfig.java, CorsConfig.java, OpenApiConfig.java, DataInitializer.java
8. ✅ DTOs: LoginRequest, RegisterRequest, AuthResponse, MascotaRequest, MascotaResponse
9. ✅ Servicios: AuthService.java, MascotaService.java
10. ✅ Controladores: AuthController.java, MascotaController.java, AdminController.java
11. ✅ README.md del backend

## Archivos Frontend a Modificar
1. Crear servicio API (src/services/api.js) - Cliente HTTP para comunicación con backend
2. Crear servicio de autenticación (src/services/authService.js) - Gestión de JWT y sesiones
3. Modificar AppContext.jsx - Integrar servicios del backend
4. Modificar Login.jsx - Usar API REST para login/registro
5. Modificar MisMascotas.jsx - Usar API REST para CRUD de mascotas
6. Modificar Admin.jsx - Usar API REST para vista de administrador
7. Eliminar tiendaDB.js - Ya no se necesita base de datos local
8. Actualizar package.json - Agregar axios para peticiones HTTP

## Características Implementadas
- ✅ Backend Spring Boot con base de datos H2
- ✅ API REST con operaciones CRUD
- ✅ Autenticación JWT con roles
- ✅ Documentación Swagger
- ✅ Control de acceso basado en roles
- ⏳ Integración frontend-backend
- ⏳ Gestión de sesiones con JWT en frontend
- ⏳ Restricciones de acceso en componentes React