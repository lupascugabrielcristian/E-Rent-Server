import { Db, Collection } from 'mongodb';
import { Database } from '../shared/db.connection';
import { OrderToUse } from '../model/order-to-use';
import { forkJoin, Subscription } from 'rxjs';

export class OrderToUseRepository {
	private collection: Collection<OrderToUse>;

	constructor(database: Db) {
		this.initializeCollection(database);
	}

	save(order: OrderToUse): void {
		this.collection.insertOne(order);
	}

	findAll(): Promise<OrderToUse[]> {
		return this.collection.find({}).toArray();
	}

	deleteOrderByItemId(itemId: string): Promise<number> {
		const collection = this.collection;  
		let result: Promise<number> = new Promise(function(resolve, reject){
		
			collection.deleteOne( {itemId: itemId}, function(err, r) {
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

	private initializeCollection(database: Db) {
		if ( typeof database === "undefined" ) {
			console.log("[OrderToUse Repository] didn't get database");
		}
		else {
			this.collection = database.collection('ordersToUse');
		}
	}
}
