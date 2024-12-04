import { Router } from 'express';
import { UserController } from '@controllers/user.controller';
import { CreateUserDto, QueryUserDto, UpdateUserDto } from '@modules/user/dto';
import { ValidationMiddleware } from '@middleware/validation.middleware';

export class UserRoute {
	public router = Router();
	public user = new UserController();

	constructor() {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.get('/users', this.user.getUsers);
		this.router.post('/users', ValidationMiddleware(CreateUserDto), this.user.createUser);
		this.router.delete('/users/:id', this.user.deleteUser);

		this.router.get('/fetch-user-data/:id', ValidationMiddleware(QueryUserDto), this.user.getUserById);
		this.router.patch('/update-user-data/:id', ValidationMiddleware(UpdateUserDto), this.user.updateUser);
	}
}
