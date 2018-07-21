export class Item {
	private _id: string = "";
	name: string = "";
	description: string = "";
	price: number = 0;
	currency: string = "";
	locations: any[] = [];
	state: any;
	photos: string[] = [];
	featuredImage: string = "";
	specifications: string[] = [];

	constructor(itemId:string, itemName: string) {
		this._id = itemId;
		this.name = itemName;
	}

	get id() {
		return this._id;
	}

	set id(newId: string) {
		if ( this._id === "") {
			this._id === newId;
		}
	}
}
