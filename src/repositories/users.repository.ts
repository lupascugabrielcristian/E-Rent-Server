import { Db, Collection } from 'mongodb';
import { Database } from '../shared/db.connection';
import { User } from '../model/user';
import { forkJoin, Subscription } from 'rxjs';

export class UsersRepository {
	private usersCollection: Collection<User>;

	constructor(database: Db) {
		this.initializeCollection(database);
	}

	save(user: User): void {
		this.usersCollection.insertOne(user);
	}

	findAll(): Promise<User[]> {
		return this.usersCollection.find({}).toArray();
	}

	deleteItem(userId: string): Promise<number> {
		const collection = this.usersCollection;  
		let result: Promise<number> = new Promise(function(resolve, reject){
		
			collection.deleteOne( {_id: userId}, function(err, r) {
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
			console.log("[Users Repository] didn't get database");
		}
		else {
			this.usersCollection = database.collection('users');
		}
	}
}
