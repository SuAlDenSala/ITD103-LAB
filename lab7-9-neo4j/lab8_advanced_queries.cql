// Clear DB to prevent duplicates
MATCH (n) DETACH DELETE n;

// Part A: Load Social Network Dataset
CREATE
  (alice:Person {id: 1, name: 'Alice', age: 30}),
  (bob:Person {id: 2, name: 'Bob', age: 25}),
  (charlie:Person {id: 3, name: 'Charlie', age: 35}),
  (diana:Person {id: 4, name: 'Diana', age: 28}),
  (eve:Person {id: 5, name: 'Eve', age: 32}),
  (frank:Person {id: 6, name: 'Frank', age: 40}),
  (alice)-[:FRIENDS_WITH {since: 2020}]->(bob),
  (alice)-[:FRIENDS_WITH {since: 2021}]->(charlie),
  (bob)-[:FRIENDS_WITH {since: 2019}]->(diana),
  (charlie)-[:FRIENDS_WITH {since: 2022}]->(eve),
  (diana)-[:FRIENDS_WITH {since: 2020}]->(eve),
  (eve)-[:FRIENDS_WITH {since: 2023}]->(frank),
  (bob)-[:FRIENDS_WITH {since: 2021}]->(eve),
  (db:Interest {name: 'Databases'}),
  (ai:Interest {name: 'AI'}),
  (web:Interest {name: 'Web Development'}),
  (mobile:Interest {name: 'Mobile Development'}),
  (alice)-[:INTERESTED_IN {level: 'High'}]->(db),
  (alice)-[:INTERESTED_IN {level: 'Medium'}]->(ai),
  (bob)-[:INTERESTED_IN {level: 'High'}]->(web),
  (charlie)-[:INTERESTED_IN {level: 'High'}]->(db),
  (diana)-[:INTERESTED_IN {level: 'Medium'}]->(mobile),
  (eve)-[:INTERESTED_IN {level: 'High'}]->(ai),
  (frank)-[:INTERESTED_IN {level: 'Medium'}]->(web);

// Part B & C: Output Algorithms and Path Queries
MATCH path = shortestPath((alice:Person {name: 'Alice'})-[:FRIENDS_WITH*]-(frank:Person {name: 'Frank'})) 
RETURN length(path) as ShortestPathToFrank;

MATCH (me:Person {name: 'Alice'})-[:FRIENDS_WITH*2]-(friend_of_friend:Person)
WHERE NOT (me)-[:FRIENDS_WITH]-(friend_of_friend)
RETURN DISTINCT friend_of_friend.name as SuggestedFriend;

// FIXED: Using COUNT{} instead of the deprecated size() function
MATCH (p:Person)
WITH p, COUNT { (p)-[:FRIENDS_WITH]-() } as degree
RETURN p.name as Person, degree as DegreeCentrality
ORDER BY degree DESC;
