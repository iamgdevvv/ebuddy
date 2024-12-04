import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { SECRET_KEY } from '@config';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, RequestWithUser } from '@modules/auth/interface';

const getAuthorization = (req: RequestWithUser) => {
	const coockie = req.cookies['Authorization'];
	if (coockie) return coockie;

	const header = req.header('Authorization');
	if (header) return header.split('Bearer ')[1];

	return null;
};

export const AuthMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
	try {
		const authToken = getAuthorization(req);

		if (authToken) {
			const authUser = verify(authToken, SECRET_KEY) as DataStoredInToken;

			if (authUser) {
				req.user = authUser;
				next();
			} else {
				next(new HttpException(401, 'Wrong authentication token'));
			}
		} else {
			next(new HttpException(404, 'Authentication token missing'));
		}
	} catch (error) {
		console.log(error);
		next(new HttpException(401, 'Wrong authentication token'));
	}
};
