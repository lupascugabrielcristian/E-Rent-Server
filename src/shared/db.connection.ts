import { MongoClient, Db } from 'mongodb';

export namespace Database {

	class DbClient {
	   	database: Db;

	   	constructor() {
			this.connect();
		}

	   private connect() { 
			MongoClient.connect("mongodb://localhost:27017", { useNewUrlParser: true }, (err, client) => {
				if (err) {
					console.log("Could not connect to server because of error: " + err);
				}
				else {
					console.log("mongodb connection was established");
					this.database = client.db("e-rent");
					// TODO first check for db connection. call db method if the connection fails or continue from there if 
					// database already exists
					this.checkDatabaseItems(this.database);
				}
			});
		}

		private checkDatabaseItems(client: Db): void {
			const itemsCollection = client.collection('items');
			const items: any[] = [];
			itemsCollection.find({}).map(item => items.push(item));
			console.log('There are %d items in "items" collection', items.length);
		}
	}

	const dbClient = new DbClient();
	export function client() {
		return dbClient.database;
	}
}
