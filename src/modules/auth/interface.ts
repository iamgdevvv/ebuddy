import { Request } from 'express';
import type { User } from '@modules/user/interface';
import type { DocumentReference } from 'firebase-admin/firestore';

export interface Auth {
	id: string;
	hash: string;
	salt: string;
	userId: DocumentReference;
}

export interface DataStoredInToken extends User {}

export interface TokenData {
	token: string;
	expiresIn: number;
}

export interface RequestWithUser extends Request {
	user: User;
}
