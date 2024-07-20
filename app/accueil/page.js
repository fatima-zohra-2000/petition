import { MongoClient } from 'mongodb';
import Home from '../../components/Home';

const uri = process.env.MONGODB_URI;
const options = {};

let client = new MongoClient(uri, options);
let clientPromise = client.connect();

async function fetchParticipantsCount() {
  const client = await clientPromise;
  const db = client.db('petition');
  const collection = db.collection('signatures');
  const count = await collection.countDocuments({});
  return count;
}

export default async function Page() {
  const participantsCount = await fetchParticipantsCount();
  return <Home participantsCount={participantsCount} />;
}
