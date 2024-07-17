import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const options = {};

let client;
let clientPromise;

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local');
}

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export async function POST(req) {
  const { name, studentNumber, email } = await req.json();

  try {
    const client = await clientPromise;
    const db = client.db('petition');
    const collection = db.collection('signatures');

    await collection.insertOne({ name, studentNumber, email });
    return new Response(JSON.stringify({ message: 'Petition signed successfully' }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to sign petition' }), { status: 500 });
  }
}
