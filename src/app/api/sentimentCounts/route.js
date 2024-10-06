import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function connectToDatabase() {
  await client.connect();
  return client.db("mental_health");
}

export async function GET(req) {
  try {
    const db = await connectToDatabase();
    const collection = db.collection("sentiment_counts");

    const data = await collection.find({}).toArray();
    console.log("server data: ", data);

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response("Error fetching data", { status: 500 });
  } finally {
    await client.close();
  }
}
