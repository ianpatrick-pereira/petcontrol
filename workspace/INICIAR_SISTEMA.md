# 🚀 Guía para Iniciar el Sistema PetControl

## ✅ Pre-requisitos (verificar antes de empezar)

### 1. XAMPP - MySQL corriendo
```powershell
# Abrir XAMPP Control Panel y verificar que MySQL esté "Running"
# Si no está corriendo, hacer clic en "Start" en la fila de MySQL
```

### 2. Verificar Base de Datos
```powershell
# En PowerShell, ejecuta:
& 'C:\xampp\mysql\bin\mysql.exe' -u root --password= -e "USE petcontrol_db; SHOW TABLES;"

# Deberías ver:
# +-------------------------+
# | Tables_in_petcontrol_db |
# +-------------------------+
# | mascotas                |
# | usuarios                |
# +-------------------------+
```

---

## 📝 PASO 1: Iniciar el Backend (API)

### Opción A - Desde PowerShell (recomendada)

```powershell
# 1. Ir a la carpeta del backend
cd 'C:\Users\ianda\OneDrive\Escritorio\prueba3_fullstack_listo\FULLSTACK_3ERA_PRUEBA\workspace\petcontrol-backend'

# 2. Iniciar la aplicación con Maven
& 'C:\maven\apache-maven-3.9.11\bin\mvn.cmd' spring-boot:run

# ⏳ Espera a ver este mensaje:
# "Started PetControlApplication in X seconds"
# "Tomcat started on port 8080 (http) with context path '/api'"
```

### Opción B - Desde nueva ventana de PowerShell

```powershell
# Abre una NUEVA ventana de PowerShell y ejecuta:
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'C:\Users\ianda\OneDrive\Escritorio\prueba3_fullstack_listo\FULLSTACK_3ERA_PRUEBA\workspace\petcontrol-backend'; & 'C:\maven\apache-maven-3.9.11\bin\mvn.cmd' spring-boot:run"
```

### ✅ Verificar que el backend está corriendo

```powershell
# Ejecuta en otra terminal:
Test-NetConnection -ComputerName localhost -Port 8080

# Deberías ver:
# TcpTestSucceeded : True
```

---

## 📝 PASO 2: Iniciar el Frontend (React)

### Desde PowerShell (nueva ventana)

```powershell
# 1. Ir a la carpeta del frontend
cd 'C:\Users\ianda\OneDrive\Escritorio\prueba3_fullstack_listo\FULLSTACK_3ERA_PRUEBA\workspace\petcontrol-frontend\petcontrol-react'

# 2. Iniciar Vite
npm run dev

# ⏳ Espera a ver:
# VITE v7.x.x  ready in XXX ms
# ➜  Local:   http://localhost:5173/
```

---

## 🧪 PASO 3: Probar la API manualmente

### Probar Login con PowerShell

```powershell
# Crear JSON body
$body = @{
    email = "admin@admin.cl"
    password = "admin.123"
} | ConvertTo-Json

# Enviar POST a /api/auth/login
$response = Invoke-RestMethod -Uri 'http://localhost:8080/api/auth/login' -Method Post -ContentType 'application/json' -Body $body

# Ver respuesta
$response | ConvertTo-Json

# Deberías ver:
# {
#   "token": "eyJhbGciOiJIUzI1NiJ9...",
#   "email": "admin@admin.cl",
#   "nombre": "Administrador del Sistema",
#   "rol": "ADMIN",
#   "id": 1
# }
```

### Guardar el token y probar endpoint protegido

```powershell
# Guardar token
$token = $response.token

# Llamar a /api/mascotas (requiere autenticación)
$headers = @{
    "Authorization" = "Bearer $token"
}

Invoke-RestMethod -Uri 'http://localhost:8080/api/mascotas' -Method Get -Headers $headers

# Si no hay mascotas, verás: []
# Si hay mascotas, verás un array con los datos
```

---

## 🌐 PASO 4: Probar desde el Navegador

### Abrir la aplicación

```
http://localhost:5173
```

### Usuarios de prueba disponibles

| Email | Contraseña | Rol |
|-------|------------|-----|
| admin@admin.cl | admin.123 | ADMIN |
| veterinario@petcontrol.cl | vet.123 | VETERINARIO |
| cliente@petcontrol.cl | cliente.123 | CLIENTE |

---

## ❌ Solución de Problemas Comunes

### Problema 1: "Port 8080 already in use"

```powershell
# Ver qué proceso usa el puerto 8080
netstat -aon | findstr ":8080"

# Ejemplo de salida:
# TCP    0.0.0.0:8080    0.0.0.0:0    LISTENING    12345

# Matar el proceso (reemplaza 12345 con el PID real)
Stop-Process -Id 12345 -Force

# Reintentar iniciar el backend
```

### Problema 2: "Cannot connect to MySQL"

```powershell
# Verificar que MySQL está corriendo
Test-NetConnection -ComputerName localhost -Port 3306

# Si TcpTestSucceeded = False:
# - Abre XAMPP Control Panel
# - Haz clic en "Start" en MySQL
# - Espera a que diga "Running"
```

### Problema 3: Frontend no carga en http://localhost:5173

```powershell
# Verificar que Vite está corriendo
netstat -aon | findstr ":5173"

# Si no hay salida:
# - Verifica que ejecutaste `npm run dev`
# - Revisa si hay errores en la terminal donde corriste el comando
# - Intenta: npm install (por si faltan dependencias)
```

### Problema 4: Login devuelve "Email o contraseña incorrectos"

```powershell
# Verificar usuarios en la base de datos
& 'C:\xampp\mysql\bin\mysql.exe' -u root --password= -e "USE petcontrol_db; SELECT email, nombre, rol FROM usuarios;"

# Deberías ver los 3 usuarios de prueba
# Si no están, ejecuta:
# (El backend los crea automáticamente al iniciar si no existen)
```

### Problema 5: CORS errors en el navegador

```powershell
# Verifica que el frontend esté en el puerto correcto
# Si Vite inició en 5174 en lugar de 5173:

# El backend ya está configurado para aceptar ambos puertos:
# - http://localhost:5173
# - http://localhost:5174
# - http://localhost:3000
```

---

## 📊 Verificación Completa del Sistema

### Script de verificación rápida

```powershell
Write-Host "=== VERIFICACIÓN DEL SISTEMA PETCONTROL ===" -ForegroundColor Cyan

# 1. MySQL
Write-Host "`n1. Verificando MySQL..." -ForegroundColor Yellow
$mysql = Test-NetConnection -ComputerName localhost -Port 3306 -WarningAction SilentlyContinue
if ($mysql.TcpTestSucceeded) {
    Write-Host "   ✅ MySQL corriendo en puerto 3306" -ForegroundColor Green
} else {
    Write-Host "   ❌ MySQL NO está corriendo" -ForegroundColor Red
}

# 2. Backend
Write-Host "`n2. Verificando Backend..." -ForegroundColor Yellow
$backend = Test-NetConnection -ComputerName localhost -Port 8080 -WarningAction SilentlyContinue
if ($backend.TcpTestSucceeded) {
    Write-Host "   ✅ Backend corriendo en puerto 8080" -ForegroundColor Green
} else {
    Write-Host "   ❌ Backend NO está corriendo" -ForegroundColor Red
}

# 3. Frontend
Write-Host "`n3. Verificando Frontend..." -ForegroundColor Yellow
$frontend5173 = Test-NetConnection -ComputerName localhost -Port 5173 -WarningAction SilentlyContinue
$frontend5174 = Test-NetConnection -ComputerName localhost -Port 5174 -WarningAction SilentlyContinue
if ($frontend5173.TcpTestSucceeded) {
    Write-Host "   ✅ Frontend corriendo en puerto 5173" -ForegroundColor Green
} elseif ($frontend5174.TcpTestSucceeded) {
    Write-Host "   ✅ Frontend corriendo en puerto 5174" -ForegroundColor Green
} else {
    Write-Host "   ❌ Frontend NO está corriendo" -ForegroundColor Red
}

Write-Host "`n=== FIN VERIFICACIÓN ===" -ForegroundColor Cyan
```

---

## 🎯 Resumen de URLs

- **Frontend**: http://localhost:5173 (o 5174)
- **Backend API**: http://localhost:8080/api
- **Swagger UI**: http://localhost:8080/api/swagger-ui.html
- **API Docs**: http://localhost:8080/api/api-docs
- **phpMyAdmin**: http://localhost/phpmyadmin

---

## 📞 Comandos Útiles de Desarrollo

### Ver logs del backend en tiempo real
```powershell
# Los logs aparecen automáticamente en la terminal donde ejecutaste mvn spring-boot:run
```

### Detener servicios
```powershell
# Backend: Ctrl+C en la terminal donde corre mvn
# Frontend: Ctrl+C en la terminal donde corre npm run dev
```

### Recompilar backend tras cambios
```powershell
cd 'C:\Users\ianda\OneDrive\Escritorio\prueba3_fullstack_listo\FULLSTACK_3ERA_PRUEBA\workspace\petcontrol-backend'
& 'C:\maven\apache-maven-3.9.11\bin\mvn.cmd' clean package
```

---

## ✨ Siguiente Paso Recomendado

Después de iniciar todo correctamente:

1. Abre http://localhost:5173
2. Haz login con `admin@admin.cl` / `admin.123`
3. Crea una mascota de prueba
4. Verifica que se guarde en la base de datos:
   ```powershell
   & 'C:\xampp\mysql\bin\mysql.exe' -u root --password= -e "USE petcontrol_db; SELECT * FROM mascotas;"
   ```
