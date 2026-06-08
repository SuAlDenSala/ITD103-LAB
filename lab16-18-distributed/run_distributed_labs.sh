#!/bin/bash
echo "Activating Python Virtual Environment..."
source distenv/bin/activate

echo ""
echo "====================================="
echo "Running Lab 16: Distributed Cache..."
echo "====================================="
python lab16_distributed_cache.py

echo ""
echo "====================================="
echo "Starting Labs 17 & 18: API Nodes..."
echo "====================================="
echo "Starting Node-A on Port 8011 in the background..."
python lab17_18_api_node.py Node-A 8011 &
NODE_A_PID=$!

echo "Starting Node-B on Port 8012 in the background..."
python lab17_18_api_node.py Node-B 8012 &
NODE_B_PID=$!

sleep 2
echo ""
echo "Testing Load Balancing / Distributed Nodes:"
curl http://localhost:8011/
echo ""
curl http://localhost:8012/
echo ""

echo "Cleaning up background processes..."
kill $NODE_A_PID
kill $NODE_B_PID
echo "Done!"
