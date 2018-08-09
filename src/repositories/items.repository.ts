import { Db, Collection } from 'mongodb';
import { Database } from '../shared/db.connection';
import { Item } from '../model/item';

export class ItemsRepository {
	private itemsCollection: Collection<any>;

	constructor(database: Db) {
		this.initializeCollection(database);
	}

	private initializeCollection(database: Db) {
		if ( typeof database === "undefined" ) {
			console.log("[Items Repository] didn't get database");
		}
		else {
			this.itemsCollection = database.collection('items');
		}
	}

	save(item: Item): void {
		const a = this.itemsCollection.insertOne(item);
		console.log("Saving an item into the database " + a);
	}

	findAll(): Promise<any[]> {
		return this.itemsCollection.find({}).toArray();
	}
}

