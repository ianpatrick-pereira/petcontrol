# 🚀 GUÍA COMPLETA: PetControl con XAMPP - Paso a Paso

Esta guía te llevará desde la instalación de XAMPP hasta ver tu aplicación funcionando completamente.

---

## 📋 **ÍNDICE**

1. [Requisitos Previos](#requisitos-previos)
2. [Instalación de XAMPP](#instalación-de-xampp)
3. [Configuración de MySQL en XAMPP](#configuración-de-mysql-en-xampp)
4. [Configuración del Proyecto PetControl](#configuración-del-proyecto-petcontrol)
5. [Ejecución del Backend](#ejecución-del-backend)
6. [Verificación en phpMyAdmin](#verificación-en-phpmyadmin)
7. [Pruebas con Swagger](#pruebas-con-swagger)
8. [Ejecución del Frontend](#ejecución-del-frontend)
9. [Pruebas Completas del Sistema](#pruebas-completas-del-sistema)
10. [Solución de Problemas](#solución-de-problemas)

---

## 1️⃣ **REQUISITOS PREVIOS**

Antes de comenzar, asegúrate de tener:

- ✅ **Windows 10/11** (o macOS/Linux)
- ✅ **Java JDK 17 o superior** instalado
  - Verificar: Abre CMD y escribe `java -version`
  - Si no está instalado: https://www.oracle.com/java/technologies/downloads/
- ✅ **Maven** (o usar el wrapper incluido en el proyecto)
- ✅ **Node.js y npm** (para el frontend)
  - Verificar: `node -v` y `npm -v`
  - Si no está instalado: https://nodejs.org/
- ✅ **Conexión a Internet** (solo para descargar XAMPP)

---

## 2️⃣ **INSTALACIÓN DE XAMPP**

### **Paso 2.1: Descargar XAMPP**

1. **Abrir navegador** y ir a: https://www.apachefriends.org/download.html

2. **Descargar la versión para Windows:**
   - Busca "XAMPP for Windows"
   - Haz clic en el botón de descarga (versión 8.2.x recomendada)
   - Tamaño aproximado: 150 MB
   - Tiempo de descarga: 2-5 minutos (dependiendo de tu conexión)

### **Paso 2.2: Instalar XAMPP**

1. **Ejecutar el instalador descargado:**
   - Busca el archivo `xampp-windows-x64-8.2.x-installer.exe` en tu carpeta de Descargas
   - Haz doble clic para ejecutar
   - Si aparece un aviso de Windows Defender, haz clic en "Más información" → "Ejecutar de todas formas"

2. **Asistente de instalación:**

   **Pantalla 1: Advertencia de UAC**
   - Puede aparecer un mensaje sobre User Account Control (UAC)
   - Haz clic en "OK" para continuar

   **Pantalla 2: Selección de componentes**
   - ✅ **Apache** (servidor web)
   - ✅ **MySQL** (base de datos) - **IMPORTANTE**
   - ✅ **PHP** (lenguaje de programación)
   - ✅ **phpMyAdmin** (administrador de MySQL) - **IMPORTANTE**
   - ⬜ Perl (opcional, no necesario)
   - ⬜ Webalizer (opcional, no necesario)
   - ⬜ Fake Sendmail (opcional, no necesario)
   - Haz clic en "Next"

   **Pantalla 3: Carpeta de instalación**
   - Ruta predeterminada: `C:\xampp`
   - **Recomendación:** Deja la ruta predeterminada
   - Haz clic en "Next"

   **Pantalla 4: Idioma**
   - Selecciona "English" o tu idioma preferido
   - Haz clic en "Next"

   **Pantalla 5: Instalación**
   - Haz clic en "Next" para comenzar la instalación
   - Espera 3-5 minutos mientras se instalan los componentes
   - Verás una barra de progreso

   **Pantalla 6: Finalización**
   - ✅ Marca "Do you want to start the Control Panel now?"
   - Haz clic en "Finish"

3. **Primer inicio del XAMPP Control Panel:**
   - Se abrirá automáticamente el XAMPP Control Panel
   - Verás una ventana con varios módulos (Apache, MySQL, FileZilla, Mercury, Tomcat)

---

## 3️⃣ **CONFIGURACIÓN DE MYSQL EN XAMPP**

### **Paso 3.1: Iniciar MySQL**

1. **En el XAMPP Control Panel:**
   - Busca la fila que dice "MySQL"
   - Haz clic en el botón **"Start"** a la derecha
   - Espera 2-3 segundos

2. **Verificar que MySQL está corriendo:**
   - El fondo de la fila "MySQL" debería cambiar a **color verde**
   - Debería aparecer el texto "Running" en la columna de estado
   - En la columna "PID(s)" debería aparecer un número (ej: 1234)
   - En la columna "Port(s)" debería aparecer "3306"

3. **Si MySQL no inicia:**
   - Ver sección [Solución de Problemas](#solución-de-problemas) al final de esta guía

### **Paso 3.2: Verificar que MySQL está funcionando**

1. **Abrir phpMyAdmin:**
   - En el XAMPP Control Panel, en la fila de MySQL
   - Haz clic en el botón **"Admin"**
   - Se abrirá tu navegador con phpMyAdmin (http://localhost/phpmyadmin)

2. **Interfaz de phpMyAdmin:**
   - Deberías ver una interfaz con:
     - Panel izquierdo: Lista de bases de datos
     - Panel central: Información del servidor
     - Panel superior: Menú de navegación

3. **Verificar conexión:**
   - En el panel central, deberías ver:
     - "Server: localhost via TCP/IP"
     - "Server type: MySQL"
     - "Server version: 8.x.x" (o similar)
   - Si ves esto, ¡MySQL está funcionando correctamente! ✅

### **Paso 3.3: Crear la base de datos (Opcional)**

**Nota:** Tu aplicación creará automáticamente la base de datos `petcontrol_db` al iniciar por primera vez gracias a la configuración `createDatabaseIfNotExist=true`. Pero si quieres crearla manualmente:

1. **En phpMyAdmin:**
   - Haz clic en la pestaña **"Databases"** en el menú superior
   - En el campo "Create database", escribe: `petcontrol_db`
   - En "Collation", selecciona: `utf8mb4_unicode_ci`
   - Haz clic en el botón **"Create"**

2. **Verificar creación:**
   - En el panel izquierdo, deberías ver `petcontrol_db` en la lista de bases de datos
   - Haz clic en `petcontrol_db` para seleccionarla
   - Verás el mensaje "No tables found in database" (normal, las tablas se crearán automáticamente)

---

## 4️⃣ **CONFIGURACIÓN DEL PROYECTO PETCONTROL**

### **Paso 4.1: Verificar configuración de la base de datos**

Tu proyecto ya está configurado para funcionar con XAMPP. El archivo `application.properties` tiene:

```properties
# MySQL Database Configuration - XAMPP
spring.datasource.url=jdbc:mysql://localhost:3306/petcontrol_db?createDatabaseIfNotExist=true&useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
spring.datasource.username=root
spring.datasource.password=
```

**Explicación de cada parámetro:**

- `localhost:3306` - MySQL de XAMPP corre en tu computadora, puerto 3306
- `petcontrol_db` - Nombre de la base de datos
- `createDatabaseIfNotExist=true` - Crea la BD automáticamente si no existe
- `username=root` - Usuario por defecto de XAMPP
- `password=` - Contraseña vacía (por defecto en XAMPP)

### **Paso 4.2: Verificar que tienes el proyecto**

1. **Abrir una terminal (CMD o PowerShell):**
   - Presiona `Windows + R`
   - Escribe `cmd` y presiona Enter

2. **Navegar a la carpeta del proyecto:**
   ```bash
   cd C:\ruta\a\tu\proyecto\petcontrol-backend
   ```
   
   O si estás en el workspace:
   ```bash
   cd /workspace/petcontrol-backend
   ```

3. **Verificar que estás en la carpeta correcta:**
   ```bash
   dir
   ```
   
   Deberías ver archivos como:
   - `pom.xml`
   - `src/`
   - `mvnw` y `mvnw.cmd`

---

## 5️⃣ **EJECUCIÓN DEL BACKEND**

### **Paso 5.1: Compilar el proyecto**

1. **En la terminal, ejecuta:**
   ```bash
   mvnw.cmd clean install
   ```
   
   O si estás en Linux/Mac:
   ```bash
   ./mvnw clean install
   ```

2. **Qué verás:**
   - Maven descargará dependencias (primera vez puede tardar 2-5 minutos)
   - Verás mensajes de compilación
   - Al final debería decir: `BUILD SUCCESS`

3. **Si hay errores:**
   - Verifica que Java 17+ esté instalado: `java -version`
   - Verifica que estás en la carpeta correcta
   - Ver sección [Solución de Problemas](#solución-de-problemas)

### **Paso 5.2: Iniciar el backend**

1. **Ejecutar la aplicación:**
   ```bash
   mvnw.cmd spring-boot:run
   ```
   
   O en Linux/Mac:
   ```bash
   ./mvnw spring-boot:run
   ```

2. **Qué verás en la consola:**

   **Inicio (primeros 5 segundos):**
   ```
   .   ____          _            __ _ _
   /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
   ( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
   \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
   '  |____| .__|_| |_|_| |_\__, | / / / /
   =========|_|==============|___/=/_/_/_/
   :: Spring Boot ::                (v3.2.0)
   ```

   **Conexión a MySQL (segundos 5-10):**
   ```
   ✅ HikariPool-1 - Starting...
   ✅ HikariPool-1 - Start completed.
   ✅ HHH000204: Processing PersistenceUnitInfo [name: default]
   ```

   **Creación de tablas (segundos 10-15):**
   ```
   ✅ Hibernate: create table usuarios (
       id bigint not null auto_increment,
       email varchar(255) not null,
       nombre varchar(255) not null,
       password varchar(255) not null,
       rol varchar(255) not null,
       primary key (id)
   ) engine=InnoDB
   
   ✅ Hibernate: create table mascotas (
       id bigint not null auto_increment,
       nombre varchar(255) not null,
       especie varchar(255) not null,
       raza varchar(255),
       edad integer,
       descripcion varchar(1000),
       imagen varchar(500),
       usuario_id bigint not null,
       primary key (id)
   ) engine=InnoDB
   ```

   **Inserción de usuarios de ejemplo (segundos 15-20):**
   ```
   ✅ Usuario administrador creado: admin@admin.cl / admin.123
   ✅ Usuario veterinario creado: veterinario@petcontrol.cl / vet.123
   ✅ Usuario cliente creado: cliente@petcontrol.cl / cliente.123
   ```

   **Aplicación lista (segundo 20-25):**
   ```
   ✅ Started PetControlApplication in 5.234 seconds (process running for 5.789)
   ```

3. **¡Éxito! Tu backend está corriendo** 🎉

   **URLs disponibles:**
   - API Base: http://localhost:8080/api
   - Swagger UI: http://localhost:8080/swagger-ui.html
   - API Docs: http://localhost:8080/api-docs

4. **Mantén esta terminal abierta:**
   - El backend seguirá corriendo
   - Verás logs de las peticiones que lleguen
   - Para detenerlo: Presiona `Ctrl + C`

---

## 6️⃣ **VERIFICACIÓN EN PHPMYADMIN**

### **Paso 6.1: Verificar la base de datos**

1. **Abrir phpMyAdmin:**
   - Si ya está abierto, actualiza la página (F5)
   - Si no: En XAMPP Control Panel → MySQL → Admin
   - O ve directamente a: http://localhost/phpmyadmin

2. **Seleccionar la base de datos:**
   - En el panel izquierdo, haz clic en `petcontrol_db`
   - Deberías ver 2 tablas:
     - `mascotas`
     - `usuarios`

### **Paso 6.2: Verificar tabla de usuarios**

1. **Ver los usuarios creados:**
   - Haz clic en la tabla `usuarios` en el panel izquierdo
   - Haz clic en la pestaña **"Browse"** (Examinar)

2. **Deberías ver 3 usuarios:**

   | id | email | nombre | rol | password (encriptado) |
   |----|-------|--------|-----|----------------------|
   | 1 | admin@admin.cl | Administrador | ADMIN | $2a$10$... |
   | 2 | veterinario@petcontrol.cl | Dr. Veterinario | VETERINARIO | $2a$10$... |
   | 3 | cliente@petcontrol.cl | Cliente Demo | CLIENTE | $2a$10$... |

3. **Notas importantes:**
   - Las contraseñas están encriptadas con BCrypt (empiezan con `$2a$10$`)
   - Esto es correcto y seguro ✅
   - Las contraseñas reales son:
     - admin@admin.cl → `admin.123`
     - veterinario@petcontrol.cl → `vet.123`
     - cliente@petcontrol.cl → `cliente.123`

### **Paso 6.3: Verificar tabla de mascotas**

1. **Ver la tabla de mascotas:**
   - Haz clic en la tabla `mascotas` en el panel izquierdo
   - Haz clic en la pestaña **"Browse"**

2. **Estado inicial:**
   - La tabla estará vacía (0 rows)
   - Esto es normal, las mascotas se crearán cuando los usuarios las agreguen

3. **Ver estructura de la tabla:**
   - Haz clic en la pestaña **"Structure"** (Estructura)
   - Deberías ver las columnas:
     - `id` (bigint, PRIMARY KEY, AUTO_INCREMENT)
     - `nombre` (varchar 255)
     - `especie` (varchar 255)
     - `raza` (varchar 255)
     - `edad` (int)
     - `descripcion` (varchar 1000)
     - `imagen` (varchar 500)
     - `usuario_id` (bigint, FOREIGN KEY)

---

## 7️⃣ **PRUEBAS CON SWAGGER**

### **Paso 7.1: Acceder a Swagger UI**

1. **Abrir navegador:**
   - Ve a: http://localhost:8080/swagger-ui.html
   - Deberías ver la interfaz de Swagger con todos los endpoints

2. **Interfaz de Swagger:**
   - Verás controladores agrupados:
     - **auth-controller** (Autenticación)
     - **mascota-controller** (CRUD de mascotas)
     - **veterinario-controller** (Endpoints de veterinario)
     - **admin-controller** (Endpoints de administrador)

### **Paso 7.2: Probar el login**

1. **Expandir auth-controller:**
   - Haz clic en "auth-controller" para expandir
   - Verás 2 endpoints:
     - `POST /api/auth/register` (Registrar nuevo usuario)
     - `POST /api/auth/login` (Iniciar sesión)

2. **Probar login con usuario ADMIN:**
   - Haz clic en `POST /api/auth/login`
   - Haz clic en **"Try it out"**
   - En el campo de texto, reemplaza el contenido con:
     ```json
     {
       "email": "admin@admin.cl",
       "password": "admin.123"
     }
     ```
   - Haz clic en **"Execute"**

3. **Ver la respuesta:**
   - En "Response body" deberías ver:
     ```json
     {
       "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
       "tipo": "Bearer",
       "usuario": {
         "id": 1,
         "email": "admin@admin.cl",
         "nombre": "Administrador",
         "rol": "ADMIN"
       }
     }
     ```
   - **¡Copia el token!** Lo necesitarás para las siguientes pruebas

### **Paso 7.3: Autorizar con el token**

1. **Botón de autorización:**
   - En la parte superior derecha de Swagger, verás un botón **"Authorize"** 🔒
   - Haz clic en él

2. **Ingresar el token:**
   - En el campo "Value", escribe: `Bearer ` (con espacio) + el token que copiaste
   - Ejemplo: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
   - Haz clic en **"Authorize"**
   - Haz clic en **"Close"**

3. **Verificar autorización:**
   - Los candados 🔒 junto a los endpoints deberían cambiar a candados cerrados 🔐
   - Ahora puedes usar los endpoints protegidos

### **Paso 7.4: Crear una mascota**

1. **Expandir mascota-controller:**
   - Haz clic en "mascota-controller"
   - Busca `POST /api/mascotas`
   - Haz clic para expandir

2. **Crear mascota:**
   - Haz clic en **"Try it out"**
   - Reemplaza el contenido con:
     ```json
     {
       "nombre": "Firulais",
       "especie": "Perro",
       "raza": "Labrador",
       "edad": 3,
       "descripcion": "Perro muy juguetón y amigable",
       "imagen": "https://images.unsplash.com/photo-1587300003388-59208cc962cb"
     }
     ```
   - Haz clic en **"Execute"**

3. **Ver respuesta:**
   - Código de respuesta: **201 Created** ✅
   - En "Response body":
     ```json
     {
       "id": 1,
       "nombre": "Firulais",
       "especie": "Perro",
       "raza": "Labrador",
       "edad": 3,
       "descripcion": "Perro muy juguetón y amigable",
       "imagen": "https://images.unsplash.com/photo-1587300003388-59208cc962cb",
       "nombreDueno": "Administrador"
     }
     ```

### **Paso 7.5: Verificar en phpMyAdmin**

1. **Volver a phpMyAdmin:**
   - Actualiza la página (F5)
   - Haz clic en tabla `mascotas`
   - Haz clic en "Browse"

2. **Deberías ver la mascota creada:**
   - 1 fila con los datos de "Firulais"
   - `usuario_id` = 1 (vinculado al admin)

### **Paso 7.6: Obtener mascotas**

1. **En Swagger:**
   - Busca `GET /api/mascotas/mis-mascotas`
   - Haz clic en **"Try it out"**
   - Haz clic en **"Execute"**

2. **Ver respuesta:**
   - Código: **200 OK** ✅
   - Deberías ver un array con la mascota "Firulais"

### **Paso 7.7: Probar otros roles**

**Probar como VETERINARIO:**

1. **Hacer logout:**
   - Haz clic en "Authorize" 🔐
   - Haz clic en "Logout"

2. **Login como veterinario:**
   - `POST /api/auth/login`
   - Email: `veterinario@petcontrol.cl`
   - Password: `vet.123`
   - Copiar nuevo token y autorizar

3. **Ver todas las mascotas:**
   - `GET /api/veterinario/mascotas`
   - Deberías ver todas las mascotas del sistema (incluida la de admin)

**Probar como CLIENTE:**

1. **Login como cliente:**
   - Email: `cliente@petcontrol.cl`
   - Password: `cliente.123`

2. **Crear su propia mascota:**
   - `POST /api/mascotas`
   - Crear una mascota diferente

3. **Ver solo sus mascotas:**
   - `GET /api/mascotas/mis-mascotas`
   - Solo verá las mascotas que él creó

---

## 8️⃣ **EJECUCIÓN DEL FRONTEND**

### **Paso 8.1: Abrir nueva terminal**

1. **No cierres la terminal del backend** (debe seguir corriendo)

2. **Abrir nueva terminal:**
   - Windows: Presiona `Windows + R`, escribe `cmd`, Enter
   - O abre otra pestaña en tu terminal

3. **Navegar a la carpeta del frontend:**
   ```bash
   cd C:\ruta\a\tu\proyecto\petcontrol-frontend
   ```
   
   O:
   ```bash
   cd /workspace/petcontrol-frontend
   ```

### **Paso 8.2: Instalar dependencias (primera vez)**

1. **Ejecutar:**
   ```bash
   npm install
   ```

2. **Qué verás:**
   - npm descargará todas las dependencias
   - Puede tardar 2-5 minutos
   - Verás una barra de progreso
   - Al final: "added XXX packages"

### **Paso 8.3: Iniciar el frontend**

1. **Ejecutar:**
   ```bash
   npm run dev
   ```

2. **Qué verás:**
   ```
   VITE v4.x.x  ready in XXX ms

   ➜  Local:   http://localhost:5173/
   ➜  Network: use --host to expose
   ➜  press h to show help
   ```

3. **Frontend corriendo:**
   - URL: http://localhost:5173
   - Mantén esta terminal abierta
   - Para detener: `Ctrl + C`

### **Paso 8.4: Acceder a la aplicación**

1. **Abrir navegador:**
   - Ve a: http://localhost:5173

2. **Deberías ver:**
   - Página de login de PetControl
   - Formulario con campos de email y password
   - Botón "Iniciar Sesión"
   - Link "¿No tienes cuenta? Regístrate"

---

## 9️⃣ **PRUEBAS COMPLETAS DEL SISTEMA**

### **Paso 9.1: Login como ADMIN**

1. **En la página de login:**
   - Email: `admin@admin.cl`
   - Password: `admin.123`
   - Haz clic en "Iniciar Sesión"

2. **Deberías ver:**
   - Dashboard del administrador
   - Menú con opciones:
     - Mis Mascotas
     - Todas las Mascotas (admin)
     - Usuarios (admin)
     - Cerrar Sesión
   - Mensaje de bienvenida: "Bienvenido, Administrador"

### **Paso 9.2: Crear mascota como ADMIN**

1. **Ir a "Mis Mascotas":**
   - Haz clic en el menú
   - Deberías ver la mascota "Firulais" que creaste en Swagger

2. **Agregar nueva mascota:**
   - Haz clic en "Agregar Mascota" o "+"
   - Completa el formulario:
     - Nombre: "Max"
     - Especie: "Gato"
     - Raza: "Persa"
     - Edad: 2
     - Descripción: "Gato muy tranquilo"
     - Imagen: (URL o dejar vacío)
   - Haz clic en "Guardar"

3. **Verificar:**
   - Deberías ver "Max" en la lista
   - Total: 2 mascotas

### **Paso 9.3: Ver todas las mascotas (ADMIN)**

1. **Ir a "Todas las Mascotas":**
   - Haz clic en el menú
   - Deberías ver todas las mascotas del sistema
   - Cada mascota muestra el nombre del dueño

### **Paso 9.4: Ver usuarios (ADMIN)**

1. **Ir a "Usuarios":**
   - Deberías ver los 3 usuarios:
     - Administrador (ADMIN)
     - Dr. Veterinario (VETERINARIO)
     - Cliente Demo (CLIENTE)
   - Puedes eliminar usuarios (excepto el tuyo)

### **Paso 9.5: Cerrar sesión y probar VETERINARIO**

1. **Cerrar sesión:**
   - Haz clic en "Cerrar Sesión"
   - Vuelves a la página de login

2. **Login como VETERINARIO:**
   - Email: `veterinario@petcontrol.cl`
   - Password: `vet.123`

3. **Verificar permisos:**
   - Menú muestra:
     - Mis Mascotas
     - Todas las Mascotas (veterinario)
     - Cerrar Sesión
   - **NO** aparece "Usuarios" (solo admin)

4. **Ver todas las mascotas:**
   - Puede ver todas las mascotas
   - Puede ver el nombre del dueño
   - **NO** puede editar ni eliminar mascotas de otros

5. **Crear su propia mascota:**
   - Puede crear mascotas propias
   - Puede editar/eliminar solo las suyas

### **Paso 9.6: Probar CLIENTE**

1. **Login como CLIENTE:**
   - Email: `cliente@petcontrol.cl`
   - Password: `cliente.123`

2. **Verificar permisos:**
   - Menú muestra:
     - Mis Mascotas
     - Cerrar Sesión
   - **NO** aparece "Todas las Mascotas"
   - **NO** aparece "Usuarios"

3. **Ver solo sus mascotas:**
   - Lista vacía inicialmente
   - Solo puede ver sus propias mascotas

4. **Crear mascota:**
   - Agregar una mascota
   - Solo aparecerá en su lista

### **Paso 9.7: Verificar en phpMyAdmin**

1. **Abrir phpMyAdmin:**
   - Actualizar la página
   - Ver tabla `mascotas`

2. **Deberías ver:**
   - Todas las mascotas creadas
   - Cada una con su `usuario_id` correspondiente
   - Ejemplo:
     - Firulais (usuario_id: 1 - admin)
     - Max (usuario_id: 1 - admin)
     - Mascota del veterinario (usuario_id: 2)
     - Mascota del cliente (usuario_id: 3)

---

## 🔟 **SOLUCIÓN DE PROBLEMAS**

### **Problema 1: MySQL no inicia en XAMPP**

**Síntoma:** Al hacer clic en "Start" junto a MySQL, no cambia a verde o aparece error.

**Causa común:** Puerto 3306 ya está en uso por otra instalación de MySQL.

**Solución A: Detener otro MySQL**

```bash
# Windows - Abrir CMD como administrador
net stop MySQL80

# O buscar en Servicios de Windows
# Presiona Windows + R, escribe "services.msc"
# Busca "MySQL" y detén el servicio
```

**Solución B: Cambiar puerto de XAMPP**

1. En XAMPP Control Panel, haz clic en "Config" junto a MySQL
2. Selecciona "my.ini"
3. Busca la línea: `port=3306`
4. Cámbiala a: `port=3307`
5. Guarda el archivo
6. Inicia MySQL en XAMPP
7. Actualiza `application.properties`:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3307/petcontrol_db?...
   ```

### **Problema 2: Error "Access denied for user 'root'"**

**Síntoma:** Backend no puede conectar a MySQL.

**Causa:** XAMPP tiene contraseña configurada para root.

**Solución:**

1. Abrir phpMyAdmin
2. Si pide contraseña, anótala
3. Actualizar `application.properties`:
   ```properties
   spring.datasource.password=LA_CONTRASEÑA_QUE_ANOTASTE
   ```

O resetear contraseña:

```bash
# Abrir MySQL desde XAMPP
C:\xampp\mysql\bin\mysql.exe -u root -p

# Cambiar contraseña a vacía
ALTER USER 'root'@'localhost' IDENTIFIED BY '';
FLUSH PRIVILEGES;
EXIT;
```

### **Problema 3: Backend no inicia - Error de Java**

**Síntoma:** Error al ejecutar `mvnw.cmd spring-boot:run`

**Causa:** Java no instalado o versión incorrecta.

**Solución:**

1. Verificar Java:
   ```bash
   java -version
   ```
   Debe mostrar versión 17 o superior

2. Si no está instalado o es versión antigua:
   - Descargar Java 17: https://www.oracle.com/java/technologies/downloads/
   - Instalar
   - Reiniciar terminal
   - Verificar nuevamente

### **Problema 4: Frontend no inicia - Error de npm**

**Síntoma:** Error al ejecutar `npm run dev`

**Causa:** Node.js no instalado o dependencias no instaladas.

**Solución:**

1. Verificar Node.js:
   ```bash
   node -v
   npm -v
   ```

2. Si no está instalado:
   - Descargar Node.js: https://nodejs.org/
   - Instalar versión LTS
   - Reiniciar terminal

3. Reinstalar dependencias:
   ```bash
   cd petcontrol-frontend
   rm -rf node_modules
   rm package-lock.json
   npm install
   npm run dev
   ```

### **Problema 5: Error "Port 8080 already in use"**

**Síntoma:** Backend no puede iniciar porque el puerto 8080 está ocupado.

**Solución A: Cambiar puerto del backend**

En `application.properties`:
```properties
server.port=9090
```

Luego actualizar URL en el frontend.

**Solución B: Detener proceso en puerto 8080**

```bash
# Windows
netstat -ano | findstr :8080
taskkill /PID NUMERO_PID /F

# Linux/Mac
lsof -ti:8080 | xargs kill -9
```

### **Problema 6: CORS Error en el navegador**

**Síntoma:** Frontend no puede conectar con backend, error de CORS en consola del navegador.

**Solución:**

Verificar que en `application.properties` esté:
```properties
cors.allowed-origins=http://localhost:5173,http://localhost:3000
```

Y que `CorsConfig.java` esté configurado correctamente (ya debería estarlo).

### **Problema 7: Tablas no se crean automáticamente**

**Síntoma:** Backend inicia pero no crea las tablas en MySQL.

**Solución:**

1. Verificar en `application.properties`:
   ```properties
   spring.jpa.hibernate.ddl-auto=update
   ```

2. Verificar que la base de datos existe:
   - Abrir phpMyAdmin
   - Si no existe `petcontrol_db`, créala manualmente

3. Reiniciar el backend

### **Problema 8: Usuarios no se crean automáticamente**

**Síntoma:** Tablas creadas pero sin usuarios.

**Solución:**

1. Verificar logs del backend, buscar:
   ```
   Usuario administrador creado: admin@admin.cl
   ```

2. Si no aparece, verificar que `DataInitializer.java` esté en:
   ```
   src/main/java/com/petcontrol/config/DataInitializer.java
   ```

3. Crear usuarios manualmente en phpMyAdmin:
   - Ir a tabla `usuarios`
   - Click en "Insert"
   - Llenar campos (usar BCrypt para password)

---

## ✅ **CHECKLIST FINAL DE VERIFICACIÓN**

Marca cada item cuando lo completes:

**XAMPP:**
- [ ] XAMPP instalado
- [ ] MySQL corriendo (verde en Control Panel)
- [ ] phpMyAdmin accesible (http://localhost/phpmyadmin)
- [ ] Base de datos `petcontrol_db` creada (automática o manual)

**Backend:**
- [ ] Java 17+ instalado y verificado
- [ ] Proyecto compilado sin errores (`mvnw.cmd clean install`)
- [ ] Backend corriendo (`mvnw.cmd spring-boot:run`)
- [ ] Logs muestran "Started PetControlApplication"
- [ ] Tablas `usuarios` y `mascotas` creadas en MySQL
- [ ] 3 usuarios insertados (verificado en phpMyAdmin)
- [ ] Swagger UI accesible (http://localhost:8080/swagger-ui.html)

**Frontend:**
- [ ] Node.js y npm instalados
- [ ] Dependencias instaladas (`npm install`)
- [ ] Frontend corriendo (`npm run dev`)
- [ ] Aplicación accesible (http://localhost:5173)

**Pruebas:**
- [ ] Login funciona con los 3 usuarios
- [ ] ADMIN puede ver todas las mascotas y usuarios
- [ ] VETERINARIO puede ver todas las mascotas pero no usuarios
- [ ] CLIENTE solo ve sus propias mascotas
- [ ] Se pueden crear, editar y eliminar mascotas
- [ ] Los datos persisten en MySQL (verificado en phpMyAdmin)

---

## 🎉 **¡FELICITACIONES!**

Si completaste todos los pasos y marcaste todos los items del checklist, tu aplicación **PetControl está funcionando al 100%** con XAMPP.

**Tienes:**
- ✅ Backend Spring Boot con MySQL (XAMPP)
- ✅ Frontend React funcional
- ✅ Sistema de 3 roles implementado
- ✅ Autenticación JWT
- ✅ CRUD completo de mascotas
- ✅ Datos persistentes en MySQL
- ✅ Documentación completa
- ✅ **100% de cumplimiento con la evaluación**

---

## 📸 **CAPTURAS RECOMENDADAS PARA TU PRESENTACIÓN**

1. **XAMPP Control Panel** - MySQL en verde
2. **phpMyAdmin** - Base de datos `petcontrol_db` con tablas
3. **phpMyAdmin** - Tabla `usuarios` con 3 usuarios
4. **phpMyAdmin** - Tabla `mascotas` con datos
5. **Swagger UI** - Lista de endpoints
6. **Swagger UI** - Respuesta exitosa de login
7. **Frontend** - Página de login
8. **Frontend** - Dashboard de ADMIN
9. **Frontend** - Lista de mascotas
10. **Frontend** - Formulario de crear mascota

---

## 📞 **SOPORTE ADICIONAL**

Si tienes problemas que no están en esta guía:

1. Revisa los logs del backend en la terminal
2. Revisa la consola del navegador (F12) para errores del frontend
3. Verifica que MySQL esté corriendo en XAMPP
4. Consulta la sección de Solución de Problemas

---

**¡Éxito en tu evaluación! 🚀**