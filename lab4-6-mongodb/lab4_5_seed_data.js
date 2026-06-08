// Mock data to replace the missing datasets. We drop collections first to prevent duplicate key errors on re-runs.
use food;
db.restaurants.drop();
db.restaurants.insertMany([
  { name: "Asian Fusion", cuisine: ["Thai", "Chinese"], grades: [{score: 25}, {score: 10}, {score: 15}], address: { street: "123 Main St", coord: [-73.96, 40.78] } },
  { name: "Sweet Bakery Shop", cuisine: ["Dessert"], grades: [{score: 10}, {score: 5}], address: { street: "456 Baker Ave", coord: [-73.97, 40.77] } },
  { name: "Tony's Pizza", cuisine: ["Italian"], grades: [{score: 30}, {score: 22}], address: { street: "789 Pizza Blvd", coord: [-74.00, 40.71] } }
]);

use sales;
db.customers.drop();
db.transactions.drop();
db.customers.insertMany([
  { _id: 1, name: "Alice" },
  { _id: 2, name: "Bob" }
]);
db.transactions.insertMany([
  { customer_id: 1, amount: 150, category: "Electronics", date: ISODate("2023-05-15T10:00:00Z") },
  { customer_id: 1, amount: 300, category: "Electronics", date: ISODate("2023-08-20T14:00:00Z") },
  { customer_id: 2, amount: 50, category: "Books", date: ISODate("2023-06-20T09:00:00Z") }
]);
