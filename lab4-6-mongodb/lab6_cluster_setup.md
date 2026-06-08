# Lab 6: MongoDB Replication & Sharding Setup
*Note: This lab requires a multi-node cluster. Below are the commands to initialize it when running multiple `mongod` instances.*

## Part A: Replication Setup
1. Start three instances: `mongod --port 27017 --replSet rs0`, `mongod --port 27018 --replSet rs0`, `mongod --port 27019 --replSet rs0`
2. Connect to port 27017 and initiate:
```javascript
rs.initiate({
  _id: "rs0",
  members: [
    { _id: 0, host: "localhost:27017" },
    { _id: 1, host: "localhost:27018" },
    { _id: 2, host: "localhost:27019", arbiterOnly: true }
  ]
})
Test failover: rs.stepDown()

Part B: Sharding Implementation
Start Config Server: mongod --configsvr --replSet configReplSet --port 27022

Start Shards: mongod --shardsvr --replSet shard1 --port 27020

Start Router: mongos --configdb configReplSet/localhost:27022 --port 27023

Add Shards via mongos: sh.addShard("shard1/localhost:27020")

Enable Sharding: sh.enableSharding("sharded_db") and sh.shardCollection("sharded_db.orders", { customer_id: 1 })
