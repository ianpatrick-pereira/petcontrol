# 🧪 GUÍA DE PRUEBAS - PETCONTROL

## 📋 USUARIOS DE PRUEBA

### 1. ADMINISTRADOR
```
Email: admin@admin.cl
Password: admin.123
Rol: ADMIN
```

**Funcionalidades a probar:**
- ✅ Login exitoso
- ✅ Redirección a /admin/dashboard
- ✅ Ver estadísticas del sistema
- ✅ Acceder a Gestión de Usuarios
- ✅ Acceder a Gestión de Mascotas
- ✅ Eliminar usuarios
- ✅ Crear nueva mascota
- ✅ Editar mascota existente
- ✅ Eliminar mascotas
- ✅ Buscar y filtrar registros

### 2. VETERINARIO
```
Email: veterinario@petcontrol.cl
Password: vet.123
Rol: VETERINARIO
```

**Funcionalidades a probar:**
- ✅ Login exitoso
- ✅ Redirección a /veterinario/mascotas
- ✅ Ver todas las mascotas (solo lectura)
- ✅ Ver información de los dueños
- ✅ Buscar mascotas
- ✅ Acceder a información médica
- ✅ NO puede editar ni eliminar

### 3. CLIENTE
```
Email: cliente@petcontrol.cl
Password: cliente.123
Rol: CLIENTE
```

**Funcionalidades a probar:**
- ✅ Login exitoso
- ✅ Redirección a /cliente/mis-mascotas
- ✅ Ver solo sus propias mascotas
- ✅ Agregar nueva mascota
- ✅ Eliminar sus mascotas
- ✅ Ver detalle de mascota
- ✅ NO puede ver mascotas de otros usuarios

---

## 🧪 CASOS DE PRUEBA DETALLADOS

### PRUEBA 1: Autenticación
**Objetivo:** Verificar que el sistema de login funciona correctamente

1. **Login con credenciales correctas (Admin)**
   - Ir a http://localhost:5173/login
   - Ingresar: admin@admin.cl / admin.123
   - Click en "Iniciar Sesión"
   - ✅ Debe redirigir a /admin/dashboard
   - ✅ Debe mostrar nombre/email en navbar
   - ✅ Debe mostrar menú de usuario

2. **Login con credenciales incorrectas**
   - Ingresar: admin@admin.cl / wrongpassword
   - ✅ Debe mostrar mensaje de error
   - ✅ NO debe redirigir
   - ✅ Debe mantener el formulario visible

3. **Validación de formulario**
   - Dejar campos vacíos
   - ✅ Debe mostrar "El correo es obligatorio"
   - ✅ Debe mostrar "La contraseña es obligatoria"
   - Ingresar email inválido: "notanemail"
   - ✅ Debe mostrar "Correo inválido"

4. **Logout**
   - Click en menú de usuario → "Cerrar Sesión"
   - ✅ Debe redirigir a /login
   - ✅ Debe limpiar token de localStorage
   - ✅ No debe permitir acceso a rutas protegidas

---

### PRUEBA 2: Rol ADMIN - Dashboard
**Objetivo:** Verificar funcionalidades del administrador

1. **Acceso al Dashboard**
   - Login como admin@admin.cl
   - ✅ Debe mostrar 4 tarjetas de estadísticas
   - ✅ Debe mostrar total de mascotas
   - ✅ Debe mostrar total de usuarios
   - ✅ Debe mostrar 8 tarjetas de acceso rápido
   - ✅ Sidebar debe mostrar todas las opciones de admin

2. **Gestión de Usuarios**
   - Click en "Usuarios" en sidebar
   - ✅ Debe mostrar tabla de usuarios
   - ✅ Debe mostrar ID, Nombre, Email, Rol, Fecha
   - ✅ Debe tener buscador funcional
   - ✅ Cada usuario debe tener botón "Eliminar"

3. **Buscar Usuario**
   - Escribir "admin" en buscador
   - ✅ Debe filtrar y mostrar solo usuarios con "admin"
   - Escribir "veterinario"
   - ✅ Debe filtrar y mostrar solo veterinarios
   - Limpiar búsqueda
   - ✅ Debe mostrar todos los usuarios nuevamente

4. **Eliminar Usuario**
   - Click en botón "Eliminar" de un usuario
   - ✅ Debe mostrar modal de confirmación
   - ✅ Debe mostrar nombre del usuario a eliminar
   - Click en "Cancelar"
   - ✅ Debe cerrar modal sin eliminar
   - Click en "Eliminar" nuevamente → "Eliminar"
   - ✅ Debe eliminar usuario
   - ✅ Debe actualizar la tabla
   - ✅ Debe mostrar mensaje de éxito

---

### PRUEBA 3: Rol ADMIN - Gestión de Mascotas
**Objetivo:** Verificar CRUD completo de mascotas

1. **Ver Lista de Mascotas**
   - Click en "Mascotas" en sidebar
   - ✅ Debe mostrar tabla de mascotas
   - ✅ Debe mostrar: ID, Nombre, Especie, Raza, Edad, Dueño
   - ✅ Debe tener buscador funcional
   - ✅ Cada mascota debe tener botones "Editar" y "Eliminar"

2. **Crear Nueva Mascota**
   - Click en "Nueva Mascota"
   - ✅ Debe mostrar formulario
   - ✅ Campos: Nombre*, Especie*, Raza, Edad, Dueño*, Descripción, Imagen
   - Llenar formulario:
     - Nombre: "Max"
     - Especie: "Perro"
     - Raza: "Golden Retriever"
     - Edad: 3
     - Dueño: Seleccionar un cliente
     - Descripción: "Perro muy juguetón"
   - Click en "Crear"
   - ✅ Debe crear la mascota
   - ✅ Debe redirigir a lista de mascotas
   - ✅ Debe mostrar la nueva mascota en la tabla

3. **Validaciones del Formulario**
   - Click en "Nueva Mascota"
   - Dejar campos obligatorios vacíos
   - Click en "Crear"
   - ✅ Debe mostrar "El nombre es obligatorio"
   - ✅ Debe mostrar "La especie es obligatoria"
   - ✅ Debe mostrar "Debe seleccionar un dueño"
   - Ingresar edad negativa: -5
   - ✅ Debe mostrar "La edad debe ser un número positivo"

4. **Editar Mascota**
   - Click en botón "Editar" de una mascota
   - ✅ Debe mostrar formulario pre-llenado
   - Cambiar nombre a "Max Actualizado"
   - Cambiar edad a 4
   - Click en "Actualizar"
   - ✅ Debe actualizar la mascota
   - ✅ Debe redirigir a lista
   - ✅ Debe mostrar cambios en la tabla

5. **Eliminar Mascota**
   - Click en botón "Eliminar"
   - ✅ Debe mostrar modal de confirmación
   - ✅ Debe advertir sobre eliminación de historial médico
   - Click en "Eliminar"
   - ✅ Debe eliminar la mascota
   - ✅ Debe actualizar la tabla

---

### PRUEBA 4: Rol CLIENTE - Mis Mascotas
**Objetivo:** Verificar que cliente solo ve y gestiona sus mascotas

1. **Login como Cliente**
   - Login con cliente@petcontrol.cl / cliente.123
   - ✅ Debe redirigir a /cliente/mis-mascotas
   - ✅ Sidebar debe mostrar solo "Mis Mascotas" y "Mi Perfil"

2. **Ver Mis Mascotas**
   - ✅ Debe mostrar solo mascotas del cliente actual
   - ✅ Debe mostrar en formato grid/tarjetas
   - ✅ Cada tarjeta debe tener: imagen, nombre, especie, raza, edad
   - ✅ Debe tener botón "Agregar Mascota"

3. **Agregar Nueva Mascota**
   - Click en "Agregar Mascota"
   - ✅ Debe mostrar modal con formulario
   - Llenar datos:
     - Nombre: "Luna"
     - Especie: "Gato"
     - Raza: "Siamés"
     - Edad: 2
     - Descripción: "Gata muy cariñosa"
   - Click en "Agregar"
   - ✅ Debe crear la mascota
   - ✅ Debe cerrar modal
   - ✅ Debe actualizar el grid
   - ✅ Debe mostrar la nueva mascota

4. **Eliminar Mascota Propia**
   - Click en botón "Eliminar" de una mascota
   - ✅ Debe mostrar modal de confirmación
   - Click en "Eliminar"
   - ✅ Debe eliminar la mascota
   - ✅ Debe actualizar el grid

5. **Restricciones de Acceso**
   - Intentar acceder a /admin/dashboard
   - ✅ Debe redirigir a /cliente/mis-mascotas
   - Intentar acceder a /veterinario/mascotas
   - ✅ Debe redirigir a /cliente/mis-mascotas

---

### PRUEBA 5: Rol VETERINARIO - Ver Todas las Mascotas
**Objetivo:** Verificar acceso de solo lectura a todas las mascotas

1. **Login como Veterinario**
   - Login con veterinario@petcontrol.cl / vet.123
   - ✅ Debe redirigir a /veterinario/mascotas
   - ✅ Sidebar debe mostrar opciones de veterinario

2. **Ver Todas las Mascotas**
   - ✅ Debe mostrar TODAS las mascotas del sistema
   - ✅ Debe mostrar en formato grid/tarjetas
   - ✅ Cada tarjeta debe incluir información del dueño
   - ✅ Debe tener buscador funcional

3. **Buscar Mascotas**
   - Escribir nombre de mascota
   - ✅ Debe filtrar resultados
   - Escribir nombre de dueño
   - ✅ Debe filtrar por dueño
   - Escribir especie
   - ✅ Debe filtrar por especie

4. **Restricciones de Edición**
   - ✅ NO debe tener botón "Agregar Mascota"
   - ✅ NO debe tener botones "Editar"
   - ✅ NO debe tener botones "Eliminar"
   - ✅ Solo debe tener "Ver Información Médica"

5. **Restricciones de Acceso**
   - Intentar acceder a /admin/dashboard
   - ✅ Debe redirigir a /veterinario/mascotas
   - Intentar acceder a /cliente/mis-mascotas
   - ✅ Debe redirigir a /veterinario/mascotas

---

### PRUEBA 6: Navegación y UI/UX
**Objetivo:** Verificar diseño responsive y navegación

1. **Navbar**
   - ✅ Debe ser sticky (fijo en la parte superior)
   - ✅ Debe mostrar logo "PetControl"
   - ✅ Debe mostrar menú de usuario con nombre/email
   - ✅ Dropdown debe mostrar rol actual
   - ✅ Debe tener opción "Cerrar Sesión"

2. **Sidebar**
   - ✅ Debe mostrar opciones según rol
   - ✅ Opción activa debe estar resaltada
   - ✅ Hover debe cambiar color de fondo
   - ✅ Iconos deben estar alineados
   - ✅ En móvil debe ser colapsable

3. **Responsive Design**
   - Reducir ventana a tamaño móvil (< 768px)
   - ✅ Sidebar debe ocultarse
   - ✅ Navbar debe mostrar menú hamburguesa
   - ✅ Tarjetas deben apilarse en 1 columna
   - ✅ Tablas deben tener scroll horizontal
   - ✅ Botones deben ser táctiles (tamaño adecuado)

4. **Tarjetas de Mascotas**
   - ✅ Hover debe elevar la tarjeta
   - ✅ Imagen debe hacer zoom suave
   - ✅ Sombra debe aumentar en hover
   - ✅ Transiciones deben ser suaves
   - ✅ Información debe ser legible

5. **Formularios**
   - ✅ Labels deben estar claros
   - ✅ Campos obligatorios marcados con *
   - ✅ Validaciones en tiempo real
   - ✅ Mensajes de error en rojo
   - ✅ Focus debe resaltar el campo
   - ✅ Botones deben tener estados de carga

---

### PRUEBA 7: Páginas Públicas
**Objetivo:** Verificar páginas sin autenticación

1. **Homepage (http://localhost:5173/)**
   - ✅ Debe mostrar hero section con logo
   - ✅ Debe tener botones "Registrarse" e "Iniciar Sesión"
   - ✅ Debe mostrar 3 características principales
   - ✅ Debe mostrar información de roles
   - ✅ Debe tener footer con información de contacto

2. **Página About**
   - ✅ Debe mostrar información del proyecto
   - ✅ Debe listar tecnologías utilizadas
   - ✅ Debe tener información de contacto

3. **Registro de Usuario**
   - Ir a /register
   - Llenar formulario:
     - Nombre: "Usuario Prueba"
     - Email: "prueba@test.cl"
     - Password: "test.123"
     - Confirmar Password: "test.123"
   - Click en "Registrarse"
   - ✅ Debe crear usuario
   - ✅ Debe hacer login automático
   - ✅ Debe redirigir según rol (CLIENTE por defecto)

---

## 🎨 CHECKLIST DE DISEÑO

### Tipografía
- [x] Fuentes legibles y profesionales
- [x] Tamaños jerárquicos (h1-h6)
- [x] Line-height adecuado (1.6)
- [x] Contraste suficiente con fondo

### Colores
- [x] Paleta consistente (Bootstrap)
- [x] Badges de roles con colores distintivos
- [x] Botones con colores semánticos
- [x] Hover states visibles

### Espaciado
- [x] Padding consistente en cards
- [x] Margin entre elementos
- [x] Espaciado en formularios
- [x] Separación en tablas

### Componentes
- [x] Cards con sombras sutiles
- [x] Botones con border-radius
- [x] Inputs con focus states
- [x] Modales centrados
- [x] Alertas con animaciones

### Interactividad
- [x] Hover effects en cards
- [x] Transiciones suaves
- [x] Loading states en botones
- [x] Confirmaciones para acciones destructivas

### Responsive
- [x] Grid adaptable
- [x] Sidebar colapsable en móvil
- [x] Tablas con scroll horizontal
- [x] Botones táctiles
- [x] Imágenes responsive

---

## ✅ RESULTADOS ESPERADOS

### Funcionalidad
- ✅ Todos los usuarios pueden hacer login
- ✅ Redirección correcta según rol
- ✅ CRUD completo funciona
- ✅ Validaciones funcionan
- ✅ Búsqueda/filtrado funciona
- ✅ Restricciones de acceso funcionan

### Diseño
- ✅ Interfaz limpia y minimalista
- ✅ Diseño profesional
- ✅ Responsive en todos los dispositivos
- ✅ Transiciones suaves
- ✅ Colores consistentes
- ✅ Tipografía legible

### Seguridad
- ✅ JWT tokens funcionan
- ✅ Rutas protegidas
- ✅ Roles respetados
- ✅ Logout limpia sesión

---

## 🐛 PROBLEMAS CONOCIDOS Y SOLUCIONES

### Problema: Backend no conecta
**Solución:**
```bash
# Verificar que backend esté corriendo
cd /workspace/petcontrol-backend
./mvnw spring-boot:run
```

### Problema: CORS error
**Solución:** Backend ya tiene CORS configurado para localhost:5173

### Problema: Token expirado
**Solución:** Hacer logout y volver a hacer login

### Problema: No se ven las mascotas
**Solución:** Verificar que hay datos en la base de datos MySQL

---

**NOTA:** Todos estos casos de prueba deben ejecutarse con el backend corriendo en http://localhost:8080