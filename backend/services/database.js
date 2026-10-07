import { MongoClient } from 'mongodb';
import { GATES } from './logic.js';

const databaseName = process.env.MONGODB_DB_NAME || 'logiclab';
let client;
let databasePromise;
let seedPromise;

async function connectToDatabase() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('MONGODB_URI is not configured.');
  }

  if (!databasePromise) {
    client = new MongoClient(uri, { maxPoolSize: 10 });
    databasePromise = client.connect()
      .then(() => client.db(databaseName))
      .catch(async (error) => {
        databasePromise = undefined;
        const failedClient = client;
        client = undefined;
        await failedClient?.close().catch(() => {});
        throw error;
      });
  }

  return databasePromise;
}

export async function getGatesCollection() {
  const database = await connectToDatabase();
  const collection = database.collection('gates');

  if (!seedPromise) {
    seedPromise = collection.bulkWrite(GATES.map((gate, order) => ({
      updateOne: {
        filter: { id: gate.id },
        update: { $set: { ...gate, order } },
        upsert: true
      }
    }))).catch((error) => {
      seedPromise = undefined;
      throw error;
    });
  }

  await seedPromise;
  return collection;
}
