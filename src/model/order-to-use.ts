import { OrderState } from './order-state.enum';
import { ClientForUse } from './client-for-use';
import { Payment, CreditCardPayment } from './payment';

export class OrderToUse {
	itemId: string = "";
	startDate: string = ""; // asta ar trebui sa fie format special
	endtDate: string = ""; // asta ar trebui sa fie format special
	addressToDeliver: string = "";
	orderState: OrderState = OrderState.REGISTERED;
	client: ClientForUse = new ClientForUse();
	payment: Payment = new CreditCardPayment();
}
