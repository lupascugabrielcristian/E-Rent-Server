import { Command } from './command';

export class User {
	private _id: string;
	name: string;
	email: string;
	phone: string;
	address: string;
	userName: string;
	password: string; 

	// This should be optional and the user should be able to set it specifically
	orderHistory: Command[];

	// This should be a private field, in the sense that it will not be displayed 
	// on any page. It will be used for us, to measure how trustworthy is a person, 
	// based on previous orders.
	rating: number; 
	
	constructor(name: string, userName: string, password: string){
		this.name = name;
		this.userName = userName;
		this.password = password;
	}
}
