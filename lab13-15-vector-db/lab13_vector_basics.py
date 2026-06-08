import chromadb

print("--- Lab 13: Vector Database Basics ---")
# Initialize the local Vector Database
client = chromadb.PersistentClient(path="./chroma_data")
collection = client.get_or_create_collection(name="itd103_collection")

# Add dummy documents so the AI has context
collection.add(
    documents=["The quick brown fox jumps over the lazy dog", "Machine learning is fascinating", "GraphQL is a query language for APIs"],
    metadatas=[{"topic": "animals"}, {"topic": "AI"}, {"topic": "API"}],
    ids=["id1", "id2", "id3"]
)

print("Documents added to ChromaDB successfully!")
results = collection.query(query_texts=["Tell me about APIs"], n_results=1)
print("Query Result:", results['documents'])
