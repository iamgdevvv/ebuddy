import { genSaltSync, hash } from 'bcrypt';

const genHashAuth = async (password: string) => {
	const saltAuth = genSaltSync(10);
	const hashAuth = await hash(password, saltAuth);

	return { salt: saltAuth, hash: hashAuth };
};

export { genHashAuth };
