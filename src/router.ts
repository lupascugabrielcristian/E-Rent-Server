import { ItemsController } from './controllers/items.controller';
import { UsersController } from './controllers/users.controller';

export class Router {

	constructor(private expressRouter: any) { }

	public initializeRoutes() {
		new ItemsController(this.expressRouter);
		new UsersController(this.expressRouter);
	}
}
