use food;

print("\n--- Ex 1: Array Operators ---");
print("Serves Chinese and Thai:");
printjson(db.restaurants.find({ cuisine: { $all: ["Chinese", "Thai"] } }).toArray());

print("Has exactly 3 grades:");
printjson(db.restaurants.find({ grades: { $size: 3 } }).toArray());

print("Has a grade score > 20:");
printjson(db.restaurants.find({ "grades.score": { $gt: 20 } }).toArray());

// Add new cuisine
db.restaurants.updateOne({ name: "Tony's Pizza" }, { $addToSet: { cuisine: "Fast Food" } });

print("\n--- Ex 2: Text & Regex Search ---");
db.restaurants.createIndex({ name: "text", "address.street": "text" });
print("Text search for 'bakery shop':");
printjson(db.restaurants.find({ $text: { $search: "\"bakery shop\"" } }).sort({ score: { $meta: "textScore" } }).toArray());

print("Regex search for 'pizza':");
printjson(db.restaurants.find({ name: { $regex: /pizza/i } }).toArray());

print("\n--- Ex 3: Geospatial Queries ---");
db.restaurants.createIndex({ "address.coord": "2dsphere" });
print("Restaurants near [-73.96, 40.78]:");
printjson(db.restaurants.find({
  "address.coord": {
    $near: {
      $geometry: { type: "Point", coordinates: [-73.96, 40.78] },
      $maxDistance: 2000
    }
  }
}).toArray());
