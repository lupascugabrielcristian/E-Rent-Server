import { ObjectID } from 'mongodb';

export class Item {
	_id: ObjectID;
	name: string = "";
	description: string = "";
	price: number = 0;
	currency: string = "";
	locations: any[] = [];
	state: any;
	images: string[] = [];
	featuredImage: string = "";
	specifications: string[] = [];
	searchableTags: string[] = [];

	constructor(itemName: string) {
		this.name = itemName;
		this.searchableTags.push(itemName);
	}
}
