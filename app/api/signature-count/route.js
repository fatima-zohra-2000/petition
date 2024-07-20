import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';

const uri = process.env.MONGODB_URI;
const options = {};

if (!uri) {
  throw new Error('Please add your Mongo URI to .env.local');
}

let client = new MongoClient(uri, options);
let clientPromise = client.connect();

export const revalidate = 0; // this is what resolve the problem of synchronizing data after deployment 

export async function GET(request) {
  try {
    console.log("Connecting to MongoDB...");
    const client = await clientPromise;
    const db = client.db('petition');
    const collection = db.collection('signatures');

    const count = await collection.countDocuments({});
    console.log("Count fetched:", count);

    return NextResponse.json({ count });
  } catch (error) {
    console.error('Failed to count signatures:', error);
    return NextResponse.json({ error: 'Failed to count signatures' }, { status: 500 });
  }
}
