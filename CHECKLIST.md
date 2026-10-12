# ✅ Lista de Verificación - Despliegue

Sigue estos pasos en orden para poner en marcha tu sistema de levantamiento de información.

## 📋 Paso 1: Preparar el Repositorio

- [ ] Crear repositorio en GitHub
  ```bash
  git init
  git add .
  git commit -m "Initial commit - Sistema de levantamiento de información"
  git remote add origin https://github.com/[TU_USUARIO]/levantamiento-info.git
  git push -u origin main
  ```

- [ ] Verificar estructura de archivos:
  - `index.html` ✅
  - `app.js` ✅
  - `vercel.json` ✅
  - `.gitignore` ✅
  - `README.md` ✅
  - `supabase/migrations/001_init.sql` ✅

## 🗄️ Paso 2: Configurar Supabase

- [ ] Crear proyecto en [https://supabase.com](https://supabase.com)
  - Si tienes el límite de 2 proyectos gratis:
    - [ ] Ir a [Dashboard](https://supabase.com/dashboard)
    - [ ] Seleccionar un proyecto no utilizado
    - [ ] Ir a Settings → General
    - [ ] Hacer click en "Pause project"
    - [ ] Ahora puedes crear un nuevo proyecto

- [ ] Obtener credenciales:
  - [ ] **URL del proyecto**: `https://[TU_PROYECTO].supabase.co`
  - [ ] **Clave anónima**: Settings → API → Project API keys → anon/public

- [ ] Ejecutar migración:
  - [ ] Ir a SQL Editor en Supabase
  - [ ] Copiar contenido de `supabase/migrations/001_init.sql`
  - [ ] Ejecutar la migración
  - [ ] Verificar que las tablas se crearon:
    - `admins`
    - `levantamientos`
    - bucket `levantamiento-files`

## ⚙️ Paso 3: Configurar Aplicación

- [ ] Editar `app.js`:
  ```javascript
  // Reemplazar estas líneas (alrededor de la línea 100)
  const SB_URL = 'TU_URL_DE_SUPABASE';
  const SB_KEY = 'TU_ANON_KEY_DE_SUPABASE';
  
  // Por:
  const SB_URL = 'https://tuproyecto.supabase.co';
  const SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
  ```

- [ ] Opcional: Deshabilitar registro de nuevos usuarios
  - [ ] En Supabase: Authentication → Settings
  - [ ] Desmarcar "Allow new users to sign up"

## 🌐 Paso 4: Desplegar en Vercel

### Opción A: Despliegue manual
- [ ] Ir a [https://vercel.com](https://vercel.com)
- [ ] Click en "Add New" → "Project"
- [ ] Importar repositorio de GitHub
- [ ] Configuración:
  - [ ] Framework: "Other"
  - [ ] Build Command: (dejar vacío)
  - [ ] Output Directory: (dejar vacío)
  - [ ] Install Command: (dejar vacío)
- [ ] Click en "Deploy"

### Opción B: Usando CLI
```bash
# Instalar Vercel CLI
npm install -g vercel

# Iniciar sesión
vercel login

# Desplegar
vercel
```

- [ ] Seleccionar:
  - [ ] Project name: levantamiento-info (o el que prefieras)
  - [ ] Framework: Other
  - [ ] Build command: (ninguno)
  - [ ] Output directory: (ninguno)

## ✅ Paso 5: Probar el Sistema

- [ ] Abrir la URL desplegada (ej: https://levantamiento-info.vercel.app)
- [ ] Crear cuenta admin (primera vez)
  - [ ] Ingresar correo y contraseña
  - [ ] Confirmar correo (revisar bandeja de entrada)
  - [ ] Iniciar sesión

- [ ] Crear primer proyecto
  - [ ] Click en "➕ Nuevo levantamiento"
  - [ ] Ingresar nombre de empresa/cliente
  - [ ] Ingresar nombre del proyecto
  - [ ] Click en "Crear y empezar"

- [ ] Probar formulario
  - [ ] Llenar algunos campos
  - [ ] Marcar algunos como pendientes
  - [ ] Adjuntar una foto o logo
  - [ ] Verificar que se guarde automáticamente

- [ ] Generar enlace para cliente
  - [ ] Click en "🔗 Copiar enlace cliente"
  - [ ] Abrir el enlace en otra pestaña o enviar a alguien

- [ ] Exportar datos
  - [ ] Ir a Resumen
  - [ ] Click en "📊 Excel"
  - [ ] Click en "📦 ZIP completo"
  - [ ] Verificar que los archivos se descarguen correctamente

## 🔒 Paso 6: Configuración Final

- [ ] Verificar que el guardado automático funciona
- [ ] Probar con otro navegador o dispositivo
- [ ] Compartir enlace con un cliente real
- [ ] Verificar que el cliente pueda acceder y editar

## 📞 Solución de Problemas

Si algo no funciona:

1. **No se puede crear proyecto en Supabase**
   - [ ] Pausar un proyecto existente en Supabase

2. **El enlace no funciona**
   - [ ] Verificar que el token sea correcto
   - [ ] Verificar que el proyecto exista en la base de datos

3. **No se guardan los datos**
   - [ ] Verificar credenciales de Supabase en app.js
   - [ ] Verificar que la migración se ejecutó correctamente
   - [ ] Revisar consola del navegador (F12)

4. **No se pueden descargar archivos**
   - [ ] Verificar conexión a internet
   - [ ] Probar con otro navegador
   - [ ] Verificar que no haya bloqueador de pop-ups

## 🎉 ¡Listo!

Una vez completados todos los pasos, tu sistema de levantamiento de información estará completamente funcional y listo para usar con tus clientes.

**URL final**: [Tu URL de Vercel]

**Credenciales admin**: [El correo y contraseña que registraste]

**Próximos pasos**:
- Personalizar el formulario según tus necesidades
- Agregar más secciones si es necesario
- Configurar notificaciones por email (opcional)
