import { OrderToUse } from '../model/order-to-use';
import { OrderToUseService } from '../services/order-to-use.service';
import { Database } from '../shared/db.connection';

export class OrderToUseController {
	private orderToUseService: OrderToUseService = new OrderToUseService();

	constructor(private expressRouter: any) {
		this.registerRoutes();
	}

	private registerRoutes() {
		this.expressRouter.get('/api/order_to_use', (req, res) => {
			Database.users_repo().findAll().then(users => res.json(users));
		});

		this.expressRouter.post('/api/save/order_to_use', (req, res) => {
			let body = '';
			req.on('data', chunk => {
				body += chunk.toString(); // convert Buffer to string
			});
			req.on('end', () => {
				const order: OrderToUse = this.orderToUseService.fromJson(JSON.parse(body));
				Database.orders_to_use_repo().save(order);
				res.json("Order should be saved");
				res.end('ok');
			});
		});
	}
}
