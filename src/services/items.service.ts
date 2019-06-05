import { Item } from '../model/item';
import { SearchableItem } from '../model/searchable-item';
import { IdGeneratorService } from '../shared/id.generator.service';
import { Database } from '../shared/db.connection';
import { ObjectID } from 'mongodb';

export class ItemsService {
	private jsonItems = (<any>data).items;
	
	getSearchableItems(): Promise<SearchableItem[]> {
		const result = new Promise<SearchableItem[]>(function(resolve, reject){
			Database.i_repo().findAll().then( items => {
				let searchableItems = items.map(i => {
					return {
						itemId: i._id,
						searchableTags: i.searchableTags
					}
				});
				resolve(searchableItems);
			});
		});

		return result;
	}

	createJsonItems(): Item[] {
		console.log("Creating items");
		return this.jsonItems.map(this.parseJsonItem);
	}

	createItem(name: string): Item {
		let itemId: string = '' + IdGeneratorService.generate();
		return new Item(name);
	}

	parseJsonItem(jsonItem: any): Item {
		if (typeof jsonItem.name === 'undefined') {
			throw new Error('Json Item found in the items-data.json without name property' + jsonItem);
		}

		let item: Item = new Item(jsonItem.name);

		Object.keys(jsonItem).forEach(key => {
			if (item.hasOwnProperty(key)) {
				item[key] = jsonItem[key];
			}
		});

		if (!!jsonItem['_id']) {
			item._id = new ObjectID(jsonItem['_id']);
		}
		else {
			console.warn("%o", jsonItem);
			throw new Error("Item without _id property");
		}
		item.searchableTags = this.getSearchableTags(item);
		return item;
	}

	getItems(ids: string[]): Promise<Item[]> {
		return Database.i_repo().findByIds(ids);
	}

	private getSearchableTags(item: Item) {
		let searchableTags = [];
		let tagsFromDescription: string[] = item.description.split(' ').filter(t => t.length > 0);
		let tagsFromName: string[] = item.name.split(' ').filter(t => t.length > 0);
		searchableTags = searchableTags.concat(tagsFromDescription);
		searchableTags = searchableTags.concat(tagsFromName);
		searchableTags.push(item.description);
		searchableTags.push(item.name);
		return searchableTags;
	}
}
