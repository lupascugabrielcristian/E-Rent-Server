import { User } from '../model/user';
import { IdGeneratorService } from '../shared/id.generator.service';


export class UsersService {

	parseJsonItem(jsonItem: any): User {
		if (typeof jsonItem.name === 'undefined') {
			throw new Error('Json Item found in the items-data.json without name property' + jsonItem);
		}

		let userId: string = '' + IdGeneratorService.generate();
		let user: User = new User(userId);

		Object.keys(jsonItem).forEach(key => {
			if (user.hasOwnProperty(key)) {
				user[key] = jsonItem[key];
			}
		});
		return user;
	}
}
