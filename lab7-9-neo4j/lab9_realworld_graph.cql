// Clear DB to prevent duplicates
MATCH (n) DETACH DELETE n;

// Part A: Build E-Commerce Product Graph
CREATE
  (p1:Product {id: 1, name: 'Laptop', category: 'Electronics', price: 999.99}),
  (p2:Product {id: 2, name: 'Smartphone', category: 'Electronics', price: 699.99}),
  (p3:Product {id: 3, name: 'Headphones', category: 'Electronics', price: 199.99}),
  (p4:Product {id: 4, name: 'Book: MongoDB Guide', category: 'Books', price: 49.99}),
  (p5:Product {id: 5, name: 'Book: Neo4j Guide', category: 'Books', price: 59.99}),
  (p6:Product {id: 6, name: 'T-Shirt', category: 'Clothing', price: 29.99}),
  (c1:Customer {id: 101, name: 'Alice', segment: 'Premium'}),
  (c2:Customer {id: 102, name: 'Bob', segment: 'Regular'}),
  (c3:Customer {id: 103, name: 'Charlie', segment: 'Premium'}),
  (p1)-[:BOUGHT_WITH {frequency: 150}]->(p3),
  (p1)-[:BOUGHT_WITH {frequency: 75}]->(p4),
  (p2)-[:BOUGHT_WITH {frequency: 200}]->(p3),
  (p4)-[:BOUGHT_WITH {frequency: 50}]->(p5),
  (c1)-[:PURCHASED {date: '2024-01-15', quantity: 1}]->(p1),
  (c1)-[:PURCHASED {date: '2024-01-15', quantity: 1}]->(p3),
  (c1)-[:PURCHASED {date: '2024-02-20', quantity: 1}]->(p4),
  (c2)-[:PURCHASED {date: '2024-01-20', quantity: 1}]->(p2),
  (c2)-[:PURCHASED {date: '2024-01-20', quantity: 1}]->(p3),
  (c3)-[:PURCHASED {date: '2024-03-01', quantity: 2}]->(p5),
  (c3)-[:VIEWED {timestamp: '2024-03-05'}]->(p4);

// Part B: Collaborative Filtering Recommendation
MATCH (target:Product {name: 'Laptop'})<-[:PURCHASED]-(customer:Customer)-[:PURCHASED]->(other:Product)
WHERE target <> other
RETURN other.name as RecommendedProduct, 
       count(customer) as CustomerCount,
       sum(CASE WHEN customer.segment = 'Premium' THEN 2 ELSE 1 END) as WeightedScore
ORDER BY WeightedScore DESC;

// Build Fraud Detection Graph
CREATE
  (cust1:Customer {id: 201, name: 'User1', signup_date: '2024-01-01'}),
  (cust2:Customer {id: 202, name: 'User2', signup_date: '2024-01-02'}),
  (cust3:Customer {id: 203, name: 'User3', signup_date: '2024-01-03'}),
  (cust1)-[:SHARES_IP {timestamp: '2024-01-15'}]->(cust2),
  (cust1)-[:SHARES_PHONE {timestamp: '2024-01-16'}]->(cust3),
  (cust2)-[:SHARES_ADDRESS]->(cust3),
  (cust1)-[:PURCHASED {amount: 999.99, timestamp: '2024-01-15 10:00'}]->(p1),
  (cust1)-[:PURCHASED {amount: 899.99, timestamp: '2024-01-15 10:05'}]->(p2),
  (cust1)-[:PURCHASED {amount: 799.99, timestamp: '2024-01-15 10:10'}]->(p3),
  (cust2)-[:PURCHASED {amount: 500.00, timestamp: '2024-01-15 10:02'}]->(p4);

// Execute Fraud Detection Rule
MATCH (c1:Customer)-[r1:SHARES_IP|SHARES_PHONE|SHARES_ADDRESS]-(c2:Customer)
WITH c1, c2, count(r1) as SharedAttributes
WHERE SharedAttributes >= 2
MATCH (c1)-[purch1:PURCHASED]->()
MATCH (c2)-[purch2:PURCHASED]->()
WITH c1, c2, SharedAttributes, count(purch1) as c1Purchases, count(purch2) as c2Purchases
WHERE c1Purchases > 2 OR c2Purchases > 2
RETURN c1.name as Customer1, c2.name as Customer2, SharedAttributes as SuspiciousLinks, 
       c1Purchases + c2Purchases as TotalRapidPurchases, 'Possible Fraud Ring' as Alert;
