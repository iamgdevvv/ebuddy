import { App } from '@/app';
import routes from '@routes/index';

try {
	const app = new App(routes);

	app.listen();
} catch (error) {
	console.log(error);
}
