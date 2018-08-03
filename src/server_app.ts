import * as express from 'express';
import { Db } from 'mongodb';
import { Router } from './router';

// this should allready have colled the constructor 
// and can have the collection
import { Database } from './shared/db.connection';

class App {
	express;

	constructor() {
		Database.client();
		this.express = express();
		this.mountRoutes();
	}

	private mountRoutes() {
		const router = express.Router();
		new Router(router).initializeRoutes();
		this.express.use('/', router);
	}

}

export default new App().express
