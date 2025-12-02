# 🐾 Guía Paso a Paso: Iniciar PetControl Fullstack

Esta guía te ayudará a poner en marcha el proyecto completo (Backend + Frontend + Base de Datos).

---

## ✅ Requisitos Previos

Asegúrate de tener instalado:
- **XAMPP** (Apache + MySQL) — [Descargar](https://www.apachefriends.org/)
- **Java 17+** — [Descargar](https://www.oracle.com/java/technologies/downloads/)
- **Maven** — [Descargar](https://maven.apache.org/download.cgi)
- **Node.js + npm** — [Descargar](https://nodejs.org/)
- **Git** (opcional, pero recomendado)

Verifica que están instalados:
```powershell
java -version
mvn -version
node -v
npm -v
```

---

## 🚀 PASO 1: Iniciar XAMPP (Base de Datos)

### 1.1 Abre XAMPP
- Busca "XAMPP Control Panel" en tu menú de inicio o ve a la carpeta de instalación.
- Abre la aplicación.

### 1.2 Inicia Apache y MySQL
- Haz clic en el botón **"Start"** junto a **Apache**.
- Haz clic en el botón **"Start"** junto a **MySQL**.
- Espera a que ambos digan **"Running"** (fondo verde).

**Verifica que están corriendo:**
```powershell
Test-NetConnection -ComputerName localhost -Port 80
Test-NetConnection -ComputerName localhost -Port 3306
```

Ambos deben mostrar: `TcpTestSucceeded : True`

---

## 🛠️ PASO 2: Iniciar el Backend (Spring Boot)

### 2.1 Abre una terminal PowerShell

### 2.2 Navega a la carpeta del backend
```powershell
cd "C:\Users\ianda\OneDrive\Escritorio\prueba3_fullstack_listo\FULLSTACK_3ERA_PRUEBA\workspace\petcontrol-backend"
```

### 2.3 Verifica que Maven está instalado
```powershell
mvn -version
```

### 2.4 Inicia el backend
```powershell
mvn spring-boot:run
```

**Espera a que veas en la terminal:**
```
Started PetControlBackendApplication
Tomcat started on port(s): 8080
```

Esto significa que el backend está corriendo en `http://localhost:8080`

**La base de datos se crea automáticamente** (Hibernate DDL-AUTO = update)

**IMPORTANTE: Mantén esta terminal abierta. El backend debe seguir corriendo mientras usas la app.**

---

## 💻 PASO 3: Iniciar el Frontend (React + Vite)

### 3.1 Abre una NUEVA terminal PowerShell (distinta a la del backend)

### 3.2 Navega a la carpeta del frontend
```powershell
cd "C:\Users\ianda\OneDrive\Escritorio\prueba3_fullstack_listo\FULLSTACK_3ERA_PRUEBA\workspace\petcontrol-frontend\petcontrol-react"
```

### 3.3 Instala las dependencias (solo la primera vez)
```powershell
npm install
```

### 3.4 Inicia el servidor de desarrollo
```powershell
npm run dev
```

**Verás en la terminal:**
```
VITE v7.1.10  ready in XXX ms
Local:   http://localhost:5173/
```

**IMPORTANTE: Mantén esta terminal abierta. El frontend debe seguir corriendo mientras usas la app.**

---

## 🌐 PASO 4: Accede a la Aplicación

### 4.1 Abre tu navegador (Chrome, Firefox, Edge, etc.)

### 4.2 Ve a esta URL
```
http://localhost:5173
```

### 4.3 Deberías ver la pantalla de **"Iniciar Sesión"**

---

## 🔑 PASO 5: Inicia Sesión

### 5.1 Usa las credenciales de administrador de prueba

**Email:** `admin@admin.cl`  
**Contraseña:** `admin.123`

### 5.2 Selecciona el tipo de usuario
- Opción 1: **Usuario** (cliente regular)
- Opción 2: **Administrador** (panel admin completo)

### 5.3 Haz clic en **"Ingresar"**

Si todo está bien:
- ✅ Verás el panel correspondiente a tu rol
- ✅ Podrás navegar por las secciones
- ✅ Las alertas aparecerán como toasts (esquina superior derecha)

---

## 📋 Vista General del Proyecto

```
petcontrol-backend/          ← Backend Spring Boot (Puerto 8080)
├── src/main/java/com/petcontrol/
│   └── (controladores, servicios, modelos)
├── src/main/resources/
│   └── application.properties  ← Configuración BD
└── pom.xml                     ← Dependencias Maven

petcontrol-frontend/
└── petcontrol-react/          ← Frontend React + Vite (Puerto 5173)
    ├── src/
    │   ├── pages/             ← Login, Admin, Veterinario, MisMascotas
    │   ├── components/        ← Header, etc.
    │   ├── context/           ← AppContext, AlertContext
    │   ├── services/          ← authService, mascotaService, api
    │   └── App.jsx            ← Rutas principales
    └── package.json           ← Dependencias npm
```

---

## 🗄️ Base de Datos

### Configuración (en `petcontrol-backend/src/main/resources/application.properties`)
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/petcontrol_db
spring.datasource.username=root
spring.datasource.password=
```

- **Host:** localhost
- **Puerto:** 3306 (MySQL)
- **Usuario:** root
- **Contraseña:** (vacía)
- **Base de datos:** petcontrol_db (se crea automáticamente)

Si necesitas cambiar estas credenciales (ej. si MySQL requiere contraseña):
1. Edita `petcontrol-backend/src/main/resources/application.properties`
2. Guarda los cambios
3. Reinicia el backend (`mvn spring-boot:run`)

---

## 🐛 Solución de Problemas

### "Connection refused" o "Can't connect to MySQL"
- ✅ Verifica que XAMPP tiene Apache y MySQL corriendo
- ✅ Comprueba: `Test-NetConnection -ComputerName localhost -Port 3306`
- ✅ Reinicia XAMPP si es necesario

### "Port 8080 already in use"
- El backend ya está corriendo en otra terminal
- O algún otro programa usa el puerto 8080
- Solución: Cierra otras instancias o cambia el puerto en `application.properties` (`server.port=8081`)

### "Cannot find module 'react'" o errores npm
- En la carpeta `petcontrol-react`, ejecuta: `npm install`
- Espera a que termine e intenta `npm run dev` nuevamente

### "Página en blanco" en el navegador
- Abre la consola (F12 → Console)
- Busca errores en rojo
- Asegúrate de que el backend esté corriendo (verifica `http://localhost:8080` en el navegador)

### "Email o contraseña incorrectos" al login
- Verifica que escribes correctamente: `admin@admin.cl` / `admin.123`
- Confirma que el backend está corriendo y responde
- Revisa la consola del backend para ver si hay errores

---

## 📱 Roles Disponibles

Una vez logueado, puedes acceder a diferentes vistas según tu rol:

| Rol | Acceso | Ruta |
|-----|--------|------|
| **CLIENTE** | Ver y gestionar sus mascotas | `/mascotas` |
| **VETERINARIO** | Ver todas las mascotas, usuarios y estadísticas | `/veterinario` |
| **ADMIN** | Panel de administración completo (usuarios, mascotas, etc.) | `/admin` |

---

## ✨ Características Principales

✅ **Autenticación y Autorización** (JWT)  
✅ **Gestión de Mascotas** (CRUD)  
✅ **Gestión de Usuarios** (Solo Admin)  
✅ **Alertas dinámicas con toasts JS**  
✅ **Pantalla completa responsiva**  
✅ **Base de datos MySQL automática**  

---

## 📝 Comandos Rápidos (Referencia)

**Backend (Terminal 1):**
```powershell
cd ".../petcontrol-backend"
mvn spring-boot:run
```

**Frontend (Terminal 2):**
```powershell
cd ".../petcontrol-frontend/petcontrol-react"
npm install      # Solo la primera vez
npm run dev
```

**Verificar puertos:**
```powershell
Test-NetConnection -ComputerName localhost -Port 3306  # MySQL
Test-NetConnection -ComputerName localhost -Port 8080  # Backend
Test-NetConnection -ComputerName localhost -Port 5173  # Frontend
```

---

## 🎯 Checklist Final

- [ ] XAMPP instalado y corriendo (Apache + MySQL)
- [ ] Java 17+ instalado
- [ ] Maven instalado
- [ ] Node.js + npm instalados
- [ ] Backend corriendo en terminal (`mvn spring-boot:run`)
- [ ] Frontend corriendo en terminal (`npm run dev`)
- [ ] Navegador abierto en `http://localhost:5173`
- [ ] Logueado con `admin@admin.cl` / `admin.123`
- [ ] Ves el panel de administración o la sección de mascotas

---

## 🆘 ¿Necesitas Ayuda?

Si algo no funciona:
1. Revisa esta guía (especialmente "Solución de Problemas")
2. Verifica los comandos de conectividad (puertos)
3. Revisa la consola del backend y frontend (busca errores en rojo)
4. Abre F12 en el navegador → Console → busca errores JavaScript

¡Espero que todo funcione correctamente! 🚀
