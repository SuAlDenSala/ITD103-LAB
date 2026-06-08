#!/bin/bash
echo "Setting up Python Virtual Environment..."
python3 -m venv vecenv
source vecenv/bin/activate

echo "Installing required packages (this might take a minute)..."
pip install -r requirements.txt

echo ""
echo "====================================="
echo "Running Lab 13: Vector Basics..."
echo "====================================="
python lab13_vector_basics.py

echo ""
echo "====================================="
echo "Running Labs 14 & 15: RAG System..."
echo "====================================="
python lab14_15_rag_system.py
