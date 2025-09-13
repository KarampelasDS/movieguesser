import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export default async function handler(req, res) {
  try {
    await client.connect();
    const db = client.db("MovieGuesser");
    const movies = await db.collection("Movies").find({}).toArray();
    res.status(200).json(movies);
  } catch (error) {
    console.error("Error fetching movies:", error);
    res.status(500).json({ error: "500: Internal Server Error" });
  } finally {
    await client.close();
  }
}
