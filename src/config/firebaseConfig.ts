import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import {
	FIREBASE_CLIENT_CERT_URL,
	FIREBASE_CLIENT_EMAIL,
	FIREBASE_CLIENT_ID,
	FIREBASE_PRIVATE_KEY,
	FIREBASE_PRIVATE_KEY_ID,
	FIREBASE_PROJECT_ID,
} from '@config';

initializeApp({
	credential: cert({
		// projectId: FIREBASE_PROJECT_ID,
		// privateKey: FIREBASE_PRIVATE_KEY_ID,
		// clientEmail: FIREBASE_CLIENT_EMAIL,
		// @ts-expect-error
		type: 'service_account',
		project_id: FIREBASE_PROJECT_ID,
		private_key_id: FIREBASE_PRIVATE_KEY_ID,
		private_key: FIREBASE_PRIVATE_KEY,
		client_email: FIREBASE_CLIENT_EMAIL,
		client_id: FIREBASE_CLIENT_ID,
		auth_uri: 'https://accounts.google.com/o/oauth2/auth',
		token_uri: 'https://oauth2.googleapis.com/token',
		auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
		client_x509_cert_url: FIREBASE_CLIENT_CERT_URL,
		universe_domain: 'googleapis.com',
	}),
});

const db = getFirestore();

db.settings({
	ignoreUndefinedProperties: true,
});

const dbRef = {
	AUTH: 'AUTH',
	USERS: 'USERS',
};

const collectionAuth = db.collection(dbRef.AUTH);
const collectionUser = db.collection(dbRef.USERS);

export { dbRef, collectionAuth, collectionUser };
