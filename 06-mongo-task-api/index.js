// require('dotenv').config();
const { MongoClient } = require("mongodb");

// dotenv.config({
// 	path: '.env',
// });

const uri = "mongodb://localhost:27017/"
const client = new MongoClient(uri);

async function run () {
    try {
        await client.connect();
        const db = client().db("assignments");
        const collection = db.collection("mongo")

        const first = await collection.findOne();
        console.log(first);
    } catch(error) {
        console.error("Error: ". error);
    } finally {
        await client.close();
    }
}

run().catch(console.error);