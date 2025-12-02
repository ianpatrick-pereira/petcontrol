# ✅ GUÍA PASO A PASO - CONEXIÓN BD (Con Verificación de Screenshots)

## 🎯 Objetivo
Verificar que la base de datos MySQL está conectada correctamente al proyecto PetControl y que los datos se guardan.

---

## 📍 PASO 1: Verificar que MySQL está Activo

### Acción:
1. Abre **XAMPP Control Panel**
2. Verifica que **MySQL** muestre estado **"Running"** (color verde)
3. Nota el puerto (por defecto: **3306**)

### Qué deberías ver:
```
MySQL         Port: 3306    [Start] ← Debe mostrar status "Running" en verde
```

### 📸 **Toma una foto aquí** mostrando:
- XAMPP Control Panel abierto
- MySQL con estado "Running"

**Resultado esperado: ✅ MySQL activo en puerto 3306**

---

## 📍 PASO 2: Verificar Conexión a MySQL desde PowerShell

### Acción:
1. Abre **PowerShell**
2. Ejecuta este comando:

```powershell
Test-NetConnection -ComputerName localhost -Port 3306 -WarningAction SilentlyContinue
```

3. Observa el resultado

### Qué deberías ver:
```
ComputerName     : localhost
RemoteAddress    : 127.0.0.1
RemotePort       : 3306
TcpTestSucceeded : True     ← ¡IMPORTANTE! Debe ser True
```

### 📸 **Toma una foto aquí** mostrando:
- El comando ejecutado en PowerShell
- El resultado con `TcpTestSucceeded : True`

**Resultado esperado: ✅ Conexión exitosa al puerto 3306**

---

## 📍 PASO 3: Verificar Base de Datos en phpMyAdmin

### Acción:
1. Abre tu navegador
2. Ve a: **http://localhost/phpmyadmin**
3. Login:
   - Usuario: `root`
   - Contraseña: (dejar en blanco)
   - Click en "Login"

### Qué deberías ver:
- Panel izquierdo mostrando bases de datos
- En la lista debe estar: **petcontrol_db**

### Dentro de petcontrol_db, deberías ver 2 tablas:
- ✅ `usuarios`
- ✅ `mascotas`

### 📸 **Toma una foto aquí** mostrando:
- phpMyAdmin abierto
- Base de datos `petcontrol_db` visible
- Tablas `usuarios` y `mascotas` listadas

**Resultado esperado: ✅ BD petcontrol_db existe con sus 2 tablas**

---

## 📍 PASO 4: Verificar Estructura de Tabla USUARIOS

### Acción:
1. En phpMyAdmin, haz clic en `petcontrol_db`
2. Haz clic en tabla `usuarios`
3. Ve a pestaña **"Estructura"**

### Qué deberías ver (columnas):
| Campo | Tipo | Nulo | Llave |
|-------|------|------|-------|
| id | BIGINT | No | PRIMARY |
| email | VARCHAR(255) | No | UNIQUE |
| password | VARCHAR(255) | No | |
| nombre | VARCHAR(255) | Sí | |
| rol | ENUM('CLIENTE','VETERINARIO','ADMIN') | No | |
| fecha_creacion | DATETIME(6) | No | |

### 📸 **Toma una foto aquí** mostrando:
- Pestaña "Estructura" de tabla `usuarios`
- Todas las columnas visibles

**Resultado esperado: ✅ Estructura coincide con el modelo**

---

## 📍 PASO 5: Verificar Estructura de Tabla MASCOTAS

### Acción:
1. En phpMyAdmin, haz clic en tabla `mascotas`
2. Ve a pestaña **"Estructura"**

### Qué deberías ver (columnas):
| Campo | Tipo | Nulo | Llave |
|-------|------|------|-------|
| id | BIGINT | No | PRIMARY |
| nombre | VARCHAR(255) | No | |
| especie | VARCHAR(255) | No | |
| raza | VARCHAR(255) | Sí | |
| edad | INTEGER | Sí | |
| descripcion | VARCHAR(1000) | Sí | |
| imagen | VARCHAR(255) | Sí | |
| usuario_id | BIGINT | No | FOREIGN |
| fecha_creacion | DATETIME(6) | No | |
| fecha_actualizacion | DATETIME(6) | Sí | |

### 📸 **Toma una foto aquí** mostrando:
- Pestaña "Estructura" de tabla `mascotas`
- Todas las columnas visibles
- La relación foreign key con `usuarios`

**Resultado esperado: ✅ Estructura coincide con el modelo**

---

## 📍 PASO 6: Verificar Datos en Tabla USUARIOS

### Acción:
1. En phpMyAdmin, haz clic en tabla `usuarios`
2. Ve a pestaña **"Examinar"**

### Qué deberías ver:
Usuarios de prueba creados automáticamente:

| id | email | nombre | rol |
|----|-------|--------|-----|
| 1 | admin@admin.cl | (vacío) | ADMIN |
| 2 | veterinario@petcontrol.cl | (vacío) | VETERINARIO |
| 3 | cliente@petcontrol.cl | (vacío) | CLIENTE |

### 📸 **Toma una foto aquí** mostrando:
- Tabla `usuarios` con los 3 usuarios de prueba
- Columnas: id, email, rol visibles

**Resultado esperado: ✅ Datos de prueba presentes en BD**

---

## 📍 PASO 7: Verificar Datos en Tabla MASCOTAS

### Acción:
1. En phpMyAdmin, haz clic en tabla `mascotas`
2. Ve a pestaña **"Examinar"**

### Qué deberías ver:
- Tabla puede estar vacía (sin mascotas)
- O si ya registraste mascotas, las deberías ver aquí

### 📸 **Toma una foto aquí** mostrando:
- Tabla `mascotas` (vacía o con datos)
- Estructura visible

**Resultado esperado: ✅ Tabla accessible y sincronizada**

---

## 📍 PASO 8: Verificar Backend Ejecutándose

### Acción:
1. Abre **PowerShell**
2. Navega a la carpeta del backend:

```powershell
cd 'C:\Users\ianda\OneDrive\Escritorio\prueba3_fullstack_listo\FULLSTACK_3ERA_PRUEBA\workspace\petcontrol-backend'
```

3. Ejecuta el backend:

```powershell
& 'C:\maven\apache-maven-3.9.11\bin\mvn.cmd' spring-boot:run
```

4. Espera a que veas esta línea en los logs:

```
2025-12-02T05:37:06.667-03:00  INFO ... Tomcat started on port(s): 8080 (http)
2025-12-02T05:37:06.677-03:00  INFO ... Started PetControlApplication
```

### 📸 **Toma una foto aquí** mostrando:
- Los logs finales del backend
- Especialmente las líneas:
  - "Tomcat started on port(s): 8080"
  - "Started PetControlApplication"

**Resultado esperado: ✅ Backend corriendo en puerto 8080**

---

## 📍 PASO 9: Verificar Frontend Ejecutándose

### Acción:
1. Abre **otra terminal PowerShell** (NO cierres la del backend)
2. Navega a la carpeta del frontend:

```powershell
cd 'C:\Users\ianda\OneDrive\Escritorio\prueba3_fullstack_listo\FULLSTACK_3ERA_PRUEBA\workspace\petcontrol-frontend\petcontrol-react'
```

3. Ejecuta el frontend:

```powershell
npm run dev
```

4. Espera a que veas:

```
VITE v7.1.10  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### 📸 **Toma una foto aquí** mostrando:
- Los logs finales del frontend
- La URL: http://localhost:5173/

**Resultado esperado: ✅ Frontend corriendo en puerto 5173**

---

## 📍 PASO 10: Abrir Navegador y Acceder a la Aplicación

### Acción:
1. Abre tu navegador (Chrome, Firefox, Edge, etc.)
2. Ve a: **http://localhost:5173**

### Qué deberías ver:
- Página de login con formulario
- Campos: Email, Contraseña
- Botón: "Ingresar" o "Registrarse"
- Información de credenciales de prueba:
  ```
  Admin: admin@admin.cl / admin.123
  ```

### 📸 **Toma una foto aquí** mostrando:
- Navegador con página http://localhost:5173
- Formulario de login visible
- Información de credenciales

**Resultado esperado: ✅ Frontend cargado correctamente**

---

## 📍 PASO 11: Probar Login con Credenciales de Prueba

### Acción:
1. En el formulario de login:
   - Email: `admin@admin.cl`
   - Contraseña: `admin.123`
2. Click en botón "Ingresar"

### Qué deberías ver:
- Se muestra un spinner/indicador de carga
- Después de 1-2 segundos, te redirige a `/mascotas`
- Página muestra "Mis Mascotas" (puede estar vacía)
- En la barra superior hay un header con email y botón logout

### 📸 **Toma una foto aquí** mostrando:
- Página después del login exitoso
- URL debe ser: http://localhost:5173/mascotas
- Header con usuario logueado

**Resultado esperado: ✅ Login funciona, usuario autenticado**

---

## 📍 PASO 12: Verificar Token en localStorage

### Acción:
1. Con la página abierta en http://localhost:5173/mascotas
2. Presiona **F12** para abrir Developer Tools
3. Ve a pestaña **"Console"**
4. Ejecuta estos comandos:

```javascript
// Ver token guardado
localStorage.getItem('token')

// Ver usuario guardado
JSON.parse(localStorage.getItem('usuarioActual'))
```

### Qué deberías ver:
- **token**: Un string largo que comienza con `eyJ...` (token JWT)
- **usuarioActual**: Objeto con:
  ```json
  {
    "id": 1,
    "email": "admin@admin.cl",
    "nombre": "",
    "rol": "ADMIN"
  }
  ```

### 📸 **Toma una foto aquí** mostrando:
- DevTools abierto (F12)
- Pestaña Console
- Resultado de los comandos localStorage mostrando:
  - Token JWT
  - Usuario con rol ADMIN

**Resultado esperado: ✅ Datos autenticación guardados en localStorage**

---

## 📍 PASO 13: Prueba de Registro de Nuevo Usuario

### Acción:
1. En http://localhost:5173/mascotas
2. Click en botón "Logout" (o navega a http://localhost:5173)
3. Click en "¿No tienes cuenta? Regístrate aquí"
4. Llena formulario:
   - Nombre: `Juan Pérez` (o tu nombre)
   - Email: `juan.perez@example.com` (email único)
   - Contraseña: `pass123`
5. Click en "Registrarse"

### Qué deberías ver:
- Spinner de carga
- Mensaje: "✅ Registro exitoso, iniciando sesión..."
- Redirige a `/mascotas`
- Header muestra el nuevo email registrado

### 📸 **Toma una foto aquí** mostrando:
- Página después del registro exitoso
- URL: http://localhost:5173/mascotas
- Header con nuevo usuario logueado

**Resultado esperado: ✅ Nuevo usuario registrado y autenticado**

---

## 📍 PASO 14: Verificar Nuevo Usuario en Base de Datos

### Acción:
1. Ve a phpMyAdmin: http://localhost/phpmyadmin
2. Selecciona base de datos `petcontrol_db`
3. Haz clic en tabla `usuarios`
4. Ve a pestaña **"Examinar"**

### Qué deberías ver:
- Ahora deberías tener **4 usuarios** (los 3 de prueba + el nuevo registrado)
- Nuevo registro:
  - email: `juan.perez@example.com` (el que registraste)
  - nombre: `Juan Pérez` (el nombre que ingresaste)
  - rol: `CLIENTE` (asignado por defecto)
  - fecha_creacion: La fecha/hora actual

### 📸 **Toma una foto aquí** mostrando:
- Tabla `usuarios` en phpMyAdmin
- El nuevo usuario registrado visible en la lista
- Columnas: id, email, nombre, rol

**Resultado esperado: ✅ Nuevo usuario guardado en BD correctamente**

---

## 📍 PASO 15: Prueba de Crear una Mascota

### Acción:
1. Asegúrate de estar logueado en http://localhost:5173/mascotas
2. Busca el botón para agregar mascota (típicamente "+ Agregar Mascota" o similar)
3. Llena el formulario:
   - Nombre: `Firulais`
   - Especie: `Perro`
   - Raza: `Labrador`
   - Edad: `3`
4. Click en "Guardar" o "Crear"

### Qué deberías ver:
- Mensaje de confirmación (toast o alerta)
- Mascota aparece en la lista de mascotas
- La mascota está asociada al usuario logueado

### 📸 **Toma una foto aquí** mostrando:
- Página de mascotas con la nueva mascota creada
- Formulario de mascota (si es visible)
- Lista de mascotas mostrando "Firulais"

**Resultado esperado: ✅ Mascota creada y guardada**

---

## 📍 PASO 16: Verificar Mascota en Base de Datos

### Acción:
1. Ve a phpMyAdmin: http://localhost/phpmyadmin
2. Selecciona base de datos `petcontrol_db`
3. Haz clic en tabla `mascotas`
4. Ve a pestaña **"Examinar"**

### Qué deberías ver:
- Tabla `mascotas` con al menos 1 registro:
  - nombre: `Firulais`
  - especie: `Perro`
  - raza: `Labrador`
  - edad: `3`
  - usuario_id: `ID del usuario logueado` (ej: 4, si es el nuevo registrado)
  - fecha_creacion: La fecha/hora actual

### 📸 **Toma una foto aquí** mostrando:
- Tabla `mascotas` en phpMyAdmin
- El registro de la mascota creada
- Columnas: id, nombre, especie, raza, edad, usuario_id

**Resultado esperado: ✅ Mascota guardada en BD con relación a usuario**

---

## 📋 RESUMEN DE VERIFICACIÓN

### ✅ Si completaste TODOS los pasos y viste los resultados esperados:

- ✅ MySQL conectado y funcionando
- ✅ Base de datos `petcontrol_db` existe
- ✅ Tablas `usuarios` y `mascotas` creadas con estructura correcta
- ✅ Datos de prueba iniciales en tabla `usuarios`
- ✅ Backend Spring Boot corriendo en puerto 8080
- ✅ Frontend React corriendo en puerto 5173
- ✅ Autenticación funcionando (login exitoso)
- ✅ Almacenamiento de token JWT en localStorage
- ✅ Registro de nuevos usuarios funcionando
- ✅ Nuevos usuarios guardados en BD
- ✅ Creación de mascotas funcionando
- ✅ Mascotas guardadas en BD con relación a usuario

## 🎉 **¡TODA LA CONEXIÓN BD ESTÁ FUNCIONANDO CORRECTAMENTE!**

---

## 📸 FOTOS QUE NECESITO VER (Resumen)

Para verificar que todo funciona, por favor envía screenshots de:

1. ✅ XAMPP con MySQL corriendo
2. ✅ Test-NetConnection resultado (TcpTestSucceeded: True)
3. ✅ phpMyAdmin con `petcontrol_db` y tablas `usuarios`, `mascotas`
4. ✅ Estructura tabla `usuarios`
5. ✅ Estructura tabla `mascotas`
6. ✅ Datos usuarios (3 de prueba + nuevos)
7. ✅ Datos mascotas
8. ✅ Backend logs mostrando "Tomcat started"
9. ✅ Frontend logs mostrando "VITE ready"
10. ✅ Navegador en http://localhost:5173 (login)
11. ✅ Página de mascotas después de login
12. ✅ DevTools mostrando token y usuario en localStorage
13. ✅ Registro exitoso y nuevo usuario logueado
14. ✅ Nueva mascota en lista del frontend
15. ✅ Nueva mascota visible en phpMyAdmin

**Envía las fotos paso a paso y así verifico que cada parte está funcionando correctamente.** 📸

