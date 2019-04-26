import * as data from '../../assets/items-data.json';

import { Item } from '../model/item';
import { SearchableItem } from '../model/searchable-item';
import { IdGeneratorService } from '../shared/id.generator.service';
import { Database } from '../shared/db.connection';

export class ItemsService {
	private jsonItems = (<any>data).items;
	
	getSearchableItems(): SearchableItem[] {
		return this.jsonItems.map(item => {
			return {
				itemId: item._id,
				searchableTags: item.searchableTags
			}
		});
	}

	createJsonItems(): Item[] {
		console.log("Creating items");
		return this.jsonItems.map(this.parseJsonItem);
	}

	createItem(name: string): Item {
		let itemId: string = '' + IdGeneratorService.generate();
		return new Item(itemId, name);
	}

	parseJsonItem(jsonItem: any): Item {
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

	getItems(ids: string[]): Promise<Item[]> {
		return Database.i_repo().findByIds(ids);
	}
}
