import { OrderStatus } from './order.status';

export class Command {

	// Client properties must not be taken directly from client model
	// to avoid forcing the client to register and provide this info there
	// I wish to keep registration optional for privacy reasons
	clientName: string;
	clientAddress: string;
	clientPhoneNumber: string;
	clientEmail: string;

	orderId: string;
	itemId: string;
	orderStartDate: string; // When arrives at the client
	orderEndDate: string;

	orderStatus: OrderStatus;

	constructor(itemId: string, orderStartDate: string) {
		this.itemId = itemId;		
		this.orderStartDate = orderStartDate;
	}
}
