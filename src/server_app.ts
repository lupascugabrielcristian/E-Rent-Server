import * as express from 'express';
import { Router } from './router';

// this should allready have colled the constructor 
// and can have the collection
import { Database } from './shared/db.connection';

class App {
	express;

	constructor() {
		initilizeDatabase();
		this.express = express();
		this.mountRoutes();
	}

	private mountRoutes() {
		const router = express.Router();
		new Router(router).initializeRoutes();
		this.express.use('/', router);
	}
}

async function initilizeDatabase(){
	await Database.client();
}

export default new App().express
