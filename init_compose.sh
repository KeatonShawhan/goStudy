#!/bin/bash

# Load environment variables from .env file
export $(grep -v '^#' .env | xargs)

# Replace placeholders in init.sql with actual values
sed -i "s/{{USERNAME}}/$DATABASE_USER/g" init.sql
sed -i "s/{{PASSWORD}}/$DATABASE_PASSWORD/g" init.sql

# Start the MySQL container (or any other commands you need)
docker-compose up -d
