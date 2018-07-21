import * as data from '../assets/items-data.json';

import { Item } from './item.model';
import { IdGeneratorService } from './shared/id.generator.service';

export class ItemsService {
	private jsonItems = (<any>data).items;

	createItems(): Item[] {
		console.log("Creating items");
		return this.jsonItems.map(this.parseJsonItem);
	}

	private parseJsonItem(jsonItem: any): Item {
		if (typeof jsonItem.name === 'undefined') {
			throw new Error('Json Item found in the items-data.json without name property' + jsonItem);
		}

		let itemId: string = '' + IdGeneratorService.generate();
		let item: Item = new Item(itemId, jsonItem.name);

		Object.keys(jsonItem).forEach(key => {
			if (item.hasOwnProperty(key)) {
				item[key] = jsonItem[key];
			}
		});
		return item;
	}
}
