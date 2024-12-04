import { Router } from 'express';
import { ValidationMiddleware } from '@middleware/validation.middleware';
import { AuthController } from '@controllers/auth.controller';
import { LoginDto, RegisterDto } from '@modules/auth/dto';

export class AuthRoute {
	public router = Router();
	public auth = new AuthController();

	constructor() {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.post('/register', ValidationMiddleware(RegisterDto), this.auth.register);
		this.router.post('/login', ValidationMiddleware(LoginDto), this.auth.login);
	}
}
