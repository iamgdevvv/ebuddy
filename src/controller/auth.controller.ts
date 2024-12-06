import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { User } from '@modules/user/interface';
import { AuthService } from '@modules/auth/service';
import type { LoginDto, RegisterDto } from '@/modules/auth/dto';

export class AuthController {
	public auth = Container.get(AuthService);

	public register = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const userData: RegisterDto = req.body;
			const signUpUserData: User = await this.auth.register(userData);

			res.status(200).json({
				success: true,
				statusCode: 200,
				message: 'signup',
				data: signUpUserData,
			});
		} catch (error) {
			next(error);
		}
	};

	public login = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const userData: LoginDto = req.body;
			const authLogin = await this.auth.login(userData);

			res.status(200).json({
				success: true,
				statusCode: 200,
				message: 'login',
				data: authLogin,
			});
		} catch (error) {
			next(error);
		}
	};
}
