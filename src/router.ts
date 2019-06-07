import { ItemsController } from './controllers/items.controller';
import { UsersController } from './controllers/users.controller';
import { OrderToUseController } from './controllers/order-to-use.controller';

export class Router {

	constructor(private expressRouter: any) { }

	public initializeRoutes() {
		new ItemsController(this.expressRouter);
		new UsersController(this.expressRouter);
		new OrderToUseController(this.expressRouter);
	}
}
