import swaggerAutogen from 'swagger-autogen';

const doc = {
	info: {
		title: 'Backend EBUDDY',
	},
	host: 'localhost:3000',
};

const outputFile = './swagger.json';
const routes = ['./modules/auth/route', './modules/user/route'];

swaggerAutogen()(outputFile, routes, doc);
