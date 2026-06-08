# Lab 3: Performance Comparison Report

## Execution Analysis
When running `db.products.find({ category: "Category 5" }).explain("executionStats")` **without** indexes, MongoDB performs a `COLLSCAN` (Collection Scan). 

After applying `db.products.createIndex({ category: 1 })` and using `.hint({ category: 1 })`, the execution stage changes to `IXSCAN` (Index Scan). The `totalDocsExamined` drops significantly, resulting in execution times dropping from multiple milliseconds to ~0-1ms.

## Optimization Recommendations
1. **Use Compound Indexes** for queries filtering on multiple fields. Order matters: follow the ESR (Equality, Sort, Range) rule.
2. **Limit Multikey Indexes:** Indexing arrays (like `tags`) is powerful but consumes high memory.
3. **Always check `.explain("executionStats")`** in production.
