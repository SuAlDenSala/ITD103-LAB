# Lab 1: CAP Theorem Analysis

## Part A: Scenario Analysis
1. **Online banking transaction system:** Prioritizes Consistency (C) and Partition tolerance (P). Financial records must be strictly accurate across all nodes.
2. **Social media feed:** Prioritizes Availability (A) and Partition tolerance (P). It is acceptable if users see slightly stale data, but the feed must always load.
3. **IoT sensor data collection:** Prioritizes Availability (A) and Partition tolerance (P). High write-throughput is essential; losing a single data point is less critical than rejecting writes.
4. **E-commerce shopping cart:** Prioritizes Availability (A) and Partition tolerance (P). The system must always allow users to add items to their cart to prevent lost sales.

## Part B: Database Selection
* **MongoDB (CP):** Good for online banking/profiles where consistency is needed but high availability can be managed via replica sets.
* **Cassandra (AP):** Best for IoT sensor data due to excellent high-volume write capabilities.
* **Redis (CP/AP depending on config):** Excellent for the E-commerce shopping cart due to fast, in-memory key-value caching.
* **Neo4j (CA/CP):** Best for social media relationships and recommendation engines.
