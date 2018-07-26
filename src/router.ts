import { ItemsController } from './controllers/items.controller';

export class Router {

	constructor(private expressRouter: any) { }

	public initializeRoutes() {
		new ItemsController(this.expressRouter);
	}
}
