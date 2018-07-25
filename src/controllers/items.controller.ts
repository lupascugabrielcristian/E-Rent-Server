import { ItemsService } from '../services/items.service';

export class ItemsController {
	private itemsService: ItemsService;

	constructor(private expressRouter: any) {
		this.registerRoutes();	
		this.itemsService = new ItemsService();
	}

	private registerRoutes() {
		this.expressRouter.get('/api/items', (req, res) => {
			res.json(this.itemsService.createItems());	
		});

		this.expressRouter.post('/api/save/item', (req, res) => {
			console.log("saving item");
			res.send('Response: item saved');
		});
	}
}
