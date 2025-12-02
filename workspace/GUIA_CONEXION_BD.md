# Guía Completa: Conexión Base de Datos MySQL - PetControl

## 📋 Tabla de Contenidos
1. [Arquitectura General](#arquitectura-general)
2. [Requisitos Previos](#requisitos-previos)
3. [Pasos de Configuración](#pasos-de-configuración)
4. [Verificación de Conexión](#verificación-de-conexión)
5. [Troubleshooting](#troubleshooting)

---

## 🏗️ Arquitectura General

```
┌─────────────────────────────────────────────────────────────┐
│                   FRONTEND (React)                          │
│               http://localhost:5173                         │
│  (No accede directamente a BD, usa API REST)               │
└──────────────────────┬──────────────────────────────────────┘
                       │ HTTP/REST
                       ▼
┌─────────────────────────────────────────────────────────────┐
│              BACKEND (Spring Boot)                          │
│          http://localhost:8080/api                         │
│  - Controllers (reciben peticiones)                         │
│  - Services (lógica de negocio)                             │
│  - Repositories (JPA - acceso a datos)                      │
│  - Models (entidades de BD)                                 │
└──────────────────────┬──────────────────────────────────────┘
                       │ JDBC
                       ▼
┌─────────────────────────────────────────────────────────────┐
│          MySQL Database Server                             │
│        localhost:3306                                      │
│  Base de datos: petcontrol_db                              │
│  - Tabla usuarios                                           │
│  - Tabla mascotas                                           │
└─────────────────────────────────────────────────────────────┘
```

---

## ✅ Requisitos Previos

Antes de empezar, verifica que tengas:

1. **MySQL Server instalado y ejecutándose**
   ```powershell
   # En PowerShell, verifica la conexión:
   Test-NetConnection -ComputerName localhost -Port 3306
   
   # Debe mostrar: TcpTestSucceeded : True
   ```

2. **XAMPP con Apache y MySQL activos**
   - Abre XAMPP Control Panel
   - Click en "Start" para Apache y MySQL
   - Verifica que ambos muestren estado "Running" (verde)

3. **Java 17+ instalado**
   ```powershell
   java -version
   # Debe mostrar: openjdk version "17..." o similar
   ```

4. **Maven instalado**
   ```powershell
   mvn -version
   # Debe mostrar: Apache Maven 3.9.11
   ```

5. **Node.js y npm instalados**
   ```powershell
   node -version
   npm -version
   ```

---

## 🔧 Pasos de Configuración

### **PASO 1: Verificar Estado de MySQL**

#### Opción A: Usando XAMPP (Recomendado)
1. Abre XAMPP Control Panel
2. Haz clic en "Start" en la fila "MySQL"
3. Espera a que cambie a "Running" (color verde)
4. Verifica el puerto (por defecto 3306)

#### Opción B: Desde PowerShell
```powershell
# Verificar que MySQL responde en puerto 3306
Test-NetConnection -ComputerName localhost -Port 3306 -WarningAction SilentlyContinue

# Resultado esperado:
# TcpTestSucceeded : True
```

---

### **PASO 2: Verificar/Crear Base de Datos**

#### Opción A: Usando phpMyAdmin (Visual)
1. Abre tu navegador en http://localhost/phpmyadmin
2. Login con usuario: `root`, sin contraseña
3. En el panel superior, clic en "Bases de datos"
4. Si no existe `petcontrol_db`:
   - Escribe el nombre en "Crear nueva base de datos"
   - Clic en "Crear"
5. Selecciona `petcontrol_db` (debería estar vacía)

#### Opción B: Usando MySQL Client (Terminal)
```powershell
# Conectar a MySQL
mysql -u root -h 127.0.0.1

# Dentro de MySQL:
CREATE DATABASE IF NOT EXISTS petcontrol_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE petcontrol_db;
SHOW TABLES;  # Debe estar vacía al inicio

# Salir
EXIT;
```

---

### **PASO 3: Configurar Spring Boot (Backend)**

El backend ya tiene todo configurado en:
```
petcontrol-backend/src/main/resources/application.properties
```

#### Contenido esperado:
```properties
# Base de Datos MySQL
spring.datasource.url=jdbc:mysql://localhost:3306/petcontrol_db?createDatabaseIfNotExist=true&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA/Hibernate
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=false
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect
spring.jpa.properties.hibernate.format_sql=true

# Puerto
server.port=8080
server.servlet.context-path=/api

# JWT
jwt.secret=tu_secreto_jwt_aqui_que_debe_ser_largo_y_seguro_1234567890abcdef
jwt.expiration=86400000
```

#### Explicación de parámetros clave:

| Parámetro | Valor | Significado |
|-----------|-------|-------------|
| `spring.datasource.url` | `jdbc:mysql://localhost:3306/petcontrol_db` | Dirección de BD (host:puerto/nombre_bd) |
| `createDatabaseIfNotExist=true` | true | Crea automáticamente la BD si no existe |
| `serverTimezone=UTC` | UTC | Zona horaria del servidor |
| `spring.datasource.username` | `root` | Usuario MySQL (por defecto en XAMPP) |
| `spring.datasource.password` | (vacío) | Sin contraseña (por defecto en XAMPP) |
| `spring.jpa.hibernate.ddl-auto` | `update` | Crea/actualiza tablas automáticamente |
| `server.port` | 8080 | Puerto donde escucha Spring Boot |
| `server.servlet.context-path` | `/api` | Prefijo de rutas (ej: `/api/auth/login`) |

---

### **PASO 4: Archivos Java Clave (Backend)**

#### **4.1 - Modelo: Usuario.java**
```
petcontrol-backend/src/main/java/com/petcontrol/model/Usuario.java
```
- Define la entidad Usuario con @Entity y @Table
- Mapea columnas de la tabla usuarios
- Define el enum Rol (CLIENTE, VETERINARIO, ADMIN)
- Relación @OneToMany con Mascota

#### **4.2 - Modelo: Mascota.java**
```
petcontrol-backend/src/main/java/com/petcontrol/model/Mascota.java
```
- Define la entidad Mascota con @Entity
- Mapea columnas de tabla mascotas
- Relación @ManyToOne con Usuario

#### **4.3 - Repositorio: UsuarioRepository.java**
```java
package com.petcontrol.repository;

import com.petcontrol.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByEmail(String email);
    boolean existsByEmail(String email);
}
```
- Hereda de JpaRepository (proporciona CRUD automático)
- Métodos personalizados para búsqueda por email

#### **4.4 - Repositorio: MascotaRepository.java**
```java
package com.petcontrol.repository;

import com.petcontrol.model.Mascota;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface MascotaRepository extends JpaRepository<Mascota, Long> {
    List<Mascota> findByUsuarioId(Long usuarioId);
}
```
- Métodos para buscar mascotas por usuario

#### **4.5 - Servicio: AuthService.java**
```
petcontrol-backend/src/main/java/com/petcontrol/service/AuthService.java
```
- Lógica de registro y login
- Usa UsuarioRepository para guardar/buscar usuarios
- Genera tokens JWT

#### **4.6 - Controlador: AuthController.java**
```
petcontrol-backend/src/main/java/com/petcontrol/controller/AuthController.java
```
- Expone endpoints REST:
  - `POST /auth/register` - Registrar usuario
  - `POST /auth/login` - Iniciar sesión

---

### **PASO 5: Archivos Frontend Clave (React)**

#### **5.1 - API Service: services/api.js**
```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Agregar token JWT a cada petición
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
```
- Configura la URL base del backend
- Intercepta peticiones para agregar el token JWT

#### **5.2 - Auth Service: services/authService.js**
```javascript
import api from './api';

export const authService = {
  async login(email, password) {
    const response = await api.post('/auth/login', { email, password });
    const { token, email: userEmail, nombre, rol, id } = response.data;
    
    localStorage.setItem('token', token);
    localStorage.setItem('usuarioActual', JSON.stringify({ id, email: userEmail, nombre, rol }));
    
    return { id, email: userEmail, nombre, rol };
  },

  async register(email, password, nombre = '') {
    const response = await api.post('/auth/register', { email, password, nombre });
    // Similar al login...
  },
};
```
- Realiza peticiones HTTP al backend
- Almacena token y usuario en localStorage

---

### **PASO 6: Flujo de Conexión Completo**

#### Ejemplo: Registro de nuevo usuario

```
1. Usuario ingresa email/contraseña en Frontend (React)
   ↓
2. Frontend: POST http://localhost:8080/api/auth/register
   {
     "email": "user@example.com",
     "password": "pass123",
     "nombre": "Juan Pérez"
   }
   ↓
3. Backend (Spring Boot) recibe petición en AuthController.register()
   ↓
4. AuthService.register() prepara datos:
   - Valida que email no exista (consulta a BD)
   - Hashea la contraseña con bcrypt
   - Crea objeto Usuario
   ↓
5. UsuarioRepository.save(usuario) ejecuta:
   INSERT INTO usuarios (email, password, nombre, rol, fecha_creacion)
   VALUES ('user@example.com', 'hashed_pass', 'Juan Pérez', 'CLIENTE', NOW())
   ↓
6. MySQL guarda el registro y devuelve el ID generado (ej: 1)
   ↓
7. Backend genera token JWT:
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ↓
8. Backend responde al Frontend:
   {
     "token": "eyJhbGc...",
     "email": "user@example.com",
     "nombre": "Juan Pérez",
     "rol": "CLIENTE",
     "id": 1
   }
   ↓
9. Frontend (authService) guarda token y usuario en localStorage
   ↓
10. Frontend redirige a /mascotas
```

---

## ✔️ Verificación de Conexión

### **Verificación 1: MySQL está corriendo**
```powershell
Test-NetConnection -ComputerName localhost -Port 3306 -WarningAction SilentlyContinue

# Resultado esperado:
# TcpTestSucceeded : True
```

### **Verificación 2: Backend conecta a BD**
Revisa los logs del backend al arrancar:
```
2025-12-02T05:37:03.833-03:00  INFO 24888 --- [main] com.zaxxer.hikari.HikariDataSource : HikariPool-1 - Start completed.

Hibernate:
    create table usuarios (
        id bigint not null auto_increment,
        ...
    )

2025-12-02T05:37:05.259-03:00  INFO 24888 --- [main] j.LocalContainerEntityManagerFactoryBean : Initialized JPA EntityManagerFactory
```

### **Verificación 3: Verifica la BD con phpMyAdmin**
1. Abre http://localhost/phpmyadmin
2. Login (usuario: root, sin contraseña)
3. En la izquierda, selecciona `petcontrol_db`
4. Deberías ver las tablas `usuarios` y `mascotas`

### **Verificación 4: Prueba la API desde Frontend**
1. Abre http://localhost:5173
2. Intenta registrarte con email/contraseña/nombre
3. Si funciona, verás la página de mascotas
4. Abre la consola del navegador (F12 → Console)
5. Verifica que no hay errores de CORS o conexión

### **Verificación 5: Consulta directa a MySQL**
```powershell
# Conectar a MySQL
mysql -u root -h 127.0.0.1 petcontrol_db

# Ver tabla usuarios
SELECT * FROM usuarios;

# Ver tabla mascotas
SELECT * FROM mascotas;

# Salir
EXIT;
```

---

## 🔴 Troubleshooting

### **Error 1: "Connection refused" o "Can't connect to MySQL"**

**Síntoma:**
```
java.sql.SQLException: Could not connect to address=(host=localhost)
```

**Solución:**
1. Abre XAMPP
2. Haz clic en "Start" en MySQL
3. Espera 10 segundos a que se inicie
4. Verifica: `Test-NetConnection -ComputerName localhost -Port 3306`

---

### **Error 2: "Access denied for user 'root'@'localhost'"**

**Síntoma:**
```
java.sql.SQLException: Access denied for user 'root'@'localhost' (using password: NO)
```

**Solución:**
- Abre `petcontrol-backend/src/main/resources/application.properties`
- Verifica que `spring.datasource.password=` está vacía (sin contraseña)
- Si XAMPP tiene contraseña, agrega: `spring.datasource.password=tu_password`

---

### **Error 3: "Database 'petcontrol_db' doesn't exist"**

**Síntoma:**
```
java.sql.SQLException: Unknown database 'petcontrol_db'
```

**Solución:**
- El backend debería crearla automáticamente (parámetro `createDatabaseIfNotExist=true`)
- Si no funciona, crea manualmente:
  ```powershell
  mysql -u root -h 127.0.0.1
  CREATE DATABASE petcontrol_db CHARACTER SET utf8mb4;
  EXIT;
  ```

---

### **Error 4: "Tables not created" (tablas vacías)**

**Síntoma:**
- BD existe pero no hay tablas usuarios/mascotas

**Solución:**
- Abre el backend en logs
- Busca mensajes Hibernate como `create table usuarios`
- Si no aparecen, verifica:
  1. `spring.jpa.hibernate.ddl-auto=update` está en application.properties
  2. Las clases Usuario.java y Mascota.java tienen @Entity
  3. Reinicia el backend (Ctrl+C y arranca de nuevo)

---

### **Error 5: "CORS error" desde Frontend**

**Síntoma:**
```
Cross-Origin Request Blocked: ... no 'Access-Control-Allow-Origin' header
```

**Solución:**
- Backend debe permitir CORS desde localhost:5173
- Abre: `petcontrol-backend/src/main/java/com/petcontrol/config/CorsConfig.java`
- Verifica que existe y que permite `http://localhost:5173`

```java
@Configuration
public class CorsConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                    .allowedOrigins("http://localhost:5173", "http://localhost:3000")
                    .allowedMethods("GET", "POST", "PUT", "DELETE")
                    .allowedHeaders("*");
            }
        };
    }
}
```

---

### **Error 6: "Port 8080 is already in use"**

**Síntoma:**
```
java.net.BindException: Address already in use: bind
```

**Solución:**
```powershell
# Encuentra qué proceso está usando puerto 8080
netstat -ano | findstr :8080

# Copia el PID (última columna) y mata el proceso
taskkill /PID <PID> /F

# O cambia el puerto en application.properties:
# server.port=8081
```

---

### **Error 7: "Email ya registrado" pero puedo registrarme**

**Síntoma:**
- Se permite registrar mismo email dos veces

**Solución:**
- La BD debe tener UNIQUE constraint en email
- En phpMyAdmin, verifica tabla usuarios:
  - Clic en "Índices"
  - Debe existir índice UNIQUE en columna `email`
- Si falta, en MySQL ejecuta:
  ```sql
  ALTER TABLE usuarios ADD UNIQUE KEY UK_email (email);
  ```

---

## 📊 Diagrama de Flujo de Datos

```
┌──────────────────────┐
│   Navegador (React)  │
│   localhost:5173     │
└──────────┬───────────┘
           │ POST /auth/register
           │ { email, password, nombre }
           │
           ▼
┌──────────────────────────────────┐
│  Spring Boot API                 │
│  localhost:8080/api              │
│  ┌────────────────────────────┐  │
│  │ AuthController.register()  │  │
│  └────────┬───────────────────┘  │
│           │                       │
│  ┌────────▼───────────────────┐  │
│  │ AuthService.register()     │  │
│  │ - Valida email único       │  │
│  │ - Hashea contraseña        │  │
│  │ - Crea objeto Usuario      │  │
│  └────────┬───────────────────┘  │
│           │                       │
│  ┌────────▼───────────────────┐  │
│  │ UsuarioRepository.save()   │  │
│  │ (JPA)                       │  │
│  └────────┬───────────────────┘  │
└───────────┼──────────────────────┘
            │ JDBC/SQL
            │ INSERT INTO usuarios...
            │
            ▼
┌──────────────────────┐
│  MySQL Database      │
│  localhost:3306      │
│                      │
│  petcontrol_db       │
│  ├─ usuarios         │ (nuevo registro insertado)
│  └─ mascotas         │
└──────────────────────┘
```

---

## 🎯 Resumen Rápido

Para que funcione la conexión BD:

1. ✅ XAMPP corriendo (MySQL activo)
2. ✅ `application.properties` configurado correctamente
3. ✅ Clases modelo con `@Entity` y `@Table`
4. ✅ Repositorios extendiendo `JpaRepository`
5. ✅ Backend arrancando sin errores de conexión
6. ✅ Frontend enviando peticiones HTTP al backend
7. ✅ Datos guardándose en MySQL

Si todo esto está en su lugar, ¡tu BD está conectada correctamente!

