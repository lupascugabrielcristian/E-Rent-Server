import { ItemsController } from './controllers/items.controller';

export class Router {

	constructor(private expressRouter: any) { }

	initializeRoutes() {
		new ItemsController(this.expressRouter);
	}
}
