export class UsersController {
	// private usersService: UsersService;

	constructor(private expressRouter: any) {
		this.registerRoutes();
	}

	private registerRoutes() {
		this.expressRouter.post('/api/save/user', (req, res) => {
			let body = '';
			req.on('data', chunk => {
				body += chunk.toString(); // convert Buffer to string
			});
			req.on('end', () => {
				const item: User = this.userService.parseJsonItem(JSON.parse(body));
				Database.i_repo().save(user);
				res.json("User should be saved");
				res.end('ok');
			});
		});
	}
}
