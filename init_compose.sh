#!/bin/bash

# Load environment variables from .env file
export $(grep -v '^#' .env | xargs)

# Replace placeholders in init.sql with actual values
sed -i "s/{{USERNAME}}/$DATABASE_USER/g" init.sql
sed -i "s/{{PASSWORD}}/$DATABASE_PASSWORD/g" init.sql

# Start the MySQL container (or any other commands you need)
docker-compose up -d

sleep 10

results=$(sudo docker exec -i gostudy-db-1 mysql -u root -p $DATABASE_PASSWORD < verify.sql)

# Parse the results
# This is a basic check to see if any of the results are empty, indicating a missing item
if echo "$results" | grep -q "NULL"; then
    echo "Verification failed! Some items are missing. Re-running init.sql..."
    
    # Run the init.sql script to initialize the database again
    sudo docker exec -i gostudy-db-1 mysql -u root -p $DATABASE_PASSWORD < init.sql

    echo "Initialization complete. You may want to verify again to ensure all items are present."
else
    echo "Verification successful! All items are present."
fi
