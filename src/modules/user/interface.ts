import type { Auth } from '@modules/auth/interface';

export interface User {
	id: string;
	email: string;
	username: string;
	isActive: boolean;
	auth?: Auth[];
}
