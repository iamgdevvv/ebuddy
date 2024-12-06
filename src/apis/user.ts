import type { UpdateUser, User } from '@schemas/me';

const queryUser = async (token: string): Promise<ResResult<User>> => {
	const fetchUser = await fetch(`${process.env.HOST_SERVER}/users/me`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	const resultUser = await fetchUser.json();

	return resultUser;
};

const updateUser = async (token: string, payload: UpdateUser): Promise<ResResult<User>> => {
	const fetchUpdateUser = await fetch(`${process.env.HOST_SERVER}/users/me`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(payload),
	});

	const resultUpdateUser = await fetchUpdateUser.json();

	return resultUpdateUser;
};

export { queryUser, updateUser };
