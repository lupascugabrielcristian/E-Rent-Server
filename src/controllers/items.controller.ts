import { ItemsService } from '../services/items.service';
import { Database } from '../shared/db.connection';

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

		this.expressRouter.get('/api/items-mongo/', (req, res) => {
			res.json(Database.i_repo().findAll());
		} );

		this.expressRouter.post('/api/save/item', (req, res) => {
			console.log("saving item");
			res.send('Response: item saved');
		});
	}
}
