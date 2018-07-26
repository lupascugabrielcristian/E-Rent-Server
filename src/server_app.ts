import * as express from 'express';
import { Db } from 'mongodb';
import { Router } from './router';
import DbClient = require('./shared/db.connection');

class App {
	public express;

	constructor() {
		this.express = express();
		this.mountRoutes();
		DbClient.connect(this.databaseConnected);
	}

	private mountRoutes() {
		const router = express.Router();
		new Router(router).initializeRoutes();
		this.express.use('/', router);
	}

	private databaseConnected(db: Db) {
		const itemsCollection = db.collection("items");
		itemsCollection.insert( { name: 'some name' } );
	}
}

export default new App().express
