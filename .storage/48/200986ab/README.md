# PetControl Backend

Backend API REST desarrollado con Spring Boot para la gestión de mascotas con autenticación JWT.

## Características

- ✅ API REST con Spring Boot 3.2
- ✅ Autenticación JWT con roles (USUARIO, ADMIN)
- ✅ Base de datos H2 en memoria
- ✅ Documentación con Swagger/OpenAPI
- ✅ Operaciones CRUD para mascotas
- ✅ Control de acceso basado en roles
- ✅ CORS configurado para frontend

## Requisitos

- Java 17 o superior
- Maven 3.6 o superior

## Instalación y Ejecución

```bash
cd petcontrol-backend
mvn clean install
mvn spring-boot:run
```

El servidor se ejecutará en `http://localhost:8080/api`

## Documentación API

Una vez iniciado el servidor, accede a:

- **Swagger UI**: http://localhost:8080/api/swagger-ui.html
- **API Docs**: http://localhost:8080/api/api-docs
- **H2 Console**: http://localhost:8080/api/h2-console

### Credenciales H2 Console
- JDBC URL: `jdbc:h2:mem:petcontroldb`
- Username: `sa`
- Password: (dejar vacío)

## Usuario Administrador por Defecto

```
Email: admin@admin.cl
Password: admin.123
```

## Endpoints Principales

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
- `GET /api/admin/mascotas` - Obtener todas las mascotas

## Estructura del Proyecto

```
src/main/java/com/petcontrol/
├── config/          # Configuraciones (Security, CORS, OpenAPI)
├── controller/      # Controladores REST
├── dto/            # Data Transfer Objects
├── model/          # Entidades JPA
├── repository/     # Repositorios JPA
├── security/       # JWT y seguridad
└── service/        # Lógica de negocio
```

## Seguridad

- Autenticación basada en JWT (JSON Web Tokens)
- Contraseñas encriptadas con BCrypt
- Roles: USUARIO y ADMIN
- Sesiones stateless
- CORS configurado para desarrollo

## Tecnologías Utilizadas

- Spring Boot 3.2
- Spring Security
- Spring Data JPA
- H2 Database
- JWT (jjwt 0.12.3)
- Lombok
- Springdoc OpenAPI (Swagger)
- Maven