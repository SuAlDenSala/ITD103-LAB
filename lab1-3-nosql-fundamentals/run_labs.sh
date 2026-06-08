#!/bin/bash

echo "Starting Docker containers..."
cd ..
docker-compose up -d

echo "Waiting 5 seconds for MongoDB to initialize..."
sleep 5

echo "Running Lab 1..."
docker exec -i itd103_mongodb mongosh < lab1-3-nosql-fundamentals/lab1_operations.js

echo "Running Lab 2..."
docker exec -i itd103_mongodb mongosh < lab1-3-nosql-fundamentals/lab2_ecommerce.js

echo "Running Lab 3..."
docker exec -i itd103_mongodb mongosh < lab1-3-nosql-fundamentals/lab3_performance.js

echo "Done!"
