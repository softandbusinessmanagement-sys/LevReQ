#!/bin/bash

# Script de despliegue para el sistema de levantamiento de información
# Uso: ./scripts/deploy.sh

echo "=========================================="
echo "Desplegando Sistema de Levantamiento"
echo "=========================================="

# Verificar que estamos en el directorio correcto
if [ ! -f "index.html" ]; then
    echo "❌ Error: Ejecuta este script desde el directorio raíz del proyecto"
    exit 1
fi

# Verificar si git está instalado
if ! command -v git &> /dev/null; then
    echo "❌ Error: Git no está instalado"
    echo "Instala Git primero: https://git-scm.com/downloads"
    exit 1
fi

# Verificar si vercel CLI está instalado
if ! command -v vercel &> /dev/null; then
    echo "⚠️  Vercel CLI no está instalado"
    echo "Instalando Vercel CLI..."
    npm install -g vercel
fi

# Preguntar nombre del proyecto
echo ""
read -p "Nombre del proyecto en Vercel (ej: levantamiento-info): " PROJECT_NAME
PROJECT_NAME=${PROJECT_NAME:-levantamiento-info}

# Iniciar despliegue con Vercel
echo ""
echo "🚀 Iniciando despliegue en Vercel..."
echo ""

# Desplegar
vercel --name "$PROJECT_NAME" --prod

# Verificar si el despliegue fue exitoso
if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Despliegue completado con éxito!"
    echo ""
    echo "Ahora necesitas configurar:"
    echo "1. Crea un proyecto en Supabase"
    echo "2. Ejecuta la migración SQL desde supabase/migrations/001_init.sql"
    echo "3. Actualiza SB_URL y SB_KEY en app.js"
    echo "4. Redespliega con: vercel --prod"
else
    echo ""
    echo "❌ El despliegue falló"
    exit 1
fi
