use ecommerce;

db.products.insertMany([
  {
    _id: 1,
    name: "Laptop",
    price: 999.99,
    category: "Electronics",
    variants: [
      { color: "Silver", stock: 50 },
      { color: "Black", stock: 30 }
    ],
    reviews: [
      { user: "Alice", rating: 5, comment: "Excellent!" },
      { user: "Bob", rating: 4, comment: "Good value" }
    ]
  }
]);

db.orders.insertOne({
  order_id: "ORD001",
  customer: { name: "Alice", email: "alice@email.com" },
  items: [
    { product_id: 1, quantity: 1, variant: "Silver" }
  ],
  total: 999.99,
  status: "pending"
});

// Queries
db.products.find({ "reviews.rating": { $gt: 4 } });

db.products.updateOne(
  { _id: 1, "variants.color": "Silver" },
  { $inc: { "variants.$.stock": -1 } }
);

db.products.aggregate([
  { $unwind: "$reviews" },
  { $group: { _id: "$name", avgRating: { $avg: "$reviews.rating" } } }
]);
