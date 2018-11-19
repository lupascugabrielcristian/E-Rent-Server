export class Item {
	private id: string = "";
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
		this.id = itemId;
		this.name = itemName;
	}

	getId() {
		return this.id;
	}

	setId(newId: string) {
		if ( this.id === "") {
			this.id === newId;
		}
	}
}
