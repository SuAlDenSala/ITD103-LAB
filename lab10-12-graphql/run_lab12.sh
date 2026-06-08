#!/bin/bash
echo "Starting Books Service (4001)..."
node library-system/books-service/src/server.js &
BOOKS_PID=$!

echo "Starting Users Service (4002)..."
node library-system/users-service/src/server.js &
USERS_PID=$!

echo "Waiting for services to initialize..."
sleep 3

echo "Starting Gateway (4003)..."
node library-system/gateway/src/server.js &
GATEWAY_PID=$!

echo "All services running! Press Ctrl+C to stop them all."
trap "kill $BOOKS_PID $USERS_PID $GATEWAY_PID" EXIT
wait
