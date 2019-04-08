import { User } from '../model/user';
import { UsersService } from '../services/users.service';
import { Database } from '../shared/db.connection';

export class UsersController {
	private usersService: UsersService = new UsersService();

	constructor(private expressRouter: any) {
		this.registerRoutes();
	}

	private registerRoutes() {
		this.expressRouter.get('/api/users', (req, res) => {
			Database.users_repo().findAll().then(users => res.json(users));
		});

		this.expressRouter.post('/api/save/user', (req, res) => {
			let body = '';
			req.on('data', chunk => {
				body += chunk.toString(); // convert Buffer to string
			});
			req.on('end', () => {
				const user: User = this.usersService.parseJsonItem(JSON.parse(body));
				Database.users_repo().save(user);
				res.json("User should be saved");
				res.end('ok');
			});
		});
	}
}
