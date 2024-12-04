import { Service } from 'typedi';
import { instanceToPlain } from 'class-transformer';
import type { DocumentData, Query } from 'firebase-admin/firestore';
import { collectionAuth, collectionUser } from '@/config/firebaseConfig';
import { HttpException } from '@exceptions/HttpException';
import { genHashAuth } from '@/utils/hash';
import type { Auth } from '@modules/auth/interface';
import type { User } from '@modules/user/interface';
import type { CreateUserDto, QueriesUserDto, QueryUserDto, UpdateUserDto } from '@modules/user/dto';

@Service()
export class UserService {
	public async findAllUser(query: QueriesUserDto): Promise<User[]> {
		let userRef: Query<DocumentData> = collectionUser;

		if (query.email !== undefined) {
			userRef = userRef.where('email', '==', query.email);
		}

		if (query.username !== undefined) {
			userRef = userRef.where('username', '==', query.username);
		}

		if (query.isActive !== undefined) {
			if (typeof query.isActive === 'string') {
				userRef = userRef.where('isActive', '==', query.isActive === 'true');
			} else {
				userRef = userRef.where('isActive', '==', query.isActive);
			}
		}

		const usersSnapshots = await userRef.get();

		if (usersSnapshots.empty) {
			return [];
		}

		return await Promise.all(
			usersSnapshots.docs.map(async doc => {
				const dataUser = doc.data() as Omit<User, 'id'>;

				if (query.auth) {
					dataUser['auth'] = [];

					const authSnapshot = await collectionAuth.where('userId', '==', doc.ref).limit(1).get();

					authSnapshot.docs.forEach(doc => {
						const authData = doc.data() as Omit<Auth, 'id'>;

						dataUser['auth'].push({
							id: doc.id,
							...authData,
						});
					});
				}

				return {
					id: doc.id,
					...dataUser,
				};
			}),
		);
	}

	public async findUserById(userId: string, query: QueryUserDto): Promise<User> {
		const userRef = collectionUser.doc(userId);
		const userSnapshot = await userRef.get();

		if (!userSnapshot.exists) {
			throw new HttpException(404, `This id ${userId} was not found`);
		}

		const dataUser = userSnapshot.data() as Omit<User, 'id'>;

		if (query.auth) {
			dataUser['auth'] = [];
			const authSnapshot = await collectionAuth.where('userId', '==', userRef).limit(1).get();

			authSnapshot.docs.forEach(doc => {
				const authData = doc.data() as Omit<Auth, 'id'>;

				dataUser['auth'].push({
					id: doc.id,
					...authData,
				});
			});
		}

		return {
			id: userSnapshot.id,
			...dataUser,
		};
	}

	public async createUser(payload: CreateUserDto): Promise<User> {
		const { password, ..._payloadUser } = payload;

		const payloadUser: Omit<User, 'id'> = {
			isActive: !!_payloadUser.isActive,
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

	public async updateUser(userId: string, payload: UpdateUserDto): Promise<User> {
		if (payload.email) {
			const userByEmailSnapshot = await collectionUser.where('email', '==', payload.email).limit(1).get();
			if (!userByEmailSnapshot.empty) throw new HttpException(409, `This email ${payload.email} already exists`);
		}

		if (payload.username) {
			const userByUsernameSnapshot = await collectionUser.where('username', '==', payload.username).limit(1).get();
			if (!userByUsernameSnapshot.empty) throw new HttpException(409, `This username ${payload.username} already exists`);
		}

		const userRef = collectionUser.doc(userId);

		const userData = await userRef.firestore.runTransaction(async t => {
			const userSnapshot = await t.get(userRef);
			if (!userSnapshot.exists) throw new HttpException(409, "User doesn't exist");

			t.update(userRef, instanceToPlain(payload));

			return userSnapshot.data() as Omit<User, 'id'>;
		});

		return {
			id: userId,
			...userData,
			...payload,
		};
	}

	public async deleteUser(userId: string): Promise<void> {
		const userRef = collectionUser.doc(userId);

		await userRef.firestore.runTransaction(async t => {
			const userSnapshot = await t.get(userRef);
			if (!userSnapshot.exists) throw new HttpException(409, "User doesn't exist");

			t.delete(userRef);

			const authSnapshot = await collectionAuth.where('userId', '==', userRef).limit(1).get();
			authSnapshot.forEach(doc => t.delete(doc.ref));
		});
	}
}
