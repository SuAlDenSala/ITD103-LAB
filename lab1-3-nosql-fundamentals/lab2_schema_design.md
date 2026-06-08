# Lab 2: Document Database Design

## E-commerce Product Catalog Schema
* **Products:** Stored as documents. `variants` (color, stock) and `reviews` (user, rating, comment) are **embedded** within the product document because they are frequently accessed together and rarely grow unboundedly.
* **Categories:** Stored as an embedded array of strings for simple querying.

## Blog System Schema
* **Posts:** Main document. 
* **Authors:** **Referenced** via `author_id` to avoid duplicating author details across hundreds of posts.
* **Comments:** Stored using a **hierarchical structure** (parent-child references) or embedded if the comment thread is capped, to easily retrieve nested replies.
