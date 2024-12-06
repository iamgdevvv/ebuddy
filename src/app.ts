import 'reflect-metadata';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { type Router } from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import { NODE_ENV, PORT, LOG_FORMAT, ORIGIN, CREDENTIALS } from '@config';
import { ErrorMiddleware } from '@middleware/error.middleware';
import { logger, stream } from '@utils/logger';

import swaggerGenDoc from './swagger';

export class App {
	public app: express.Application;
	public env: string;
	public port: string | number;

	constructor(routes: Router[]) {
		this.app = express();
		this.env = NODE_ENV || 'development';
		this.port = PORT || 3000;

		this.initializeMiddlewares();
		this.initializeRoutes(routes);
		this.initializeSwagger();
		this.initializeErrorHandling();
	}

	public listen() {
		this.app.listen(this.port, () => {
			logger.info(`=================================`);
			logger.info(`======= ENV: ${this.env} =======`);
			logger.info(`🚀 App listening on the port ${this.port}`);
			logger.info(`=================================`);
		});
	}

	public getServer() {
		return this.app;
	}

	private initializeMiddlewares() {
		this.app.use(morgan(LOG_FORMAT, { stream }));
		this.app.use(cors({ origin: ORIGIN, credentials: CREDENTIALS }));
		this.app.use(hpp());
		this.app.use(helmet());
		this.app.use(compression());
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: true }));
		this.app.use(cookieParser());
	}

	private initializeRoutes(routes: Router[]) {
		routes.forEach(route => {
			this.app.use('/', route);
		});
	}

	private async initializeSwagger() {
		if (this.env !== 'test') {
			const swaggerSpec = await swaggerGenDoc();

			if (swaggerSpec) {
				this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec.data));
				this.app.get('/swagger.json', (_, res) => {
					res.setHeader('Content-Type', 'application/json');
					res.send(swaggerSpec);
				});
			}
		}
	}

	private initializeErrorHandling() {
		this.app.use(ErrorMiddleware);
	}
}
