import { MongoClient, Db } from 'mongodb';
import { ItemsRepository } from '../repositories/items.repository';
import { UsersRepository } from '../repositories/users.repository';
import { OrderToUseRepository } from '../repositories/order-to-use.repository';

export namespace Database {

	class DbClient {
	   	database: Db;

	   	constructor( callback: (database: Db) => void ) {
			 this.connect(callback);
		}

	   private async connect( callback: (database: Db) => void ) { 
			MongoClient.connect("mongodb://localhost:27017", { useNewUrlParser: true }, (err, client) => {
				if (err) {
					console.log("Could not connect to server because of error: " + err);
				}
				else {
					console.log("MONGO-DB connection was established");
					this.database = client.db("e-rent");
					// TODO first check for db connection. call db method if the connection fails or continue from there if 
					// database already exists
					// this.checkDatabaseItems(this.database);
					callback(this.database);
				}
			});
		}
	}

	let _i_repo: ItemsRepository; 
	let _i_users_repo: UsersRepository;
	let _i_order_to_use_repo: OrderToUseRepository;
	function initiateRepos(database: Db) {
		_i_repo = new ItemsRepository(database);
		_i_users_repo = new UsersRepository(database);
		_i_order_to_use_repo = new OrderToUseRepository(database);
	}

	const dbClient = new DbClient(initiateRepos);

	export function client() {
		return dbClient.database;
	}

	export function i_repo() {
		return _i_repo;
	}

	export function users_repo() {
		return _i_users_repo;
	}

	export function orders_to_use_repo() {
		return _i_order_to_use_repo;
	}
}
