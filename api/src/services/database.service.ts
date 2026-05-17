import * as mongoDB from "mongodb";
import { LinkDocument } from "../models/link";

export const collections: { links?: mongoDB.Collection<LinkDocument> } = {}

const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DB_CONN_STRING);

export async function connectToDatabase() {
	await client.connect();

	const db: mongoDB.Db = client.db(process.env.DB_NAME);
	const linksCollection: mongoDB.Collection<LinkDocument> = db.collection(process.env.LINK_COLLECTION_NAME);
	collections.links = linksCollection;

	console.log(`Successfully connected to database: ${db.databaseName} and collection: ${linksCollection.collectionName}`)
}

export async function disconnectFromDatabase() {
	await client.close();
}