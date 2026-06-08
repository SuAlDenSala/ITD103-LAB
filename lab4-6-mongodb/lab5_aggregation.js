use sales;

print("\n--- Ex 1: Basic Aggregation ---");
print("Total Sales per Category:");
printjson(db.transactions.aggregate([
  { $group: { _id: "$category", totalSales: { $sum: "$amount" } } },
  { $sort: { totalSales: -1 } }
]).toArray());

print("\n--- Ex 2: Complex Pipeline (Customer Lifetime Value) ---");
printjson(db.transactions.aggregate([
  { $match: { date: { $gte: ISODate("2023-01-01"), $lt: ISODate("2024-01-01") } } },
  { $lookup: { from: "customers", localField: "customer_id", foreignField: "_id", as: "customer_details" } },
  { $unwind: "$customer_details" },
  { $group: {
      _id: "$customer_id",
      customerName: { $first: "$customer_details.name" },
      totalSpent: { $sum: "$amount" },
      transactionCount: { $sum: 1 },
      firstPurchase: { $min: "$date" },
      lastPurchase: { $max: "$date" }
  }},
  { $addFields: { avgTransaction: { $divide: ["$totalSpent", "$transactionCount"] } } },
  { $sort: { totalSpent: -1 } },
  { $project: { _id: 1, customerName: 1, totalSpent: 1, avgTransaction: { $round: ["$avgTransaction", 2] } } }
]).toArray());

print("\n--- Ex 3: Facets & Buckets ---");
printjson(db.transactions.aggregate([
  { $facet: {
      salesByCategory: [ { $group: { _id: "$category", total: { $sum: "$amount" } } } ],
      topCustomers: [ { $group: { _id: "$customer_id", total: { $sum: "$amount" } } }, { $sort: { total: -1 } }, { $limit: 5 } ]
  }}
]).toArray());
