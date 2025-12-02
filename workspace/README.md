# PetControl - Sistema de Gestión de Mascotas
## Proyecto Full Stack con Spring Boot + React

---

## 📋 Descripción del Proyecto

PetControl es un sistema web completo para la gestión de mascotas que implementa:

- ✅ Backend API REST con Spring Boot
- ✅ Frontend SPA con React + Vite
- ✅ Autenticación JWT con roles (Usuario/Admin)
- ✅ Base de datos H2 en memoria
- ✅ Operaciones CRUD completas
- ✅ Documentación Swagger/OpenAPI
- ✅ Control de acceso basado en roles
- ✅ Gestión de sesiones persistente

---

## 🏗️ Arquitectura del Sistema

```
┌─────────────────────────────────────────────────────────────┐
│                     PETCONTROL SYSTEM                        │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────────┐         ┌──────────────────┐         │
│  │   FRONTEND       │         │    BACKEND       │         │
│  │   React + Vite   │ ◄─────► │  Spring Boot     │         │
│  │   Port: 5173     │  REST   │  Port: 8080      │         │
│  │                  │  + JWT  │                  │         │
│  └──────────────────┘         └──────────────────┘         │
│         │                              │                    │
│         │                              │                    │
│    localStorage                   H2 Database               │
│    (JWT Token)                   (In-Memory)                │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 📁 Estructura del Proyecto

```
petcontrol/
├── petcontrol-backend/          # Backend Spring Boot
│   ├── src/
│   │   └── main/
│   │       ├── java/com/petcontrol/
│   │       │   ├── config/      # Configuraciones (Security, CORS, OpenAPI)
│   │       │   ├── controller/  # Controladores REST
│   │       │   ├── dto/         # Data Transfer Objects
│   │       │   ├── model/       # Entidades JPA
│   │       │   ├── repository/  # Repositorios JPA
│   │       │   ├── security/    # JWT y seguridad
│   │       │   └── service/     # Lógica de negocio
│   │       └── resources/
│   │           └── application.properties
│   ├── pom.xml
│   └── README.md
│
├── petcontrol-frontend/         # Frontend React
│   ├── src/
│   │   ├── assets/             # Recursos estáticos
│   │   ├── context/            # Context API
│   │   ├── pages/              # Componentes de páginas
│   │   ├── router/             # Protección de rutas
│   │   ├── services/           # Servicios de API
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── README.md
│
├── DOCUMENTACION_INTEGRACION.md # Documentación técnica completa
├── MANUAL_USUARIO.md            # Manual de usuario con capturas
└── README.md                    # Este archivo
```

---

## 🚀 Instalación y Ejecución

### Requisitos Previos

- **Java 17+** (para el backend)
- **Maven 3.6+** (para el backend)
- **Node.js 16+** (para el frontend)
- **npm o pnpm** (para el frontend)

### 1. Clonar el Repositorio

```bash
git clone <url-del-repositorio>
cd petcontrol
```

### 2. Ejecutar el Backend

```bash
cd petcontrol-backend
mvn clean install
mvn spring-boot:run
```

El backend estará disponible en: **http://localhost:8080/api**

### 3. Ejecutar el Frontend

En otra terminal:

```bash
cd petcontrol-frontend
npm install
npm run dev
```

El frontend estará disponible en: **http://localhost:5173**

### 4. Acceder al Sistema

Abre tu navegador en: **http://localhost:5173**

---

## 👤 Credenciales de Acceso

### Usuario Administrador
```
Email: admin@admin.cl
Password: admin.123
Rol: ADMIN
```

### Crear Usuario Regular
Usa el formulario de registro en la aplicación o el endpoint `/api/auth/register`

---

## 📚 Documentación

### Documentación de la API (Swagger)

Una vez iniciado el backend, accede a:

**http://localhost:8080/api/swagger-ui.html**

### Consola H2 (Base de Datos)

**http://localhost:8080/api/h2-console**

Credenciales:
- JDBC URL: `jdbc:h2:mem:petcontroldb`
- Username: `sa`
- Password: (dejar vacío)

### Documentación Técnica Completa

- **[DOCUMENTACION_INTEGRACION.md](./DOCUMENTACION_INTEGRACION.md)**: Documentación técnica detallada de la integración frontend-backend
- **[MANUAL_USUARIO.md](./MANUAL_USUARIO.md)**: Manual de usuario con instrucciones paso a paso

---

## 🔑 Endpoints Principales

### Autenticación
- `POST /api/auth/register` - Registrar nuevo usuario
- `POST /api/auth/login` - Iniciar sesión

### Mascotas (requiere autenticación)
- `GET /api/mascotas/mis-mascotas` - Obtener mascotas del usuario
- `GET /api/mascotas/{id}` - Obtener mascota por ID
- `POST /api/mascotas` - Crear nueva mascota
- `PUT /api/mascotas/{id}` - Actualizar mascota
- `DELETE /api/mascotas/{id}` - Eliminar mascota

### Administración (requiere rol ADMIN)
- `GET /api/admin/mascotas` - Obtener todas las mascotas del sistema

---

## 🔒 Seguridad Implementada

### Backend
- ✅ Contraseñas encriptadas con BCrypt
- ✅ Autenticación JWT (JSON Web Tokens)
- ✅ Tokens firmados con clave secreta
- ✅ Validación de tokens en cada petición
- ✅ Control de acceso basado en roles
- ✅ CORS configurado
- ✅ Sesiones stateless

### Frontend
- ✅ Token almacenado en localStorage
- ✅ Interceptor de axios para agregar token automáticamente
- ✅ Redirección automática al login si token expira
- ✅ Protección de rutas con RequiereSesion
- ✅ Verificación de roles en componentes
- ✅ Gestión segura de sesiones

---

## 🛠️ Tecnologías Utilizadas

### Backend
- Spring Boot 3.2
- Spring Security
- Spring Data JPA
- H2 Database
- JWT (jjwt 0.12.3)
- Lombok
- Springdoc OpenAPI (Swagger)
- Maven

### Frontend
- React 18
- Vite
- React Router DOM
- Axios
- Bootstrap 5
- Chart.js

---

## 📊 Funcionalidades Implementadas

### Para Usuarios Regulares
- ✅ Registro de cuenta
- ✅ Inicio de sesión
- ✅ Gestión de mascotas propias (CRUD completo)
- ✅ Visualización de mascotas con imágenes
- ✅ Sesión persistente
- ✅ Cierre de sesión seguro

### Para Administradores
- ✅ Todas las funcionalidades de usuario regular
- ✅ Visualización de todas las mascotas del sistema
- ✅ Estadísticas del sistema
- ✅ Panel de administración dedicado

---

## 🎯 Características Destacadas

1. **Autenticación JWT Completa**
   - Registro e inicio de sesión
   - Tokens con expiración de 24 horas
   - Renovación automática en cada petición

2. **Gestión de Sesiones Persistente**
   - Sesión se mantiene tras recargar página
   - Almacenamiento seguro en localStorage
   - Limpieza automática al cerrar sesión

3. **Control de Acceso Granular**
   - Rutas protegidas por autenticación
   - Restricciones basadas en roles
   - Validación en backend y frontend

4. **API REST Documentada**
   - Swagger UI interactivo
   - Documentación OpenAPI
   - Ejemplos de peticiones y respuestas

5. **Interfaz Responsive**
   - Compatible con desktop, tablet y móvil
   - Bootstrap 5 para estilos
   - Experiencia de usuario fluida

---

## 🧪 Pruebas

### Probar el Backend

```bash
cd petcontrol-backend
mvn test
```

### Probar el Frontend

```bash
cd petcontrol-frontend
npm run test
```

---

## 📦 Build para Producción

### Backend

```bash
cd petcontrol-backend
mvn clean package
java -jar target/petcontrol-backend-1.0.0.jar
```

### Frontend

```bash
cd petcontrol-frontend
npm run build
```

Los archivos de producción estarán en `petcontrol-frontend/dist/`

---

## 🐛 Solución de Problemas

### El backend no inicia

1. Verifica que tienes Java 17+ instalado: `java -version`
2. Verifica que el puerto 8080 esté disponible
3. Revisa los logs en la consola

### El frontend no se conecta al backend

1. Verifica que el backend esté ejecutándose en http://localhost:8080
2. Verifica la configuración de CORS en el backend
3. Abre las herramientas de desarrollador del navegador (F12) y revisa la consola

### Error 401 Unauthorized

1. Tu token JWT expiró (24 horas de validez)
2. Cierra sesión y vuelve a iniciar
3. Verifica que el token se esté enviando correctamente en el header Authorization

### No puedo acceder al panel de administración

1. Verifica que hayas iniciado sesión con credenciales de administrador
2. Email: admin@admin.cl, Password: admin.123
3. Asegúrate de haber seleccionado "Administrador" antes de iniciar sesión

---

## 📝 Evaluación Cumplida

Este proyecto cumple con todos los requisitos de la **Evaluación Parcial N° 3 - DSY1104**:

### Situación Evaluativa 1: Entrega por Encargo (40%)

✅ **IE3.1.1**: Backend con conexión a base de datos, lógica de negocio y modelos de datos  
✅ **IE3.2.1**: API REST con Spring Boot, endpoints CRUD documentados en Swagger  
✅ **IE3.2.2**: Integración backend-frontend mediante API REST  
✅ **IE3.3.1**: Autenticación JWT con roles en el backend  
✅ **IE3.3.2**: Sistema de gestión de sesiones en el frontend  
✅ **IE3.3.3**: Restricciones de acceso en el frontend basadas en roles  

### Situación Evaluativa 2: Presentación (60%)

✅ **IE3.1.2**: Descripción del desarrollo del backend  
✅ **IE3.2.3**: Explicación de la implementación de API REST  
✅ **IE3.2.4**: Justificación de la integración frontend-backend  
✅ **IE3.3.4**: Descripción de la autenticación JWT  
✅ **IE3.3.5**: Exposición del sistema de gestión de sesiones  
✅ **IE3.3.6**: Explicación de restricciones de acceso  

### Entregables

✅ Enlace GitHub público del proyecto frontend  
✅ Enlace GitHub público del proyecto backend  
✅ Proyecto frontend comprimido  
✅ Proyecto backend comprimido  
✅ Manual de usuario (MANUAL_USUARIO.md)  
✅ Documento de integración (DOCUMENTACION_INTEGRACION.md)  

---

## 👥 Equipo de Desarrollo

- **Desarrollador Full Stack**: [Tu Nombre]
- **Asignatura**: DSY1104 - Desarrollo Fullstack II
- **Institución**: [Tu Institución]
- **Fecha**: Noviembre 2024

---

## 📄 Licencia

Este proyecto fue desarrollado con fines educativos para la evaluación DSY1104.

---

## 📞 Contacto

Para consultas o soporte:
- Email: admin@admin.cl
- Documentación: Ver archivos DOCUMENTACION_INTEGRACION.md y MANUAL_USUARIO.md

---

**¡Gracias por usar PetControl!** 🐾