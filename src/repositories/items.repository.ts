import { Db, Collection } from 'mongodb';
import { Database } from '../shared/db.connection';

export class ItemsRepository {
	private itemsCollection: Collection<any>;

	constructor(database: Db) {
		this.initializeCollection(database);
	}

	private initializeCollection(database: Db) {
		if ( typeof database === "undefined" ) {
			console.log("didn't get database");
		}
		else {
			console.log("database obtained in the items repository");
			this.itemsCollection = database.collection('items');
			// this.itemsCollection.find({}).toArray() .then(arr => console.log('found ' + arr.length));
		}
	}

	save(){
		console.log("Saving an item into the database");
	}

	findAll(): Promise<any[]> {
		return this.itemsCollection.find({}).toArray();
	}

}

