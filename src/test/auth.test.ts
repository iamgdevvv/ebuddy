import request from 'supertest';
import { faker } from '@faker-js/faker';
import { App } from '@/app';
import { AuthRoute } from '@/modules/auth/route';
import type { LoginDto, RegisterDto } from '@/modules/auth/dto';

const payloadLogin: LoginDto = {
	username: faker.internet.username(),
	password: faker.internet.password(),
};

const payloadRegister: RegisterDto = {
	...payloadLogin,
	email: faker.internet.email(),
};

describe('TEST Authorization API', () => {
	const authRoute = new AuthRoute();
	const app = new App([authRoute.router]);

	describe('[POST] /register', () => {
		it('response should http code 200', () => {
			return request(app.getServer()).post('/register').send(payloadRegister).expect(200);
		});
	});

	describe('[POST] /register', () => {
		it('response should http code 409 Conflict cause email already exists', () => {
			return request(app.getServer()).post('/register').send(payloadRegister).expect(409);
		});
	});

	describe('[POST] /login', () => {
		it('response should return authorization token and expiresIn', () => {
			return request(app.getServer())
				.post('/login')
				.send(payloadLogin)
				.expect(200)
				.expect(res => {
					expect(res.body.data).toHaveProperty('token');
					expect(res.body.data).toHaveProperty('expiresIn');
				});
		});
	});
});
