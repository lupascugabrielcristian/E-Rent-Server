import { ItemsService } from './items.service';

export class Router {
	private itemsService;

	constructor(private expressRouter: any) {
		this.itemsService = new ItemsService();
	}

	initializeRoutes() {
		this.expressRouter.get('/api/test_get', (req, res) => {
			res.json("Test_get_OK");	
		});
		this.expressRouter.get('/api/items', (req, res) => {
			res.json(this.itemsService.createItems());	
		});
	}
}
