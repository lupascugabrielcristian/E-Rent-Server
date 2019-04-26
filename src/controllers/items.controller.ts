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

		this.expressRouter.get('/api/searchable-items', (req, res) => {
			res.json( this.itemsService.getSearchableItems() );
		});

		this.expressRouter.get('/api/items-db', (req, res) => {
			Database.i_repo().findAll().then(items => res.json(items));
		});

		this.expressRouter.post('/api/save/item', (req, res) => {
			let body = '';
			req.on('data', chunk => {
				body += chunk.toString(); // convert Buffer to string
			});
			req.on('end', () => {
				const item: Item = this.itemsService.parseJsonItem(JSON.parse(body));
				Database.i_repo().save(item);
				res.json("Item saved");
				res.end('ok');
			});
		});

		this.expressRouter.post('/api/edit/item', (req, res) => {
			let body = '';
			req.on('data', chunk => {
				body += chunk.toString(); // convert Buffer to string
			});
			req.on('end', () => {
				const item: Item = this.itemsService.parseJsonItem(JSON.parse(body));
				Database.i_repo().change(item);
				res.json("Item saved");
				res.end('ok');
			});
		});

		this.expressRouter.post('/api/delete/items', (req, res) => {
			let body = '';
			req.on('data', chunk => {
				body += chunk.toString(); // convert Buffer to string
			});
			req.on('end', () => {
				const itemIds: string[] = JSON.parse(body);
				Database.i_repo().deleteItems(itemIds).then(data => { res.json("Deleted items operation completed"); res.end("Deleted"); } );
			});
		});

		this.expressRouter.delete('/api/item/:id', (req , res) => {
			Database.i_repo().deleteItem(req.params.id)
				.then(deletedCount => res.send("Deleted " + deletedCount)); 
		});

		this.expressRouter.post('/api/to-items', (req, res) => {
			let body = '';
			req.on('data', chunk => {
				body += chunk.toString(); // convert Buffer to string
			});
			req.on('end', () => {
				const itemsIds: string[] = JSON.parse(body);
				console.log(itemsIds);
				this.itemsService.getItems(itemsIds).then(items => {
					res.json(items);
					res.end('ok');
				});
			});
		});
	}
}
