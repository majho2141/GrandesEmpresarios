#!/bin/bash

# Esperar hasta que inicie la DB
if [ -f /app/src/config/backend_pre_start.py ]; then
    python /app/src/config/backend_pre_start.py
else
    echo "Archivo backend_pre_start.py no encontrado, continuando..."
fi

# Crear los datos iniciales en la DB
if [ -f /app/src/config/initial_data.py ]; then
    python /app/src/config/initial_data.py
else
    echo "Archivo initial_data.py no encontrado, continuando..."
fi

# Inicializar el servidor con recarga autom??tica en desarrollo
exec uvicorn src.main:app --host 0.0.0.0 --port 8000 --reload
