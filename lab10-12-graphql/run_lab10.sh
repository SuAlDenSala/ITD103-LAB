#!/bin/bash

echo "Ensuring Docker databases are running..."
cd ..
docker-compose up -d
cd lab10-12-graphql

echo "Starting GraphQL Server using nodemon..."
echo "Once the server is running, open your browser to: http://localhost:4000/graphql"
echo "Press Ctrl+C to stop the server when you are finished."
echo "--------------------------------------------------------"

npx nodemon src/server.js
