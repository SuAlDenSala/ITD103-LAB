import os
import sys
import chromadb
from google import genai

print("--- Lab 14 & 15: Final RAG Implementation ---")

# 1. Fetch the API key safely from the environment
api_key = os.environ.get("GEMINI_API_KEY")
if not api_key:
    print("ERROR: GEMINI_API_KEY environment variable not found.")
    sys.exit(1)

# 2. Retrieve context from local ChromaDB
client = chromadb.PersistentClient(path="./chroma_data")
collection = client.get_collection(name="itd103_collection")

user_query = "What is GraphQL?"
results = collection.query(query_texts=[user_query], n_results=1)
retrieved_context = results['documents'][0][0]

rag_prompt = (
    f"Context:\n{retrieved_context}\n\n"
    f"User Query:\n{user_query}\n\n"
    f"System Prompt:\nPlease answer the user's query using strictly the provided context above."
)

try:
    # 3. Initialize the client and use the newer gemini-2.5-flash model
    ai_client = genai.Client(api_key=api_key) 
    response = ai_client.models.generate_content(
        model='gemini-2.5-flash',
        contents=rag_prompt
    )
    
    print("\n[Real RAG Response from Gemini]")
    print(response.text)
except Exception as e:
    print(f"\nAn error occurred while calling Gemini: {e}")
