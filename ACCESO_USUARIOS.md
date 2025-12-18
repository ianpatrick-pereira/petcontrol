# 🔐 ACCESO Y PERMISOS DE USUARIOS - PETCONTROL

## 📋 RESUMEN DE CAMBIOS

Se ha actualizado el sistema para permitir que los usuarios **admin** y **veterinario** puedan:
- ✅ **Iniciar sesión** normalmente con sus credenciales
- ✅ **Acceder a todas sus funcionalidades** según su rol
- ✅ **Modificar lo que tengan permitido** según sus permisos

**PERO** estos usuarios están **protegidos** contra:
- ❌ **Eliminación** desde el panel de administración
- ❌ **Registro duplicado** (no se puede crear otro usuario con estos emails)

---

## 👥 USUARIOS DEL SISTEMA

### 1. ADMIN (admin@admin.cl)
**Contraseña:** `admin.123`

**Puede hacer:**
- ✅ Iniciar sesión en `/login`
- ✅ Acceder al dashboard de administración
- ✅ Ver y gestionar todos los usuarios (excepto eliminar admin y veterinario)
- ✅ Crear, editar y eliminar mascotas
- ✅ Ver todas las mascotas del sistema
- ✅ Gestionar recetas y vacunas
- ✅ Modificar su propio perfil

**NO puede:**
- ❌ Ser eliminado por otro administrador
- ❌ Permitir que alguien se registre con su email

**Redirección al login:** `/admin/dashboard`

---

### 2. VETERINARIO (veterinario@petcontrol.cl)
**Contraseña:** `vet.123`

**Puede hacer:**
- ✅ Iniciar sesión en `/login`
- ✅ Ver todas las mascotas del sistema (solo lectura)
- ✅ Ver información de los dueños de las mascotas
- ✅ Buscar y filtrar mascotas
- ✅ Acceder a información médica (recetas, vacunas)
- ✅ Modificar su propio perfil

**NO puede:**
- ❌ Editar o eliminar mascotas
- ❌ Gestionar usuarios
- ❌ Ser eliminado por un administrador
- ❌ Permitir que alguien se registre con su email

**Redirección al login:** `/veterinario/mascotas`

---

### 3. CLIENTE (cliente@petcontrol.cl)
**Contraseña:** `cliente.123`

**Puede hacer:**
- ✅ Iniciar sesión en `/login`
- ✅ Ver solo sus propias mascotas
- ✅ Agregar nuevas mascotas
- ✅ Eliminar sus propias mascotas
- ✅ Ver detalle de sus mascotas
- ✅ Modificar su propio perfil

**NO puede:**
- ❌ Ver mascotas de otros usuarios
- ❌ Acceder al panel de administración
- ❌ Gestionar usuarios

**Redirección al login:** `/cliente/mis-mascotas`

---

### 4. NUEVOS USUARIOS (Cualquier email)
**Ejemplo:** `juan@test.cl`

**Proceso de registro:**
1. Ir a `/register`
2. Completar formulario con:
   - Nombre completo
   - Email (NO puede ser admin@admin.cl ni veterinario@petcontrol.cl)
   - Contraseña (mínimo 8 caracteres, con número y punto)
   - Confirmar contraseña
3. Se crea automáticamente con rol **CLIENTE**
4. Login automático después del registro
5. Redirección a `/cliente/mis-mascotas`

**Puede hacer:**
- ✅ Todo lo que puede hacer un CLIENTE
- ✅ Modificar su propio perfil
- ✅ Ser eliminado por un administrador (si es necesario)

---

## 🔒 PROTECCIÓN DE USUARIOS PREDEFINIDOS

### Backend (Java/Spring Boot)

**Archivo:** `AuthService.java`
```java
// Emails protegidos que no pueden ser registrados por usuarios normales
// PERO SÍ pueden hacer login si ya existen en la base de datos
private static final List<String> PROTECTED_EMAILS = Arrays.asList(
    "admin@admin.cl",
    "veterinario@petcontrol.cl"
);
```

**En Registro:**
- Si alguien intenta registrarse con `admin@admin.cl` o `veterinario@petcontrol.cl`
- Error: "Este correo está reservado y no puede ser registrado. Si ya tienes una cuenta, inicia sesión."

**En Login:**
- ✅ PERMITIDO para todos los usuarios, incluyendo admin y veterinario
- No hay restricción, pueden iniciar sesión normalmente

**En Eliminación:**
- Si un admin intenta eliminar a admin@admin.cl o veterinario@petcontrol.cl
- Error: "No se puede eliminar este usuario. Es un usuario protegido del sistema."

---

### Frontend (React)

**Archivo:** `Register.jsx`
```javascript
// Verificar que no se intente registrar con emails protegidos
const protectedEmails = ['admin@admin.cl', 'veterinario@petcontrol.cl'];
if (protectedEmails.includes(formData.email.toLowerCase().trim())) {
  newErrors.email = 'Este correo ya está registrado. Por favor, inicia sesión.';
}
```

**Archivo:** `UsuariosLista.jsx`
```javascript
// Proteger usuarios predefinidos - NO permitir eliminación
const protectedEmails = ['admin@admin.cl', 'veterinario@petcontrol.cl'];
if (protectedEmails.includes(deleteModal.usuario.email.toLowerCase())) {
  showToast('No se puede eliminar este usuario. Es un usuario protegido del sistema.', 'error');
  return;
}
```

**Interfaz visual:**
- Los usuarios protegidos muestran un ícono de escudo 🛡️ en la lista
- El botón "Eliminar" está reemplazado por un badge "Protegido"
- Tooltip explica que el usuario no se puede eliminar

---

## 🧪 CASOS DE PRUEBA

### Prueba 1: Login con Admin
```
1. Ir a http://localhost:5173/login
2. Click en botón "Admin" (auto-completa credenciales)
3. Click "Iniciar Sesión"
4. ✅ Debe mostrar toast verde: "¡Inicio de sesión exitoso!"
5. ✅ Debe redirigir a /admin/dashboard
6. ✅ Debe mostrar todas las opciones de administración
```

### Prueba 2: Login con Veterinario
```
1. Ir a http://localhost:5173/login
2. Click en botón "Veterinario"
3. Click "Iniciar Sesión"
4. ✅ Debe mostrar toast verde
5. ✅ Debe redirigir a /veterinario/mascotas
6. ✅ Debe mostrar todas las mascotas (solo lectura)
```

### Prueba 3: Login con Cliente
```
1. Ir a http://localhost:5173/login
2. Click en botón "Cliente"
3. Click "Iniciar Sesión"
4. ✅ Debe redirigir a /cliente/mis-mascotas
5. ✅ Debe mostrar solo sus mascotas
```

### Prueba 4: Intentar Registrar con Email Protegido
```
1. Ir a /register
2. Email: admin@admin.cl
3. ✅ Debe mostrar error: "Este correo ya está registrado. Por favor, inicia sesión."
4. ✅ No debe permitir el registro
```

### Prueba 5: Intentar Eliminar Usuario Protegido
```
1. Login como admin
2. Ir a "Usuarios"
3. Buscar admin@admin.cl o veterinario@petcontrol.cl
4. ✅ Debe mostrar badge "Protegido" en lugar de botón "Eliminar"
5. ✅ Debe mostrar ícono de escudo 🛡️
6. Si se intenta eliminar desde backend: Error toast rojo
```

### Prueba 6: Registro de Nuevo Usuario
```
1. Ir a /register
2. Llenar:
   - Nombre: María González
   - Email: maria@test.cl
   - Password: maria.2024 (8 caracteres, número, punto)
   - Confirmar: maria.2024
3. ✅ Debe crear usuario con rol CLIENTE
4. ✅ Debe hacer login automático
5. ✅ Debe redirigir a /cliente/mis-mascotas
```

### Prueba 7: Admin Elimina Usuario Normal
```
1. Login como admin
2. Ir a "Usuarios"
3. Buscar un usuario normal (ej: maria@test.cl)
4. Click "Eliminar"
5. Confirmar eliminación
6. ✅ Debe eliminar correctamente
7. ✅ Debe mostrar toast verde: "Usuario eliminado correctamente"
```

---

## 📊 MATRIZ DE PERMISOS

| Acción | Admin | Veterinario | Cliente | Nuevo Usuario |
|--------|-------|-------------|---------|---------------|
| **Login** | ✅ | ✅ | ✅ | ✅ |
| **Ver Dashboard Admin** | ✅ | ❌ | ❌ | ❌ |
| **Gestionar Usuarios** | ✅ | ❌ | ❌ | ❌ |
| **Eliminar Admin/Vet** | ❌ | ❌ | ❌ | ❌ |
| **Eliminar Usuarios Normales** | ✅ | ❌ | ❌ | ❌ |
| **Ver Todas las Mascotas** | ✅ | ✅ (solo lectura) | ❌ | ❌ |
| **Crear Mascotas** | ✅ | ❌ | ✅ (propias) | ✅ (propias) |
| **Editar Mascotas** | ✅ | ❌ | ❌ | ❌ |
| **Eliminar Mascotas** | ✅ | ❌ | ✅ (propias) | ✅ (propias) |
| **Ver Mis Mascotas** | ✅ | ❌ | ✅ | ✅ |
| **Modificar Perfil Propio** | ✅ | ✅ | ✅ | ✅ |
| **Ser Eliminado** | ❌ | ❌ | ✅ | ✅ |
| **Registrarse Nuevamente** | ❌ | ❌ | ✅ | ✅ |

---

## 🔄 FLUJO DE AUTENTICACIÓN

```
┌─────────────────┐
│  Usuario accede │
│   a /login      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Ingresa email   │
│  y contraseña   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐      ❌ Credenciales incorrectas
│  Backend valida │ ────────────────────────────────► Toast rojo: Error
└────────┬────────┘
         │ ✅ Credenciales correctas
         ▼
┌─────────────────┐
│  Genera JWT     │
│  con rol        │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Redirección     │
│ según rol:      │
│ - ADMIN → /admin/dashboard        │
│ - VETERINARIO → /veterinario/mascotas │
│ - CLIENTE → /cliente/mis-mascotas     │
└─────────────────┘
```

---

## ✅ RESUMEN

**LO QUE CAMBIÓ:**
1. ✅ Admin y Veterinario **SÍ pueden iniciar sesión** normalmente
2. ✅ Admin y Veterinario **SÍ pueden acceder a sus funcionalidades**
3. ✅ Admin y Veterinario **SÍ pueden modificar lo permitido** según su rol
4. ❌ Admin y Veterinario **NO pueden ser eliminados**
5. ❌ Admin y Veterinario **NO permiten registro duplicado**

**LO QUE NO CAMBIÓ:**
- Validación de contraseñas (8 caracteres, número, punto)
- Sistema de Toast notifications
- Redirección por rol
- Permisos de cada rol
- Configuración de base de datos (XAMPP)

---

**ESTADO:** ✅ TODOS LOS CAMBIOS IMPLEMENTADOS Y FUNCIONANDO