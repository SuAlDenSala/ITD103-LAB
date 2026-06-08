use lab1_database;

db.createCollection("users");

db.users.insertMany([
  { name: "Alice", age: 25, city: "Manila", interests: ["coding", "reading"] },
  { name: "Bob", age: 30, city: "Cebu", interests: ["gaming", "music"] },
  { name: "Charlie", age: 22, city: "Davao", interests: ["sports", "travel"] }
]);

console.log("All users:", db.users.find().toArray());
console.log("Users in Manila:", db.users.find({ city: "Manila" }).toArray());
console.log("Users older than 25:", db.users.find({ age: { $gt: 25 } }).toArray());
