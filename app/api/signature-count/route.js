// //api/signature-count/route.js 
// import { MongoClient } from 'mongodb';

// // Définissez votre URI MongoDB et les options de connexion
// const uri = process.env.MONGODB_URI;
// const options = {};

// // Initialisez le client MongoDB et clientPromise
// let client;
// let clientPromise;

// if (!process.env.MONGODB_URI) {
//   throw new Error('Please add your Mongo URI to .env.local');
// }

// if (process.env.NODE_ENV === 'development') {
//   if (!global._mongoClientPromise) {
//     client = new MongoClient(uri, options);
//     global._mongoClientPromise = client.connect();
//   }
//   clientPromise = global._mongoClientPromise;
// } else {
//   client = new MongoClient(uri, options);
//   clientPromise = client.connect();
// }

// export default async function handler(req, res) {
//   if (req.method === 'GET') {
//     try {
//       const client = await clientPromise;
//       const db = client.db('petition');
//       const collection = db.collection('signatures');

//       // Comptez les documents dans la collection 'signatures'
//       const count = await collection.countDocuments({});

//       res.status(200).json({ count });
//     } catch (error) {
//       console.error('Failed to count signatures:', error);
//       res.status(500).json({ error: 'Failed to count signatures' });
//     }
//   } else {
//     res.setHeader('Allow', ['GET']);
//     res.status(405).json({ message: `Method ${req.method} Not Allowed` });
//   }
// }

import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';

// Définissez votre URI MongoDB et les options de connexion
const uri = process.env.MONGODB_URI;
const options = {};

if (!uri) {
  throw new Error('Please add your Mongo URI to .env.local');
}

// Initialisez le client MongoDB et clientPromise
let client = new MongoClient(uri, options);
let clientPromise = client.connect();

export async function GET(request) {
  try {
    console.log("Connecting to MongoDB...");
    const client = await clientPromise;
    const db = client.db('petition');
    const collection = db.collection('signatures');

    // Comptez les documents dans la collection 'signatures'
    const count = await collection.countDocuments({});
    console.log("Count fetched:", count);

    return NextResponse.json({ count }, { status: 200 });
  } catch (error) {
    console.error('Failed to count signatures:', error);
    return NextResponse.json({ error: 'Failed to count signatures' }, { status: 500 });
  }
}

export function handler(request) {
  return NextResponse.json({ message: `Method ${request.method} Not Allowed` }, { status: 405, headers: { Allow: 'GET' } });
}

