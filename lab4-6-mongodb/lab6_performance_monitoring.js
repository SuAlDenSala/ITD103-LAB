use food;

// Monitor current operations
print("\n--- Current Operations ---");
printjson(db.currentOp({ "active": true, "secs_running": { $gt: 0 } }));

// Check DB stats
print("\n--- Database Stats ---");
printjson(db.stats());

// Check query execution metrics with executionStats
print("\n--- Query Execution Stats ---");
printjson(db.restaurants.find({ "address.street": "123 Main St" }).explain("executionStats").executionStats);

// Enable profiling for queries slower than 100ms
print("\n--- Setting Profiling Level ---");
db.setProfilingLevel(1, 100);
// FIXED: Updated for MongoDB 7.0+ compatibility
print("Profiling level set to:", db.getProfilingStatus().was);
