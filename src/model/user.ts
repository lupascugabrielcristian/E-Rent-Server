import { Command } from './command';

export class User {
	readonly id: string;
	name: string = "user";
	email: string;
	phone: string;
	address: string;
	userName: string = "user";
	password: string = "user"; 

	// This should be optional and the user should be able to set it specifically
	orderHistory: Command[];

	// This should be a private field, in the sense that it will not be displayed 
	// on any page. It will be used for us, to measure how trustworthy is a person, 
	// based on previous orders.
	rating: number; 
	
	constructor(id: string){
		this.id = id;
	}
}
