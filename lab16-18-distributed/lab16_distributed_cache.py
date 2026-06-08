import redis
import time

print("--- Lab 16: Distributed Caching Node ---")
try:
    # Connect to a local Redis instance
    cache = redis.Redis(host='localhost', port=6379, decode_responses=True)
    cache.ping()
    print("Connected to Distributed Cache successfully!\n")

    key = "student_record_101"
    
    # Simulate caching logic
    if not cache.exists(key):
        print("[MISS] Data not in cache. Fetching from primary database...")
        time.sleep(2)  # Simulate slow DB query
        data = "Student: Alice, Course: BSIT, Status: Enrolled"
        cache.setex(key, 15, data)  # Cache the result for 15 seconds
        print(f"[STORE] Data saved to distributed cache: {data}")
    else:
        print(f"[HIT] Data retrieved instantly from cache: {cache.get(key)}")

except redis.ConnectionError:
    print("ERROR: Could not connect to Redis. Ensure your Docker container is running.")
