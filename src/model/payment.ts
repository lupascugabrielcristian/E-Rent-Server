export interface Payment {
}

export class CreditCardPayment implements Payment {
	nameOnCard: string = "";
	cardNumber: string = "";
	expirationDate: string = "";
	securityCode: string = "";
}

export class CashPayment implements Payment {
}

export class PayPallPayment implements Payment {
}
