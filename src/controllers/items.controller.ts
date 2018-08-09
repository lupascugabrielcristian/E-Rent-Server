import { ItemsService } from '../services/items.service';
import { Database } from '../shared/db.connection';
import { Item } from '../model/item';

export class ItemsController {
	private itemsService: ItemsService;

	constructor(private expressRouter: any) {
		this.registerRoutes();	
		this.itemsService = new ItemsService();
	}

	private registerRoutes() {
		this.expressRouter.get('/api/items', (req, res) => {
			res.json(this.itemsService.createJsonItems());	
		});

		this.expressRouter.get('/api/items-db/', (req, res) => {
			Database.i_repo().findAll().then(items => res.json(items));
		} );

		this.expressRouter.post('/api/save/item', (req, res) => {
			if( typeof req.query.itemName == 'undefined'){
				console.log('Cannot find item name in the POST query parameters');
				return;
			}

			if (typeof req.body !== 'undefined') {
				console.log('Request body is not undefined');
			}

			const itemName: string = req.query.itemName;
			const item: Item = this.itemsService.createItem(itemName);
			Database.i_repo().save(item);
			console.log('item saved: %o', item);
			res.json("Item saved");
		});
	}
}
