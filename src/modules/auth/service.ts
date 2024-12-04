import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { Service } from 'typedi';
import type { DocumentReference } from 'firebase-admin/firestore';
import { SECRET_KEY } from '@config';
import { collectionAuth, collectionUser } from '@/config/firebaseConfig';
import { HttpException } from '@exceptions/HttpException';
import { genHashAuth } from '@/utils/hash';
import type { DataStoredInToken, TokenData, Auth } from '@modules/auth/interface';
import type { User } from '@modules/user/interface';
import type { LoginDto, RegisterDto } from '@modules/auth/dto';

@Service()
export class AuthService {
	private createToken(user: User): TokenData {
		const dataStoredInToken: DataStoredInToken = user;
		const expiresIn: number = 60 * 60;

		return { expiresIn, token: sign(dataStoredInToken, SECRET_KEY, { expiresIn }) };
	}

	public async register(payload: RegisterDto): Promise<User> {
		const { password, ..._payloadUser } = payload;

		const payloadUser: Omit<User, 'id'> = {
			isActive: true,
			..._payloadUser,
		};

		const userByEmailSnapshot = await collectionUser.where('email', '==', payloadUser.email).limit(1).get();
		const userByUsernameSnapshot = await collectionUser.where('username', '==', payloadUser.username).limit(1).get();

		if (!userByEmailSnapshot.empty) throw new HttpException(409, `This email ${payloadUser.email} already exists`);
		if (!userByUsernameSnapshot.empty) throw new HttpException(409, `This username ${payloadUser.username} already exists`);

		const userRef = collectionUser.doc();
		const authRef = collectionAuth.doc();

		const createUserId = await userRef.firestore.runTransaction(async t => {
			const { hash, salt } = await genHashAuth(password);

			t.create(userRef, payloadUser);
			t.create(authRef, { hash, salt, userId: userRef });

			return userRef.id;
		});

		return {
			id: createUserId,
			...payloadUser,
		};
	}

	public async login(payload: LoginDto): Promise<TokenData> {
		let userData: Omit<User, 'id'> | null = null;
		let userRef: DocumentReference | null = null;
		const userByUsernameRef = await collectionUser.where('username', '==', payload.username).limit(1).get();

		if (!userByUsernameRef.empty) {
			userRef = userByUsernameRef.docs[0].ref;
			userData = userByUsernameRef.docs[0].data() as Omit<User, 'id'>;
		} else {
			const userByEmailRef = await collectionUser.where('email', '==', payload.username).limit(1).get();

			if (!userByEmailRef.empty) {
				userRef = userByEmailRef.docs[0].ref;
				userData = userByEmailRef.docs[0].data() as Omit<User, 'id'>;
			}
		}

		if (!userRef || !userData) {
			throw new HttpException(404, `User not found`);
		}

		const authSnapshot = await collectionAuth.where('userId', '==', userRef).limit(1).get();

		if (authSnapshot.empty) {
			throw new HttpException(404, `User auth not found`);
		}

		const authData = authSnapshot.docs[0].data() as Omit<Auth, 'id'>;

		const isPasswordMatch = await compare(payload.password, authData.hash);

		if (!isPasswordMatch) {
			throw new HttpException(409, "You're password not matching");
		}

		return this.createToken({
			id: userRef.id,
			...userData,
		});
	}
}
