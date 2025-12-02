# Manual de Usuario - PetControl
## Sistema de Gestión de Mascotas

---

## Índice

1. [Introducción](#1-introducción)
2. [Requisitos del Sistema](#2-requisitos-del-sistema)
3. [Acceso al Sistema](#3-acceso-al-sistema)
4. [Registro de Usuario](#4-registro-de-usuario)
5. [Inicio de Sesión](#5-inicio-de-sesión)
6. [Gestión de Mascotas](#6-gestión-de-mascotas)
7. [Panel de Administración](#7-panel-de-administración)
8. [Cerrar Sesión](#8-cerrar-sesión)
9. [Preguntas Frecuentes](#9-preguntas-frecuentes)
10. [Solución de Problemas](#10-solución-de-problemas)

---

## 1. Introducción

PetControl es un sistema web para la gestión digital de mascotas que permite a los usuarios:

- Registrar y gestionar información de sus mascotas
- Mantener un registro organizado con fotos y descripciones
- Acceder a su información desde cualquier dispositivo
- (Para administradores) Visualizar todas las mascotas del sistema

---

## 2. Requisitos del Sistema

### Requisitos Mínimos

- **Navegador web**: Chrome, Firefox, Safari o Edge (versión actualizada)
- **Conexión a internet**: Estable
- **Resolución de pantalla**: Mínimo 1024x768 píxeles

### Dispositivos Compatibles

- ✅ Computadoras de escritorio
- ✅ Laptops
- ✅ Tablets
- ✅ Smartphones

---

## 3. Acceso al Sistema

### URL de Acceso

```
http://localhost:5173
```

### Pantalla de Inicio

Al acceder al sistema, verás la pantalla de bienvenida con dos opciones:

1. **Ingresar / Crear cuenta**: Te lleva a la página de login
2. **Ir a Mis Mascotas**: Te redirige al login si no has iniciado sesión

![Pantalla de inicio con opciones de ingreso y navegación]

---

## 4. Registro de Usuario

### Paso 1: Acceder al Formulario de Registro

1. Haz clic en "Ingresar / Crear cuenta" en la página principal
2. En la página de login, haz clic en "Regístrate aquí"

![Botón de registro en la página de login]

### Paso 2: Completar el Formulario

Ingresa la siguiente información:

- **Email**: Tu dirección de correo electrónico (debe ser válida y única)
- **Contraseña**: Mínimo 3 caracteres (se recomienda usar una contraseña segura)

![Formulario de registro con campos de email y contraseña]

### Paso 3: Confirmar Registro

1. Haz clic en el botón "Registrarse"
2. Si el registro es exitoso, serás redirigido automáticamente a "Mis Mascotas"
3. Tu sesión quedará iniciada automáticamente

### Mensajes de Error Comunes

- **"Este email ya está registrado"**: El email que intentas usar ya existe en el sistema. Usa otro email o inicia sesión.
- **"Email debe ser válido"**: Verifica que tu email tenga el formato correcto (ejemplo@dominio.com)
- **"La contraseña debe tener al menos 3 caracteres"**: Tu contraseña es muy corta

---

## 5. Inicio de Sesión

### Paso 1: Acceder al Login

1. Haz clic en "Ingresar / Crear cuenta" en la página principal
2. O haz clic en "Ingresar" en la barra de navegación

![Página de inicio de sesión]

### Paso 2: Seleccionar Tipo de Usuario

Antes de ingresar tus credenciales, selecciona el tipo de usuario:

- **Usuario**: Para usuarios regulares que gestionan sus propias mascotas
- **Administrador**: Para acceder al panel de administración

![Selector de tipo de usuario]

### Paso 3: Ingresar Credenciales

- **Email**: Tu dirección de correo registrada
- **Contraseña**: Tu contraseña

![Campos de email y contraseña]

### Paso 4: Iniciar Sesión

1. Haz clic en el botón "Ingresar"
2. Si las credenciales son correctas:
   - **Usuarios regulares**: Serás redirigido a "Mis Mascotas"
   - **Administradores**: Serás redirigido al "Panel de Administración"

### Credenciales de Administrador

```
Email: admin@admin.cl
Contraseña: admin.123
```

![Credenciales de administrador mostradas en la interfaz]

### Mensajes de Error Comunes

- **"Email o contraseña incorrectos"**: Verifica que hayas ingresado correctamente tus credenciales
- **"Por favor, ingresa tu email"**: El campo de email está vacío
- **"Por favor, ingresa tu contraseña"**: El campo de contraseña está vacío

---

## 6. Gestión de Mascotas

### 6.1 Ver Mis Mascotas

1. Inicia sesión en el sistema
2. Haz clic en "Mis Mascotas" en la barra de navegación
3. Verás un listado de todas tus mascotas registradas

![Listado de mascotas con tarjetas mostrando información]

Cada tarjeta de mascota muestra:
- Foto de la mascota (si se proporcionó)
- Nombre
- Especie
- Raza (si se proporcionó)
- Edad (si se proporcionó)
- Descripción (si se proporcionó)
- Botones de "Editar" y "Eliminar"

### 6.2 Agregar Nueva Mascota

#### Paso 1: Acceder al Formulario

1. Ve a "Mis Mascotas"
2. Localiza el formulario "Agregar Nueva Mascota" en la parte superior

![Formulario de agregar mascota]

#### Paso 2: Completar la Información

**Campos Obligatorios** (marcados con *):
- **Nombre**: Nombre de tu mascota
- **Especie**: Tipo de animal (Perro, Gato, Ave, etc.)

**Campos Opcionales**:
- **Raza**: Raza específica de la mascota
- **Edad**: Edad en años
- **Descripción**: Información adicional sobre tu mascota
- **URL de Imagen**: Enlace a una foto de tu mascota

![Formulario completo con todos los campos]

#### Paso 3: Guardar

1. Haz clic en el botón "Agregar"
2. La mascota aparecerá inmediatamente en tu listado
3. El formulario se limpiará automáticamente para agregar otra mascota

### 6.3 Editar Mascota

#### Paso 1: Seleccionar Mascota

1. Localiza la mascota que deseas editar en tu listado
2. Haz clic en el botón "Editar" de color amarillo

![Botón de editar en la tarjeta de mascota]

#### Paso 2: Modificar Información

1. El formulario se llenará con la información actual de la mascota
2. El título cambiará a "Editar Mascota"
3. Modifica los campos que desees actualizar

![Formulario en modo edición con datos precargados]

#### Paso 3: Guardar Cambios

1. Haz clic en el botón "Actualizar"
2. Los cambios se aplicarán inmediatamente
3. La tarjeta de la mascota se actualizará con la nueva información

#### Cancelar Edición

- Haz clic en el botón "Cancelar" para descartar los cambios
- El formulario volverá al modo "Agregar Nueva Mascota"

### 6.4 Eliminar Mascota

#### Paso 1: Seleccionar Mascota

1. Localiza la mascota que deseas eliminar
2. Haz clic en el botón "Eliminar" de color rojo

![Botón de eliminar en la tarjeta de mascota]

#### Paso 2: Confirmar Eliminación

1. Aparecerá un mensaje de confirmación: "¿Estás seguro de eliminar esta mascota?"
2. Haz clic en "Aceptar" para confirmar o "Cancelar" para abortar

![Diálogo de confirmación de eliminación]

#### Paso 3: Mascota Eliminada

- La mascota desaparecerá inmediatamente del listado
- Esta acción no se puede deshacer

### 6.5 Consejos para Agregar Imágenes

Para agregar una foto de tu mascota:

1. **Opción 1**: Sube la imagen a un servicio de hosting gratuito como:
   - Imgur (https://imgur.com)
   - ImgBB (https://imgbb.com)
   
2. **Opción 2**: Usa una URL de imagen existente en internet

3. Copia la URL de la imagen y pégala en el campo "URL de Imagen"

**Ejemplo de URL válida**:
```
https://i.imgur.com/ejemplo123.jpg
```

---

## 7. Panel de Administración

### 7.1 Acceso al Panel

**Requisitos**:
- Debes iniciar sesión con una cuenta de administrador
- Credenciales de administrador por defecto:
  - Email: admin@admin.cl
  - Contraseña: admin.123

### 7.2 Funcionalidades

#### Estadísticas del Sistema

En la parte superior del panel verás:
- **Total de mascotas registradas**: Número total de mascotas en el sistema

![Tarjeta de estadísticas]

#### Listado Completo de Mascotas

El administrador puede ver todas las mascotas de todos los usuarios en una tabla que muestra:

- **ID**: Identificador único de la mascota
- **Nombre**: Nombre de la mascota
- **Especie**: Tipo de animal
- **Raza**: Raza específica
- **Edad**: Edad en años
- **Usuario ID**: ID del propietario
- **Fecha Creación**: Cuándo se registró la mascota

![Tabla de administración con todas las mascotas]

### 7.3 Restricciones

- Los usuarios regulares NO pueden acceder al panel de administración
- Si un usuario regular intenta acceder a `/admin`, verá el mensaje: "Acceso denegado"

![Mensaje de acceso denegado]

---

## 8. Cerrar Sesión

### Paso 1: Localizar el Botón

En la barra de navegación superior derecha, verás:
- Tu email entre paréntesis
- Un botón "Salir"

![Botón de cerrar sesión en la navegación]

### Paso 2: Cerrar Sesión

1. Haz clic en el botón "Salir"
2. Serás desconectado inmediatamente
3. Tu sesión se cerrará de forma segura
4. Serás redirigido a la página de inicio

### Persistencia de Sesión

- Tu sesión se mantiene activa incluso si cierras el navegador
- Para cerrar sesión completamente, siempre usa el botón "Salir"
- Si no usas el sistema por 24 horas, tu sesión expirará automáticamente

---

## 9. Preguntas Frecuentes

### ¿Puedo usar el sistema desde mi celular?

Sí, PetControl es completamente responsive y funciona en dispositivos móviles.

### ¿Cuántas mascotas puedo registrar?

No hay límite en la cantidad de mascotas que puedes registrar.

### ¿Puedo ver las mascotas de otros usuarios?

No, solo puedes ver y gestionar tus propias mascotas. Los administradores pueden ver todas las mascotas.

### ¿Qué pasa si olvido mi contraseña?

Actualmente no hay función de recuperación de contraseña. Contacta al administrador del sistema.

### ¿Puedo cambiar mi email o contraseña?

Esta funcionalidad no está disponible en la versión actual. Contacta al administrador.

### ¿Las imágenes se guardan en el sistema?

No, el sistema guarda solo la URL de la imagen. Debes alojar la imagen en un servicio externo.

### ¿Puedo exportar mis datos?

Esta funcionalidad no está disponible en la versión actual.

### ¿Es seguro el sistema?

Sí, el sistema utiliza:
- Contraseñas encriptadas
- Autenticación con tokens JWT
- Comunicación segura entre frontend y backend

---

## 10. Solución de Problemas

### No puedo iniciar sesión

**Problema**: Mensaje "Email o contraseña incorrectos"

**Soluciones**:
1. Verifica que estés usando el email correcto
2. Asegúrate de que la contraseña sea correcta (distingue mayúsculas/minúsculas)
3. Si olvidaste tu contraseña, contacta al administrador
4. Intenta registrarte nuevamente si no recuerdas haber creado una cuenta

### No veo mis mascotas

**Problema**: La página "Mis Mascotas" está vacía

**Soluciones**:
1. Verifica que hayas iniciado sesión correctamente
2. Asegúrate de haber agregado al menos una mascota
3. Recarga la página (F5)
4. Cierra sesión y vuelve a iniciar

### La imagen de mi mascota no se muestra

**Problema**: Aparece un espacio vacío donde debería estar la imagen

**Soluciones**:
1. Verifica que la URL de la imagen sea correcta
2. Asegúrate de que la imagen esté disponible públicamente
3. Intenta con otra URL de imagen
4. Usa servicios de hosting de imágenes confiables (Imgur, ImgBB)

### No puedo acceder al panel de administración

**Problema**: Mensaje "Acceso denegado"

**Soluciones**:
1. Verifica que hayas iniciado sesión con credenciales de administrador
2. Cierra sesión y vuelve a iniciar con:
   - Email: admin@admin.cl
   - Contraseña: admin.123
3. Asegúrate de haber seleccionado "Administrador" antes de iniciar sesión

### El sistema está lento o no responde

**Soluciones**:
1. Verifica tu conexión a internet
2. Recarga la página (F5)
3. Limpia la caché del navegador
4. Cierra otras pestañas del navegador
5. Intenta con otro navegador
6. Verifica que el backend esté ejecutándose correctamente

### Error al agregar o editar mascota

**Problema**: Mensaje "Error al guardar la mascota"

**Soluciones**:
1. Verifica que hayas completado todos los campos obligatorios (Nombre y Especie)
2. Asegúrate de que la edad sea un número positivo
3. Verifica tu conexión a internet
4. Recarga la página e intenta nuevamente
5. Cierra sesión y vuelve a iniciar

### Mi sesión se cerró automáticamente

**Problema**: Fui redirigido al login sin cerrar sesión

**Soluciones**:
1. Tu sesión expiró después de 24 horas de inactividad (esto es normal)
2. Simplemente vuelve a iniciar sesión
3. Si el problema persiste, limpia la caché del navegador

---

## Contacto y Soporte

Para reportar problemas o solicitar ayuda:

- **Email del administrador**: admin@admin.cl
- **Documentación técnica**: Consulta el archivo `DOCUMENTACION_INTEGRACION.md`

---

**Versión del Manual**: 1.0  
**Fecha**: Noviembre 2024  
**Sistema**: PetControl - Gestión de Mascotas