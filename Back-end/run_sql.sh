#!/bin/bash

# Variables de connexion à la base de données
DB_USER="root"
DB_PASSWORD="root"
DB_HOST="localhost"
DB_NAME="outils_db"

# Emplacement du fichier SQL
SQL_FILE="/home/bmk/Documents/techno4/PretOutils/Back-end/database/init_db.sql"

# Exécution du fichier SQL
mysql -h $DB_HOST -u $DB_USER -p$DB_PASSWORD $DB_NAME < $SQL_FILE

if [ $? -ne 0 ]; then
    echo "Erreur lors de l'exécution du script SQL."
    exit 1
fi
echo "Script SQL exécuté avec succès."
