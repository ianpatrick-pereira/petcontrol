# 🚀 Comandos para Subir a GitHub

## 1. Primero crea el repositorio en GitHub
https://github.com/new

## 2. Luego ejecuta estos comandos (REEMPLAZA con tu usuario):

```powershell
cd C:\Users\ianda\OneDrive\Escritorio\prueba3_fullstack_listo\FULLSTACK_3ERA_PRUEBA

# Cambiar rama a main
git branch -M main

# Conectar con GitHub (REEMPLAZA TU_USUARIO)
git remote add origin https://github.com/TU_USUARIO/petcontrol.git

# Subir código
git push -u origin main
```

## 3. Si necesitas cambiar la URL remota:
```powershell
git remote set-url origin https://github.com/TU_USUARIO/petcontrol.git
```

## 4. Verificar que se conectó correctamente:
```powershell
git remote -v
```

## 5. Si ya existe 'origin', primero eliminalo:
```powershell
git remote remove origin
git remote add origin https://github.com/TU_USUARIO/petcontrol.git
```

---

## 📊 Estado Actual:
✅ Git inicializado
✅ .gitignore creado
✅ Backup de base de datos creado
✅ Commit realizado (151 archivos)
✅ README profesional creado

## ⏳ Pendiente:
- [ ] Crear repositorio en github.com
- [ ] Ejecutar comandos de conexión
- [ ] Push inicial

---

## 🔐 Autenticación:
Cuando Git pida credenciales:
- **Usuario:** tu_username_github
- **Password:** Personal Access Token (NO tu contraseña)

Crear token en: https://github.com/settings/tokens
Permisos necesarios: `repo` completo

---

## ✅ Verificación Final:
Una vez subido, verifica en:
https://github.com/TU_USUARIO/petcontrol

Deberías ver:
- 151 archivos
- Carpeta `workspace/`
- `database_backup.sql`
- `README_GITHUB.md`
- Todas las guías (.md)
