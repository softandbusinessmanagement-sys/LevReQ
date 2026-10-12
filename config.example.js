// Archivo de configuración de ejemplo para Supabase
// COPIA este archivo a config.js y completa con tus credenciales

// Configuración de Supabase
const SUPABASE_CONFIG = {
  // URL de tu proyecto Supabase
  // Ejemplo: https://tuproyecto.supabase.co
  URL: 'https://TU_PROYECTO.supabase.co',
  
  // Clave anónima (anon/public key)
  // La encuentras en: Settings → API → Project API keys
  ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IiIsImF1ZCI6bnVsbCw...',
  
  // Nombre del bucket de almacenamiento
  BUCKET: 'levantamiento-files'
};

// Exportar configuración
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SUPABASE_CONFIG;
}
