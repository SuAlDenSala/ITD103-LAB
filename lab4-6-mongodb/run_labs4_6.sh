#!/bin/bash

echo "Starting Docker containers..."
cd ..
docker-compose up -d

echo "Waiting 3 seconds for MongoDB to ensure readiness..."
sleep 3

echo "====================================="
echo "Seeding Dummy Datasets..."
echo "====================================="
docker exec -i itd103_mongodb mongosh --quiet < lab4-6-mongodb/lab4_5_seed_data.js

echo ""
echo "====================================="
echo "Running Lab 4: Advanced MQL..."
echo "====================================="
docker exec -i itd103_mongodb mongosh --quiet < lab4-6-mongodb/lab4_advanced_mql.js

echo ""
echo "====================================="
echo "Running Lab 5: Aggregation..."
echo "====================================="
docker exec -i itd103_mongodb mongosh --quiet < lab4-6-mongodb/lab5_aggregation.js

echo ""
echo "====================================="
echo "Running Lab 6: Performance Monitoring..."
echo "====================================="
docker exec -i itd103_mongodb mongosh --quiet < lab4-6-mongodb/lab6_performance_monitoring.js

echo ""
echo "Done! (Note: Lab 6 Cluster Setup requires manual multi-node configuration. See lab6_cluster_setup.md)"
