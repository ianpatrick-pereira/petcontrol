# 📘 Guía de Configuración MySQL para PetControl

Esta guía te ayudará a configurar MySQL para el proyecto PetControl paso a paso.

---

## 📋 **REQUISITOS PREVIOS**

Antes de comenzar, asegúrate de tener:
- ✅ Java 17 o superior instalado
- ✅ Maven instalado (o usar el wrapper incluido `./mvnw`)
- ✅ MySQL 8.0 o superior instalado

---

## 🔧 **PASO 1: INSTALAR MYSQL**

### **Windows:**

1. Descarga MySQL desde: https://dev.mysql.com/downloads/installer/
2. Ejecuta el instalador MySQL Installer
3. Selecciona "Developer Default" o "Server only"
4. Durante la instalación:
   - Configura la contraseña del usuario `root` (por defecto usamos: `root`)
   - Puerto: `3306` (predeterminado)
   - Marca la opción "Start MySQL Server at System Startup"

### **macOS:**

```bash
# Usando Homebrew
brew install mysql

# Iniciar MySQL
brew services start mysql

# Configurar contraseña root
mysql_secure_installation
```

### **Linux (Ubuntu/Debian):**

```bash
# Instalar MySQL
sudo apt update
sudo apt install mysql-server

# Iniciar servicio
sudo systemctl start mysql
sudo systemctl enable mysql

# Configurar seguridad
sudo mysql_secure_installation
```

---

## 🗄️ **PASO 2: CREAR LA BASE DE DATOS**

### **Opción A: Creación Automática (Recomendado)**

La aplicación está configurada para crear la base de datos automáticamente con:
```
createDatabaseIfNotExist=true
```

**No necesitas hacer nada**, solo asegúrate de que MySQL esté corriendo.

### **Opción B: Creación Manual**

Si prefieres crear la base de datos manualmente:

```bash
# Conectar a MySQL
mysql -u root -p

# Crear la base de datos
CREATE DATABASE petcontrol_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

# Verificar que se creó
SHOW DATABASES;

# Salir
EXIT;
```

---

## ⚙️ **PASO 3: CONFIGURAR CREDENCIALES**

El archivo `application.properties` ya está configurado con valores predeterminados:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/petcontrol_db?createDatabaseIfNotExist=true&useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
spring.datasource.username=root
spring.datasource.password=root
```

### **Si tu configuración es diferente:**

Edita `/workspace/petcontrol-backend/src/main/resources/application.properties`:

```properties
# Cambiar el puerto si MySQL usa otro (ej: 3307)
spring.datasource.url=jdbc:mysql://localhost:3307/petcontrol_db?createDatabaseIfNotExist=true&useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true

# Cambiar usuario si no es 'root'
spring.datasource.username=tu_usuario

# Cambiar contraseña
spring.datasource.password=tu_contraseña
```

---

## 🚀 **PASO 4: EJECUTAR LA APLICACIÓN**

### **Opción 1: Con Maven Wrapper (Recomendado)**

```bash
cd /workspace/petcontrol-backend

# Linux/Mac
./mvnw spring-boot:run

# Windows
mvnw.cmd spring-boot:run
```

### **Opción 2: Con Maven instalado**

```bash
cd /workspace/petcontrol-backend
mvn spring-boot:run
```

### **Opción 3: Compilar JAR y ejecutar**

```bash
cd /workspace/petcontrol-backend
mvn clean package
java -jar target/petcontrol-backend-1.0.0.jar
```

---

## ✅ **PASO 5: VERIFICAR LA CONEXIÓN**

### **1. Revisar los logs de inicio:**

Deberías ver en la consola:

```
✅ Hibernate: create table usuarios (...)
✅ Hibernate: create table mascotas (...)
✅ Usuario administrador creado: admin@admin.cl / admin.123
✅ Usuario veterinario creado: veterinario@petcontrol.cl / vet.123
✅ Usuario cliente creado: cliente@petcontrol.cl / cliente.123
```

### **2. Verificar en MySQL:**

```bash
mysql -u root -p

USE petcontrol_db;

SHOW TABLES;
# Deberías ver: usuarios, mascotas

SELECT * FROM usuarios;
# Deberías ver los 3 usuarios creados

EXIT;
```

### **3. Probar la API:**

Abre tu navegador en:
- **Swagger UI:** http://localhost:8080/swagger-ui.html
- **API Docs:** http://localhost:8080/api-docs

---

## 🔄 **USAR H2 COMO ALTERNATIVA (Sin MySQL)**

Si no quieres instalar MySQL, puedes usar H2 (base de datos en memoria):

```bash
# Ejecutar con perfil H2
./mvnw spring-boot:run -Dspring-boot.run.profiles=h2

# O en Windows
mvnw.cmd spring-boot:run -Dspring-boot.run.profiles=h2
```

Esto usará el archivo `application-h2.properties` en lugar de `application.properties`.

---

## 🛠️ **SOLUCIÓN DE PROBLEMAS COMUNES**

### **Error: "Access denied for user 'root'@'localhost'"**

**Solución:**
```bash
# Resetear contraseña de root
mysql -u root

ALTER USER 'root'@'localhost' IDENTIFIED BY 'root';
FLUSH PRIVILEGES;
EXIT;
```

### **Error: "Communications link failure"**

**Causa:** MySQL no está corriendo.

**Solución:**
```bash
# Windows
net start MySQL80

# macOS
brew services start mysql

# Linux
sudo systemctl start mysql
```

### **Error: "Unknown database 'petcontrol_db'"**

**Causa:** La base de datos no se creó automáticamente.

**Solución:** Crear manualmente (ver Paso 2, Opción B)

### **Error: "Public Key Retrieval is not allowed"**

**Causa:** Falta el parámetro `allowPublicKeyRetrieval=true` en la URL.

**Solución:** Ya está incluido en `application.properties`, verifica que no lo hayas eliminado.

---

## 📊 **CONFIGURACIÓN AVANZADA (Opcional)**

### **Cambiar el modo de creación de tablas:**

En `application.properties`:

```properties
# create-drop: Elimina y recrea tablas en cada inicio (desarrollo)
spring.jpa.hibernate.ddl-auto=create-drop

# update: Actualiza tablas sin eliminar datos (producción)
spring.jpa.hibernate.ddl-auto=update

# validate: Solo valida el esquema, no modifica (producción estricta)
spring.jpa.hibernate.ddl-auto=validate

# none: No hace nada automáticamente
spring.jpa.hibernate.ddl-auto=none
```

### **Configurar pool de conexiones:**

```properties
# Número máximo de conexiones
spring.datasource.hikari.maximum-pool-size=10

# Tiempo de espera para obtener conexión (ms)
spring.datasource.hikari.connection-timeout=20000

# Tiempo máximo de vida de una conexión (ms)
spring.datasource.hikari.max-lifetime=1800000
```

---

## 🎯 **RESUMEN DE COMANDOS RÁPIDOS**

```bash
# 1. Verificar que MySQL esté corriendo
mysql --version

# 2. Iniciar MySQL (si no está corriendo)
# Windows: net start MySQL80
# macOS: brew services start mysql
# Linux: sudo systemctl start mysql

# 3. Ejecutar la aplicación
cd /workspace/petcontrol-backend
./mvnw spring-boot:run

# 4. Verificar en el navegador
# http://localhost:8080/swagger-ui.html
```

---

## 📞 **SOPORTE**

Si encuentras problemas:

1. Revisa los logs de la aplicación en la consola
2. Verifica que MySQL esté corriendo: `mysql --version`
3. Confirma las credenciales en `application.properties`
4. Consulta la sección de "Solución de Problemas" arriba

---

## ✅ **CHECKLIST DE VERIFICACIÓN**

- [ ] MySQL instalado y corriendo
- [ ] Base de datos `petcontrol_db` creada (automática o manual)
- [ ] Credenciales correctas en `application.properties`
- [ ] Aplicación inicia sin errores
- [ ] Tablas `usuarios` y `mascotas` creadas
- [ ] 3 usuarios de ejemplo insertados
- [ ] Swagger UI accesible en http://localhost:8080/swagger-ui.html

---

**¡Listo! Tu aplicación PetControl ahora usa MySQL como base de datos.** 🎉