import { bool, cleanEnv, port, str } from 'envalid';

export const ValidateEnv = () => {
	cleanEnv(process.env, {
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
};
