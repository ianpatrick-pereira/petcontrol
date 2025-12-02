# 🐾 PetControl Backend - Sistema de Gestión de Mascotas

Backend API REST desarrollado con Spring Boot para la gestión de mascotas con sistema de roles y autenticación JWT.

---

## 📋 **CARACTERÍSTICAS PRINCIPALES**

### **Tecnologías Utilizadas:**
- ☕ **Java 17**
- 🍃 **Spring Boot 3.2.0**
- 🔐 **Spring Security + JWT**
- 🗄️ **Spring Data JPA**
- 🐬 **MySQL 8.0** (Base de datos principal)
- 💾 **H2 Database** (Alternativa para desarrollo)
- 📚 **Swagger/OpenAPI** (Documentación interactiva)
- ✅ **Bean Validation** (Validaciones)

### **Funcionalidades Implementadas:**
- ✅ Autenticación y autorización con JWT
- ✅ Sistema de 3 roles: CLIENTE, VETERINARIO, ADMIN
- ✅ CRUD completo de mascotas
- ✅ Restricciones de acceso por rol
- ✅ Validaciones de datos
- ✅ Documentación automática con Swagger
- ✅ Manejo de excepciones centralizado
- ✅ CORS configurado para frontend React

---

## 🎯 **SISTEMA DE ROLES**

### **1. CLIENTE (Dueño de Mascota)**
- Ver sus propias mascotas
- Agregar nuevas mascotas
- Editar sus mascotas
- Eliminar sus mascotas

### **2. VETERINARIO (Profesional)**
- Todo lo de CLIENTE +
- Ver TODAS las mascotas del sistema (solo lectura)
- Ver información del dueño de cada mascota

### **3. ADMIN (Administrador)**
- Todo lo de VETERINARIO +
- Editar cualquier mascota
- Eliminar cualquier mascota
- Ver todos los usuarios
- Eliminar usuarios

---

## 🚀 **INSTALACIÓN Y CONFIGURACIÓN**

### **Requisitos Previos:**
- Java 17 o superior
- Maven 3.6+ (o usar el wrapper incluido)
- MySQL 8.0+ (o usar H2 para desarrollo)

### **Paso 1: Clonar el Repositorio**
```bash
git clone <tu-repositorio>
cd petcontrol-backend
```

### **Paso 2: Configurar Base de Datos**

#### **Opción A: MySQL (Producción - Recomendado)**

1. Instalar MySQL 8.0+
2. Crear base de datos (opcional, se crea automáticamente):
```sql
CREATE DATABASE petcontrol_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

3. Configurar credenciales en `src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/petcontrol_db?createDatabaseIfNotExist=true&useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
spring.datasource.username=root
spring.datasource.password=root
```

**Ver guía completa:** [CONFIGURACION_MYSQL.md](CONFIGURACION_MYSQL.md)

#### **Opción B: H2 (Desarrollo)**

Ejecutar con perfil H2:
```bash
./mvnw spring-boot:run -Dspring-boot.run.profiles=h2
```

### **Paso 3: Ejecutar la Aplicación**

```bash
# Con Maven Wrapper (recomendado)
./mvnw spring-boot:run

# Con Maven instalado
mvn spring-boot:run

# Compilar y ejecutar JAR
mvn clean package
java -jar target/petcontrol-backend-1.0.0.jar
```

La aplicación estará disponible en: **http://localhost:8080**

---

## 📚 **DOCUMENTACIÓN DE LA API**

### **Swagger UI (Interactivo):**
http://localhost:8080/swagger-ui.html

### **OpenAPI JSON:**
http://localhost:8080/api-docs

---

## 🔐 **USUARIOS DE PRUEBA**

Al iniciar la aplicación, se crean automáticamente 3 usuarios:

| Rol | Email | Password |
|-----|-------|----------|
| **ADMIN** | admin@admin.cl | admin.123 |
| **VETERINARIO** | veterinario@petcontrol.cl | vet.123 |
| **CLIENTE** | cliente@petcontrol.cl | cliente.123 |

---

## 🛣️ **ENDPOINTS PRINCIPALES**

### **Autenticación (Público)**

```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "usuario@ejemplo.cl",
  "password": "password123",
  "nombre": "Juan Pérez"
}
```

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "usuario@ejemplo.cl",
  "password": "password123"
}

Response:
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "tipo": "Bearer",
  "usuario": {
    "id": 1,
    "email": "usuario@ejemplo.cl",
    "nombre": "Juan Pérez",
    "rol": "CLIENTE"
  }
}
```

### **Mascotas (Requiere Autenticación)**

```http
# Obtener mis mascotas
GET /api/mascotas/mis-mascotas
Authorization: Bearer {token}

# Crear mascota
POST /api/mascotas
Authorization: Bearer {token}
Content-Type: application/json

{
  "nombre": "Firulais",
  "especie": "Perro",
  "raza": "Labrador",
  "edad": 3,
  "descripcion": "Perro muy juguetón",
  "imagen": "https://ejemplo.com/imagen.jpg"
}

# Actualizar mascota
PUT /api/mascotas/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "nombre": "Firulais Jr.",
  "especie": "Perro",
  "raza": "Labrador",
  "edad": 4
}

# Eliminar mascota
DELETE /api/mascotas/{id}
Authorization: Bearer {token}
```

### **Veterinario (Requiere rol VETERINARIO o ADMIN)**

```http
# Ver todas las mascotas
GET /api/veterinario/mascotas
Authorization: Bearer {token}

# Ver detalle de cualquier mascota
GET /api/veterinario/mascotas/{id}
Authorization: Bearer {token}
```

### **Administrador (Requiere rol ADMIN)**

```http
# Ver todos los usuarios
GET /api/admin/usuarios
Authorization: Bearer {token}

# Ver todas las mascotas
GET /api/admin/mascotas
Authorization: Bearer {token}

# Eliminar usuario
DELETE /api/admin/usuarios/{id}
Authorization: Bearer {token}

# Eliminar cualquier mascota
DELETE /api/admin/mascotas/{id}
Authorization: Bearer {token}
```

---

## 🗂️ **ESTRUCTURA DEL PROYECTO**

```
petcontrol-backend/
├── src/main/java/com/petcontrol/
│   ├── config/                    # Configuraciones
│   │   ├── SecurityConfig.java    # Spring Security + JWT
│   │   ├── CorsConfig.java        # CORS
│   │   ├── SwaggerConfig.java     # Swagger/OpenAPI
│   │   └── DataInitializer.java   # Datos iniciales
│   ├── controller/                # Controladores REST
│   │   ├── AuthController.java    # Autenticación
│   │   ├── MascotaController.java # CRUD mascotas
│   │   ├── VeterinarioController.java # Endpoints veterinario
│   │   └── AdminController.java   # Endpoints admin
│   ├── dto/                       # Data Transfer Objects
│   │   ├── LoginRequest.java
│   │   ├── RegisterRequest.java
│   │   ├── AuthResponse.java
│   │   └── MascotaDTO.java
│   ├── model/                     # Entidades JPA
│   │   ├── Usuario.java           # Usuario con 3 roles
│   │   └── Mascota.java           # Mascota
│   ├── repository/                # Repositorios JPA
│   │   ├── UsuarioRepository.java
│   │   └── MascotaRepository.java
│   ├── security/                  # Seguridad JWT
│   │   ├── JwtTokenProvider.java  # Generación/validación JWT
│   │   ├── JwtRequestFilter.java  # Filtro de autenticación
│   │   └── CustomUserDetailsService.java
│   ├── service/                   # Lógica de negocio
│   │   ├── AuthService.java
│   │   └── MascotaService.java
│   └── PetControlApplication.java # Clase principal
├── src/main/resources/
│   ├── application.properties     # Configuración MySQL
│   └── application-h2.properties  # Configuración H2
├── pom.xml                        # Dependencias Maven
├── README.md                      # Este archivo
└── CONFIGURACION_MYSQL.md         # Guía de MySQL
```

---

## 🔧 **CONFIGURACIÓN AVANZADA**

### **Cambiar Puerto del Servidor:**
```properties
# application.properties
server.port=9090
```

### **Configurar JWT:**
```properties
# Cambiar clave secreta (usar una más segura en producción)
jwt.secret=TU_CLAVE_SECRETA_MUY_LARGA_Y_SEGURA

# Cambiar tiempo de expiración (en milisegundos)
jwt.expiration=86400000  # 24 horas
```

### **Configurar CORS:**
```properties
# Agregar más orígenes permitidos
cors.allowed-origins=http://localhost:5173,http://localhost:3000,https://tu-dominio.com
```

### **Modo de Creación de Tablas:**
```properties
# update: Actualiza sin eliminar datos (producción)
spring.jpa.hibernate.ddl-auto=update

# create-drop: Recrea en cada inicio (desarrollo)
spring.jpa.hibernate.ddl-auto=create-drop

# validate: Solo valida, no modifica
spring.jpa.hibernate.ddl-auto=validate
```

---

## 🧪 **PRUEBAS**

### **Ejecutar Tests:**
```bash
./mvnw test
```

### **Probar con Postman:**

1. Importar colección desde Swagger
2. Registrar un usuario en `/api/auth/register`
3. Hacer login en `/api/auth/login` y copiar el token
4. Agregar header en todas las peticiones:
   ```
   Authorization: Bearer {tu-token-aqui}
   ```

---

## 🐛 **SOLUCIÓN DE PROBLEMAS**

### **Error: "Access denied for user 'root'@'localhost'"**
- Verifica las credenciales en `application.properties`
- Resetea la contraseña de MySQL

### **Error: "Communications link failure"**
- MySQL no está corriendo
- Inicia MySQL: `net start MySQL80` (Windows) o `brew services start mysql` (Mac)

### **Error: "Port 8080 is already in use"**
- Otro proceso usa el puerto 8080
- Cambia el puerto en `application.properties`: `server.port=9090`

### **Error: "Bean Validation errors"**
- Verifica que los datos enviados cumplan las validaciones
- Email debe ser válido
- Campos obligatorios no pueden estar vacíos

---

## 📦 **DEPENDENCIAS PRINCIPALES**

```xml
<dependencies>
    <!-- Spring Boot Starters -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-jpa</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-security</artifactId>
    </dependency>
    
    <!-- JWT -->
    <dependency>
        <groupId>io.jsonwebtoken</groupId>
        <artifactId>jjwt-api</artifactId>
        <version>0.12.3</version>
    </dependency>
    
    <!-- MySQL -->
    <dependency>
        <groupId>com.mysql</groupId>
        <artifactId>mysql-connector-j</artifactId>
    </dependency>
    
    <!-- Swagger/OpenAPI -->
    <dependency>
        <groupId>org.springdoc</groupId>
        <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
        <version>2.3.0</version>
    </dependency>
</dependencies>
```

---

## 📄 **LICENCIA**

Este proyecto es parte de una evaluación académica.

---

## 👨‍💻 **AUTOR**

Desarrollado para la evaluación DSY1104 - Desarrollo Full Stack

---

## 📞 **SOPORTE**

Para más información, consulta:
- [Guía de Configuración MySQL](CONFIGURACION_MYSQL.md)
- [Swagger UI](http://localhost:8080/swagger-ui.html)
- Documentación de Spring Boot: https://spring.io/projects/spring-boot

---

**¡Listo para usar! 🚀**