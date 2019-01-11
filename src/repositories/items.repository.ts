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

	deleteItem(itemId: string): Promise<number> {
		const collection = this.itemsCollection;  
		let result: Promise<number> = new Promise(function(resolve, reject){
		
			collection.deleteOne( {_id: itemId}, function(err, r) {
				if (err) {
					reject(new Error("Some error ocurred in database delete opeation"));

				}
				else {
					console.log("Deleted from database " + r.deletedCount);	
					resolve(r.deletedCount); 
				}
			});

		});

		return result;
	}

	deleteItems(ids: string[]): void {
		const collection = this.itemsCollection;  
		const service = this;

		const promises = ids.map( itemId => {
			return service.deleteItem(itemId);
		});

		Rx.Observable.forkJoin(  promises  ).subscribe(function handleValue(values) { 
		
			console.log("All promises arrived with value %o", values);
		
		} );
	}
}

