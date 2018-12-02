import { ItemsService } from '../services/items.service';
import { Database } from '../shared/db.connection';
import { Item } from '../model/item';
import { Request, Response } from 'express';

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

		this.expressRouter.get('/api/items-db', (req, res) => {
			Database.i_repo().findAll().then(items => res.json(items));
		} );

		this.expressRouter.post('/api/save/item', (req, res) => {
			let body = '';
			req.on('data', chunk => {
				body += chunk.toString(); // convert Buffer to string
			});
			req.on('end', () => {
				const item = this.itemsService.parseJsonItem(JSON.parse(body));
				Database.i_repo().save(item);
				res.json("Item saved");
				res.end('ok');
			});
		});
	}
}
