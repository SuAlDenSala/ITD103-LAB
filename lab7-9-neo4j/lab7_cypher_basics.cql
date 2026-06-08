// Clear DB to prevent duplicates
MATCH (n) DETACH DELETE n;

// Ex 1: Create Nodes
CREATE (alice:Person {name: 'Alice', age: 30, city: 'Manila'});
CREATE (bob:Person {name: 'Bob', age: 25, city: 'Cebu'});
CREATE (charlie:Person {name: 'Charlie', age: 35, city: 'Davao'});

CREATE
  (database:Technology {name: 'Database', type: 'Backend'}),
  (frontend:Technology {name: 'Frontend', type: 'Development'}),
  (ai:Technology {name: 'AI', type: 'Emerging'});

// Ex 2: Create Relationships
MATCH (a:Person {name: 'Alice'}), (b:Person {name: 'Bob'})
CREATE (a)-[:KNOWS {since: 2020}]->(b);

MATCH (alice:Person {name: 'Alice'}), (charlie:Person {name: 'Charlie'})
CREATE (alice)-[:WORKS_WITH {project: 'Database Migration'}]->(charlie);

MATCH (p:Person), (t:Technology)
WHERE p.name IN ['Alice', 'Bob'] AND t.name IN ['Database', 'AI']
CREATE (p)-[:LIKES {score: 8.5, interest: 'Professional'}]->(t);

// Ex 3 & 4: Basic Queries & Updates
MATCH (p:Person {name: 'Alice'})
SET p.age = 31, p.skills = ['MongoDB', 'Neo4j'];

MATCH (p:Person)
SET p.updated_at = timestamp();

MATCH (p:Person {name: 'Bob'})
REMOVE p.age;

MATCH (p:Person {name: 'Charlie'})-[r]-()
DELETE r, p;

// Print resulting graph overview
MATCH (n) RETURN labels(n)[0] as Label, count(*) as Count;
