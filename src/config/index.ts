import { config } from 'dotenv';
import { bool, cleanEnv, port, str } from 'envalid';

config({ path: `.env.${process.env.NODE_ENV || 'development'}` });

const env = cleanEnv(process.env, {
	NODE_ENV: str(),
	PORT: port(),
	SECRET_KEY: str(),
	LOG_FORMAT: str(),
	LOG_DIR: str(),
	ORIGIN: str(),
	CREDENTIALS: bool(),
	FIREBASE_PROJECT_ID: str(),
	FIREBASE_PRIVATE_KEY_ID: str(),
	FIREBASE_PRIVATE_KEY: str(),
	FIREBASE_CLIENT_EMAIL: str(),
	FIREBASE_CLIENT_ID: str(),
	FIREBASE_CLIENT_CERT_URL: str(),
});

export const {
	NODE_ENV,
	PORT,
	SECRET_KEY,
	LOG_FORMAT,
	LOG_DIR,
	ORIGIN,
	CREDENTIALS,
	FIREBASE_PROJECT_ID,
	FIREBASE_PRIVATE_KEY_ID,
	FIREBASE_PRIVATE_KEY,
	FIREBASE_CLIENT_EMAIL,
	FIREBASE_CLIENT_ID,
	FIREBASE_CLIENT_CERT_URL,
} = env;
