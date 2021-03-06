import { Db, Collection, ObjectID } from 'mongodb';
import { Database } from '../shared/db.connection';
import { Item } from '../model/item';
import { forkJoin, Subscription } from 'rxjs';

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
		item._id = new ObjectID();
		this.itemsCollection.insertOne(item);
	}

	change(item: Item): Promise<boolean> {
		const collection = this.itemsCollection;  
		let result: Promise<boolean> = new Promise(function(resolve, reject) {
			console.log("replacing item with id: %s", item._id);
			collection.replaceOne( { _id: new ObjectID(item._id) }, item, function(err, r) {
				if (err) {
					reject(new Error("Some error ocurred in database update operation:  " + err));
				}
				else {
					resolve(true); 
				}
			});

		});

		return result;
	}

	findAll(): Promise<any[]> {
		return this.itemsCollection.find({}).toArray();
	}

	findByIds(ids: string[]): Promise<Item[]> {
		const collection = this.itemsCollection;  
		const service = this;

		const promises = ids.map( itemId => {
			return collection.findOne({ _id: new ObjectID(itemId)});
		});

		return new Promise( function(resolve, reject){
			forkJoin( promises ).subscribe(values => resolve(values));	
		});
	}

	deleteItem(itemId: string): Promise<number> {
		const collection = this.itemsCollection;  
		let result: Promise<number> = new Promise(function(resolve, reject){
		
			collection.deleteOne( {_id: new ObjectID(itemId)}, function(err, r) {
				if (err) {
					reject(new Error("Some error ocurred in database delete operation: " + err));
				}
				else {
					resolve(r.deletedCount); 
				}
			});

		});

		return result;
	}

	deleteItems(ids: string[]): Promise<boolean> {
		const collection = this.itemsCollection;  
		const service = this;

		const promises = ids.map( itemId => {
			return service.deleteItem(itemId);
		});

		return new Promise( function(resolve, reject){
			forkJoin( promises ).subscribe(values => resolve(true));	
		});
	}
}

