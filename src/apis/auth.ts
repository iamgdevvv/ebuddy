import type { User } from '@schemas/me';
import type { Login, Register } from '@schemas/auth';

const queryRegister = async (payload: Register): Promise<ResResult<User>> => {
	const fetchRegister = await fetch(`${process.env.HOST_SERVER}/register`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(payload),
	});

	const resultRegister = await fetchRegister.json();

	return resultRegister;
};

const queryLogin = async (
	payload: Login
): Promise<
	ResResult<{
		token: string;
		expiresIn: number;
	}>
> => {
	const fetchLogin = await fetch(`${process.env.HOST_SERVER}/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(payload),
	});

	const resultLogin = await fetchLogin.json();

	return resultLogin;
};

export { queryRegister, queryLogin };
