require('dotenv').config();
const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function run () {
    try {
        await client.connect();
        const db = client().db("mernAssignments");
        const collection = db.collection("mongo-api")

        const first = await collection.findOne();
        console.log(first);
    } catch(error) {
        console.error("Error: ". error);
    } finally {
        await client.close();
    }
}

run().catch(console.error);