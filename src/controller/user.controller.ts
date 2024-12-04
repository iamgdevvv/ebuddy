import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { User } from '@modules/user/interface';
import { UserService } from '@modules/user/service';
import type { CreateUserDto, UpdateUserDto } from '@/modules/user/dto';

export class UserController {
	public user = Container.get(UserService);

	public getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		try {
			const findAllUsersData: User[] = await this.user.findAllUser(req.query);

			res.status(200).json({
				success: true,
				message: 'findAll',
				data: findAllUsersData,
			});
		} catch (error) {
			next(error);
		}
	};

	public getUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		try {
			const findOneUserData: User = await this.user.findUserById(req.params.id, req.query);

			res.status(200).json({
				success: true,
				message: 'findOne',
				data: findOneUserData,
			});
		} catch (error) {
			next(error);
		}
	};

	public createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		try {
			const userData: CreateUserDto = req.body;
			const createUserData: User = await this.user.createUser(userData);

			res.status(200).json({
				success: true,
				message: 'created',
				data: createUserData,
			});
		} catch (error) {
			next(error);
		}
	};

	public updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		try {
			const userData: UpdateUserDto = req.body;
			const updateUserData: User = await this.user.updateUser(req.params.id, userData);

			res.status(200).json({
				success: true,
				message: 'updated',
				data: updateUserData,
			});
		} catch (error) {
			next(error);
		}
	};

	public deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		try {
			await this.user.deleteUser(req.params.id);

			res.status(200).json({
				success: true,
				message: 'deleted',
			});
		} catch (error) {
			next(error);
		}
	};
}
