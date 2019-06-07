import { OrderToUse } from '../model/order-to-use';

export class OrderToUseService {
	
	fromJson(jsonData: any): OrderToUse {
		const order = new OrderToUse();

		order.itemId = jsonData.itemId;
		order.startDate = jsonData.startDate;
		order.addressToDeliver = jsonData.addressToDeliver;

		return order;
	}

}
