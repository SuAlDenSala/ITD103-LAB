use ecommerce;

function generateProducts(count) {
  const products = [];
  for (let i = 0; i < count; i++) {
    products.push({
      product_id: i,
      name: `Product ${i}`,
      category: `Category ${Math.floor(Math.random() * 10)}`,
      price: Math.random() * 1000,
      stock: Math.floor(Math.random() * 1000),
      tags: Array.from({length: 5}, () => `tag${Math.floor(Math.random() * 50)}`),
      created_at: new Date()
    });
  }
  return products;
}

// db.products.insertMany(generateProducts(100000));

db.products.createIndex({ category: 1 });
db.products.createIndex({ category: 1, price: -1 });
db.products.createIndex({ tags: 1 });
db.products.createIndex({ name: "text" });

console.log(db.products.getIndexes());
