# 🐾 PetControl - Sistema de Gestión Veterinaria

[![Java](https://img.shields.io/badge/Java-22-orange.svg)](https://www.oracle.com/java/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2.0-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org/)
[![MySQL](https://img.shields.io/badge/MySQL-5.5-blue.svg)](https://www.mysql.com/)

Sistema completo de gestión veterinaria con roles diferenciados (Admin, Veterinario, Cliente), desarrollado con Spring Boot + React.

## 🚀 Características Principales

### 👨‍💼 Administrador
- ✅ **Gestión de mascotas**: Editar datos de cualquier mascota del sistema
- ✅ **Gestión de usuarios**: Eliminar perfiles de clientes
- ✅ **Vista completa**: Acceso a todos los registros del sistema
- ✅ **Panel moderno**: Interfaz con tabs, modales y confirmaciones

### 👨‍⚕️ Veterinario
- ✅ **Recetas médicas**: Crear recetas para vacunas con datos completos
  - Diagnóstico, medicamentos, dosificación
  - Indicaciones especiales y días de tratamiento
  - Modal profesional con diseño premium
- ✅ **Gestión de vacunas**: CRUD completo de vacunas
- ✅ **Vista de mascotas**: Acceso a todas las mascotas registradas
- ✅ **Historial médico**: Consultar recetas por mascota

### 👤 Cliente
- ✅ **Mis mascotas**: Gestión completa de sus propias mascotas
- ✅ **Ver recetas**: Acceso a recetas médicas de sus mascotas
- ✅ **Interfaz intuitiva**: Secciones expandibles y diseño amigable
- ✅ **Seguridad**: Solo ve información de sus propias mascotas

## 🛠️ Tecnologías

### Backend
- **Java 22**
- **Spring Boot 3.2.0**
- **Spring Security** con JWT
- **Spring Data JPA**
- **MySQL 5.5**
- **Swagger/OpenAPI** para documentación
- **Maven 3.9.11**

### Frontend
- **React 18**
- **Vite 7.1.10**
- **Tailwind CSS**
- **Context API** para estado global
- **Axios** para peticiones HTTP
- **React Router DOM**

## 📋 Requisitos Previos

- Java JDK 22 o superior
- Maven 3.9+
- Node.js 18+ y npm
- MySQL 5.5+ (o XAMPP)
- Git (opcional)

## 🔧 Instalación

### 1. Clonar repositorio

```bash
git clone https://github.com/TU_USUARIO/petcontrol.git
cd petcontrol
```

### 2. Configurar Base de Datos

```bash
# Crear base de datos
mysql -u root -p
CREATE DATABASE petcontrol_db;
USE petcontrol_db;

# Importar datos iniciales
source database_backup.sql;
```

### 3. Configurar Backend

```bash
cd workspace/petcontrol-backend

# Editar application.properties si es necesario
# (usuario/contraseña de MySQL)

# Compilar y ejecutar
mvn clean install
mvn spring-boot:run
```

El backend estará disponible en: `http://localhost:8080`

### 4. Configurar Frontend

```bash
cd workspace/petcontrol-frontend

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev
```

El frontend estará disponible en: `http://localhost:5173`

## 👥 Usuarios de Prueba

| Rol | Email | Contraseña | Permisos |
|-----|-------|------------|----------|
| Admin | admin@admin.cl | admin123 | Editar mascotas, eliminar clientes |
| Veterinario | veterinario@petcontrol.cl | vet123 | Crear recetas, gestionar vacunas |
| Cliente | cliente@petcontrol.cl | cliente123 | Ver mascotas y recetas propias |

## 📡 Endpoints Principales

### Autenticación
- `POST /auth/register` - Registrar usuario
- `POST /auth/login` - Iniciar sesión

### Admin
- `GET /admin/mascotas` - Ver todas las mascotas
- `PUT /admin/mascotas/{id}` - Editar mascota
- `DELETE /admin/usuarios/{id}` - Eliminar cliente

### Veterinario
- `POST /veterinario/recetas` - Crear receta médica
- `GET /veterinario/recetas/mascota/{id}` - Ver recetas por mascota
- `POST /veterinario/vacunas` - Registrar vacuna

### Cliente
- `GET /mascotas/mis-mascotas` - Ver mis mascotas
- `GET /mascotas/{id}/recetas` - Ver recetas de mi mascota
- `POST /mascotas` - Registrar mascota

**Documentación completa:** `http://localhost:8080/swagger-ui.html`

## 📁 Estructura del Proyecto

```
petcontrol/
├── workspace/
│   ├── petcontrol-backend/          # API REST Spring Boot
│   │   ├── src/main/java/com/petcontrol/
│   │   │   ├── controller/          # Controladores REST
│   │   │   ├── dto/                 # DTOs Request/Response
│   │   │   ├── entity/              # Entidades JPA
│   │   │   ├── repository/          # Repositorios
│   │   │   ├── service/             # Lógica de negocio
│   │   │   ├── security/            # JWT y Spring Security
│   │   │   └── config/              # Configuraciones
│   │   └── pom.xml
│   └── petcontrol-frontend/         # Aplicación React
│       ├── src/
│       │   ├── pages/               # Páginas (Admin, Vet, Cliente)
│       │   ├── services/            # Servicios API
│       │   ├── context/             # Context API
│       │   └── router/              # Guards y rutas
│       └── package.json
├── database_backup.sql              # Backup MySQL
├── DOCUMENTACION_INTEGRACION.md     # Documentación técnica
├── MANUAL_USUARIO.md                # Manual de usuario
├── GUIA_INSTALACION.md              # Guía completa
└── README.md
```

## 🎨 Características de UI/UX

- ✅ **Diseño profesional** con gradientes y efectos modernos
- ✅ **Iconos coloridos** categorizados por tipo de información
- ✅ **Efectos hover/active** con animaciones smooth
- ✅ **Validaciones visuales** con feedback claro
- ✅ **Responsive design** optimizado para diferentes pantallas
- ✅ **Modal premium** para recetas médicas con diseño sofisticado

## 🔒 Seguridad

- ✅ **JWT Authentication** con tokens seguros
- ✅ **Roles y permisos** diferenciados (ADMIN, VETERINARIO, CLIENTE)
- ✅ **Validaciones backend** con Spring Security
- ✅ **Guards frontend** para protección de rutas
- ✅ **Ownership validation** - clientes solo ven sus datos

## 📊 Base de Datos

**4 Tablas principales:**
- `usuarios` - Usuarios del sistema con roles
- `mascotas` - Mascotas registradas
- `vacunas` - Vacunas aplicadas
- `recetas` - Recetas médicas

**Relaciones:**
- CASCADE delete configurado
- Foreign keys con integridad referencial

## 🧪 Testing

```bash
# Backend - Tests unitarios
cd workspace/petcontrol-backend
mvn test

# Frontend - Tests con Karma
cd workspace/petcontrol-frontend
npm test
```

## 📝 Documentación Adicional

- [DOCUMENTACION_INTEGRACION.md](DOCUMENTACION_INTEGRACION.md) - Guía técnica de integración
- [MANUAL_USUARIO.md](MANUAL_USUARIO.md) - Manual de usuario final
- [GUIA_INSTALACION.md](GUIA_INSTALACION.md) - Instalación paso a paso
- [GUIA_EXPORTACION.md](GUIA_EXPORTACION.md) - Exportar y distribuir

## 🐛 Solución de Problemas

### Puerto 8080 ocupado
```bash
# Ver proceso
netstat -ano | findstr :8080
# Matar proceso
taskkill /PID <PID> /F
```

### Error de conexión MySQL
- Verificar que MySQL esté corriendo
- Revisar credenciales en `application.properties`
- Confirmar que existe la base de datos

### node_modules faltantes
```bash
npm cache clean --force
npm install
```

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 👨‍💻 Autor

Desarrollado como proyecto universitario Full Stack.

## 🎯 Estado del Proyecto

**✅ Versión 1.0 - Completado**

- Backend 100% funcional
- Frontend 100% funcional
- Todas las features implementadas
- UI/UX profesional
- Listo para producción

## 📞 Soporte

Para preguntas o problemas:
- Crear un Issue en GitHub
- Revisar la documentación en `/docs`

---

⭐ Si te gusta este proyecto, dale una estrella en GitHub!
