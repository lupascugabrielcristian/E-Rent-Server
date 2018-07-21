import * as express from 'express';
import { Router } from './router';

class App {
	public express;

	constructor() {
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
