from fastapi import FastAPI
import uvicorn
import sys

print("--- Lab 17 & 18: Distributed API Node ---")

app = FastAPI()
node_id = sys.argv[1] if len(sys.argv) > 1 else "Node-A"

@app.get("/")
def read_root():
    return {"message": "Request processed successfully", "handled_by": node_id}

@app.get("/health")
def health_check():
    return {"status": "healthy", "node": node_id}

if __name__ == "__main__":
    # Run the node on a port passed via command line, defaulting to 8000
    port = int(sys.argv[2]) if len(sys.argv) > 2 else 8000
    print(f"Starting {node_id} on port {port}...")
    uvicorn.run(app, host="0.0.0.0", port=port, log_level="warning")
