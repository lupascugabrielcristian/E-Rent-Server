export class Item {
	_id: string = "";
	name: string = "";
	description: string = "";
	price: number = 0;
	currency: string = "";
	locations: any[] = [];
	state: any;
	images: string[] = [];
	featuredImage: string = "";
	specifications: string[] = [];

	constructor(itemId:string, itemName: string) {
		this._id = itemId;
		this.name = itemName;
	}
}
