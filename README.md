# 📋 Sistema de Levantamiento de Información

Sistema web completo para recolectar información de clientes de manera estructurada. Incluye formulario con múltiples secciones, almacenamiento en Supabase, y exportación a Excel y ZIP.

## 🚀 Características

- **Formulario estructurado**: 9 secciones (Visita, Marca, Catálogo, Institucional, Legal, Pago, Infraestructura, Usuarios, Reglas)
- **Autenticación**: Login para administradores con Supabase Auth
- **Almacenamiento**: Archivos (logos, documentos) en Supabase Storage
- **Exportación**: Excel (XLSX) y ZIP con todos los datos y archivos
- **Modo cliente**: Enlace único por proyecto para que el cliente complete la información
- **Guardado automático**: Los cambios se guardan en la nube automáticamente

## 📁 Estructura del Proyecto

```
levantamiento-info/
├── index.html          # Página principal
├── app.js             # Lógica de la aplicación
├── vercel.json        # Configuración de Vercel
├── .gitignore         # Archivos ignorados por Git
├── README.md          # Este archivo
└── supabase/
    └── migrations/
        └── 001_init.sql  # Migración de base de datos
```

## 🔧 Configuración Inicial

### 1. Crear Proyecto en Supabase

1. Ve a [https://supabase.com](https://supabase.com) y crea un nuevo proyecto
2. **IMPORTANTE**: Si tienes el límite de 2 proyectos gratis, pausar uno existente:
   - Ve a Settings → General → Pause project
3. Ejecuta la migración SQL:
   - Ve a SQL Editor en Supabase
   - Copia el contenido de `supabase/migrations/001_init.sql` y ejecútalo

### 2. Obtener Credenciales de Supabase

En tu proyecto Supabase:
- **URL del proyecto**: `https://[TU_PROYECTO].supabase.co`
- **Clave anónima**: Ve a Settings → API → Project API keys → anon/public key

### 3. Configurar el Frontend

Edita el archivo `app.js` y reemplaza:
```javascript
const SB_URL = 'TU_URL_DE_SUPABASE';
const SB_KEY = 'TU_ANON_KEY_DE_SUPABASE';
```

Con tus credenciales reales:
```javascript
const SB_URL = 'https://tuproyecto.supabase.co';
const SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
```

### 4. Deshabilitar registro de nuevos usuarios (Opcional pero recomendado)

En Supabase:
- Ve a Authentication → Settings
- Desmarca "Allow new users to sign up"
- Esto evita que cualquiera se registre como admin

## 🌐 Despliegue en Vercel

### Opción 1: Despliegue manual

1. Ve a [https://vercel.com](https://vercel.com)
2. Crea un nuevo proyecto
3. Importa el repositorio de GitHub (si ya lo subiste)
4. O sube los archivos manualmente
5. Configuración:
   - Framework: "Other"
   - Build Command: (dejar vacío)
   - Output Directory: (dejar vacío)
   - Install Command: (dejar vacío)
6. Despliega

### Opción 2: Usando CLI de Vercel

```bash
# Instalar Vercel CLI
npm install -g vercel

# Iniciar sesión
vercel login

# Desplegar
cd levantamiento-info
vercel
```

Sigue las instrucciones y selecciona:
- Project name: levantamiento-info
- Framework: Other
- Build command: (ninguno)
- Output directory: (ninguno)

## 📥 Cómo Usar el Sistema

### Para el Administrador

1. **Acceder al sistema**: Ve a la URL desplegada (ej: https://levantamiento-info.vercel.app)
2. **Crear cuenta admin**: La primera vez, registra una cuenta. Esta será la cuenta de administrador
3. **Crear proyecto**:
   - Haz click en "➕ Nuevo levantamiento"
   - Ingresa el nombre de la empresa/cliente
   - Ingresa el nombre del proyecto
   - Haz click en "Crear y empezar"
4. **Compartir con cliente**:
   - En la lista de proyectos, haz click en "🔗 Copiar enlace cliente"
   - Envía este enlace al cliente por WhatsApp o email

### Para el Cliente

1. **Abrir enlace**: El cliente abre el enlace que le enviaron (ej: https://levantamiento-info.vercel.app?p=abc123)
2. **Llenar formulario**: Completa los campos que pueda. Todos son opcionales
3. **Marcar pendientes**: Si algún dato no lo tiene, puede marcarlo como "Pendiente"
4. **Guardado automático**: Todo se guarda automáticamente en la nube
5. **Volver después**: Puede cerrar la página y volver más tarde con el mismo enlace

### Exportar Datos

1. Abre el proyecto como administrador
2. Ve a la pestaña "📊 Resumen"
3. Haz click en:
   - **📊 Excel**: Descarga un archivo Excel con todos los datos
   - **📦 ZIP completo**: Descarga un ZIP con Excel + todos los archivos adjuntos

## 🔄 Sincronización Offline

- Los cambios se guardan localmente si no hay conexión a internet
- Cuando se recupera la conexión, los datos se sincronizan automáticamente con Supabase
- Se muestra un mensaje "⚠ Sin conexión: se reintentará solo" cuando está offline

## 📋 Secciones del Formulario

1. **📋 Visita**: Datos básicos del levantamiento (empresa, proyecto, fecha, contacto)
2. **🎨 Marca**: Identidad visual (logos, colores, tipografía)
3. **📦 Catálogo**: Productos y categorías
4. **🏢 Institucional**: Información de la empresa (misión, visión, contacto)
5. **⚖️ Legal**: Datos legales y fiscales (RUC, términos, privacidad)
6. **💳 Pago**: Medios de pago y logística de entrega
7. **🖥️ Infraestructura**: Dominio, VPS, SMTP, SSL
8. **👥 Usuarios**: Usuarios del panel interno
9. **❓ Reglas**: Reglas de negocio (descuentos, stock, etc.)
10. **✅ Cierre**: Pendientes y próxima reunión

## 🛠️ Tecnologías Utilizadas

- **Frontend**: HTML5, CSS3, JavaScript vanilla (sin frameworks)
- **Base de datos**: Supabase (PostgreSQL + Storage)
- **Autenticación**: Supabase Auth
- **Exportación**: 
  - Excel: SheetJS (xlsx)
  - ZIP: JSZip
- **Hosting**: Vercel

## 📝 Archivos de Exportación

### Excel (.xlsx)
- Hoja **Datos**: Todos los campos del formulario
- Hojas adicionales: Una por cada repeater (Categorías, Productos, etc.)
- Hoja **Pendientes**: Lista de campos prioritarios faltantes y pendientes

### ZIP (.zip)
- `datos.json`: Todos los datos en formato JSON
- `resumen.txt`: Resumen en texto plano
- `levantamiento.xlsx`: Archivo Excel
- `archivos/`: Carpetas con todos los archivos adjuntos organizados por sección

## 🔒 Seguridad

- Solo el administrador puede ver todos los proyectos
- Cada cliente solo puede acceder a su proyecto mediante el enlace único
- Los archivos se almacenan en un bucket privado
- Las contraseñas no se almacenan en texto plano

## 🚨 Solución de Problemas

### No puedo crear proyecto en Supabase
- **Problema**: "Your free tier is limited to 2 projects"
- **Solución**: Ve a [Supabase Dashboard](https://supabase.com/dashboard) y pausar un proyecto existente:
  1. Abre un proyecto que no uses
  2. Ve a Settings → General
  3. Haz click en "Pause project"
  4. Ahora podrás crear un nuevo proyecto

### El enlace no funciona
- Verifica que el token `?p=...` sea correcto
- Asegúrate que el proyecto exista en la base de datos
- Verifica que no hayas eliminado el proyecto

### Los archivos no se suben
- Verifica que el bucket `levantamiento-files` exista
- Asegúrate que las políticas de seguridad estén configuradas correctamente
- Revisa la consola del navegador para errores

### No se puede descargar Excel/ZIP
- Asegúrate que las librerías externas se carguen (JSZip, SheetJS)
- Verifica que no haya bloqueador de pop-ups
- Prueba con otro navegador

## 📞 Soporte

Si tienes problemas con la configuración:
1. Revisa que todas las credenciales de Supabase sean correctas
2. Verifica que la migración SQL se haya ejecutado sin errores
3. Revisa la consola del navegador (F12) para errores de JavaScript
4. Asegúrate que tu plan de Supabase tenga proyectos disponibles

## 🎯 Próximos Pasos

1. ✅ Configurar Supabase
2. ✅ Editar credenciales en `app.js`
3. ✅ Subir a Vercel o otro hosting
4. ✅ Crear cuenta admin
5. ✅ Crear primer proyecto
6. ✅ Probar con un cliente

¡Listo! Tu sistema de levantamiento de información está listo para usar.
