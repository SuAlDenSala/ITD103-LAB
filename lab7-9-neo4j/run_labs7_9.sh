#!/bin/bash

echo "Starting Docker containers..."
cd ..
docker-compose up -d

echo "Waiting 10 seconds for Neo4j to fully initialize..."
sleep 10

echo "====================================="
echo "Running Lab 7: Cypher Basics..."
echo "====================================="
docker exec -i itd103_neo4j cypher-shell -u neo4j -p password123 < lab7-9-neo4j/lab7_cypher_basics.cql

echo ""
echo "====================================="
echo "Running Lab 8: Graph Algorithms..."
echo "====================================="
docker exec -i itd103_neo4j cypher-shell -u neo4j -p password123 < lab7-9-neo4j/lab8_advanced_queries.cql

echo ""
echo "====================================="
echo "Running Lab 9: Real World Application..."
echo "====================================="
docker exec -i itd103_neo4j cypher-shell -u neo4j -p password123 < lab7-9-neo4j/lab9_realworld_graph.cql

echo ""
echo "Done!"
