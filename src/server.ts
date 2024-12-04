import { App } from '@/app';
import routes from '@routes/index';

try {
	// ValidateEnv();

	const app = new App(routes);

	app.listen();
} catch (error) {
	console.log(error);
}
